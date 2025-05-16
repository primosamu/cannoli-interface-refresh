
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  MessageSquare,
  Repeat,
  ShoppingCart,
  Users,
  Plus
} from "lucide-react";

// Import all the components
import CampanhasMensageria from "@/components/campanhas/CampanhasMensageria";
import CampanhasTrafegoPago from "@/components/campanhas/CampanhasTrafegoPago";
import PredefinedCampaignSection from "@/components/campanhas/PredefinedCampaignSection";
import CampaignPriority from "@/components/campanhas/CampaignPriority";
import CampanhaForm from "@/components/campanhas/CampanhaForm";
import AudienceSegmentationInfo from "@/components/campanhas/AudienceSegmentationInfo";
import RecentCampaignsInfo from "@/components/campanhas/RecentCampaignsInfo";
import SavedCampaignsList from "@/components/campanhas/SavedCampaignsList";
import CampaignMetricsDialog from "@/components/campanhas/CampaignMetricsDialog";

// Import mock data
import { predefinedCampaigns, recurringCampaigns } from "@/components/campanhas/predefinedCampaignsData";
import { restaurantCampaigns } from "@/components/campanhas/restaurantCampaignsData";

const CampanhasPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("modelos");
  const [openForm, setOpenForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);
  const [selectedMetricsCampaign, setSelectedMetricsCampaign] = useState(null);

  const handleSelectCampaign = (id) => {
    const campaign = [
      ...predefinedCampaigns.oneTime, 
      ...predefinedCampaigns.contextual,
      ...recurringCampaigns.automated,
      ...recurringCampaigns.recurring,
      ...restaurantCampaigns.restaurant
    ].find(c => c.id === id);
    
    setSelectedCampaign(campaign);
    setOpenForm(true);
  };

  const handleShowMetrics = (campaign) => {
    setSelectedMetricsCampaign(campaign);
    setShowMetricsDialog(true);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Campanhas</h1>
        <p className="text-muted-foreground">Crie e gerencie suas campanhas de marketing</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="modelos">Modelos de Campanha</TabsTrigger>
          <TabsTrigger value="mensageria">Campanhas de Mensageria</TabsTrigger>
          <TabsTrigger value="trafego">Tráfego Pago</TabsTrigger>
        </TabsList>

        <TabsContent value="modelos" className="mt-6 space-y-8">
          {/* Quick campaign section */}
          <div className="grid gap-6 md:grid-cols-6">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Campanhas de Mensageria</CardTitle>
                <CardDescription>
                  Use estes modelos predefinidos para enviar comunicações aos seus clientes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* One-time campaign section */}
                <PredefinedCampaignSection 
                  title="Campanhas Simples" 
                  icon={<MessageSquare className="h-5 w-5 text-primary" />} 
                  campaigns={predefinedCampaigns.oneTime}
                  colorClass="bg-orange-50"
                  onSelectCampaign={handleSelectCampaign}
                  onShowMetrics={handleShowMetrics}
                />
                
                {/* Contextual campaign section */}
                <PredefinedCampaignSection 
                  title="Com Base em Comportamento" 
                  icon={<ShoppingCart className="h-5 w-5 text-primary" />} 
                  campaigns={predefinedCampaigns.contextual}
                  colorClass="bg-indigo-50"
                  onSelectCampaign={handleSelectCampaign}
                  onShowMetrics={handleShowMetrics}
                />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6 md:col-span-2">
              <RecentCampaignsInfo />
              <AudienceSegmentationInfo />
            </div>
          </div>

          {/* Restaurant-specific campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Campanhas para Restaurantes</CardTitle>
              <CardDescription>
                Modelos específicos para o seu tipo de negócio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PredefinedCampaignSection 
                title="Campanhas para Restaurantes e Delivery" 
                icon={<ShoppingCart className="h-5 w-5 text-primary" />} 
                campaigns={restaurantCampaigns.restaurant}
                colorClass="bg-amber-50"
                onSelectCampaign={handleSelectCampaign}
                onShowMetrics={handleShowMetrics}
              />
            </CardContent>
          </Card>

          {/* Recurring and automated campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Campanhas Recorrentes</CardTitle>
              <CardDescription>
                Configure campanhas automáticas e recorrentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Automated campaign section */}
              <PredefinedCampaignSection 
                title="Campanhas Automatizadas" 
                icon={<Repeat className="h-5 w-5 text-primary" />} 
                campaigns={recurringCampaigns.automated}
                colorClass="bg-emerald-50"
                onSelectCampaign={handleSelectCampaign}
                isRecurring={true}
                onShowMetrics={handleShowMetrics}
              />
              
              {/* Recurring campaign section */}
              <PredefinedCampaignSection 
                title="Campanhas Recorrentes" 
                icon={<Calendar className="h-5 w-5 text-primary" />} 
                campaigns={recurringCampaigns.recurring}
                colorClass="bg-violet-50"
                onSelectCampaign={handleSelectCampaign}
                isRecurring={true}
                onToggleCampaign={(id, isActive) => {
                  toast({
                    title: `Campanha ${isActive ? 'ativada' : 'desativada'}`,
                    description: `A campanha foi ${isActive ? 'ativada' : 'desativada'} com sucesso.`,
                  });
                }}
                onShowMetrics={handleShowMetrics}
              />
            </CardContent>
          </Card>

          {/* Campaign priorities */}
          <div className="grid gap-6 md:grid-cols-2">
            <CampaignPriority />
            <SavedCampaignsList />
          </div>
        </TabsContent>

        <TabsContent value="mensageria">
          <CampanhasMensageria />
        </TabsContent>

        <TabsContent value="trafego">
          <CampanhasTrafegoPago />
        </TabsContent>
      </Tabs>

      {/* Campaign Form Dialog */}
      <CampanhaForm 
        open={openForm} 
        onOpenChange={setOpenForm} 
        campaignToEdit={selectedCampaign}
      />
      
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
    </div>
  );
};

export default CampanhasPage;
