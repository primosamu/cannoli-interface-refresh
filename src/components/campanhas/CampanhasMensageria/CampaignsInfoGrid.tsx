
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Campaign } from "@/types/campaign";

import SavedCampaignsList from "../SavedCampaignsList";
import RecentCampaignsInfo from "../RecentCampaignsInfo";
import PredefinedCampaignsSection from "./PredefinedCampaignsSection";

interface CampaignsInfoGridProps {
  campaigns: Campaign[] | undefined;
  isLoading: boolean;
  onCreateCampaign: () => void;
}

const CampaignsInfoGrid: React.FC<CampaignsInfoGridProps> = ({ 
  campaigns, 
  isLoading, 
  onCreateCampaign 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Saved Campaigns List */}
        <SavedCampaignsList />
      </div>
      
      {/* Middle Column */}
      <div className="space-y-6">
        {/* Recent Campaigns Card */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4">
            <h3 className="font-medium text-lg">Campanhas Recentes</h3>
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
                onClick={onCreateCampaign}
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
        <PredefinedCampaignsSection />
      </div>
    </div>
  );
};

export default CampaignsInfoGrid;
