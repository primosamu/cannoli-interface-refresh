
import { useState } from "react";
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
  Bell,
  Calendar,
  Tag,
  Clock as ClockIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CampanhaForm from "./CampanhaForm";
import PredefinedCampaignSection from "./PredefinedCampaignSection";
import { predefinedCampaigns } from "./predefinedCampaignsData";
import AudienceSegmentationInfo from "./AudienceSegmentationInfo";
import RecentCampaignsInfo from "./RecentCampaignsInfo";
import SavedCampaignsList from "./SavedCampaignsList";
import MessageSendingReport from "./MessageSendingReport";
import QuickCampaignCard from "./QuickCampaignCard";

const CampanhasMensageria = () => {
  const { toast } = useToast();
  const [openCampaignForm, setOpenCampaignForm] = useState(false);
  const [selectedPredefinedCampaign, setSelectedPredefinedCampaign] = useState<string | undefined>(undefined);
  const [selectedChannel, setSelectedChannel] = useState<string | undefined>(undefined);
  const [campaignType, setCampaignType] = useState<string | undefined>(undefined);

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

  const handleQuickCampaign = (channel: string, type: string) => {
    setSelectedPredefinedCampaign(undefined);
    setSelectedChannel(channel);
    setCampaignType(type);
    setOpenCampaignForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Criação Rápida de Campanhas */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Enviar Mensagem Rapidamente</CardTitle>
          <CardDescription>
            Escolha o tipo de mensagem que deseja enviar para seus clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2 text-green-700">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </h3>
              <div className="grid gap-2">
                <QuickCampaignCard
                  title="Enviar Promoção"
                  description="Divulgue uma oferta ou desconto especial"
                  icon={<Tag className="h-4 w-4" />}
                  onClick={() => handleQuickCampaign("whatsapp", "promotion")}
                />
                <QuickCampaignCard
                  title="Comunicar Novidade"
                  description="Anuncie novos pratos ou mudanças no cardápio"
                  icon={<Bell className="h-4 w-4" />}
                  onClick={() => handleQuickCampaign("whatsapp", "news")}
                />
                <QuickCampaignCard
                  title="Lembrete de Pedido/Reserva"
                  description="Confirme reservas e pedidos agendados"
                  icon={<ClockIcon className="h-4 w-4" />}
                  onClick={() => handleQuickCampaign("whatsapp", "reminder")}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2 text-blue-700">
                <Mail className="h-4 w-4" />
                E-mail
              </h3>
              <div className="grid gap-2">
                <QuickCampaignCard
                  title="Newsletter Semanal"
                  description="Envie novidades e promoções da semana"
                  icon={<Calendar className="h-4 w-4" />}
                  onClick={() => handleQuickCampaign("email", "newsletter")}
                />
                <QuickCampaignCard
                  title="Divulgar Evento Especial"
                  description="Anuncie eventos, música ao vivo, festivais"
                  icon={<Star className="h-4 w-4" />}
                  onClick={() => handleQuickCampaign("email", "event")}
                />
                <QuickCampaignCard
                  title="Programa de Fidelidade"
                  description="Promova seu programa de pontos ou fidelidade"
                  icon={<Tag className="h-4 w-4" />}
                  onClick={() => handleQuickCampaign("email", "loyalty")}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2 text-purple-700">
                <Send className="h-4 w-4" />
                SMS
              </h3>
              <div className="grid gap-2">
                <QuickCampaignCard
                  title="Promoção Urgente"
                  description="Envie ofertas de curta duração para gerar vendas rápidas"
                  icon={<Tag className="h-4 w-4" />}
                  onClick={() => handleQuickCampaign("sms", "urgent")}
                />
                <QuickCampaignCard
                  title="Confirmação de Pedido"
                  description="Confirme pedidos e envie informações de entrega"
                  icon={<ClockIcon className="h-4 w-4" />}
                  onClick={() => handleQuickCampaign("sms", "confirmation")}
                />
                <Button 
                  variant="outline" 
                  className="w-full mt-2 border-dashed"
                  onClick={handleOpenCustomCampaign}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Campanha Personalizada
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campanhas Pré-definidas */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Campanhas Pré-definidas</CardTitle>
            <CardDescription>
              Modelos prontos para recuperação, fidelização e crescimento
            </CardDescription>
          </div>
          <Button onClick={handleOpenCustomCampaign}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha Personalizada
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campanhas de Recuperação */}
          <PredefinedCampaignSection
            title="Campanhas de Recuperação"
            icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
            campaigns={predefinedCampaigns.recuperacao}
            colorClass="bg-blue-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
          />

          {/* Campanhas de Fidelização */}
          <PredefinedCampaignSection
            title="Campanhas de Fidelização"
            icon={<Star className="h-5 w-5 text-green-500" />}
            campaigns={predefinedCampaigns.fidelizacao}
            colorClass="bg-green-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
          />

          {/* Campanhas por Padrões de Consumo */}
          <PredefinedCampaignSection
            title="Campanhas por Padrões de Consumo"
            icon={<Clock className="h-5 w-5 text-purple-500" />}
            campaigns={predefinedCampaigns.padroesConsumo}
            colorClass="bg-purple-50"
            onSelectCampaign={handleOpenPredefinedCampaign}
          />

          {/* Campanhas de Migração de Canal */}
          <PredefinedCampaignSection
            title="Campanhas de Migração de Canal"
            icon={<Send className="h-5 w-5 text-orange-500" />}
            campaigns={predefinedCampaigns.migracaoCanal}
            colorClass="bg-orange-50"
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
        selectedChannel={selectedChannel}
        campaignType={campaignType}
      />
    </div>
  );
};

export default CampanhasMensageria;
