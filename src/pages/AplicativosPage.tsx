
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AplicativosPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Aplicativos</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Aplicativos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Aplicativos</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AplicativosPage;
