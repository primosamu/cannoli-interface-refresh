
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Plus, 
  Clock,
  Star,
  TrendingUp,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CampanhaForm from "./CampanhaForm";
import PredefinedCampaignSection from "./PredefinedCampaignSection";
import CommunicationChannelCard from "./CommunicationChannelCard";
import { predefinedCampaigns } from "./predefinedCampaignsData";
import AudienceSegmentationInfo from "./AudienceSegmentationInfo";
import RecentCampaignsInfo from "./RecentCampaignsInfo";
import MessageSendingReport from "./MessageSendingReport";

const CampanhasMensageria = () => {
  const { toast } = useToast();
  const [openCampaignForm, setOpenCampaignForm] = useState(false);
  const [selectedPredefinedCampaign, setSelectedPredefinedCampaign] = useState<string | undefined>(undefined);
  
  const handleCreateCampaign = (type: string) => {
    toast({
      title: "Criar campanha",
      description: `Iniciando criação de campanha de ${type}`,
    });
  };

  const handleOpenPredefinedCampaign = (templateId: string) => {
    setSelectedPredefinedCampaign(templateId);
    setOpenCampaignForm(true);
  };

  const handleOpenCustomCampaign = () => {
    setSelectedPredefinedCampaign(undefined);
    setOpenCampaignForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Campanhas Predefinidas */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Campanhas Predefinidas</CardTitle>
            <CardDescription>
              Campanhas prontas para você começar a enviar mensagens rapidamente
            </CardDescription>
          </div>
          <Button onClick={handleOpenCustomCampaign}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha Personalizada
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recuperação de Clientes */}
          <PredefinedCampaignSection
            title="Recuperação de Clientes"
            icon={<Clock className="h-5 w-5 text-orange-500" />}
            campaigns={predefinedCampaigns.recuperacao}
            colorClass="bg-orange-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
          />

          {/* Fidelização de Clientes */}
          <PredefinedCampaignSection
            title="Fidelização de Clientes"
            icon={<Star className="h-5 w-5 text-purple-500" />}
            campaigns={predefinedCampaigns.fidelizacao}
            colorClass="bg-purple-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
          />

          {/* Padrões de Consumo */}
          <PredefinedCampaignSection
            title="Padrões de Consumo"
            icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
            campaigns={predefinedCampaigns.padroesConsumo}
            colorClass="bg-blue-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
          />

          {/* Migração de Canal */}
          <PredefinedCampaignSection
            title="Migração de Canal"
            icon={<Send className="h-5 w-5 text-green-500" />}
            campaigns={predefinedCampaigns.migracaoCanal}
            colorClass="bg-green-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
          />
        </CardContent>
      </Card>

      {/* Opções de canais */}
      <div className="grid gap-6 md:grid-cols-3">
        <CommunicationChannelCard
          title="WhatsApp"
          description="Envie mensagens diretas para o WhatsApp dos seus clientes"
          icon={<div className="bg-green-100 p-2 rounded-full">
            <MessageSquare className="h-5 w-5 text-green-600" />
          </div>}
          openRate={98}
          conversionRate={45}
          onCreateCampaign={handleCreateCampaign}
        />

        <CommunicationChannelCard
          title="SMS"
          description="Envie mensagens de texto para os celulares dos clientes"
          icon={<div className="bg-blue-100 p-2 rounded-full">
            <Phone className="h-5 w-5 text-blue-600" />
          </div>}
          openRate={92}
          conversionRate={12}
          onCreateCampaign={handleCreateCampaign}
        />

        <CommunicationChannelCard
          title="Email"
          description="Envie emails personalizados para seus clientes"
          icon={<div className="bg-purple-100 p-2 rounded-full">
            <Mail className="h-5 w-5 text-purple-600" />
          </div>}
          openRate={32}
          conversionRate={8}
          onCreateCampaign={handleCreateCampaign}
        />
      </div>

      <AudienceSegmentationInfo />
      <RecentCampaignsInfo />
      <MessageSendingReport />

      {/* Campaign Form */}
      <CampanhaForm 
        open={openCampaignForm} 
        onOpenChange={setOpenCampaignForm}
        predefinedCampaignId={selectedPredefinedCampaign}
      />
    </div>
  );
};

export default CampanhasMensageria;
