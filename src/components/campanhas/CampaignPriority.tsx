
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
import { Save, MoveVertical, PlusCircle, Trash2 } from "lucide-react";
import {
  FormControl,
  FormItem,
} from "@/components/ui/form";
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group";
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

type PeriodType = "day" | "week" | "month" | "year";

interface CampaignLimit {
  id: string;
  maxCampaigns: number;
  periodType: PeriodType;
}

const CampaignPriority = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [campaignLimits, setCampaignLimits] = useState<CampaignLimit[]>([
    { id: "1", maxCampaigns: 2, periodType: "day" }
  ]);
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

  const addCampaignLimit = () => {
    const newLimit: CampaignLimit = {
      id: Date.now().toString(),
      maxCampaigns: 5,
      periodType: "week"
    };
    setCampaignLimits([...campaignLimits, newLimit]);
  };

  const removeCampaignLimit = (id: string) => {
    if (campaignLimits.length <= 1) {
      toast({
        title: "Não é possível remover",
        description: "É necessário manter ao menos uma configuração de limite.",
        variant: "destructive"
      });
      return;
    }
    setCampaignLimits(campaignLimits.filter(limit => limit.id !== id));
  };

  const updateCampaignLimit = (id: string, field: keyof CampaignLimit, value: any) => {
    setCampaignLimits(campaignLimits.map(limit => {
      if (limit.id === id) {
        return { ...limit, [field]: value };
      }
      return limit;
    }));
  };

  const getPeriodLabel = (periodType: PeriodType) => {
    switch (periodType) {
      case "day": return "por dia";
      case "week": return "por semana";
      case "month": return "por mês";
      case "year": return "por ano";
      default: return "por dia";
    }
  };

  return (
    <div className="space-y-6">
      {/* Maximum campaigns per customer */}
      <div className="space-y-2">
        <Label>Limite de campanhas por cliente</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Define quantas campanhas um mesmo cliente pode receber em diferentes períodos de tempo.
        </p>
        
        {campaignLimits.map((limit) => (
          <div key={limit.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 border p-3 rounded-md">
            <div className={`flex ${isMobile ? "flex-col w-full" : "flex-row"} items-start ${isMobile ? "gap-2" : "gap-4"}`}>
              <div className={`flex items-center ${isMobile ? "w-full" : ""} gap-2`}>
                <Label htmlFor={`maxCampaigns-${limit.id}`} className="whitespace-nowrap">Máximo de</Label>
                <Input
                  id={`maxCampaigns-${limit.id}`}
                  type="number"
                  min={1}
                  max={100}
                  value={limit.maxCampaigns}
                  onChange={(e) => updateCampaignLimit(limit.id, "maxCampaigns", Number(e.target.value))}
                  className={isMobile ? "w-full" : "max-w-[80px]"}
                />
              </div>
              <div className={`flex ${isMobile ? "flex-col w-full" : "flex-row items-center"} gap-2`}>
                <Label htmlFor={`periodType-${limit.id}`} className={`${isMobile ? "" : "whitespace-nowrap"}`}>campanhas</Label>
                <ToggleGroup 
                  type="single" 
                  value={limit.periodType} 
                  onValueChange={(value) => {
                    if (value) updateCampaignLimit(limit.id, "periodType", value as PeriodType);
                  }}
                  className={`border rounded-md ${isMobile ? "w-full" : ""}`}
                >
                  <ToggleGroupItem value="day" className={isMobile ? "flex-1" : ""}>Dia</ToggleGroupItem>
                  <ToggleGroupItem value="week" className={isMobile ? "flex-1" : ""}>Semana</ToggleGroupItem>
                  <ToggleGroupItem value="month" className={isMobile ? "flex-1" : ""}>Mês</ToggleGroupItem>
                  <ToggleGroupItem value="year" className={isMobile ? "flex-1" : ""}>Ano</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => removeCampaignLimit(limit.id)}
              className="ml-auto"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addCampaignLimit}
          className="mt-2"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Adicionar outro limite de tempo
        </Button>
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
