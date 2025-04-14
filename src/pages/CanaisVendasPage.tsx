
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CanaisVendasPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Canais de Vendas</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Canais de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Canais de Vendas</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CanaisVendasPage;
