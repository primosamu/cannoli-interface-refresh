
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface CommunicationChannelCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  openRate: number;
  conversionRate: number;
  onCreateCampaign: (type: string, executionType: "one-time" | "recurring") => void;
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
        
        <Tabs defaultValue="one-time" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="one-time">Pontual</TabsTrigger>
            <TabsTrigger value="recurring">Recorrente</TabsTrigger>
          </TabsList>
          <TabsContent value="one-time" className="pt-2">
            <Button variant="outline" className="w-full" onClick={() => onCreateCampaign(title, "one-time")}>
              Criar Campanha
            </Button>
          </TabsContent>
          <TabsContent value="recurring" className="pt-2">
            <Button variant="outline" className="w-full" onClick={() => onCreateCampaign(title, "recurring")}>
              Configurar Automação
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunicationChannelCard;
