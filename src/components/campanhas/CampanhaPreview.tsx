
import React from "react";
import { Campaign, CampaignChannel, IncentiveType, WhatsAppMessageType } from "@/types/campaign";
import WhatsAppPreview from "./CampanhaFormComponents/WhatsAppPreview";
import SmsPreview from "./CampanhaFormComponents/SmsPreview";
import EmailPreview from "./CampanhaFormComponents/EmailPreview";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface CampanhaPreviewProps {
  channel: CampaignChannel;
  whatsappType?: WhatsAppMessageType;
  content: string;
  imageUrl?: string;
  incentiveType: IncentiveType;
  coupon?: Coupon;
  loyaltyPoints?: number;
  campaign?: Campaign; // Add campaign prop
}

const CampanhaPreview = ({ 
  channel, 
  whatsappType = "utility",
  content, 
  imageUrl, 
  incentiveType, 
  coupon, 
  loyaltyPoints,
  campaign // Add campaign prop
}: CampanhaPreviewProps) => {
  
  // If campaign prop is provided, extract values from it
  const finalChannel = campaign?.channel || channel;
  const finalWhatsappType = campaign?.whatsappType || whatsappType;
  const finalContent = campaign?.content || content;
  const finalImageUrl = campaign?.imageUrl || imageUrl;
  const finalIncentiveType = campaign?.incentive?.type || incentiveType;
  
  if (finalChannel === "whatsapp") {
    return (
      <WhatsAppPreview
        content={finalContent}
        imageUrl={finalImageUrl}
        incentiveType={finalIncentiveType}
        coupon={coupon}
        loyaltyPoints={loyaltyPoints}
        whatsappType={finalWhatsappType}
      />
    );
  }
  
  if (finalChannel === "sms") {
    return (
      <SmsPreview
        content={finalContent}
        incentiveType={finalIncentiveType}
        coupon={coupon}
        loyaltyPoints={loyaltyPoints}
      />
    );
  }
  
  // Default to email preview
  return (
    <EmailPreview
      content={finalContent}
      imageUrl={finalImageUrl}
      incentiveType={finalIncentiveType}
      coupon={coupon}
      loyaltyPoints={loyaltyPoints}
    />
  );
};

export default CampanhaPreview;
