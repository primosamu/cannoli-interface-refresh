
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MinhaContaPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Minha Conta</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Informações da Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Minha Conta</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MinhaContaPage;
