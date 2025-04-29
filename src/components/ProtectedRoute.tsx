
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Show children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
