
import React from "react";
import CommunicationChannelCard from "../CommunicationChannelCard";

interface CommunicationChannelsSectionProps {
  onChannelSelect: (channel: string, campaignType?: string) => void;
}

const CommunicationChannelsSection: React.FC<CommunicationChannelsSectionProps> = ({ onChannelSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CommunicationChannelCard 
        icon="whatsapp"
        title="WhatsApp"
        description="Mensagens diretas para WhatsApp"
        onChannelSelect={() => onChannelSelect("whatsapp")}
        quickActionLinks={[
          { label: "Promoção", onClick: () => onChannelSelect("whatsapp", "promotion") },
          { label: "Novidades", onClick: () => onChannelSelect("whatsapp", "news") },
          { label: "Lembrete", onClick: () => onChannelSelect("whatsapp", "reminder") },
        ]}
      />
      
      <CommunicationChannelCard 
        icon="email"
        title="Email"
        description="Campanhas por email"
        onChannelSelect={() => onChannelSelect("email")}
        quickActionLinks={[
          { label: "Newsletter", onClick: () => onChannelSelect("email", "newsletter") },
          { label: "Evento", onClick: () => onChannelSelect("email", "event") },
          { label: "Fidelidade", onClick: () => onChannelSelect("email", "loyalty") },
        ]}
      />
      
      <CommunicationChannelCard 
        icon="sms"
        title="SMS"
        description="Mensagens SMS diretas"
        onChannelSelect={() => onChannelSelect("sms")}
        quickActionLinks={[
          { label: "Urgente", onClick: () => onChannelSelect("sms", "urgent") },
          { label: "Confirmação", onClick: () => onChannelSelect("sms", "confirmation") },
          { label: "Lembrete", onClick: () => onChannelSelect("sms", "reminder") },
        ]}
      />
    </div>
  );
};

export default CommunicationChannelsSection;
