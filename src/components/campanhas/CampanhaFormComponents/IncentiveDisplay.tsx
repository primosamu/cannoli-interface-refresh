
import React from "react";
import { IncentiveType } from "@/types/campaign";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface IncentiveDisplayProps {
  incentiveType: IncentiveType;
  coupon?: Coupon;
  loyaltyPoints?: number;
}

const IncentiveDisplay = ({ incentiveType, coupon, loyaltyPoints }: IncentiveDisplayProps) => {
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

export default IncentiveDisplay;
