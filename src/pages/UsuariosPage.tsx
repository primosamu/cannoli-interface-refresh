
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UsuariosPage = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Usuários</h1>
        </div>
      </div>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Esta página ainda será construída.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsuariosPage;
