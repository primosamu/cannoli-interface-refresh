
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const AuthPage = () => {
  const { user, loading } = useAuth();
  
  // If user is already logged in, redirect to home
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">Cannoli</CardTitle>
          <CardDescription>
            Você precisa estar autenticado para acessar este sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="text-center mb-4">
            <p className="text-muted-foreground">
              A autenticação por email e senha foi removida deste sistema.
            </p>
          </div>
          <div className="w-full mt-4">
            <p className="text-sm text-center text-muted-foreground">
              Por favor, contate o administrador do sistema para obter acesso.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Sistema de Gestão Cannoli
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
