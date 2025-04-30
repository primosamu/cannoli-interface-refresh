
import React from "react";
import { CampaignChannel, IncentiveType, WhatsAppMessageType } from "@/types/campaign";
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
}

const CampanhaPreview = ({ 
  channel, 
  whatsappType = "utility",
  content, 
  imageUrl, 
  incentiveType, 
  coupon, 
  loyaltyPoints 
}: CampanhaPreviewProps) => {
  
  if (channel === "whatsapp") {
    return (
      <WhatsAppPreview
        content={content}
        imageUrl={imageUrl}
        incentiveType={incentiveType}
        coupon={coupon}
        loyaltyPoints={loyaltyPoints}
        whatsappType={whatsappType}
      />
    );
  }
  
  if (channel === "sms") {
    return (
      <SmsPreview
        content={content}
        incentiveType={incentiveType}
        coupon={coupon}
        loyaltyPoints={loyaltyPoints}
      />
    );
  }
  
  // Default to email preview
  return (
    <EmailPreview
      content={content}
      imageUrl={imageUrl}
      incentiveType={incentiveType}
      coupon={coupon}
      loyaltyPoints={loyaltyPoints}
    />
  );
};

export default CampanhaPreview;
