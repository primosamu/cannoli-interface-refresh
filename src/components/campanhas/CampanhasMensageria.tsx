
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
  Clock as ClockIcon,
  Power
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CampanhaForm from "./CampanhaForm";
import PredefinedCampaignSection from "./PredefinedCampaignSection";
import { predefinedCampaigns, restaurantCampaigns } from "./predefinedCampaignsData";
import AudienceSegmentationInfo from "./AudienceSegmentationInfo";
import RecentCampaignsInfo from "./RecentCampaignsInfo";
import SavedCampaignsList from "./SavedCampaignsList";
import MessageSendingReport from "./MessageSendingReport";
import QuickCampaignCard from "./QuickCampaignCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignExecutionType } from "@/types/campaign";

const CampanhasMensageria = () => {
  const { toast } = useToast();
  const [openCampaignForm, setOpenCampaignForm] = useState(false);
  const [selectedPredefinedCampaign, setSelectedPredefinedCampaign] = useState<string | undefined>(undefined);
  const [selectedChannel, setSelectedChannel] = useState<string | undefined>(undefined);
  const [campaignType, setCampaignType] = useState<string | undefined>(undefined);
  const [executionType, setExecutionType] = useState<CampaignExecutionType>("one-time");
  const [activeTab, setActiveTab] = useState("manual");
  
  // Deep clone predefined campaign data to allow modifying isActive status
  const [recurringCampaigns, setRecurringCampaigns] = useState({
    recuperacao: [...JSON.parse(JSON.stringify(predefinedCampaigns.recuperacao))],
    fidelizacao: [...JSON.parse(JSON.stringify(predefinedCampaigns.fidelizacao))],
    padroesConsumo: [...JSON.parse(JSON.stringify(predefinedCampaigns.padroesConsumo))],
    migracaoCanal: [...JSON.parse(JSON.stringify(predefinedCampaigns.migracaoCanal))],
    promocoesSemanais: [...JSON.parse(JSON.stringify(restaurantCampaigns.promocoesSemanais))]
  });

  const handleOpenPredefinedCampaign = (templateId: string) => {
    setSelectedPredefinedCampaign(templateId);
    setSelectedChannel(undefined);
    setCampaignType(undefined);
    
    // Different execution type based on tab
    setExecutionType(activeTab === "automations" ? "recurring" : "one-time");
    
    setOpenCampaignForm(true);
  };

  const handleOpenCustomCampaign = (execType: CampaignExecutionType = "one-time") => {
    setSelectedPredefinedCampaign(undefined);
    setSelectedChannel(undefined);
    setCampaignType(undefined);
    setExecutionType(execType);
    setOpenCampaignForm(true);
  };

  const handleQuickCampaign = (channel: string, type: string, execType: CampaignExecutionType = "one-time") => {
    setSelectedPredefinedCampaign(undefined);
    setSelectedChannel(channel);
    setCampaignType(type);
    setExecutionType(execType);
    setOpenCampaignForm(true);
  };

  const handleToggleCampaign = (id: string, isActive: boolean) => {
    // Find and update the campaign in all campaign groups
    const newRecurringCampaigns = { ...recurringCampaigns };
    
    Object.keys(newRecurringCampaigns).forEach((groupKey) => {
      const group = newRecurringCampaigns[groupKey as keyof typeof newRecurringCampaigns];
      const index = group.findIndex(campaign => campaign.id === id);
      
      if (index !== -1) {
        group[index] = {
          ...group[index],
          isActive
        };
        
        // Show toast message
        toast({
          title: isActive 
            ? "Campanha recorrente ativada" 
            : "Campanha recorrente desativada",
          description: isActive 
            ? `A campanha "${group[index].title}" foi ativada e será executada automaticamente.` 
            : `A campanha "${group[index].title}" foi desativada.`,
        });
      }
    });
    
    setRecurringCampaigns(newRecurringCampaigns);
  };

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="manual" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-6"
      >
        <TabsList className="w-full max-w-md grid grid-cols-2 mx-auto">
          <TabsTrigger value="manual">Campanhas Manuais</TabsTrigger>
          <TabsTrigger value="automations">Campanhas Recorrentes</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
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
                      onClick={() => handleOpenCustomCampaign("one-time")}
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
                <CardTitle className="text-xl">Modelos de Campanha</CardTitle>
                <CardDescription>
                  Modelos prontos para recuperação, fidelização e crescimento
                </CardDescription>
              </div>
              <Button onClick={() => handleOpenCustomCampaign("one-time")}>
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
                isRecurring={false}
              />

              {/* Campanhas de Fidelização */}
              <PredefinedCampaignSection
                title="Campanhas de Fidelização"
                icon={<Star className="h-5 w-5 text-green-500" />}
                campaigns={predefinedCampaigns.fidelizacao}
                colorClass="bg-green-50"
                onSelectCampaign={handleOpenPredefinedCampaign}
                isRecurring={false}
              />

              {/* Campanhas por Padrões de Consumo */}
              <PredefinedCampaignSection
                title="Campanhas por Padrões de Consumo"
                icon={<Clock className="h-5 w-5 text-purple-500" />}
                campaigns={predefinedCampaigns.padroesConsumo}
                colorClass="bg-purple-50"
                onSelectCampaign={handleOpenPredefinedCampaign}
                isRecurring={false}
              />

              {/* Campanhas de Migração de Canal */}
              <PredefinedCampaignSection
                title="Campanhas de Migração de Canal"
                icon={<Send className="h-5 w-5 text-orange-500" />}
                campaigns={predefinedCampaigns.migracaoCanal}
                colorClass="bg-orange-50"
                onSelectCampaign={handleOpenPredefinedCampaign}
                isRecurring={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automations" className="space-y-6">
          {/* Campanhas Recorrentes */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Automações de Marketing</CardTitle>
                <CardDescription>
                  Configure campanhas que serão disparadas automaticamente com base em gatilhos
                </CardDescription>
              </div>
              <Button onClick={() => handleOpenCustomCampaign("recurring")}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Automação
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Campanhas de Recuperação */}
              <PredefinedCampaignSection
                title="Clientes Inativos"
                icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
                campaigns={recurringCampaigns.recuperacao}
                colorClass="bg-blue-50"
                onSelectCampaign={handleOpenPredefinedCampaign}
                onToggleCampaign={handleToggleCampaign}
                isRecurring={true}
              />

              {/* Campanhas de Fidelização */}
              <PredefinedCampaignSection
                title="Fidelização de Clientes"
                icon={<Star className="h-5 w-5 text-green-500" />}
                campaigns={recurringCampaigns.fidelizacao}
                colorClass="bg-green-50"
                onSelectCampaign={handleOpenPredefinedCampaign}
                onToggleCampaign={handleToggleCampaign}
                isRecurring={true}
              />

              {/* Promoções Semanais */}
              <PredefinedCampaignSection
                title="Promoções Semanais"
                icon={<Calendar className="h-5 w-5 text-purple-500" />}
                campaigns={recurringCampaigns.promocoesSemanais}
                colorClass="bg-purple-50"
                onSelectCampaign={handleOpenPredefinedCampaign}
                onToggleCampaign={handleToggleCampaign}
                isRecurring={true}
              />
            </CardContent>
          </Card>

          {/* Estatísticas de Automações */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl">Desempenho das Automações</CardTitle>
              <CardDescription>
                Acompanhe os resultados das suas campanhas automáticas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Campanhas Ativas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{
                      Object.values(recurringCampaigns).flat().filter(c => c.isActive).length
                    }</div>
                    <div className="text-sm text-muted-foreground">de {Object.values(recurringCampaigns).flat().length} automações criadas</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Mensagens Enviadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,254</div>
                    <div className="text-sm text-muted-foreground">nos últimos 30 dias</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Taxa de Conversão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12.8%</div>
                    <div className="text-sm text-muted-foreground">média das automações</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
        executionType={executionType}
      />
    </div>
  );
};

export default CampanhasMensageria;
