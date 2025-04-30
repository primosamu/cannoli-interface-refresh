
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Facebook, Globe, Target, Info, CheckCircle } from "lucide-react";
import { AdPlatform } from "@/types/campaign";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PlatformStat {
  label: string;
  value: string;
}

interface PlatformCardProps {
  title: string;
  description: string;
  icon: AdPlatform | string;
  stats: PlatformStat[];
  benefits: string[];
}

export function PlatformCard({ title, description, icon, stats, benefits }: PlatformCardProps) {
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  
  let iconComponent;
  let bgColorClass = "";
  let textColorClass = "";
  
  // Set icon and colors based on platform
  switch (icon) {
    case "meta":
      iconComponent = <Facebook className="h-5 w-5 text-blue-600" />;
      bgColorClass = "bg-blue-50";
      textColorClass = "text-blue-600";
      break;
    case "google":
      iconComponent = <Globe className="h-5 w-5 text-red-600" />;
      bgColorClass = "bg-red-50";
      textColorClass = "text-red-600";
      break;
    case "tiktok":
      iconComponent = <Target className="h-5 w-5 text-black" />;
      bgColorClass = "bg-slate-100";
      textColorClass = "text-black";
      break;
    default:
      iconComponent = <Info className="h-5 w-5" />;
      bgColorClass = "bg-slate-100";
      textColorClass = "text-slate-600";
  }
  
  return (
    <>
      <Card className="overflow-hidden border-t-4 hover:shadow-md transition-shadow" 
        style={{ borderTopColor: icon === "meta" ? "#1877F2" : icon === "google" ? "#EA4335" : "#000000" }}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className={`${bgColorClass} p-2 rounded-full`}>
                {iconComponent}
              </div>
              {title}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowInfoDialog(true)}>
              <Info className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              {stats.map((stat, index) => (
                <div key={index} className="text-sm text-muted-foreground flex justify-between">
                  <span>{stat.label}</span>
                  <span className="font-medium text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">Benefícios para restaurantes:</p>
              <div className="space-y-1">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <Button className="w-full" variant="outline">
                Criar campanha
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <PlatformInfoDialog 
        open={showInfoDialog} 
        onOpenChange={setShowInfoDialog} 
        platform={icon as AdPlatform} 
        title={title} 
      />
    </>
  );
}

interface PlatformInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: AdPlatform;
  title: string;
}

function PlatformInfoDialog({ open, onOpenChange, platform, title }: PlatformInfoDialogProps) {
  const platformInfo = {
    meta: {
      description: "O Meta Ads permite que você alcance clientes potenciais no Facebook e Instagram, ideal para showcasing visual de seus pratos e ambiente do restaurante.",
      bestFor: ["Promoções com imagens de alta qualidade dos pratos", "Atingir públicos locais específicos", "Campanhas de delivery e take-out"],
      adFormats: ["Imagens", "Vídeos", "Carrossel", "Stories"],
      targetingOptions: ["Localização (raio em torno do restaurante)", "Interesses relacionados a gastronomia", "Comportamentos de compra"]
    },
    google: {
      description: "O Google Ads ajuda você a aparecer quando as pessoas estão procurando por restaurantes como o seu na Pesquisa Google e no Google Maps.",
      bestFor: ["Capturar clientes com intenção de compra", "Direcionar tráfego para o Google Meu Negócio", "Destacar-se nas buscas locais"],
      adFormats: ["Anúncios de texto", "Anúncios de pesquisa local", "Anúncios de display"],
      targetingOptions: ["Palavras-chave (ex: 'restaurante italiano próximo')", "Localização", "Dispositivos"]
    },
    tiktok: {
      description: "O TikTok Ads permite que você alcance um público jovem e engajado através de vídeos curtos e dinâmicos que podem destacar sua comida e ambiente.",
      bestFor: ["Demonstrações de pratos sendo preparados", "Conteúdo 'behind-the-scenes' da cozinha", "Promoções para público jovem"],
      adFormats: ["In-feed ads", "TopView", "Branded effects"],
      targetingOptions: ["Localização", "Interesses", "Comportamentos", "Idade"]
    }
  };
  
  const info = platformInfo[platform] || platformInfo.meta;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title} - Informações</DialogTitle>
          <DialogDescription>
            Saiba como esta plataforma pode ajudar seu restaurante
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p>{info.description}</p>
          
          <div>
            <h4 className="font-medium mb-2">Melhor para:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {info.bestFor.map((item, index) => (
                <li key={index} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Formatos de anúncio:</h4>
            <div className="flex flex-wrap gap-2">
              {info.adFormats.map((format, index) => (
                <Badge key={index} variant="outline">{format}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Opções de segmentação:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {info.targetingOptions.map((option, index) => (
                <li key={index} className="text-sm">{option}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
