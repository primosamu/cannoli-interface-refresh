
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ComplementosPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Complementos</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Complementos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Complementos</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplementosPage;
