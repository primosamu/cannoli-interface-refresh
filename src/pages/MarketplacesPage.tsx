
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MarketplacesPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Marketplaces</h1>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Integração com Marketplaces</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo da página Marketplaces</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketplacesPage;
