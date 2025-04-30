
import React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CampaignChannel } from "@/types/campaign";
import { MessageSquare, Mail, Phone } from "lucide-react";

interface PreviewSectionProps {
  previewChannel: CampaignChannel;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ previewChannel }) => {
  const form = useFormContext();
  
  // Helper function to safely replace placeholders in message content
  const getPreviewText = (content: string): string => {
    if (!content) return "";
    // Safely replace placeholders to prevent TypeScript errors
    return content.replace(/\{\{nome\}\}/g, "Cliente");
  };
  
  // Get channel icon
  const getChannelIcon = (channel: CampaignChannel) => {
    switch (channel) {
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <Phone className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="border rounded-md p-4 space-y-2">
      <div className="flex items-center gap-2">
        {getChannelIcon(previewChannel)}
        <h4 className="text-sm font-medium">Pré-visualização</h4>
      </div>
      
      <div className={cn(
        "p-3 rounded-lg max-w-[300px] text-sm",
        previewChannel === "whatsapp" ? "bg-green-50 border border-green-100" :
        previewChannel === "email" ? "bg-purple-50 border border-purple-100" :
        "bg-blue-50 border border-blue-100"
      )}>
        <div className="whitespace-pre-wrap">
          {getPreviewText(form.watch("content") || "")}
        </div>
        
        {form.watch("imageUrl") && (previewChannel === "whatsapp" || previewChannel === "email") && (
          <div className="mt-2 p-1 bg-gray-100 rounded text-xs text-center text-gray-500">
            [Imagem: {form.watch("imageUrl")}]
          </div>
        )}
        
        {form.watch("incentiveType") === "coupon" && (
          <div className="mt-2 p-1 bg-green-100 rounded text-xs text-center text-green-700">
            [Cupom de desconto será gerado automaticamente]
          </div>
        )}
        
        {form.watch("incentiveType") === "loyalty" && (
          <div className="mt-2 p-1 bg-purple-100 rounded text-xs text-center text-purple-700">
            [10 pontos de fidelidade serão adicionados]
          </div>
        )}
      </div>
      
      {previewChannel === "sms" && form.watch("content").length > 160 && (
        <p className="text-xs text-red-500">
          Atenção: Sua mensagem tem {form.watch("content").length} caracteres. 
          Mensagens SMS com mais de 160 caracteres podem ser divididas em múltiplas partes.
        </p>
      )}
    </div>
  );
};

export default PreviewSection;
