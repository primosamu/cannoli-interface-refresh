
import { Plus, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BrandList from "@/components/brands/BrandList";

const MarcasPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Marcas</h1>
        </div>
        <Button>
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
    </div>
  );
};

export default MarcasPage;
