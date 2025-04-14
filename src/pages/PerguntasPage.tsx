
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PerguntasPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Perguntas</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Perguntas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Perguntas</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerguntasPage;
