
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Plus, 
  Users, 
  ArrowRight,
  Clock,
  Star,
  TrendingUp,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CampanhaForm from "./CampanhaForm";

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

  const predefinedCampaigns = {
    recuperacao: [
      { 
        id: "sentimos-sua-falta",
        title: "Sentimos sua falta", 
        description: "Recupera clientes que não pedem há X dias",
        badge: "Reativação"
      },
      { 
        id: "volte-para-nos",
        title: "Volte para nós", 
        description: "Enviada 7 dias após a campanha 'Sentimos sua falta'",
        badge: "Reativação"
      },
      { 
        id: "nos-de-outra-chance",
        title: "Nos dê outra chance", 
        description: "Enviada 15 dias após a campanha inicial",
        badge: "Reativação"
      },
      { 
        id: "ultima-chance",
        title: "Última chance", 
        description: "Enviada 30 dias após a campanha inicial",
        badge: "Reativação" 
      }
    ],
    fidelizacao: [
      { 
        id: "primeiro-pedido",
        title: "Obrigado pelo primeiro pedido", 
        description: "Para clientes que realizaram o primeiro pedido",
        badge: "Primeiros Passos"
      },
      { 
        id: "segundo-pedido",
        title: "Recompensa pelo segundo pedido", 
        description: "Para clientes que realizaram o segundo pedido",
        badge: "Engajamento"
      },
      { 
        id: "cliente-vip",
        title: "Cliente VIP", 
        description: "Para clientes que realizaram o terceiro pedido",
        badge: "Fidelidade"
      },
      { 
        id: "clube-clientes",
        title: "Clube de clientes frequentes", 
        description: "Para clientes que realizaram 5 ou mais pedidos",
        badge: "VIP"
      }
    ],
    padroesConsumo: [
      { 
        id: "experimente-jantar",
        title: "Experimente nosso jantar", 
        description: "Para clientes que só almoçam",
        badge: "Cross-selling"
      },
      { 
        id: "experimente-almoco",
        title: "Experimente nosso almoço", 
        description: "Para clientes que só jantam",
        badge: "Cross-selling"
      },
      { 
        id: "menu-fds",
        title: "Menu especial de final de semana", 
        description: "Para clientes que só frequentam em dias da semana",
        badge: "Cross-selling"
      },
      { 
        id: "promo-semana",
        title: "Promoções dos dias da semana", 
        description: "Para clientes que só frequentam nos finais de semana",
        badge: "Cross-selling"
      },
      { 
        id: "visite-restaurante",
        title: "Visite nosso restaurante", 
        description: "Para clientes que só pedem no delivery",
        badge: "Cross-selling"
      },
      { 
        id: "experimente-delivery",
        title: "Experimente nosso delivery", 
        description: "Para clientes que só vão à loja física",
        badge: "Cross-selling"
      }
    ],
    migracaoCanal: [
      { 
        id: "mude-app",
        title: "Mude para nosso app", 
        description: "Para clientes que só pedem por marketplaces como iFood",
        badge: "Migração"
      },
      { 
        id: "peca-whatsapp",
        title: "Peça pelo nosso WhatsApp", 
        description: "Para clientes de marketplaces",
        badge: "Migração"
      }
    ]
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
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-medium">Recuperação de Clientes</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {predefinedCampaigns.recuperacao.map((campaign) => (
                <Card key={campaign.id} className="bg-orange-50 border-orange-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{campaign.title}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-auto gap-1"
                      onClick={() => handleOpenPredefinedCampaign(campaign.id)}
                    >
                      Usar modelo <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Fidelização de Clientes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-medium">Fidelização de Clientes</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {predefinedCampaigns.fidelizacao.map((campaign) => (
                <Card key={campaign.id} className="bg-purple-50 border-purple-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{campaign.title}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-auto gap-1"
                      onClick={() => handleOpenPredefinedCampaign(campaign.id)}
                    >
                      Usar modelo <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Padrões de Consumo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">Padrões de Consumo</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {predefinedCampaigns.padroesConsumo.map((campaign) => (
                <Card key={campaign.id} className="bg-blue-50 border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{campaign.title}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-auto gap-1"
                      onClick={() => handleOpenPredefinedCampaign(campaign.id)}
                    >
                      Usar modelo <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Migração de Canal */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Send className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-medium">Migração de Canal</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {predefinedCampaigns.migracaoCanal.map((campaign) => (
                <Card key={campaign.id} className="bg-green-50 border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{campaign.title}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-auto gap-1"
                      onClick={() => handleOpenPredefinedCampaign(campaign.id)}
                    >
                      Usar modelo <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opções de canais */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              WhatsApp
            </CardTitle>
            <CardDescription>Envie mensagens diretas para o WhatsApp dos seus clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">98%</span> de taxa de abertura
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">45%</span> de taxa de conversão
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleCreateCampaign("WhatsApp")}>
              Criar Campanha
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              SMS
            </CardTitle>
            <CardDescription>Envie mensagens de texto para os celulares dos clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">92%</span> de taxa de abertura
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">12%</span> de taxa de conversão
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleCreateCampaign("SMS")}>
              Criar Campanha
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              Email
            </CardTitle>
            <CardDescription>Envie emails personalizados para seus clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">32%</span> de taxa de abertura
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">8%</span> de taxa de conversão
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleCreateCampaign("Email")}>
              Criar Campanha
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Segmentação de público
        </h4>
        <p className="text-sm text-muted-foreground">
          Segmente seus clientes por comportamento, região, valor de compra, frequência e muito mais para 
          criar campanhas direcionadas e relevantes.
        </p>
        <Button variant="link" className="p-0 h-auto mt-2">
          Saiba mais sobre segmentação
        </Button>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 border">
        <h4 className="font-medium">Campanhas recentes</h4>
        <p className="text-sm text-muted-foreground">Você ainda não possui campanhas de mensageria. Crie sua primeira campanha agora!</p>
      </div>

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
