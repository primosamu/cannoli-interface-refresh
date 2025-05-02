
import { Campaign, CampaignChannel, WhatsAppMessageType, CampaignStatus, IncentiveType } from "@/types/campaign";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

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
    return getMockCampaigns(); // Return mock data if no campaigns found
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

// Get channel icon based on channel type
export const getChannelIcon = (channel: string, whatsappType?: string) => {
  switch (channel) {
    case "whatsapp":
      return React.createElement(MessageSquare, { className: "h-4 w-4 text-green-600" });
    case "email":
      return React.createElement(Mail, { className: "h-4 w-4 text-purple-600" });
    case "sms":
      return React.createElement(Phone, { className: "h-4 w-4 text-blue-600" });
    default:
      return null;
  }
};

// Get status badge for campaigns
export const getStatusBadge = (status: CampaignStatus) => {
  switch (status) {
    case "active":
      return React.createElement(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-200" }, "Ativo");
    case "scheduled":
      return React.createElement(Badge, { className: "bg-blue-100 text-blue-800 hover:bg-blue-200" }, "Agendado");
    case "completed":
      return React.createElement(Badge, { className: "bg-gray-100 text-gray-800 hover:bg-gray-200" }, "Concluído");
    case "paused":
      return React.createElement(Badge, { className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" }, "Pausado");
    case "draft":
    default:
      return React.createElement(Badge, { variant: "outline" }, "Rascunho");
  }
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

// Helper to convert Supabase campaign template to our Campaign type
export const convertTemplateToCampaign = (template: any): Partial<Campaign> => {
  if (!template) {
    return {};
  }
  
  // Create a default segment since segment_id might not exist
  const defaultSegment = {
    id: "default",
    name: "Default Segment",
    description: "Default segment description",
    customerCount: 0
  };

  return {
    id: template.id,
    name: template.name,
    segment: defaultSegment,
    incentive: {
      type: ((template.incentive_type as IncentiveType) || "none"),
      couponId: template.coupon_id,
      loyaltyPoints: template.loyalty_points
    },
    channel: (template.channel as CampaignChannel) || "whatsapp",
    whatsappType: (template.whatsapp_type as WhatsAppMessageType) || "marketing",
    content: template.content || "",
    status: "draft" as CampaignStatus,
    createdAt: template.created_at,
    imageUrl: template.image_url
  };
};
