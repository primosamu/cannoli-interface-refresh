
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IncentiveType } from "@/types/campaign";

interface Coupon {
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface SmsPreviewProps {
  content: string;
  incentiveType: IncentiveType;
  coupon?: Coupon;
  loyaltyPoints?: number;
}

const SmsPreview: React.FC<SmsPreviewProps> = ({
  content,
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
    <Card className="p-4 max-w-md mx-auto bg-purple-50 border-purple-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h5 className="text-sm font-medium text-purple-800">SMS</h5>
          <p className="text-xs text-purple-600">+55 (11) 99999-8888</p>
        </div>
      </div>

      <div className="text-sm whitespace-pre-wrap">{processedContent}</div>

      {incentiveType === "coupon" && coupon && (
        <div className="mt-2">
          <p className="text-xs text-purple-700 font-medium">Seu cupom: {coupon.code}</p>
        </div>
      )}

      {incentiveType === "loyalty" && loyaltyPoints && (
        <div className="mt-2">
          <p className="text-xs text-purple-700 font-medium">+{loyaltyPoints} pontos adicionados</p>
        </div>
      )}
      
      <div className="mt-2 text-xs text-right text-purple-600">Restaurante Exemplo</div>
    </Card>
  );
};

export default SmsPreview;
