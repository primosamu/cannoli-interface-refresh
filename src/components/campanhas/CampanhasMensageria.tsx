
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Clock,
  Star,
  TrendingUp,
  Send,
  MessageSquare,
  Mail,
  Calendar,
  FileText,
  Layers
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CampanhaForm from "./CampanhaForm";
import PredefinedCampaignSection from "./PredefinedCampaignSection";
import { predefinedCampaigns, restaurantCampaigns } from "./predefinedCampaignsData";
import AudienceSegmentationInfo from "./AudienceSegmentationInfo";
import RecentCampaignsInfo from "./RecentCampaignsInfo";
import SavedCampaignsList from "./SavedCampaignsList";
import MessageSendingReport from "./MessageSendingReport";
import CampaignPriority from "./CampaignPriority";
import { Campaign, CampaignExecutionType } from "@/types/campaign";
import { getRecentCampaigns } from "./CampanhaForm";

const CampanhasMensageria = () => {
  const { toast } = useToast();
  const [openCampaignForm, setOpenCampaignForm] = useState(false);
  const [selectedPredefinedCampaign, setSelectedPredefinedCampaign] = useState<string | undefined>(undefined);
  const [selectedChannel, setSelectedChannel] = useState<string | undefined>(undefined);
  const [campaignType, setCampaignType] = useState<string | undefined>(undefined);
  const [executionType, setExecutionType] = useState<CampaignExecutionType>("one-time");
  const [customCampaigns, setCustomCampaigns] = useState<Campaign[]>([]);
  
  // Deep clone predefined campaign data to allow modifying isActive status
  const [campaigns, setCampaigns] = useState({
    recuperacao: [...JSON.parse(JSON.stringify(predefinedCampaigns.recuperacao))],
    fidelizacao: [...JSON.parse(JSON.stringify(predefinedCampaigns.fidelizacao))],
    padroesConsumo: [...JSON.parse(JSON.stringify(predefinedCampaigns.padroesConsumo))],
    migracaoCanal: [...JSON.parse(JSON.stringify(predefinedCampaigns.migracaoCanal))],
    promocoesSemanais: [...JSON.parse(JSON.stringify(restaurantCampaigns.promocoesSemanais))]
  });

  // Listen for updates to recent campaigns
  useEffect(() => {
    const handleRecentCampaignsUpdated = () => {
      setCustomCampaigns(getRecentCampaigns());
    };

    // Initial load
    setCustomCampaigns(getRecentCampaigns());
    
    // Listen for updates
    window.addEventListener("recentCampaignsUpdated", handleRecentCampaignsUpdated);
    
    return () => {
      window.removeEventListener("recentCampaignsUpdated", handleRecentCampaignsUpdated);
    };
  }, []);

  const handleOpenPredefinedCampaign = (templateId: string) => {
    setSelectedPredefinedCampaign(templateId);
    setSelectedChannel(undefined);
    setCampaignType(undefined);
    setOpenCampaignForm(true);
  };

  const handleOpenCustomCampaign = () => {
    setSelectedPredefinedCampaign(undefined);
    setSelectedChannel(undefined);
    setCampaignType(undefined);
    setOpenCampaignForm(true);
  };

  const handleEditCustomCampaign = (campaign: Campaign) => {
    // In a real implementation, we would set the campaign to edit
    toast({
      title: "Editar campanha",
      description: `Editando a campanha "${campaign.name}"`,
    });
  };

  const handleToggleCampaign = (id: string, isActive: boolean) => {
    // Find and update the campaign in all campaign groups
    const newCampaigns = { ...campaigns };
    
    Object.keys(newCampaigns).forEach((groupKey) => {
      const group = newCampaigns[groupKey as keyof typeof newCampaigns];
      const index = group.findIndex(campaign => campaign.id === id);
      
      if (index !== -1) {
        group[index] = {
          ...group[index],
          isActive
        };
        
        // Show toast message
        toast({
          title: isActive 
            ? "Campanha ativada" 
            : "Campanha desativada",
          description: isActive 
            ? `A campanha "${group[index].title}" foi ativada e será executada automaticamente.` 
            : `A campanha "${group[index].title}" foi desativada.`,
        });
      }
    });
    
    setCampaigns(newCampaigns);
  };

  // Format campaigns for the custom campaigns section
  const formattedCustomCampaigns = customCampaigns.map(campaign => ({
    id: campaign.id,
    title: campaign.name,
    description: campaign.content.substring(0, 60) + (campaign.content.length > 60 ? '...' : ''),
    isActive: campaign.isActive || false,
    isRecurring: campaign.executionType === 'recurring',
    badge: campaign.executionType === 'recurring' ? 'Automação' : 'Campanha'  // Added the missing badge property
  }));

  return (
    <div className="space-y-6">
      {/* Campanhas Pré-definidas */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Campanhas e Automações</CardTitle>
            <CardDescription>
              Configure campanhas únicas ou automações recorrentes para diversos cenários
            </CardDescription>
          </div>
          <Button onClick={() => handleOpenCustomCampaign()}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campanhas de Recuperação */}
          <PredefinedCampaignSection
            title="Campanhas de Recuperação"
            icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
            campaigns={campaigns.recuperacao}
            colorClass="bg-blue-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
            onToggleCampaign={handleToggleCampaign}
            isRecurring={true}
          />

          {/* Campanhas de Fidelização */}
          <PredefinedCampaignSection
            title="Campanhas de Fidelização"
            icon={<Star className="h-5 w-5 text-green-500" />}
            campaigns={campaigns.fidelizacao}
            colorClass="bg-green-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
            onToggleCampaign={handleToggleCampaign}
            isRecurring={true}
          />

          {/* Campanhas por Padrões de Consumo */}
          <PredefinedCampaignSection
            title="Campanhas por Padrões de Consumo"
            icon={<Clock className="h-5 w-5 text-purple-500" />}
            campaigns={campaigns.padroesConsumo}
            colorClass="bg-purple-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
            onToggleCampaign={handleToggleCampaign}
            isRecurring={true}
          />

          {/* Campanhas de Migração de Canal */}
          <PredefinedCampaignSection
            title="Campanhas de Migração de Canal"
            icon={<Send className="h-5 w-5 text-orange-500" />}
            campaigns={campaigns.migracaoCanal}
            colorClass="bg-orange-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
            onToggleCampaign={handleToggleCampaign}
            isRecurring={true}
          />
          
          {/* Promoções Semanais */}
          <PredefinedCampaignSection
            title="Promoções Semanais"
            icon={<Calendar className="h-5 w-5 text-purple-500" />}
            campaigns={campaigns.promocoesSemanais}
            colorClass="bg-purple-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
            onToggleCampaign={handleToggleCampaign}
            isRecurring={true}
          />
          
          {/* Campanhas Personalizadas - MOVED TO BOTTOM */}
          {formattedCustomCampaigns.length > 0 && (
            <PredefinedCampaignSection
              title="Campanhas Personalizadas"
              icon={<FileText className="h-5 w-5 text-indigo-500" />}
              campaigns={formattedCustomCampaigns}
              colorClass="bg-indigo-50"
              onSelectCampaign={handleOpenPredefinedCampaign}
              onToggleCampaign={handleToggleCampaign}
              isRecurring={true}
            />
          )}
        </CardContent>
      </Card>

      {/* Priorização de Campanhas */}
      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg">Organização e Priorização de Campanhas</CardTitle>
          </div>
          <CardDescription>
            Defina a hierarquia de campanhas e quantas campanhas um cliente pode receber
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CampaignPriority />
        </CardContent>
      </Card>

      <AudienceSegmentationInfo />
      <RecentCampaignsInfo />
      <SavedCampaignsList />
      <MessageSendingReport />

      {/* Campaign Form */}
      <CampanhaForm 
        open={openCampaignForm} 
        onOpenChange={setOpenCampaignForm}
        predefinedCampaignId={selectedPredefinedCampaign}
        selectedChannel={selectedChannel}
        campaignType={campaignType}
      />
    </div>
  );
};

export default CampanhasMensageria;
