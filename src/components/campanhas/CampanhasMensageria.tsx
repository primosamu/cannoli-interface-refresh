
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
  Layers,
  Trash2,
  MoveVertical
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CampanhaForm from "./CampanhaForm";
import PredefinedCampaignSection from "./PredefinedCampaignSection";
import { predefinedCampaigns } from "./predefinedCampaignsData";
import { restaurantCampaigns } from "./restaurantCampaignsData";
import AudienceSegmentationInfo from "./AudienceSegmentationInfo";
import RecentCampaignsInfo from "./RecentCampaignsInfo";
import SavedCampaignsList from "./SavedCampaignsList";
import MessageSendingReport from "./MessageSendingReport";
import CampaignPriority from "./CampaignPriority";
import { Campaign, CampaignExecutionType } from "@/types/campaign";
import { getRecentCampaigns } from "./CampanhaForm";
import { cn } from "@/lib/utils";
import CampaignMetricsDialog from "./CampaignMetricsDialog";

const CampanhasMensageria = () => {
  const { toast } = useToast();
  const [openCampaignForm, setOpenCampaignForm] = useState(false);
  const [selectedPredefinedCampaign, setSelectedPredefinedCampaign] = useState<string | undefined>(undefined);
  const [selectedChannel, setSelectedChannel] = useState<string | undefined>(undefined);
  const [campaignType, setCampaignType] = useState<string | undefined>(undefined);
  const [executionType, setExecutionType] = useState<CampaignExecutionType>("one-time");
  const [customCampaigns, setCustomCampaigns] = useState<Campaign[]>([]);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedCampaignId, setDraggedCampaignId] = useState<string | null>(null);
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);
  const [selectedMetricsCampaign, setSelectedMetricsCampaign] = useState(null);
  
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

  const handleDeleteCustomCampaign = (campaignId: string) => {
    const campaignToDelete = customCampaigns.find(campaign => campaign.id === campaignId);
    if (campaignToDelete) {
      const updatedCampaigns = customCampaigns.filter(campaign => campaign.id !== campaignId);
      // Update the global recent campaigns store
      window.dispatchEvent(
        new CustomEvent("recentCampaignsUpdated", { detail: updatedCampaigns })
      );
      // Update local state
      setCustomCampaigns(updatedCampaigns);
      // Show success message
      toast({
        title: "Campanha excluída",
        description: `A campanha "${campaignToDelete.name}" foi excluída com sucesso.`,
      });
    }
  };

  const handleShowMetrics = (campaign) => {
    setSelectedMetricsCampaign(campaign);
    setShowMetricsDialog(true);
  };
  
  const handleToggleReordering = () => {
    setIsReordering(!isReordering);
    if (isReordering) {
      toast({
        title: "Modo de reordenação desativado",
        description: "As campanhas foram salvas na nova ordem.",
      });
    } else {
      toast({
        title: "Modo de reordenação ativado",
        description: "Arraste as campanhas para reordená-las.",
      });
    }
  };

  const handleDragStart = (campaignId: string) => {
    if (!isReordering) return;
    setDraggedCampaignId(campaignId);
  };

  const handleDragOver = (e: React.DragEvent, campaignId: string) => {
    if (!isReordering) return;
    e.preventDefault();
  };

  const handleDrop = (targetCampaignId: string) => {
    if (!isReordering || !draggedCampaignId || draggedCampaignId === targetCampaignId) return;
    
    // Reorder campaigns
    const updatedCampaigns = [...customCampaigns];
    const draggedIndex = updatedCampaigns.findIndex(c => c.id === draggedCampaignId);
    const targetIndex = updatedCampaigns.findIndex(c => c.id === targetCampaignId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedCampaign] = updatedCampaigns.splice(draggedIndex, 1);
      updatedCampaigns.splice(targetIndex, 0, draggedCampaign);
      
      // Update the global recent campaigns store
      window.dispatchEvent(
        new CustomEvent("recentCampaignsUpdated", { detail: updatedCampaigns })
      );
      
      // Update local state
      setCustomCampaigns(updatedCampaigns);
    }
    
    setDraggedCampaignId(null);
  };
  
  const handleCreateNewSegmentation = () => {
    toast({
      title: "Criar nova segmentação",
      description: "Esta funcionalidade será implementada em breve.",
    });
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
    badge: campaign.executionType === 'recurring' ? 'Automação' : 'Campanha',
    isDeletable: true,
    isReorderable: true,
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
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCreateNewSegmentation} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nova Segmentação
            </Button>
            <Button onClick={() => handleOpenCustomCampaign()}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Campanha
            </Button>
          </div>
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
            onShowMetrics={handleShowMetrics}
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
            onShowMetrics={handleShowMetrics}
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
            onShowMetrics={handleShowMetrics}
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
            onShowMetrics={handleShowMetrics}
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
            onShowMetrics={handleShowMetrics}
          />
          
          {/* Campanhas Personalizadas */}
          {formattedCustomCampaigns.length > 0 && (
            <div className="rounded-lg border bg-indigo-50 p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-500" />
                  <h3 className="text-lg font-medium">Campanhas Personalizadas</h3>
                </div>
                {formattedCustomCampaigns.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleToggleReordering}
                    className={cn(
                      "flex items-center gap-1", 
                      isReordering ? "bg-indigo-100 text-indigo-700" : ""
                    )}
                  >
                    <MoveVertical className="h-4 w-4" />
                    {isReordering ? "Salvar Ordem" : "Reordenar"}
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {formattedCustomCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    draggable={isReordering}
                    onDragStart={() => handleDragStart(campaign.id)}
                    onDragOver={(e) => handleDragOver(e, campaign.id)}
                    onDrop={() => handleDrop(campaign.id)}
                    className={cn(
                      "relative bg-white p-3 rounded-md border",
                      isReordering ? "cursor-move hover:border-indigo-500" : "",
                      draggedCampaignId === campaign.id ? "border-dashed border-indigo-500 opacity-50" : ""
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{campaign.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{campaign.description}</p>
                      </div>
                      <div className="flex">
                        <div className="flex items-center">
                          <label htmlFor={`toggle-${campaign.id}`} className="sr-only">
                            Toggle campaign
                          </label>
                          <input
                            id={`toggle-${campaign.id}`}
                            type="checkbox"
                            checked={campaign.isActive}
                            onChange={(e) => handleToggleCampaign(campaign.id, e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCustomCampaign(campaign.id)}
                          className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${campaign.isRecurring ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {campaign.badge}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenPredefinedCampaign(campaign.id)}
                        className="text-xs"
                      >
                        Configurar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
      
      {/* Campaign Metrics Dialog */}
      <CampaignMetricsDialog
        open={showMetricsDialog}
        onOpenChange={setShowMetricsDialog}
        campaign={selectedMetricsCampaign}
      />
    </div>
  );
};

export default CampanhasMensageria;
