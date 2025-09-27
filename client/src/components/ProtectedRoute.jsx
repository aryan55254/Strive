import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RingLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { user, isloading } = useAuth();

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
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;
