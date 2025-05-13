
import React from "react";
import { Mail } from "lucide-react";
import IncentiveDisplay from "./IncentiveDisplay";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface EmailPreviewProps {
  content: string;
  imageUrl?: string;
  incentiveType: string;
  coupon?: Coupon;
  loyaltyPoints?: number;
}

const EmailPreview = ({ content, imageUrl, incentiveType, coupon, loyaltyPoints }: EmailPreviewProps) => {
  // Default placeholder image if none provided
  const placeholderImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=200";
  const displayImageUrl = imageUrl || placeholderImage;
  
  return (
    <div className="rounded-lg overflow-hidden border bg-purple-50 max-w-[450px]">
      <div className="bg-purple-600 text-white p-2 text-sm flex items-center gap-1.5">
        <Mail className="h-4 w-4" />
        Preview Email Marketing
      </div>
      <div className="p-3">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="border-b pb-2 mb-3">
            <div className="font-medium">De: Sua Loja <span className="text-gray-500">&lt;contato@sualoja.com.br&gt;</span></div>
            <div className="text-sm">Para: Cliente <span className="text-gray-500">&lt;cliente@email.com&gt;</span></div>
            <div className="text-sm text-gray-500">Assunto: {content.substring(0, 50).replace(/<[^>]*>/g, '')}...</div>
          </div>
          
          {/* Email header with logo */}
          <div className="border-b pb-3 mb-3">
            <div className="bg-purple-100 text-purple-800 py-2 px-4 rounded text-center font-medium mb-2">
              SUA LOJA
            </div>
          </div>
          
          {/* Email content */}
          <div className="mb-3">
            <img 
              src={displayImageUrl} 
              alt="Email banner" 
              className="w-full h-auto rounded"
              onError={(e) => {
                e.currentTarget.src = placeholderImage;
              }}
            />
          </div>
          
          <div 
            className="text-sm mb-3"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          
          <IncentiveDisplay 
            incentiveType={incentiveType as any}
            coupon={coupon} 
            loyaltyPoints={loyaltyPoints}
          />
          
          {/* Email footer */}
          <div className="border-t mt-4 pt-3 text-xs text-gray-500">
            <p>© 2025 Sua Loja - Todos os direitos reservados</p>
            <p className="mt-1">Para cancelar sua inscrição, <a href="#" className="text-blue-600 underline">clique aqui</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
