
import React from "react";
import { useFormContext } from "react-hook-form";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IncentiveType } from "@/types/campaign";
import WhatsAppPreview from "./WhatsAppPreview";
import EmailPreview from "./EmailPreview";
import SmsPreview from "./SmsPreview";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

// Find coupon by ID from mock data
const mockCoupons = [
  { id: "cpn-123", code: "DESC15", discount: 15, discountType: "percentage" as const },
  { id: "cpn-456", code: "DESC20", discount: 20, discountType: "percentage" as const },
  { id: "cpn-789", code: "DESC10", discount: 10, discountType: "percentage" as const },
  { id: "cpn-321", code: "FRETE", discount: 0, discountType: "percentage" as const },
  { id: "custom-manual", code: "MANUAL", discount: 10, discountType: "percentage" as const },
];

const findCouponById = (id: string | undefined): Coupon | undefined => {
  if (!id) return undefined;
  
  // For manually entered coupons, use the coupon code from the form
  if (id.startsWith("custom-")) {
    return {
      id,
      code: "MANUAL", // This will be replaced with the form value
      discount: 10,
      discountType: "percentage" as const
    };
  }
  
  return mockCoupons.find(c => c.id === id);
};

const MultiChannelPreview = () => {
  const form = useFormContext();
  
  // Determine active channels
  const whatsappActive = form.watch("channelWhatsapp");
  const emailActive = form.watch("channelEmail");
  const smsActive = form.watch("channelSms");
  
  // Get active channel count for grid layout
  const activeChannelCount = [whatsappActive, emailActive, smsActive].filter(Boolean).length;
  
  // Get coupon data
  const couponId = form.watch("couponId");
  const couponCode = form.watch("couponCode");
  const incentiveType = form.watch("incentiveType");
  
  // Get coupon from our mock data or create one for manual entries
  let coupon = findCouponById(couponId);
  
  // If we have a manual coupon code, override the code property
  if (coupon && couponCode) {
    coupon = { ...coupon, code: couponCode };
  }
  
  // If no channels are selected, show a default message
  if (!whatsappActive && !emailActive && !smsActive) {
    return (
      <div className="border rounded-md p-4 text-center text-gray-500">
        <p>Selecione pelo menos um canal para ver a pré-visualização</p>
      </div>
    );
  }
  
  // If only one channel is selected, show only that preview
  if (activeChannelCount === 1) {
    return (
      <div className="border rounded-md p-4">
        <h4 className="text-sm font-medium mb-3">Pré-visualização da mensagem</h4>
        
        {whatsappActive && (
          <WhatsAppPreview
            content={form.watch("content") || ""}
            imageUrl={form.watch("imageUrl")}
            incentiveType={incentiveType}
            coupon={coupon}
            loyaltyPoints={incentiveType === "loyalty" ? 10 : undefined}
            whatsappType={form.watch("whatsappType")}
          />
        )}
        
        {emailActive && (
          <EmailPreview
            content={form.watch("content") || ""}
            imageUrl={form.watch("imageUrl")}
            incentiveType={incentiveType}
            coupon={coupon}
            loyaltyPoints={incentiveType === "loyalty" ? 10 : undefined}
          />
        )}
        
        {smsActive && (
          <SmsPreview
            content={form.watch("content") || ""}
            incentiveType={incentiveType}
            coupon={coupon}
            loyaltyPoints={incentiveType === "loyalty" ? 10 : undefined}
          />
        )}
      </div>
    );
  }
  
  // If multiple channels are selected, use tabs
  return (
    <div className="border rounded-md p-4">
      <h4 className="text-sm font-medium mb-3">Pré-visualização de múltiplos canais</h4>
      
      <Tabs defaultValue={whatsappActive ? "whatsapp" : emailActive ? "email" : "sms"}>
        <TabsList className="grid grid-cols-3">
          {whatsappActive && (
            <TabsTrigger value="whatsapp" className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
            </TabsTrigger>
          )}
          {emailActive && (
            <TabsTrigger value="email" className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" /> Email
            </TabsTrigger>
          )}
          {smsActive && (
            <TabsTrigger value="sms" className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" /> SMS
            </TabsTrigger>
          )}
        </TabsList>
        
        {whatsappActive && (
          <TabsContent value="whatsapp" className="py-3">
            <WhatsAppPreview
              content={form.watch("content") || ""}
              imageUrl={form.watch("imageUrl")}
              incentiveType={incentiveType}
              coupon={coupon}
              loyaltyPoints={incentiveType === "loyalty" ? 10 : undefined}
              whatsappType={form.watch("whatsappType")}
            />
          </TabsContent>
        )}
        
        {emailActive && (
          <TabsContent value="email" className="py-3">
            <EmailPreview
              content={form.watch("content") || ""}
              imageUrl={form.watch("imageUrl")}
              incentiveType={incentiveType}
              coupon={coupon}
              loyaltyPoints={incentiveType === "loyalty" ? 10 : undefined}
            />
          </TabsContent>
        )}
        
        {smsActive && (
          <TabsContent value="sms" className="py-3">
            <SmsPreview
              content={form.watch("content") || ""}
              incentiveType={incentiveType}
              coupon={coupon}
              loyaltyPoints={incentiveType === "loyalty" ? 10 : undefined}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MultiChannelPreview;
