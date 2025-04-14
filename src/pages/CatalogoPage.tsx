
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CatalogoPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Catálogo</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão do Catálogo</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Catálogo</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CatalogoPage;
