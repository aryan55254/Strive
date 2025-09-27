import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { RingLoader } from "react-spinners";
const ProtectedRoute = ({ children }) => {
  const { user, isloading } = useContext(AuthContext);
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
