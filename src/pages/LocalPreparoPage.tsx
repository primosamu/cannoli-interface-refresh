
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LocalPreparoPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Local de Preparo</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Configuração de Local de Preparo</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Local de Preparo</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalPreparoPage;
