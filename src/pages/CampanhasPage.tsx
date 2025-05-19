
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import all the components
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import CampanhasTrafegoPago from "@/components/campanhas/CampanhasTrafegoPago";
import CampaignMetricsDialog from "@/components/campanhas/CampaignMetricsDialog";
import CampanhaForm from "@/components/campanhas/CampanhaForm";

const CampanhasPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("mensageria");
  const [openForm, setOpenForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);
  const [selectedMetricsCampaign, setSelectedMetricsCampaign] = useState(null);

  const handleOpenCustomCampaign = () => {
    setSelectedCampaign(null);
    setOpenCampaignForm(true);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Campanhas</h1>
        <p className="text-muted-foreground">Crie e gerencie suas campanhas de marketing</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="mensageria">Campanhas de Mensageria</TabsTrigger>
          <TabsTrigger value="trafego">Tráfego Pago</TabsTrigger>
        </TabsList>

        <TabsContent value="mensageria" className="mt-6 space-y-8">
          <CampanhasMensageria />
        </TabsContent>

        <TabsContent value="trafego">
          <CampanhasTrafegoPago />
        </TabsContent>
      </Tabs>

      {/* Campaign Metrics Dialog */}
      <CampaignMetricsDialog
        open={showMetricsDialog}
        onOpenChange={setShowMetricsDialog}
        campaign={selectedMetricsCampaign}
      />
      
      {/* Create Campaign button (floating) */}
      <Button 
        className="fixed right-6 bottom-6 shadow-lg z-10"
        size="lg"
        onClick={() => {
          setSelectedCampaign(null);
          setOpenForm(true);
        }}
      >
        <Plus className="mr-2 h-5 w-5" />
        Nova Campanha
      </Button>
      
      {/* Campaign Form Dialog */}
      <CampanhaForm 
        open={openForm} 
        onOpenChange={setOpenForm} 
        campaignToEdit={selectedCampaign}
      />
    </div>
  );
};

export default CampanhasPage;
