
import React from "react";
import { Phone } from "lucide-react";
import IncentiveDisplay from "./IncentiveDisplay";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface SmsPreviewProps {
  content: string;
  incentiveType: string;
  coupon?: Coupon;
  loyaltyPoints?: number;
}

const SmsPreview = ({ content, incentiveType, coupon, loyaltyPoints }: SmsPreviewProps) => {
  return (
    <div className="rounded-lg overflow-hidden border bg-blue-50 max-w-[350px]">
      <div className="bg-blue-600 text-white p-2 text-sm flex items-center gap-1.5">
        <Phone className="h-4 w-4" />
        Preview SMS
      </div>
      <div className="p-3">
        {/* SMS Phone interface */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs">
              SL
            </div>
            <div className="ml-2">
              <div className="text-sm font-medium">Sua Loja</div>
              <div className="text-xs text-gray-500">SMS</div>
            </div>
            <div className="ml-auto text-xs text-gray-500">Hoje</div>
          </div>
          
          <div className="border-t pt-2">
            <p className="text-sm">{content.slice(0, 160)}</p>
            {content.length > 160 && (
              <p className="text-xs text-red-500 mt-1">
                Aviso: SMS limitado a 160 caracteres. Texto será cortado.
              </p>
            )}
            <IncentiveDisplay 
              incentiveType={incentiveType as any} 
              coupon={coupon} 
              loyaltyPoints={loyaltyPoints}
            />
          </div>
          
          <div className="mt-3 text-xs text-gray-400 text-right">
            Entregue
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsPreview;
