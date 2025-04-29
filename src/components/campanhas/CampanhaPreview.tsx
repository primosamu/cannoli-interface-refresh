
import { CampaignChannel, IncentiveType, WhatsAppMessageType } from "@/types/campaign";
import { MessageSquare, Mail, Phone, WhatsApp } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface CampanhaPreviewProps {
  channel: CampaignChannel;
  whatsappType?: WhatsAppMessageType;
  content: string;
  imageUrl?: string;
  incentiveType: IncentiveType;
  coupon?: Coupon;
  loyaltyPoints?: number;
}

const CampanhaPreview = ({ 
  channel, 
  whatsappType = "utility",
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
      <div className="rounded-lg overflow-hidden border bg-green-50 max-w-[350px]">
        <div className="bg-green-600 text-white p-2 text-sm flex items-center gap-1.5">
          <WhatsApp className="h-4 w-4" />
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
            {renderIncentive()}
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
  }
  
  if (channel === "sms") {
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
              {renderIncentive()}
            </div>
            
            <div className="mt-3 text-xs text-gray-400 text-right">
              Entregue
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Email preview with improved marketing formatting
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
          {imageUrl && (
            <div className="mb-3">
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
            className="text-sm mb-3"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          
          {renderIncentive()}
          
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

export default CampanhaPreview;
