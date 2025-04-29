
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Facebook, Globe, TrendingUp, Plus, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CampanhasTrafegoPago = () => {
  const { toast } = useToast();
  
  const handleCreateAd = (platform: string) => {
    toast({
      title: "Criar anúncio",
      description: `Iniciando criação de anúncio para ${platform}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Criação e gestão de anúncios pagos</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Campanha
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Facebook className="h-5 w-5 text-blue-600" />
              </div>
              Meta Ads
            </CardTitle>
            <CardDescription>Anuncie no Facebook, Instagram e WhatsApp</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">3.5x</span> ROI médio
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">R$ 0,45</span> CPC médio
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleCreateAd("Meta")}>
              Criar Anúncio
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-red-100 p-2 rounded-full">
                <Globe className="h-5 w-5 text-red-600" />
              </div>
              Google Ads
            </CardTitle>
            <CardDescription>Anuncie no Google Search, Display e YouTube</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">4.2x</span> ROI médio
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">R$ 0,85</span> CPC médio
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleCreateAd("Google")}>
              Criar Anúncio
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-cyan-100 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
              </div>
              Outras Plataformas
            </CardTitle>
            <CardDescription>TikTok, LinkedIn, Twitter e outras redes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Varie</span> dependendo da plataforma
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Customize</span> seu orçamento
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleCreateAd("Outras")}>
              Explorar Plataformas
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Analytics e Otimização
        </h4>
        <p className="text-sm text-muted-foreground">
          Acompanhe o desempenho de suas campanhas em tempo real, visualize métricas como CTR, 
          conversões e ROI para otimizar seus anúncios e aumentar o retorno sobre investimento.
        </p>
        <Button variant="link" className="p-0 h-auto mt-2">
          Ver painel de análise
        </Button>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 border">
        <h4 className="font-medium">Campanhas ativas</h4>
        <p className="text-sm text-muted-foreground">Você ainda não possui campanhas de tráfego pago ativas. Crie sua primeira campanha agora!</p>
      </div>
    </div>
  );
};

export default CampanhasTrafegoPago;
