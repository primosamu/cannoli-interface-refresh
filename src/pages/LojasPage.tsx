
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StoreList from "@/components/stores/StoreList";
import { StoreFormDialog } from "@/components/stores/StoreFormDialog";

const LojasPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Lojas</h1>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          Nova Loja
        </Button>
      </div>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <StoreList />
        </CardContent>
      </Card>
      
      <StoreFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default LojasPage;
