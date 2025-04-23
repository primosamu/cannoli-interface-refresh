
import { useState } from "react";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BrandList from "@/components/brands/BrandList";
import { BrandFormDialog } from "@/components/brands/BrandFormDialog";

const MarcasPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Marcas</h1>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          Nova Marca
        </Button>
      </div>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
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
