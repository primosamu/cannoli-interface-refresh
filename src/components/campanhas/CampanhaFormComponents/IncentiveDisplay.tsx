
import React from "react";
import { Tag } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface IncentiveDisplayProps {
  incentiveType: "none" | "coupon" | "loyalty";
  coupon?: Coupon;
  loyaltyPoints?: number;
}

const IncentiveDisplay = ({ incentiveType, coupon, loyaltyPoints }: IncentiveDisplayProps) => {
  if (incentiveType === "none") return null;
  
  if (incentiveType === "coupon") {
    return (
      <div className="mt-2 p-2 bg-green-100 rounded-md">
        <div className="flex items-center gap-1.5 text-sm text-green-800">
          <Tag className="h-4 w-4" />
          <span className="font-medium">Cupom:</span>
          {coupon ? (
            <span className="font-bold">{coupon.code}</span>
          ) : (
            <span className="font-bold">DESC20</span>
          )}
        </div>
        <p className="text-xs text-green-700 mt-1">
          {coupon
            ? coupon.discountType === "percentage"
              ? `${coupon.discount}% de desconto`
              : `R$${coupon.discount.toFixed(2)} de desconto`
            : "20% de desconto"
          }
        </p>
      </div>
    );
  }
  
  if (incentiveType === "loyalty") {
    return (
      <div className="mt-2 p-2 bg-blue-100 rounded-md">
        <div className="flex items-center gap-1.5 text-sm text-blue-800">
          <Tag className="h-4 w-4" />
          <span className="font-medium">Pontos de fidelidade:</span>
          <span className="font-bold">{loyaltyPoints || 10}</span>
        </div>
        <p className="text-xs text-blue-700 mt-1">
          Pontos serão adicionados automaticamente
        </p>
      </div>
    );
  }
  
  return null;
};

export default IncentiveDisplay;
