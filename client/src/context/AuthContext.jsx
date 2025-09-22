import {
  useState,
  useEffect,
  useContext,
  createContext,
  useNavigate,
} from "react";
import apiservice from "../services/api.service";

const authcontext = createContext(null);

export const authprovider = ({ children }) => {
  const [isloading, setloading] = useState(true);
  const [user, setuser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await apiservice.post("/auth/refresh");
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
        setIsAuthenticated(true);
        const userResponse = await apiservice.get("/auth/getuser", {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        setuser(userResponse.data);
      } catch (error) {
        console.log("No active session or refresh token expired.");
        setuser(null);
        setAccessToken(null);
        setIsAuthenticated(false);
      } finally {
        setloading(false);
      }
    };

    checkUserStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiservice.post("/auth/login", {
        Email: email,
        Password: password,
      });

      if (response.data) {
        const { user: userData, accessToken: newAccessToken } = response.data;

        setAccessToken(newAccessToken);

        setuser(userData);
        setIsAuthenticated(true);

        navigate("/home");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    } finally {
      setloading(false);
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await apiservice.post("/auth/register", {
        Email: email,
        Password: password,
        Username: username,
      });
      await login(email, password);
    } catch (error) {
      console.error(
        "Register failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    } finally {
      setloading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await apiservice.post("/auth/logout");
    } catch (error) {
      console.error(
        "logout failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    } finally {
      setloading(false);
      setuser(null);
      setAccessToken(null);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  const value = {
    login,
    logout,
    register,
    isloading,
    user,
    accessToken,
    isAuthenticated,
  };

  return (
    <authcontext.Provider value={value}>
      {!isloading && children}
    </authcontext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authcontext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
