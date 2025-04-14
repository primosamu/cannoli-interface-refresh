
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PagamentosPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Pagamentos</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Pagamentos</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PagamentosPage;
