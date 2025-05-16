
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface PromotionFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  productFilter: string;
  setProductFilter: (value: string) => void;
  customerGroupFilter: string;
  setCustomerGroupFilter: (value: string) => void;
  paymentMethodFilter: string;
  setPaymentMethodFilter: (value: string) => void;
  resetFilters: () => void;
  mockProducts: Array<{ id: string; name: string }>;
  mockCategories: Array<{ id: string; name: string }>;
  mockCustomerGroups: Array<{ id: string; name: string }>;
  mockPaymentMethods: Array<{ id: string; name: string }>;
}

const PromotionFiltersDialog: React.FC<PromotionFiltersDialogProps> = ({
  open,
  onOpenChange,
  typeFilter,
  setTypeFilter,
  productFilter,
  setProductFilter,
  customerGroupFilter,
  setCustomerGroupFilter,
  paymentMethodFilter,
  setPaymentMethodFilter,
  resetFilters,
  mockProducts,
  mockCategories,
  mockCustomerGroups,
  mockPaymentMethods
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Filtrar Promoções</DialogTitle>
          <DialogDescription>
            Selecione os filtros para encontrar promoções específicas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filter-type" className="text-right">
              Tipo
            </Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="filter-type" className="col-span-3">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="product_discount">Desconto em produtos</SelectItem>
                <SelectItem value="time_limited">Tempo limitado</SelectItem>
                <SelectItem value="order_value_discount">Desconto por valor</SelectItem>
                <SelectItem value="combo_discount">Desconto em combos</SelectItem>
                <SelectItem value="buy_x_get_y">Compre X Ganhe Y</SelectItem>
                <SelectItem value="coupon">Cupom</SelectItem>
                <SelectItem value="loyalty_points">Pontos de fidelidade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filter-product" className="text-right">
              Produto/Categoria
            </Label>
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger id="filter-product" className="col-span-3">
                <SelectValue placeholder="Todos os produtos/categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os produtos/categorias</SelectItem>
                <div className="px-2 py-1.5 text-sm font-semibold">Produtos</div>
                {mockProducts.map(product => (
                  <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                ))}
                <div className="px-2 py-1.5 text-sm font-semibold">Categorias</div>
                {mockCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filter-customer" className="text-right">
              Grupo de Clientes
            </Label>
            <Select value={customerGroupFilter} onValueChange={setCustomerGroupFilter}>
              <SelectTrigger id="filter-customer" className="col-span-3">
                <SelectValue placeholder="Todos os grupos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os grupos</SelectItem>
                {mockCustomerGroups.map(group => (
                  <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filter-payment" className="text-right">
              Forma de Pagamento
            </Label>
            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger id="filter-payment" className="col-span-3">
                <SelectValue placeholder="Todas as formas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as formas</SelectItem>
                {mockPaymentMethods.map(method => (
                  <SelectItem key={method.id} value={method.id}>{method.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={resetFilters}>
            Limpar Filtros
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionFiltersDialog;
