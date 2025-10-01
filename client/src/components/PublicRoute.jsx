import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RingLoader } from "react-spinners";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isloading } = useAuth();

  if (isloading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-900">
        <RingLoader
          color={"#06B6D4"}
          loading={isloading}
          size={100}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default PublicRoute;
