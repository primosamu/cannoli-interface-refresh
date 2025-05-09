import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Store, 
  Search, 
  PlusCircle, 
  Clock,
  MapPin, 
  Calendar,
  Check,
  CheckCircle, 
  Percent,
  BarChart,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { CampaignWizard } from "./trafego-pago/CampaignWizard";
import { PlatformCard } from "./trafego-pago/PlatformCard";
import { GoogleMyBusinessCard } from "./trafego-pago/GoogleMyBusinessCard";
import { CampaignTemplateCard } from "./trafego-pago/CampaignTemplateCard";
import { CampaignReportCard } from "./trafego-pago/CampaignReportCard";
import { ActiveCampaignCard } from "./trafego-pago/ActiveCampaignCard";
import { CampaignTemplate, AdPlatform } from "@/types/campaign";

const CampanhasTrafegoPago = () => {
  const { toast } = useToast();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState("7d");
  const [selectedPlatform, setSelectedPlatform] = useState<AdPlatform | undefined>(undefined);

  // Campaign templates for food service
  const campaignTemplates: CampaignTemplate[] = [
    {
      id: "1",
      name: "Atrair mais clientes para o restaurante",
      type: "local_visitors",
      description: "Aumente o número de visitas ao seu estabelecimento",
      platforms: ["google", "meta"],
      imageUrl: "/campaign-templates/local-visitors.jpg",
      adTemplates: [
        {
          headline: "Experimente {prato} no {nome_restaurante}",
          description: "Venha provar nossa deliciosa culinária. Aberto todos os dias das {horario_funcionamento}",
          callToAction: "Ver cardápio"
        }
      ]
    },
    {
      id: "2",
      name: "Aumentar pedidos de delivery",
      type: "delivery_orders",
      description: "Impulsione seus pedidos online",
      platforms: ["meta", "google"],
      imageUrl: "/campaign-templates/delivery.jpg",
      adTemplates: [
        {
          headline: "{nome_restaurante} - Peça agora e receba em até 40 min",
          description: "Nosso {prato} está com 10% de desconto para pedidos online",
          callToAction: "Pedir agora"
        }
      ]
    },
    {
      id: "3",
      name: "Promover novo prato",
      type: "new_dish",
      description: "Destaque novidades do seu cardápio",
      platforms: ["tiktok", "meta"],
      imageUrl: "/campaign-templates/new-dish.jpg",
      adTemplates: [
        {
          headline: "NOVO: {nome_do_prato} no {nome_restaurante}",
          description: "Seja um dos primeiros a experimentar nossa nova criação!",
          callToAction: "Saiba mais"
        }
      ]
    },
    {
      id: "4",
      name: "Divulgar promoção ou evento especial",
      type: "special_event",
      description: "Promova eventos e ofertas por tempo limitado",
      platforms: ["meta", "tiktok", "google"],
      imageUrl: "/campaign-templates/special-event.jpg",
      adTemplates: [
        {
          headline: "{porcentagem_desconto}% OFF em todo o cardápio",
          description: "Promoção válida apenas {periodo_promocao}. Reserve já!",
          callToAction: "Reservar mesa"
        }
      ]
    }
  ];

  // Mock active campaigns
  const activeCampaigns = [
    {
      id: "c1",
      name: "Promoção de Almoço",
      type: "special_event",
      platforms: ["google", "meta"],
      budget: 30,
      spentBudget: 12.50,
      startDate: "2025-04-25",
      endDate: "2025-05-05",
      metrics: {
        impressions: 2450,
        clicks: 125,
        conversions: 18
      },
      status: "active"
    },
    {
      id: "c2",
      name: "Divulgação de Delivery",
      type: "delivery_orders",
      platforms: ["meta"],
      budget: 50,
      spentBudget: 22.75,
      startDate: "2025-04-20",
      metrics: {
        impressions: 5200,
        clicks: 310,
        conversions: 42
      },
      status: "active"
    }
  ];

  const openCampaignWizard = (platform?: AdPlatform) => {
    setSelectedPlatform(platform);
    setIsWizardOpen(true);
  };

  const handleTemplateSelect = (template) => {
    setSelectedPlatform(undefined);
    setIsWizardOpen(true);
    toast({
      title: "Template selecionado",
      description: `Você selecionou o template: ${template.name}`,
    });
  };

  const handlePlatformCreateCampaign = (platform: AdPlatform | string) => {
    // Convert to AdPlatform type if needed
    const adPlatform = platform as AdPlatform;
    setSelectedPlatform(adPlatform);
    setIsWizardOpen(true);
    
    toast({
      title: "Criando campanha",
      description: `Você está criando uma campanha para ${adPlatform === 'meta' ? 'Meta Ads' : adPlatform === 'google' ? 'Google Ads' : 'TikTok Ads'}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with CTA */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium">Tráfego Pago para Restaurantes</h3>
          <p className="text-muted-foreground">
            Crie campanhas para atrair mais clientes e aumentar seus pedidos
          </p>
        </div>
        <Button onClick={() => openCampaignWizard()} size="lg" className="bg-purple-600 hover:bg-purple-700">
          <PlusCircle className="mr-2 h-5 w-5" />
          Nova Campanha
        </Button>
      </div>

      {/* Campaign Templates Section */}
      <div>
        <h4 className="text-lg font-medium mb-4">Modelos de Campanha Recomendados</h4>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {campaignTemplates.map((template) => (
            <CampaignTemplateCard 
              key={template.id}
              template={template}
              onSelect={() => handleTemplateSelect(template)}
            />
          ))}
        </div>
      </div>

      {/* Active Campaigns */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              Campanhas Ativas
            </CardTitle>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardDescription>
            Gerencie suas campanhas em andamento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeCampaigns.length > 0 ? (
            <div className="space-y-4">
              {activeCampaigns.map((campaign) => (
                <ActiveCampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-lg p-4 border text-center">
              <p className="text-sm text-muted-foreground mb-2">Você ainda não possui campanhas de tráfego pago ativas</p>
              <Button variant="outline" onClick={() => openCampaignWizard()} size="sm">
                Criar minha primeira campanha
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advertising Platforms */}
      <div className="grid gap-6 md:grid-cols-3">
        <PlatformCard
          title="Meta Ads"
          description="Anuncie no Facebook e Instagram"
          icon="meta"
          stats={[
            { label: "Alcance estimado", value: "5-10 mil" },
            { label: "Custo por clique médio", value: "R$ 0,45" }
          ]}
          benefits={["Alto alcance local", "Imagens e vídeos dos pratos", "Foco em delivery"]}
          onCreateCampaign={handlePlatformCreateCampaign}
        />

        <PlatformCard
          title="Google Ads"
          description="Anuncie na Busca Google e Maps"
          icon="google"
          stats={[
            { label: "Alcance estimado", value: "2-8 mil" },
            { label: "Custo por clique médio", value: "R$ 0,85" }
          ]}
          benefits={["Pessoas procurando restaurantes", "Anúncios na área local", "Integração com Google Meu Negócio"]}
          onCreateCampaign={handlePlatformCreateCampaign}
        />

        <PlatformCard
          title="TikTok Ads"
          description="Anuncie com vídeos no TikTok"
          icon="tiktok"
          stats={[
            { label: "Alcance estimado", value: "8-15 mil" },
            { label: "Custo por clique médio", value: "R$ 0,65" }
          ]}
          benefits={["Público jovem", "Formato vídeo vertical", "Tendências culinárias"]}
          onCreateCampaign={handlePlatformCreateCampaign}
        />
      </div>

      {/* Google My Business Section */}
      <GoogleMyBusinessCard />

      {/* Reports Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <CampaignReportCard
          title="Desempenho por Plataforma"
          description="Compare resultados das suas campanhas"
          icon={<BarChart className="h-5 w-5 text-indigo-600" />}
          metrics={[
            { name: "Google Ads", value: 78, color: "bg-red-500" },
            { name: "Meta Ads", value: 65, color: "bg-blue-500" },
            { name: "TikTok Ads", value: 43, color: "bg-black" }
          ]}
        />

        <CampaignReportCard
          title="Conversões por Objetivo"
          description="Veja quais objetivos estão performando melhor"
          icon={<CheckCircle className="h-5 w-5 text-green-600" />}
          metrics={[
            { name: "Visitas ao restaurante", value: 85, color: "bg-amber-500" },
            { name: "Pedidos delivery", value: 62, color: "bg-purple-500" },
            { name: "Promoções", value: 54, color: "bg-emerald-500" }
          ]}
        />
      </div>

      {/* Tips & Help Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Dicas para Restaurantes</CardTitle>
          <CardDescription>
            Melhore suas campanhas com essas práticas recomendadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white rounded-lg p-4 border shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-amber-100 p-1.5 rounded-full">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <h5 className="font-medium">Horários estratégicos</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                Programe seus anúncios para os horários de pico: almoço (11h-14h) e jantar (18h-21h).
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-100 p-1.5 rounded-full">
                  <MapPin className="h-4 w-4 text-blue-600" />
                </div>
                <h5 className="font-medium">Segmentação local</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                Foque num raio de 5-8 km do seu restaurante para maior eficiência nos anúncios.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Percent className="h-4 w-4 text-green-600" />
                </div>
                <h5 className="font-medium">Ofertas atrativas</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                Inclua promoções específicas nos seus anúncios para aumentar a taxa de conversão.
              </p>
            </div>
          </div>
          
          <Button variant="link" className="mt-4 p-0 h-auto">
            Ver mais dicas para restaurantes
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Campaign Wizard Dialog */}
      <CampaignWizard 
        open={isWizardOpen} 
        onOpenChange={setIsWizardOpen}
        templates={campaignTemplates}
        initialPlatform={selectedPlatform}
      />
    </div>
  );
};

export default CampanhasTrafegoPago;
