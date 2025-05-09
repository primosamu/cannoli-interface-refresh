
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AuthPage = () => {
  // Always redirect to home
  return <Navigate to="/" replace />;
};

export default AuthPage;
