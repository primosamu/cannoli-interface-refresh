
import React from "react";
import PromotionClientSelector from "../PromotionClientSelector";

interface ClientsTabProps {
  onSelectionChange?: (selection: {
    type: 'segment' | 'manual';
    data: string[] | string;
  }) => void;
}

const ClientsTab: React.FC<ClientsTabProps> = ({ onSelectionChange }) => {
  return (
    <div className="space-y-4">
      <PromotionClientSelector onSelectionChange={onSelectionChange} />
    </div>
  );
};

export default ClientsTab;
