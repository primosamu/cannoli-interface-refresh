
import { Plus, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EconomicGroupList from "@/components/economic-groups/EconomicGroupList";

const GruposEconomicosPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Grupos Econômicos</h1>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Grupo
        </Button>
      </div>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gerenciamento de Grupos Econômicos</CardTitle>
        </CardHeader>
        <CardContent>
          <EconomicGroupList />
        </CardContent>
      </Card>
    </div>
  );
};

export default GruposEconomicosPage;
