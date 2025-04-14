
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MercadoriaPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Mercadoria</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Mercadorias</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Mercadoria</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MercadoriaPage;
