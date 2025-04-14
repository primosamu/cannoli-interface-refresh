
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CannaliServerPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Cannoli Server</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Configuração do Cannoli Server</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Cannoli Server</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CannaliServerPage;
