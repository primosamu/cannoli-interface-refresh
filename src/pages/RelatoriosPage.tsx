
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RelatoriosPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Relatórios</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Relatórios</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosPage;
