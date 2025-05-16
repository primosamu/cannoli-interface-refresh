
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface CampaignItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  isActive?: boolean;
  metrics?: {
    usageCount: number;
    revenue: number;
    discountTotal: number;
    averageOrderValue: number;
    uniqueCustomers?: number;
    itemsPerOrder?: number;
  }
}

interface PredefinedCampaignSectionProps {
  title: string;
  icon: React.ReactNode;
  campaigns: CampaignItem[];
  colorClass: string;
  onSelectCampaign: (id: string) => void;
  onToggleCampaign?: (id: string, isActive: boolean) => void;
  isRecurring?: boolean;
  onShowMetrics?: (campaign: CampaignItem) => void;
}

const PredefinedCampaignSection = ({
  title,
  icon,
  campaigns,
  colorClass,
  onSelectCampaign,
  onToggleCampaign,
  isRecurring = false,
  onShowMetrics,
}: PredefinedCampaignSectionProps) => {
  const { toast } = useToast();
  
  const handleShowMetrics = (campaign: CampaignItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShowMetrics) {
      onShowMetrics(campaign);
    } else {
      toast({
        title: "Métricas indisponíveis",
        description: "As métricas para esta campanha ainda não estão disponíveis.",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-${campaigns.length > 3 ? "4" : "3"}`}>
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className={`${colorClass} border-${colorClass.replace('bg-', 'border-')}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{campaign.title}</CardTitle>
              <CardDescription>{campaign.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground mb-2">
                <span className="bg-background/80 rounded-full px-2 py-0.5">{campaign.badge}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-0">
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => onSelectCampaign(campaign.id)}
                >
                  {isRecurring ? "Configurar" : "Usar modelo"} <ArrowRight className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={(e) => handleShowMetrics(campaign, e)}
                >
                  <BarChart className="h-4 w-4" /> Métricas
                </Button>
              </div>
              
              {onToggleCampaign && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {campaign.isActive ? "Ativa" : "Inativa"}
                  </span>
                  <Switch
                    checked={campaign.isActive}
                    onCheckedChange={(checked) => onToggleCampaign(campaign.id, checked)}
                  />
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PredefinedCampaignSection;
