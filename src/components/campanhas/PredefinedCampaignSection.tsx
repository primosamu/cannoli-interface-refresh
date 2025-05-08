
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Power } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface CampaignItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  isActive?: boolean;
}

interface PredefinedCampaignSectionProps {
  title: string;
  icon: React.ReactNode;
  campaigns: CampaignItem[];
  colorClass: string;
  onSelectCampaign: (id: string) => void;
  onToggleCampaign?: (id: string, isActive: boolean) => void;
  isRecurring?: boolean;
}

const PredefinedCampaignSection = ({
  title,
  icon,
  campaigns,
  colorClass,
  onSelectCampaign,
  onToggleCampaign,
  isRecurring = false,
}: PredefinedCampaignSectionProps) => {
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
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1"
                onClick={() => onSelectCampaign(campaign.id)}
              >
                {isRecurring ? "Configurar" : "Usar modelo"} <ArrowRight className="h-4 w-4" />
              </Button>
              
              {isRecurring && onToggleCampaign && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {campaign.isActive ? "Ativa" : "Inativa"}
                  </span>
                  <Switch
                    checked={campaign.isActive}
                    onCheckedChange={(checked) => onToggleCampaign(campaign.id, checked)}
                    size="sm"
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
