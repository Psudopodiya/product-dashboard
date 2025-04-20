import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // If user is not authenticated, redirect to login.
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
