
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EntregadoresPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Entregadores</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Entregadores</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Entregadores</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntregadoresPage;
