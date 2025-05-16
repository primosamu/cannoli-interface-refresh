
import React from "react";
import { Button } from "@/components/ui/button";
import { PercentIcon } from "lucide-react";

interface EmptyPromotionStateProps {
  onNewPromotion: () => void;
}

const EmptyPromotionState: React.FC<EmptyPromotionStateProps> = ({ onNewPromotion }) => {
  return (
    <div className="text-center py-8 text-muted-foreground">
      <PercentIcon className="mx-auto h-12 w-12 opacity-20 mb-2" />
      <p>Nenhuma promoção encontrada com os filtros selecionados</p>
      <Button variant="outline" onClick={onNewPromotion} className="mt-4">
        Criar nova promoção
      </Button>
    </div>
  );
};

export default EmptyPromotionState;
