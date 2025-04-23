
import { useState } from "react";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EconomicGroupList from "@/components/economic-groups/EconomicGroupList";
import { EconomicGroupFormDialog } from "@/components/economic-groups/EconomicGroupFormDialog";

const GruposEconomicosPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Grupos Econômicos</h1>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          Novo Grupo
        </Button>
      </div>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <EconomicGroupList />
        </CardContent>
      </Card>
      
      <EconomicGroupFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default GruposEconomicosPage;
