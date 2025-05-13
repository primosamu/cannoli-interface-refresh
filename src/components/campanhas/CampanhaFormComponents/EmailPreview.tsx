
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IncentiveType } from "@/types/campaign";

interface Coupon {
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface EmailPreviewProps {
  content: string;
  imageUrl?: string;
  incentiveType: IncentiveType;
  coupon?: Coupon;
  loyaltyPoints?: number;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  content,
  imageUrl,
  incentiveType,
  coupon,
  loyaltyPoints,
}) => {
  // Replace placeholder variables with sample values
  const processedContent = content
    .replace(/{{nome}}/g, "Maria")
    .replace(/{{sobrenome}}/g, "Silva")
    .replace(/{{email}}/g, "maria@email.com")
    .replace(/{{telefone}}/g, "(11) 99999-8888");

  return (
    <Card className="p-4 max-w-md mx-auto bg-blue-50 border-blue-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h5 className="text-sm font-medium text-blue-800">Email</h5>
          <p className="text-xs text-blue-600">maria@email.com</p>
        </div>
      </div>
      
      {imageUrl && (
        <div className="mb-3 rounded-md overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Imagem do email" 
            className="w-full h-auto object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e2e8f0/64748b?text=Imagem+Indisponível";
            }}
          />
        </div>
      )}

      <div className="text-sm whitespace-pre-wrap">{processedContent}</div>

      {incentiveType === "coupon" && coupon && (
        <div className="mt-3 p-3 bg-white rounded-md border border-blue-200">
          <p className="text-xs text-blue-700 font-medium">Seu cupom de desconto</p>
          <div className="flex items-center justify-between mt-1">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              {coupon.code}
            </Badge>
            <span className="text-xs font-medium text-blue-700">
              {coupon.discountType === "percentage"
                ? `${coupon.discount}% de desconto`
                : `R$ ${coupon.discount.toFixed(2)} de desconto`}
            </span>
          </div>
        </div>
      )}

      {incentiveType === "loyalty" && loyaltyPoints && (
        <div className="mt-3 p-3 bg-white rounded-md border border-blue-200">
          <p className="text-xs text-blue-700 font-medium">Pontos de fidelidade adicionados</p>
          <div className="flex items-center justify-between mt-1">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              +{loyaltyPoints} pontos
            </Badge>
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-blue-200 text-xs text-blue-600">
        <p>Restaurante Exemplo LTDA</p>
        <p>Av. Paulista, 1000 - São Paulo, SP</p>
        <p className="mt-1">Para cancelar o recebimento, <a href="#" className="underline">clique aqui</a>.</p>
      </div>
    </Card>
  );
};

export default EmailPreview;
