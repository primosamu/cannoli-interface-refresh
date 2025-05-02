
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, ChevronRight, Loader2 } from "lucide-react";
import SavedCampaignsList from "./SavedCampaignsList";
import CampanhaForm from "./CampanhaForm";
import PredefinedCampaignSection from "./PredefinedCampaignSection";
import CommunicationChannelCard from "./CommunicationChannelCard";
import RecentCampaignsInfo from "./RecentCampaignsInfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CampaignChannel } from "@/types/campaign";

const CampanhasMensageria: React.FC = () => {
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedCampaignType, setSelectedCampaignType] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Fetch active campaigns from Supabase
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('type', 'campaign')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching campaigns:", error);
        throw error;
      }
      
      return data.map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        segment: {
          id: campaign.segment_id || "default",
          name: "Customer Segment", // We would need to fetch actual segment info
          description: "Description",
          customerCount: 0
        },
        incentive: {
          type: campaign.incentive_type || "none",
          couponId: campaign.coupon_id,
          loyaltyPoints: campaign.loyalty_points
        },
        channel: campaign.channel as CampaignChannel,
        whatsappType: campaign.whatsapp_type,
        content: campaign.content || "",
        imageUrl: campaign.image_url,
        status: campaign.status,
        createdAt: campaign.created_at,
        scheduledAt: campaign.scheduled_at
      }));
    }
  });

  const handleNewCampaign = (channel: string, campaignType?: string) => {
    setSelectedChannel(channel);
    setSelectedCampaignType(campaignType || null);
    setShowNewCampaignForm(true);
  };
  
  // Handle campaign creation form close
  const handleFormClose = (open: boolean) => {
    setShowNewCampaignForm(open);
    if (!open) {
      // Refresh data when form is closed
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CommunicationChannelCard 
          icon="whatsapp"
          title="WhatsApp"
          description="Mensagens diretas para WhatsApp"
          onClick={() => handleNewCampaign("whatsapp")}
          quickActionLinks={[
            { label: "Promoção", onClick: () => handleNewCampaign("whatsapp", "promotion") },
            { label: "Novidades", onClick: () => handleNewCampaign("whatsapp", "news") },
            { label: "Lembrete", onClick: () => handleNewCampaign("whatsapp", "reminder") },
          ]}
        />
        
        <CommunicationChannelCard 
          icon="email"
          title="Email"
          description="Campanhas por email"
          onClick={() => handleNewCampaign("email")}
          quickActionLinks={[
            { label: "Newsletter", onClick: () => handleNewCampaign("email", "newsletter") },
            { label: "Evento", onClick: () => handleNewCampaign("email", "event") },
            { label: "Fidelidade", onClick: () => handleNewCampaign("email", "loyalty") },
          ]}
        />
        
        <CommunicationChannelCard 
          icon="sms"
          title="SMS"
          description="Mensagens SMS diretas"
          onClick={() => handleNewCampaign("sms")}
          quickActionLinks={[
            { label: "Urgente", onClick: () => handleNewCampaign("sms", "urgent") },
            { label: "Confirmação", onClick: () => handleNewCampaign("sms", "confirmation") },
            { label: "Lembrete", onClick: () => handleNewCampaign("sms", "reminder") },
          ]}
        />
      </div>
      
      {/* Create Campaign Button */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowNewCampaignForm(true)}
        >
          <PlusCircle className="h-4 w-4" />
          Criar Nova Campanha
        </Button>
      </div>
      
      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Saved Campaigns List */}
          <SavedCampaignsList />
        </div>
        
        {/* Middle Column */}
        <div className="space-y-6">
          {/* Recent Campaigns Section */}
          <Card className="overflow-hidden">
            <div className="bg-white p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Campanhas Recentes</h3>
                <Button variant="link" className="p-0 h-auto text-sm" asChild>
                  <span className="flex items-center">
                    Ver todas <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="p-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
              </div>
            ) : campaigns && campaigns.length > 0 ? (
              <div className="p-0">
                <RecentCampaignsInfo campaigns={campaigns} />
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500">
                <p>Nenhuma campanha recente encontrada</p>
                <Button 
                  variant="link" 
                  onClick={() => setShowNewCampaignForm(true)}
                  className="mt-2"
                >
                  Criar sua primeira campanha
                </Button>
              </div>
            )}
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Predefined Campaigns Section */}
          <PredefinedCampaignSection onSelectTemplate={(id) => {
            setShowNewCampaignForm(true);
            // Pass the template ID to the form
            return id;
          }} />
        </div>
      </div>
      
      {/* New Campaign Form Dialog */}
      <CampanhaForm
        open={showNewCampaignForm}
        onOpenChange={handleFormClose}
        selectedChannel={selectedChannel || undefined}
        campaignType={selectedCampaignType || undefined}
      />
    </div>
  );
};

export default CampanhasMensageria;
