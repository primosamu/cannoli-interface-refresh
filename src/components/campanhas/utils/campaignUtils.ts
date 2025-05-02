
import { Campaign, CampaignChannel, WhatsAppMessageType, CampaignStatus, IncentiveType } from "@/types/campaign";
import { supabase } from "@/integrations/supabase/client";

// Function to get recent campaigns from Supabase
export const getRecentCampaigns = async (): Promise<Campaign[]> => {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('type', 'campaign')
    .order('created_at', { ascending: false })
    .limit(5);
    
  if (error) {
    console.error("Error fetching recent campaigns:", error);
    return [];
  }
  
  if (!data || data.length === 0) {
    return [];
  }
  
  return data.map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    segment: {
      id: campaign.segment_id || "default",
      name: "Customer Segment", // We would need to fetch actual segment info
      description: "Description",
      customerCount: 0
    },
    incentive: {
      type: campaign.incentive_type as IncentiveType || "none",
      couponId: campaign.coupon_id,
      loyaltyPoints: campaign.loyalty_points
    },
    channel: campaign.channel as CampaignChannel,
    whatsappType: campaign.whatsapp_type as WhatsAppMessageType,
    content: campaign.content || "",
    imageUrl: campaign.image_url,
    status: campaign.status as CampaignStatus,
    createdAt: campaign.created_at,
    scheduledAt: campaign.scheduled_at
  }));
};

// Mock campaigns for development when Supabase data is not available
export const getMockCampaigns = (): Campaign[] => {
  return [
    {
      id: "cam-1",
      name: "Promoção de Primavera",
      segment: {
        id: "seg-1",
        name: "Clientes VIP",
        description: "Clientes com alto valor de compra",
        customerCount: 350
      },
      incentive: {
        type: "coupon",
        couponId: "cpn-123"
      },
      channel: "whatsapp",
      whatsappType: "marketing",
      content: "Olá! Aproveite nossa promoção de primavera com 20% de desconto em todos os pratos.",
      imageUrl: "https://source.unsplash.com/random/300x200?food",
      status: "active",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "cam-2",
      name: "Novos Pratos",
      segment: {
        id: "seg-2",
        name: "Todos os clientes",
        description: "Todos os clientes cadastrados",
        customerCount: 2500
      },
      incentive: {
        type: "none"
      },
      channel: "email",
      content: "Conheça os novos pratos do nosso cardápio. Venha experimentar!",
      status: "completed",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
};
