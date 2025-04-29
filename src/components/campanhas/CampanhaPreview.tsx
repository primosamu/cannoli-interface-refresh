
import { CampaignChannel } from "@/types/campaign";
import { MessageSquare, Mail, Phone } from "lucide-react";

export type IncentiveType = "none" | "coupon" | "loyalty";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface CampanhaPreviewProps {
  channel: CampaignChannel;
  content: string;
  imageUrl?: string;
  incentiveType: IncentiveType;
  coupon?: Coupon;
  loyaltyPoints?: number;
}

const CampanhaPreview = ({ 
  channel, 
  content, 
  imageUrl, 
  incentiveType, 
  coupon, 
  loyaltyPoints 
}: CampanhaPreviewProps) => {
  
  const renderIncentive = () => {
    switch (incentiveType) {
      case "coupon":
        return coupon ? (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium mt-2">
            Cupom: {coupon.code} ({coupon.discount}{coupon.discountType === "percentage" ? "%" : " reais"} de desconto)
          </div>
        ) : null;
      case "loyalty":
        return loyaltyPoints ? (
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-medium mt-2">
            +{loyaltyPoints} pontos de fidelidade
          </div>
        ) : null;
      default:
        return null;
    }
  };
  
  if (channel === "whatsapp") {
    return (
      <div className="rounded-lg overflow-hidden border bg-green-50 max-w-[300px]">
        <div className="bg-green-600 text-white p-2 text-sm flex items-center gap-1.5">
          <MessageSquare className="h-4 w-4" />
          Preview WhatsApp
        </div>
        <div className="p-3">
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <p className="text-sm whitespace-pre-wrap">{content}</p>
            {renderIncentive()}
          </div>
          <div className="text-xs text-gray-500 mt-2 text-right">
            Agora
          </div>
        </div>
      </div>
    );
  }
  
  if (channel === "sms") {
    return (
      <div className="rounded-lg overflow-hidden border bg-blue-50 max-w-[300px]">
        <div className="bg-blue-600 text-white p-2 text-sm flex items-center gap-1.5">
          <Phone className="h-4 w-4" />
          Preview SMS
        </div>
        <div className="p-3">
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <p className="text-sm">{content.slice(0, 160)}</p>
            {content.length > 160 && (
              <p className="text-xs text-red-500 mt-1">
                Aviso: SMS limitado a 160 caracteres. Texto será cortado.
              </p>
            )}
            {renderIncentive()}
          </div>
        </div>
      </div>
    );
  }
  
  // Email preview
  return (
    <div className="rounded-lg overflow-hidden border bg-purple-50 max-w-[320px]">
      <div className="bg-purple-600 text-white p-2 text-sm flex items-center gap-1.5">
        <Mail className="h-4 w-4" />
        Preview Email
      </div>
      <div className="p-3">
        <div className="bg-white rounded-lg p-2 shadow-sm">
          {imageUrl && (
            <div className="mb-2">
              <img 
                src={imageUrl} 
                alt="Email banner" 
                className="w-full h-auto rounded"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/600x200/purple/white?text=Imagem+invalida";
                }}
              />
            </div>
          )}
          <div 
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {renderIncentive()}
        </div>
      </div>
    </div>
  );
};

export default CampanhaPreview;
