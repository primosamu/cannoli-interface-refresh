
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CampaignChannel, IncentiveType, WhatsAppMessageType } from "@/types/campaign";
import { CustomerSegment } from "@/types/campaign";
import { predefinedCampaigns } from "../predefinedCampaignsData";

interface PredefinedCampaignsLoaderProps {
  customerSegments: CustomerSegment[];
  children: (predefinedCampaigns: any) => React.ReactNode;
}

const PredefinedCampaignsLoader: React.FC<PredefinedCampaignsLoaderProps> = ({ 
  customerSegments,
  children 
}) => {
  // Fetch predefined campaign templates from Supabase
  const { data: predefinedCampaigns = {} } = useQuery({
    queryKey: ['predefined_campaigns'],
    queryFn: async () => {
      // Try to fetch from Supabase
      const { data: templatesData, error } = await supabase
        .from('campaign_templates')
        .select('*')
        .eq('type', 'predefined');
        
      if (error || !templatesData || templatesData.length === 0) {
        // Return predefined campaigns from local data
        return getMockedPredefinedCampaigns(customerSegments);
      }
      
      // Convert Supabase data to our format
      const templateMap: Record<string, any> = {};
      templatesData.forEach(template => {
        // Use the first segment as default since segment_id doesn't exist in the type
        const defaultSegment = customerSegments[0] || {
          id: "default",
          name: "Default Segment",
          description: "Default segment description",
          customerCount: 0
        };
        
        const key = template.id.toString();
        templateMap[key] = {
          name: template.name,
          channel: template.channel as CampaignChannel,
          whatsappType: template.whatsapp_type as WhatsAppMessageType,
          content: template.content || "",
          segment: defaultSegment,
          incentive: {
            type: (template.incentive_type || "none") as IncentiveType,
          },
          imageUrl: template.image_url
        };
      });
      
      // Merge with local predefined campaigns
      const localCampaigns = getMockedPredefinedCampaigns(customerSegments);
      return { ...localCampaigns, ...templateMap };
    },
    enabled: customerSegments?.length > 0
  });

  return <>{children(predefinedCampaigns)}</>;
};

// Helper function to get mocked predefined campaigns
const getMockedPredefinedCampaigns = (customerSegments: CustomerSegment[]) => {
  // Default to first segment or create a fallback
  const defaultSegment = customerSegments[0] || {
    id: "default",
    name: "Default Segment",
    description: "Default segment description",
    customerCount: 0
  };
  
  // Segment for inactive customers (use the 3rd segment if available or default)
  const inactiveSegment = customerSegments[2] || defaultSegment;
  
  // Return predefined campaigns map
  return {
    "sentimos-sua-falta": {
      name: "Sentimos sua falta",
      channel: "whatsapp",
      whatsappType: "marketing",
      content: "Olá, {{nome}}! Sentimos sua falta no restaurante. Já faz um tempo desde sua última visita e gostaríamos de te ver novamente. Que tal aproveitar um cupom de 15% de desconto na sua próxima refeição? Válido por 7 dias. Esperamos você!",
      segment: inactiveSegment,
      incentive: {
        type: "coupon" as IncentiveType,
        couponId: "auto-generated"
      }
    },
    "volte-para-nos": {
      name: "Volte para nós",
      channel: "whatsapp",
      whatsappType: "marketing",
      content: "Olá, {{nome}}! Estamos com saudades! Como incentivo para você voltar a nos visitar, preparamos um cupom especial de 20% de desconto em qualquer prato do cardápio. Válido por 5 dias. Esperamos você em breve!",
      segment: inactiveSegment,
      incentive: {
        type: "coupon" as IncentiveType,
        couponId: "auto-generated"
      }
    },
    "terca-da-pizza": {
      name: "Terça da Pizza",
      channel: "whatsapp",
      whatsappType: "marketing",
      content: "Olá, {{nome}}! Hoje é TERÇA DA PIZZA! 🍕 Todas as pizzas com 30% de desconto. Válido apenas hoje para delivery ou retirada. Faça seu pedido pelo WhatsApp ou pelo nosso app. Bom apetite!",
      segment: defaultSegment,
      incentive: {
        type: "none"
      }
    },
    "quinta-do-hamburguer": {
      name: "Quinta do Hambúrguer",
      channel: "whatsapp",
      whatsappType: "marketing",
      content: "Olá, {{nome}}! Hoje é QUINTA DO HAMBÚRGUER! 🍔 Todos os hambúrgueres com 25% de desconto. Válido apenas hoje para delivery ou retirada. Faça seu pedido pelo WhatsApp ou pelo nosso app. Bom apetite!",
      segment: defaultSegment,
      incentive: {
        type: "none"
      }
    }
  };
};

export default PredefinedCampaignsLoader;
