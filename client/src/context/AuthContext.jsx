import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import apiservice, { setupInterceptors } from "../services/api.service";
import authStore from "../services/auth.store.js";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isloading, setloading] = useState(true);
  const [user, setuser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  authStore.logout = () => {
    setuser(null);
    setIsAuthenticated(false);
    authStore.setAccessToken(null);
    navigate("/login");
  };

  useEffect(() => {
    setupInterceptors();

    const checkUserStatus = async () => {
      try {
        const response = await apiservice.post("/api/auth/refresh");
        const newAccessToken = response.data.accessToken;

        authStore.setAccessToken(newAccessToken);
        setIsAuthenticated(true);

        const userResponse = await apiservice.get("/api/auth/getuser");
        setuser(userResponse.data);
      } catch (error) {
        console.log("No active session or refresh token expired.");
        authStore.logout();
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
        const { userData, accessToken: newAccessToken } = response.data;

        authStore.setAccessToken(newAccessToken);
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
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const trimmedUsername = username.trim();

      const response = await apiservice.post("/api/auth/register", {
        Email: trimmedEmail,
        Password: trimmedPassword,
        Username: trimmedUsername,
      });
      await login(trimmedEmail, trimmedPassword);
    } catch (error) {
      console.error("Register failed:", error.response?.data);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiservice.post("/api/auth/logout");
    } catch (error) {
      console.error(
        "logout failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      authStore.logout();
    }
  };

  const value = {
    login,
    logout,
    register,
    isloading,
    user,
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
