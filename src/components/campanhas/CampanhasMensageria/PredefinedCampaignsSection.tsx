
import React from "react";
import { PlusCircle } from "lucide-react";
import PredefinedCampaignSection from "../PredefinedCampaignSection";

const PredefinedCampaignsSection: React.FC = () => {
  return (
    <PredefinedCampaignSection 
      title="Modelos Prontos"
      icon={<PlusCircle className="h-4 w-4 text-primary" />}
      campaigns={[
        {
          id: "sentimos-sua-falta",
          title: "Sentimos sua falta",
          description: "Para clientes inativos",
          badge: "WhatsApp"
        },
        {
          id: "volte-para-nos",
          title: "Volte para nós",
          description: "Com cupom de desconto",
          badge: "WhatsApp"
        },
        {
          id: "terca-da-pizza",
          title: "Terça da Pizza",
          description: "Promoção especial",
          badge: "WhatsApp"
        },
        {
          id: "quinta-do-hamburguer",
          title: "Quinta do Hambúrguer",
          description: "Promoção especial",
          badge: "WhatsApp"
        }
      ]}
      colorClass="bg-purple-50"
      onSelectCampaign={(id) => {
        // This will be handled at a higher level
        console.log("Selected campaign template:", id);
        return id;
      }}
    />
  );
};

export default PredefinedCampaignsSection;
