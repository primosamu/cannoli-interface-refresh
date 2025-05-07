
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CampaignItem {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export interface PredefinedCampaignSectionProps {
  title: string;
  icon: React.ReactNode;
  campaigns: CampaignItem[];
  colorClass: string;
  onSelectCampaign: (id: string) => void;
}

const PredefinedCampaignSection = ({
  title,
  icon,
  campaigns,
  colorClass,
  onSelectCampaign,
}: PredefinedCampaignSectionProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="grid gap-4 grid-cols-2">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className={`${colorClass} border-none shadow-sm hover:shadow transition-shadow`}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{campaign.title}</CardTitle>
                  <CardDescription>{campaign.description}</CardDescription>
                </div>
                <Badge variant="outline" className="bg-white">
                  {campaign.badge}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="pt-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto gap-1 hover:bg-white/50"
                onClick={() => onSelectCampaign(campaign.id)}
              >
                Usar modelo <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PredefinedCampaignSection;
