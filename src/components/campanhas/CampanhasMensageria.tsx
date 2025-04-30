
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Clock,
  Star,
  TrendingUp,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CampanhaForm from "./CampanhaForm";
import PredefinedCampaignSection from "./PredefinedCampaignSection";
import { predefinedCampaigns } from "./predefinedCampaignsData";
import AudienceSegmentationInfo from "./AudienceSegmentationInfo";
import RecentCampaignsInfo from "./RecentCampaignsInfo";
import SavedCampaignsList from "./SavedCampaignsList";
import MessageSendingReport from "./MessageSendingReport";

const CampanhasMensageria = () => {
  const { toast } = useToast();
  const [openCampaignForm, setOpenCampaignForm] = useState(false);
  const [selectedPredefinedCampaign, setSelectedPredefinedCampaign] = useState<string | undefined>(undefined);

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

      <AudienceSegmentationInfo />
      <RecentCampaignsInfo />
      <SavedCampaignsList />
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
