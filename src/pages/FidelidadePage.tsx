
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FidelidadePage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Fidelidade</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Programa de Fidelidade</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Fidelidade</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FidelidadePage;
