
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CommunicationChannelCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  openRate: number;
  conversionRate: number;
  onCreateCampaign: (type: string) => void;
}

const CommunicationChannelCard = ({
  title,
  description,
  icon,
  openRate,
  conversionRate,
  onCreateCampaign,
}: CommunicationChannelCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{openRate}%</span> de taxa de abertura
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{conversionRate}%</span> de taxa de conversão
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4" onClick={() => onCreateCampaign(title)}>
          Criar Campanha
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommunicationChannelCard;
