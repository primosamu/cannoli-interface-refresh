
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // No longer checking authentication, always render children
  return <>{children}</>;
};

export default ProtectedRoute;
