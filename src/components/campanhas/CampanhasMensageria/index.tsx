
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Campaign } from "@/types/campaign";

import CampanhaForm from "../CampanhaForm";
import CommunicationChannelsSection from "./CommunicationChannelsSection";
import CreateCampaignButton from "./CreateCampaignButton";
import CampaignsInfoGrid from "./CampaignsInfoGrid";
import { useCampaigns } from "./hooks/useCampaigns";

const CampanhasMensageria: React.FC = () => {
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedCampaignType, setSelectedCampaignType] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  const { campaigns, isLoading } = useCampaigns();

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
    <div className="space-y-6 pb-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Gerenciamento de Campanhas</h2>
        <p className="text-muted-foreground">
          Crie e gerencie campanhas de mensageria para seus clientes
        </p>
      </div>
      
      {/* Communication Channel Cards */}
      <CommunicationChannelsSection onChannelSelect={handleNewCampaign} />
      
      {/* Create Campaign Button */}
      <CreateCampaignButton onClick={() => setShowNewCampaignForm(true)} />
      
      {/* Info Cards Grid */}
      <CampaignsInfoGrid campaigns={campaigns} isLoading={isLoading} onCreateCampaign={() => setShowNewCampaignForm(true)} />
      
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
