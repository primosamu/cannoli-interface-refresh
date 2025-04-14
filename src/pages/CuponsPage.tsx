
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CuponsPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Cupons</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Cupons</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Cupons</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CuponsPage;
