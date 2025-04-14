
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UsuariosPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Usuários</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Usuários</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsuariosPage;
