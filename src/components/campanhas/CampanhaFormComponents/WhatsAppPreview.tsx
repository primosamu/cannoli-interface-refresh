
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IncentiveType, WhatsAppMessageType } from "@/types/campaign";

interface Coupon {
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface WhatsAppPreviewProps {
  content: string;
  imageUrl?: string;
  incentiveType: IncentiveType;
  coupon?: Coupon;
  loyaltyPoints?: number;
  whatsappType?: WhatsAppMessageType;
}

const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({
  content,
  imageUrl,
  incentiveType,
  coupon,
  loyaltyPoints,
  whatsappType,
}) => {
  // Replace placeholder variables with sample values
  const processedContent = content
    .replace(/{{nome}}/g, "Maria")
    .replace(/{{sobrenome}}/g, "Silva")
    .replace(/{{email}}/g, "maria@email.com")
    .replace(/{{telefone}}/g, "(11) 99999-8888");

  return (
    <Card className="p-4 max-w-md mx-auto bg-emerald-50 border-emerald-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h5 className="text-sm font-medium text-emerald-800">WhatsApp</h5>
          <p className="text-xs text-emerald-600">+55 (11) 99999-8888</p>
        </div>
        {whatsappType && (
          <Badge variant={whatsappType === "marketing" ? "default" : "secondary"} className="text-xs">
            {whatsappType === "marketing" ? "Marketing" : "Utilitária"}
          </Badge>
        )}
      </div>
      
      {imageUrl && (
        <div className="mb-3 rounded-md overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Imagem da mensagem" 
            className="w-full h-auto object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e2e8f0/64748b?text=Imagem+Indisponível";
            }}
          />
        </div>
      )}

      <div className="text-sm whitespace-pre-wrap">{processedContent}</div>

      {incentiveType === "coupon" && coupon && (
        <div className="mt-3 p-3 bg-white rounded-md border border-emerald-200">
          <p className="text-xs text-emerald-700 font-medium">Cupom aplicado automaticamente</p>
          <div className="flex items-center justify-between mt-1">
            <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300">
              {coupon.code}
            </Badge>
            <span className="text-xs font-medium text-emerald-700">
              {coupon.discountType === "percentage"
                ? `${coupon.discount}% de desconto`
                : `R$ ${coupon.discount.toFixed(2)} de desconto`}
            </span>
          </div>
        </div>
      )}

      {incentiveType === "loyalty" && loyaltyPoints && (
        <div className="mt-3 p-3 bg-white rounded-md border border-emerald-200">
          <p className="text-xs text-emerald-700 font-medium">Pontos de fidelidade adicionados</p>
          <div className="flex items-center justify-between mt-1">
            <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300">
              +{loyaltyPoints} pontos
            </Badge>
          </div>
        </div>
      )}
    </Card>
  );
};

export default WhatsAppPreview;
