
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Bell, Tag, Zap } from "lucide-react";
import { Campaign } from "@/types/campaign";
import CampanhaForm, { getRecentCampaigns } from "./CampanhaForm";
import CampanhaPreview from "./CampanhaPreview";
import RecentCampaignsInfo from "./RecentCampaignsInfo";
import PredefinedCampaignSection from "./PredefinedCampaignSection";
import { quickCampaignsData, recurringCampaignsData } from "./predefinedCampaignsData";

const CampanhasMensageria = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignToEdit, setCampaignToEdit] = useState<Campaign | undefined>(undefined);
  const [predefCampaignId, setPredefCampaignId] = useState<string | null>(null);
  const [recentCampaigns, setRecentCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Subscribe to the event
    const handleRecentCampaignsUpdated = (event: CustomEvent) => {
      setRecentCampaigns(event.detail);
    };

    window.addEventListener("recentCampaignsUpdated", handleRecentCampaignsUpdated);

    // Get initial recent campaigns
    setRecentCampaigns(getRecentCampaigns());

    // Cleanup subscription on unmount
    return () => {
      window.removeEventListener("recentCampaignsUpdated", handleRecentCampaignsUpdated);
    };
  }, []);

  // Handle opening campaign preview
  const handleOpenPreview = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setPreviewOpen(true);
  };

  // Handle opening campaign for editing
  const handleOpenEdit = (campaign: Campaign) => {
    setCampaignToEdit(campaign);
    setFormOpen(true);
  };

  // Handle opening predefined campaign
  const handleOpenPredefinedCampaign = (id: string) => {
    setPredefCampaignId(id);
    setFormOpen(true);
  };

  // Handle toggling recurring campaign active state
  const handleToggleRecurringCampaign = (id: string, isActive: boolean) => {
    console.log(`Campanha ${id} ${isActive ? 'ativada' : 'desativada'}`);
    // Aqui você implementaria a lógica para atualizar o estado da campanha
    // no backend ou estado global da aplicação
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Campanhas de Mensageria</h2>
        <Button onClick={() => setFormOpen(true)}>Nova Campanha</Button>
      </div>

      <Tabs defaultValue="recentes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="recentes">Campanhas Recentes</TabsTrigger>
          <TabsTrigger value="predefinidas">Modelos Predefinidos</TabsTrigger>
          <TabsTrigger value="automacoes">Automações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recentes">
          <RecentCampaignsInfo />
        </TabsContent>
        
        <TabsContent value="predefinidas">
          <div className="space-y-8">
            <PredefinedCampaignSection 
              title="Recuperação de Clientes" 
              icon={<ArrowUpRight className="h-5 w-5 text-blue-500" />}
              campaigns={quickCampaignsData.slice(0, 2)}
              colorClass="bg-blue-50"
              onSelectCampaign={handleOpenPredefinedCampaign}
            />
            
            <PredefinedCampaignSection 
              title="Anúncio de Novidades" 
              icon={<Bell className="h-5 w-5 text-green-500" />}
              campaigns={quickCampaignsData.slice(2)}
              colorClass="bg-green-50"
              onSelectCampaign={handleOpenPredefinedCampaign}
            />
            
            <PredefinedCampaignSection 
              title="Promoções e Descontos" 
              icon={<Tag className="h-5 w-5 text-amber-500" />}
              campaigns={quickCampaignsData}
              colorClass="bg-amber-50"
              onSelectCampaign={handleOpenPredefinedCampaign}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="automacoes">
          <div className="space-y-8">
            <PredefinedCampaignSection 
              title="Automações de Marketing" 
              icon={<Zap className="h-5 w-5 text-purple-500" />}
              campaigns={recurringCampaignsData}
              colorClass="bg-purple-50"
              onSelectCampaign={handleOpenPredefinedCampaign}
              onToggleCampaign={handleToggleRecurringCampaign}
              isRecurring={true}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Campaign Form Dialog */}
      <CampanhaForm 
        open={formOpen} 
        onOpenChange={setFormOpen}
        predefinedCampaignId={predefCampaignId}
        campaignToEdit={campaignToEdit}
      />

      {/* Campaign Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Prévia da Campanha</DialogTitle>
            <DialogDescription>
              Visualize como seu cliente receberá esta mensagem
            </DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <CampanhaPreview 
              campaign={selectedCampaign}
              channel="whatsapp" // Default value, will be overridden by campaign if provided
              content="" // Default value, will be overridden by campaign if provided
              incentiveType="none" // Default value, will be overridden by campaign if provided
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampanhasMensageria;
