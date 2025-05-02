
import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CampanhaFormHeaderProps {
  isEditing: boolean;
  isPredefined: boolean;
}

const CampanhaFormHeader: React.FC<CampanhaFormHeaderProps> = ({ 
  isEditing, 
  isPredefined 
}) => {
  return (
    <DialogHeader className="px-6 pt-6 pb-2">
      <DialogTitle>
        {isEditing ? "Editar Campanha" : isPredefined ? "Usar Modelo de Campanha" : "Nova Campanha"}
      </DialogTitle>
      <DialogDescription>
        {isEditing 
          ? "Edite os detalhes da sua campanha de mensageria."
          : "Crie uma nova campanha para enviar mensagens aos seus clientes."}
      </DialogDescription>
    </DialogHeader>
  );
};

export default CampanhaFormHeader;
