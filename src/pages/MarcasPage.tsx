
import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BrandList from "@/components/brands/BrandList";
import { BrandFormDialog } from "@/components/brands/BrandFormDialog";

const MarcasPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Marcas</h1>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Marca
        </Button>
      </div>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gerenciamento de Marcas</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandList />
        </CardContent>
      </Card>
      
      <BrandFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default MarcasPage;
