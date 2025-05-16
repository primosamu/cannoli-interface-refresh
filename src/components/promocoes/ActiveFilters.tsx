
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  typeFilter: string;
  productFilter: string;
  customerGroupFilter: string;
  paymentMethodFilter: string;
  setTypeFilter: (value: string) => void;
  setProductFilter: (value: string) => void;
  setCustomerGroupFilter: (value: string) => void;
  setPaymentMethodFilter: (value: string) => void;
  resetFilters: () => void;
  mockProducts: Array<{ id: string; name: string }>;
  mockCategories: Array<{ id: string; name: string }>;
  mockCustomerGroups: Array<{ id: string; name: string }>;
  mockPaymentMethods: Array<{ id: string; name: string }>;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  typeFilter,
  productFilter,
  customerGroupFilter,
  paymentMethodFilter,
  setTypeFilter,
  setProductFilter,
  setCustomerGroupFilter,
  setPaymentMethodFilter,
  resetFilters,
  mockProducts,
  mockCategories,
  mockCustomerGroups,
  mockPaymentMethods
}) => {
  if (typeFilter === "all" && 
      productFilter === "all" && 
      customerGroupFilter === "all" && 
      paymentMethodFilter === "all") {
    return null;
  }
  
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      <span>Filtros ativos:</span>
      {typeFilter !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1">
          Tipo: {typeFilter === "product_discount" ? "Desconto em produtos" : 
                 typeFilter === "time_limited" ? "Tempo limitado" :
                 typeFilter === "order_value_discount" ? "Desconto por valor" :
                 typeFilter === "combo_discount" ? "Desconto em combos" :
                 typeFilter === "buy_x_get_y" ? "Compre X Ganhe Y" :
                 typeFilter === "coupon" ? "Cupom" : "Pontos de fidelidade"}
          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setTypeFilter("all")} />
        </Badge>
      )}
      {productFilter !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1">
          Produto/Categoria: {mockProducts.find(p => p.id === productFilter)?.name || 
                             mockCategories.find(c => c.id === productFilter)?.name}
          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setProductFilter("all")} />
        </Badge>
      )}
      {customerGroupFilter !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1">
          Grupo de Clientes: {mockCustomerGroups.find(g => g.id === customerGroupFilter)?.name}
          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setCustomerGroupFilter("all")} />
        </Badge>
      )}
      {paymentMethodFilter !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1">
          Forma de Pagamento: {mockPaymentMethods.find(m => m.id === paymentMethodFilter)?.name}
          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setPaymentMethodFilter("all")} />
        </Badge>
      )}
      <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6 px-2 text-xs">
        Limpar filtros
      </Button>
    </div>
  );
};

export default ActiveFilters;
