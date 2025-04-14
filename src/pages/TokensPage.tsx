
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TokensPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Tokens</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gestão de Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Tokens</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokensPage;
