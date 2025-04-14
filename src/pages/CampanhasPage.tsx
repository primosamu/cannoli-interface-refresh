
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CampanhasPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Campanhas</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Campanhas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Campanhas</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampanhasPage;
