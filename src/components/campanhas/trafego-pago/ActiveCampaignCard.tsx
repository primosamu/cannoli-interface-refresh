
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PauseCircle, PlayCircle, BarChart, ExternalLink } from "lucide-react";
import { useState } from "react";
import { PlatformIcon } from "./CampaignTemplateCard";

interface ActiveCampaignCardProps {
  campaign: {
    id: string;
    name: string;
    type: string;
    platforms: string[];
    budget: number;
    spentBudget: number;
    startDate: string;
    endDate?: string;
    metrics: {
      impressions: number;
      clicks: number;
      conversions: number;
    };
    status: string;
  };
}

export function ActiveCampaignCard({ campaign }: ActiveCampaignCardProps) {
  const [status, setStatus] = useState(campaign.status);
  
  const toggleStatus = () => {
    setStatus(status === "active" ? "paused" : "active");
  };
  
  // Calculate campaign progress
  const progress = Math.round((campaign.spentBudget / campaign.budget) * 100);
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  };
  
  const startDate = formatDate(campaign.startDate);
  const endDate = campaign.endDate ? formatDate(campaign.endDate) : 'Contínuo';
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{campaign.name}</h3>
            <Badge variant={status === "active" ? "default" : "outline"}>
              {status === "active" ? "Ativa" : "Pausada"}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <div className="flex items-center">
              <span className="mr-3">{startDate} - {endDate}</span>
            </div>
            <div className="flex items-center ml-auto gap-1">
              {campaign.platforms.map((platform) => (
                <PlatformIcon key={platform} platform={platform as any} size={14} />
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Orçamento: R${campaign.spentBudget.toFixed(2)} de R${campaign.budget.toFixed(2)}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>
        
        <div className="p-4 bg-slate-50">
          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Impressões</p>
              <p className="font-medium">{campaign.metrics.impressions}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cliques</p>
              <p className="font-medium">{campaign.metrics.clicks}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Conversões</p>
              <p className="font-medium">{campaign.metrics.conversions}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={toggleStatus}>
              {status === "active" ? (
                <>
                  <PauseCircle className="mr-1 h-4 w-4" />
                  Pausar
                </>
              ) : (
                <>
                  <PlayCircle className="mr-1 h-4 w-4" />
                  Ativar
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <BarChart className="mr-1 h-4 w-4" />
              Resultados
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
