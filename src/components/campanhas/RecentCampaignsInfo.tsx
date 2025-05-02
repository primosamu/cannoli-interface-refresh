import React, { useState, useEffect } from "react";
import { MessageSquare, Mail, Phone, Edit, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getMockCampaigns } from "./utils/campaignUtils";
import { Campaign, CampaignStatus } from "@/types/campaign";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CampanhaForm from "./CampanhaForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const RecentCampaignsInfo: React.FC<{ campaigns?: Campaign[] }> = ({ campaigns: propCampaigns }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  
  // Fetch recent campaigns from Supabase
  const { data: fetchedCampaigns, isLoading } = useQuery({
    queryKey: ['recent_campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('type', 'campaign')
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) {
        console.error("Error fetching recent campaigns:", error);
        return [];
      }
      
      if (!data || data.length === 0) {
        return getMockCampaigns();
      }
      
      return data.map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        segment: {
          id: campaign.segment_id || "default",
          name: "Customer Segment",
          description: "Description",
          customerCount: campaign.segment_id ? 100 : 0
        },
        incentive: {
          type: campaign.incentive_type as "none" | "coupon" | "loyalty" || "none",
          couponId: campaign.coupon_id,
          loyaltyPoints: campaign.loyalty_points
        },
        channel: campaign.channel as "sms" | "whatsapp" | "email",
        whatsappType: campaign.whatsapp_type as "utility" | "marketing",
        content: campaign.content || "",
        imageUrl: campaign.image_url,
        status: campaign.status as CampaignStatus,
        createdAt: campaign.created_at,
        scheduledAt: campaign.scheduled_at
      }));
    },
    initialData: propCampaigns || getMockCampaigns()
  });
  
  const recentCampaigns = fetchedCampaigns;
  const hasCampaigns = recentCampaigns.length > 0;
  
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
  
  // Generate mock message sending stats for the campaign
  const getMessageStats = (campaign: Campaign) => {
    // Use deterministic randomness based on campaign id
    const idSum = campaign.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const seed = idSum / 1000;
    
    const totalSent = Math.floor(campaign.segment.customerCount * (0.95 + seed * 0.05));
    const delivered = Math.floor(totalSent * (0.85 + seed * 0.1));
    const opened = Math.floor(delivered * (0.4 + seed * 0.3));
    const engaged = Math.floor(opened * (0.2 + seed * 0.4));
    
    return {
      total: campaign.segment.customerCount,
      sent: totalSent,
      delivered: delivered,
      opened: opened,
      engaged: engaged,
      deliveryRate: (delivered / totalSent * 100).toFixed(1),
      openRate: (opened / delivered * 100).toFixed(1),
      engagementRate: (engaged / opened * 100).toFixed(1)
    };
  };
  
  // Handle campaign card click
  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowDetails(true);
  };
  
  // Handle edit button click
  const handleEditCampaign = () => {
    setShowDetails(false);
    setOpenEditForm(true);
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
            <div 
              key={campaign.id} 
              className="bg-white p-3 rounded-md border flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => handleCampaignClick(campaign)}
            >
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
      
      {/* Campaign Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes da Campanha</DialogTitle>
            <DialogDescription>
              Informações sobre a campanha e seus resultados
            </DialogDescription>
          </DialogHeader>
          
          {selectedCampaign && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{selectedCampaign.name}</h3>
                  {getStatusBadge(selectedCampaign.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Criada em {new Date(selectedCampaign.createdAt).toLocaleDateString('pt-BR')}
                  {selectedCampaign.scheduledAt && 
                    ` • Agendada para ${new Date(selectedCampaign.scheduledAt).toLocaleDateString('pt-BR')}`
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Canal</h4>
                  <div className="flex items-center gap-2">
                    {getChannelIcon(selectedCampaign.channel)}
                    <span className="capitalize">
                      {selectedCampaign.channel} 
                      {selectedCampaign.channel === "whatsapp" && selectedCampaign.whatsappType && 
                        ` (${selectedCampaign.whatsappType === "marketing" ? "Marketing" : "Serviço"})`
                      }
                    </span>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Segmento</h4>
                  <div>
                    <span className="font-medium">{selectedCampaign.segment.name}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedCampaign.segment.customerCount} destinatários
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Resumo de Envios</h4>
                
                {(() => {
                  const stats = getMessageStats(selectedCampaign);
                  return (
                    <>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-50 p-3 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">Total enviado</p>
                          <p className="text-xl font-semibold text-primary">{stats.sent}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            de {stats.total} ({(stats.sent/stats.total*100).toFixed(1)}%)
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">Entregues</p>
                          <p className="text-xl font-semibold text-green-500">{stats.delivered}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Taxa de entrega: {stats.deliveryRate}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">Abertura</p>
                          <p className="text-xl font-semibold text-blue-500">{stats.opened}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Taxa de abertura: {stats.openRate}%
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">Engajamento</p>
                          <p className="text-xl font-semibold text-purple-500">{stats.engaged}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Taxa de engajamento: {stats.engagementRate}%
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Fechar
                </Button>
                <Button onClick={handleEditCampaign}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Campanha
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Campaign Form */}
      {selectedCampaign && (
        <CampanhaForm
          open={openEditForm}
          onOpenChange={setOpenEditForm}
          campaignToEdit={selectedCampaign}
        />
      )}
    </div>
  );
};

export default RecentCampaignsInfo;
