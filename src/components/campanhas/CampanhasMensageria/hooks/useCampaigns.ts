
import { useQuery } from "@tanstack/react-query";
import { Campaign, CampaignChannel, WhatsAppMessageType } from "@/types/campaign";
import { supabase } from "@/integrations/supabase/client";

export const useCampaigns = () => {
  // Fetch active campaigns from Supabase
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('type', 'campaign')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching campaigns:", error);
        throw error;
      }
      
      return data.map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        segment: {
          id: campaign.segment_id || "default",
          name: "Customer Segment",
          description: "Description",
          customerCount: 0
        },
        incentive: {
          type: campaign.incentive_type as "none" | "coupon" | "loyalty",
          couponId: campaign.coupon_id,
          loyaltyPoints: campaign.loyalty_points
        },
        channel: campaign.channel as CampaignChannel,
        whatsappType: campaign.whatsapp_type as WhatsAppMessageType,
        content: campaign.content || "",
        imageUrl: campaign.image_url,
        status: campaign.status,
        createdAt: campaign.created_at,
        scheduledAt: campaign.scheduled_at
      })) as Campaign[];
    }
  });

  return { campaigns, isLoading };
};
