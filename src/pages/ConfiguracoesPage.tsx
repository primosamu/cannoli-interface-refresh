
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConfiguracoesPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Configurações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Configurações</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesPage;
