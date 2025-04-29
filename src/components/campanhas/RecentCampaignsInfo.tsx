
import React, { useState, useEffect } from "react";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getRecentCampaigns } from "./CampanhaForm";
import { Campaign, CampaignStatus } from "@/types/campaign";

const RecentCampaignsInfo = () => {
  const [recentCampaigns, setRecentCampaigns] = useState<Campaign[]>([]);
  
  // Listen for updates to recent campaigns
  useEffect(() => {
    // Set initial campaigns
    setRecentCampaigns(getRecentCampaigns());
    
    // Set up event listener for updates
    const handleCampaignsUpdated = (event: CustomEvent<Campaign[]>) => {
      setRecentCampaigns(event.detail);
    };

    window.addEventListener("recentCampaignsUpdated", handleCampaignsUpdated as EventListener);
    
    return () => {
      window.removeEventListener("recentCampaignsUpdated", handleCampaignsUpdated as EventListener);
    };
  }, []);
  
  const hasCampaigns = recentCampaigns.length > 0;
  
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
      case "draft":
        return <Badge variant="outline" className="bg-gray-200 text-gray-500">Rascunho</Badge>;
      case "paused":
        return <Badge className="bg-orange-500">Pausada</Badge>;
      default:
        return null;
    }
  };

  // Format date relative to now
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Hoje";
    } else if (diffDays === 1) {
      return "Ontem";
    } else {
      return `${diffDays} dias atrás`;
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
          {recentCampaigns.map(campaign => (
            <div key={campaign.id} className="bg-white p-3 rounded-md border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  {getChannelIcon(campaign.channel, campaign.whatsappType)}
                </div>
                <div>
                  <h5 className="text-sm font-medium">{campaign.name}</h5>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{formatDate(campaign.createdAt)}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{campaign.segment.customerCount} destinatários</span>
                    {campaign.channel === "whatsapp" && campaign.whatsappType && (
                      <>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {campaign.whatsappType === "marketing" ? "Marketing" : "Serviço"}
                        </span>
                      </>
                    )}
                    {campaign.imageUrl && (
                      <>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          <span className="ml-0.5">Imagem</span>
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
