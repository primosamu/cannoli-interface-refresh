
import { Plus, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StoreList from "@/components/stores/StoreList";

const LojasPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Lojas</h1>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Loja
        </Button>
      </div>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gerenciamento de Lojas</CardTitle>
        </CardHeader>
        <CardContent>
          <StoreList />
        </CardContent>
      </Card>
    </div>
  );
};

export default LojasPage;
