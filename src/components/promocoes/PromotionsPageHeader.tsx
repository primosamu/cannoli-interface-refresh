
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";

interface PromotionsPageHeaderProps {
  onFiltersClick: () => void;
  onNewPromotionClick: () => void;
}

const PromotionsPageHeader: React.FC<PromotionsPageHeaderProps> = ({
  onFiltersClick,
  onNewPromotionClick
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Promoções</h1>
        <p className="text-muted-foreground">Gerencie suas promoções e descontos</p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onFiltersClick}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" /> Filtros
        </Button>
        <Button onClick={onNewPromotionClick} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Nova Promoção
        </Button>
      </div>
    </div>
  );
};

export default PromotionsPageHeader;
