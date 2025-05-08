
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, MoveVertical } from "lucide-react";
import {
  FormControl,
  FormItem,
} from "@/components/ui/form";
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group";

// Define campaign types for priority matrix
const campaignTypes = [
  { id: "recuperacao", name: "Recuperação" },
  { id: "fidelizacao", name: "Fidelização" },
  { id: "padroesConsumo", name: "Padrões de Consumo" },
  { id: "migracaoCanal", name: "Migração de Canal" },
  { id: "promocoesSemanais", name: "Promoções Semanais" },
  { id: "custom", name: "Campanhas Personalizadas" }
];

type PeriodType = "day" | "week" | "month";

const CampaignPriority = () => {
  const { toast } = useToast();
  const [maxCampaignsPerCustomer, setMaxCampaignsPerCustomer] = useState<number>(2);
  const [periodType, setPeriodType] = useState<PeriodType>("day");
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

  const getPeriodLabel = () => {
    switch (periodType) {
      case "day": return "por dia";
      case "week": return "por semana";
      case "month": return "por mês";
      default: return "por dia";
    }
  };

  return (
    <div className="space-y-6">
      {/* Maximum campaigns per customer */}
      <div className="space-y-2">
        <Label>Limite de campanhas por cliente</Label>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="maxCampaigns" className="whitespace-nowrap">Máximo de</Label>
              <Input
                id="maxCampaigns"
                type="number"
                min={1}
                max={10}
                value={maxCampaignsPerCustomer}
                onChange={(e) => setMaxCampaignsPerCustomer(Number(e.target.value))}
                className="max-w-[80px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="periodType" className="whitespace-nowrap">campanhas</Label>
              <ToggleGroup 
                type="single" 
                value={periodType} 
                onValueChange={(value) => {
                  if (value) setPeriodType(value as PeriodType);
                }}
                className="border rounded-md"
              >
                <ToggleGroupItem value="day">Dia</ToggleGroupItem>
                <ToggleGroupItem value="week">Semana</ToggleGroupItem>
                <ToggleGroupItem value="month">Mês</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Define quantas campanhas um mesmo cliente pode receber em um período.
          </p>
        </div>
      </div>

      {/* Campaign priority matrix */}
      <div className="space-y-2">
        <h3 className="text-md font-medium">Matriz de priorização de campanhas</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configure a ordem de prioridade das campanhas quando um cliente está elegível para receber múltiplas campanhas.
          A primeira campanha na lista terá a maior prioridade.
        </p>
        
        <Card className="p-4">
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
