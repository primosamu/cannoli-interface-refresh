
import React from "react";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type RecentCampaign = {
  id: string;
  name: string;
  channel: "whatsapp" | "email" | "sms";
  whatsappType?: "utility" | "marketing";
  status: "active" | "completed" | "scheduled";
  date: string;
  audienceCount: number;
};

const mockRecentCampaigns: RecentCampaign[] = [
  {
    id: "camp-1",
    name: "Lembrete de Aniversário",
    channel: "whatsapp",
    whatsappType: "utility",
    status: "active",
    date: "Hoje",
    audienceCount: 25
  },
  {
    id: "camp-2",
    name: "Promoção de Fim de Semana",
    channel: "email",
    status: "scheduled",
    date: "Amanhã",
    audienceCount: 1250
  },
  {
    id: "camp-3",
    name: "Alerta de Frete Grátis",
    channel: "sms",
    status: "completed",
    date: "2 dias atrás",
    audienceCount: 450
  }
];

const RecentCampaignsInfo = () => {
  const hasCampaigns = mockRecentCampaigns.length > 0;
  
  const getChannelIcon = (channel: string, type?: string) => {
    switch (channel) {
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-green-600" />;
      case "email":
        return <Mail className="h-4 w-4 text-purple-600" />;
      case "sms":
        return <Phone className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativa</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-gray-500">Concluída</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Agendada</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 rounded-lg p-4 border">
      <h4 className="font-medium mb-2">Campanhas recentes</h4>
      
      {!hasCampaigns ? (
        <p className="text-sm text-muted-foreground">
          Você ainda não possui campanhas de mensageria. Crie sua primeira campanha agora!
        </p>
      ) : (
        <div className="space-y-3 mt-3">
          {mockRecentCampaigns.map(campaign => (
            <div key={campaign.id} className="bg-white p-3 rounded-md border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  {getChannelIcon(campaign.channel, campaign.whatsappType)}
                </div>
                <div>
                  <h5 className="text-sm font-medium">{campaign.name}</h5>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{campaign.date}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{campaign.audienceCount} destinatários</span>
                    {campaign.channel === "whatsapp" && (
                      <>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {campaign.whatsappType === "marketing" ? "Marketing" : "Serviço"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                {getStatusBadge(campaign.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentCampaignsInfo;
