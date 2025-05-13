
import React from "react";
import { MessageSquare } from "lucide-react";
import { WhatsAppMessageType } from "@/types/campaign";
import IncentiveDisplay from "./IncentiveDisplay";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface WhatsAppPreviewProps {
  content: string;
  imageUrl?: string;
  incentiveType: string;
  coupon?: Coupon;
  loyaltyPoints?: number;
  whatsappType?: WhatsAppMessageType;
}

const WhatsAppPreview = ({ 
  content, 
  imageUrl, 
  incentiveType, 
  coupon, 
  loyaltyPoints, 
  whatsappType = "utility" 
}: WhatsAppPreviewProps) => {
  // Default placeholder image if none provided
  const placeholderImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=200";
  const displayImageUrl = imageUrl || placeholderImage;
  
  return (
    <div className="rounded-lg overflow-hidden border bg-green-50 max-w-[350px]">
      <div className="bg-green-600 text-white p-2 text-sm flex items-center gap-1.5">
        <MessageSquare className="h-4 w-4" />
        Preview WhatsApp {whatsappType === "utility" ? "Serviço" : "Marketing"}
        {whatsappType === "marketing" && (
          <span className="ml-auto text-xs bg-yellow-400 text-black px-1 rounded">
            Opt-in necessário
          </span>
        )}
      </div>
      <div className="p-3">
        {/* WhatsApp header with time and user */}
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-xs">
            Loja
          </div>
          <div className="ml-2">
            <div className="text-sm font-medium">Sua Loja</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
          <div className="ml-auto text-xs text-gray-500">Agora</div>
        </div>
        
        {/* Message bubble */}
        <div className="bg-white rounded-lg p-2 shadow-sm border-l-4 border-l-green-600">
          <p className="text-sm whitespace-pre-wrap">{content}</p>
          
          {/* Image in WhatsApp (if provided) */}
          {imageUrl && (
            <div className="mt-2 rounded overflow-hidden">
              <img 
                src={displayImageUrl} 
                alt="Imagem da campanha" 
                className="w-full h-auto max-h-[150px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = placeholderImage;
                }}
              />
            </div>
          )}
          
          <IncentiveDisplay 
            incentiveType={incentiveType as any} 
            coupon={coupon} 
            loyaltyPoints={loyaltyPoints}
          />
        </div>
        
        {/* WhatsApp footer */}
        <div className="mt-3 flex items-center">
          <div className="flex-1 relative">
            <input 
              type="text" 
              className="w-full rounded-full bg-white text-xs p-2 pl-10 border" 
              placeholder="Responder..."
              disabled
            />
            <span className="absolute left-3 top-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            </span>
          </div>
          <button className="ml-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPreview;
