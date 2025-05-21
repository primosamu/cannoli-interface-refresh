
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, MoveVertical } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Define campaign types for priority matrix
const campaignTypes = [
  { id: "recuperacao", name: "Recuperação" },
  { id: "fidelizacao", name: "Fidelização" },
  { id: "padroesConsumo", name: "Padrões de Consumo" },
  { id: "migracaoCanal", name: "Migração de Canal" },
  { id: "promocoesSemanais", name: "Promoções Semanais" },
  { id: "custom", name: "Campanhas Personalizadas" }
];

const CampaignPriority = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [campaignLimits, setCampaignLimits] = useState({
    day: "",
    week: "",
    month: "",
    year: ""
  });
  const [priorityOrder, setPriorityOrder] = useState<string[]>(
    campaignTypes.map(c => c.id)
  );

  const handleSavePriorities = () => {
    // In a real implementation, this would save to the database
    toast({
      title: "Prioridades salvas",
      description: `Configurações de priorização de campanhas foram salvas com sucesso.`,
    });
  };

  const moveCampaignType = (id: string, direction: "up" | "down") => {
    const currentIndex = priorityOrder.indexOf(id);
    const newPriorityOrder = [...priorityOrder];
    
    if (direction === "up" && currentIndex > 0) {
      // Swap with item above
      [newPriorityOrder[currentIndex], newPriorityOrder[currentIndex - 1]] = 
      [newPriorityOrder[currentIndex - 1], newPriorityOrder[currentIndex]];
    } else if (direction === "down" && currentIndex < priorityOrder.length - 1) {
      // Swap with item below
      [newPriorityOrder[currentIndex], newPriorityOrder[currentIndex + 1]] = 
      [newPriorityOrder[currentIndex + 1], newPriorityOrder[currentIndex]];
    }
    
    setPriorityOrder(newPriorityOrder);
  };

  const handleLimitChange = (period: string, value: string) => {
    setCampaignLimits({
      ...campaignLimits,
      [period]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Maximum campaigns per customer */}
      <div className="space-y-2">
        <Label>Limite de campanhas por cliente</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Define quantas campanhas um mesmo cliente pode receber em diferentes períodos de tempo.
          Deixe em branco ou com valor 0 caso não queira definir limites para algum período.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-md">
          <div className="space-y-2">
            <Label htmlFor="day-limit">Por dia</Label>
            <Input
              id="day-limit"
              type="number"
              min={0}
              placeholder="Sem limite"
              value={campaignLimits.day}
              onChange={(e) => handleLimitChange("day", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="week-limit">Por semana</Label>
            <Input
              id="week-limit"
              type="number"
              min={0}
              placeholder="Sem limite"
              value={campaignLimits.week}
              onChange={(e) => handleLimitChange("week", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="month-limit">Por mês</Label>
            <Input
              id="month-limit"
              type="number"
              min={0}
              placeholder="Sem limite"
              value={campaignLimits.month}
              onChange={(e) => handleLimitChange("month", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year-limit">Por ano</Label>
            <Input
              id="year-limit"
              type="number"
              min={0}
              placeholder="Sem limite"
              value={campaignLimits.year}
              onChange={(e) => handleLimitChange("year", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Campaign priority matrix */}
      <div className="space-y-2">
        <h3 className="text-md font-medium">Matriz de priorização de campanhas</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configure a ordem de prioridade das campanhas quando um cliente está elegível para receber múltiplas campanhas.
          A primeira campanha na lista terá a maior prioridade.
        </p>
        
        <Card className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Prioridade</TableHead>
                <TableHead>Tipo de Campanha</TableHead>
                <TableHead className="w-[100px] text-right">Reordenar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priorityOrder.map((typeId, index) => {
                const campaignType = campaignTypes.find(c => c.id === typeId);
                return (
                  <TableRow key={typeId}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{campaignType?.name || typeId}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveCampaignType(typeId, "up")}
                          disabled={index === 0}
                        >
                          <MoveVertical className="h-4 w-4 rotate-180" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveCampaignType(typeId, "down")}
                          disabled={index === priorityOrder.length - 1}
                        >
                          <MoveVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Button onClick={handleSavePriorities} className="mt-4">
        <Save className="h-4 w-4 mr-2" />
        Salvar configurações
      </Button>
    </div>
  );
};

export default CampaignPriority;
