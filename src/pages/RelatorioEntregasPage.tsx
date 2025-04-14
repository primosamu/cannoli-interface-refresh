
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RelatorioEntregasPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Relatório de Entregas</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Relatório de Entregas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Relatório de Entregas</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatorioEntregasPage;
