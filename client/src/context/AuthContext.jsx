import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import apiservice, { setupInterceptors } from "../services/api.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isloading, setloading] = useState(true);
  const [user, setuser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    authStore.setTokenInStore(accessToken);
  }, [accessToken]);

  useEffect(() => {
    setupInterceptors();

    authStore.setAccessToken = setAccessToken;
    authStore.logout = () => {
      setuser(null);
      setAccessToken(null);
      setIsAuthenticated(false);
      navigate("/login");
    };

    const checkUserStatus = async () => {
      try {
        const response = await apiservice.post("/api/auth/refresh");
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
        setIsAuthenticated(true);
        const userResponse = await apiservice.get("/api/auth/getuser", {
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
      const response = await apiservice.post("/api/auth/login", {
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
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await apiservice.post("/api/auth/register", {
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
    }
  };

  const logout = async () => {
    try {
      const response = await apiservice.post("/api/auth/logout");
    } catch (error) {
      console.error(
        "logout failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    } finally {
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
    <AuthContext.Provider value={value}>
      {!isloading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
