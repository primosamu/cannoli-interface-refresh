
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingBag, 
  Clock, 
  DollarSign, 
  Ticket, 
  Users, 
  Package,
  PercentIcon, 
  MoreVertical,
  PencilLine,
  CreditCard,
  Truck,
  Gift
} from "lucide-react";
import { Promotion, PromotionType } from "@/types/promotion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { formatDate, getDaysRemaining } from "@/utils/promotionUtils";

// Helper function to get the appropriate icon for a promotion type
export const getPromotionIcon = (type: PromotionType) => {
  switch (type) {
    case "product_discount":
      return <ShoppingBag className="h-5 w-5" />;
    case "happy_hour":
      return <Clock className="h-5 w-5" />;
    case "minimum_order":
      return <DollarSign className="h-5 w-5" />;
    case "coupon_discount":
      return <Ticket className="h-5 w-5" />;
    case "loyalty_reward":
      return <Users className="h-5 w-5" />;
    case "combo_promotion":
      return <Package className="h-5 w-5" />;
    case "buy_x_get_y":
      return <Gift className="h-5 w-5" />;
    case "free_delivery":
      return <Truck className="h-5 w-5" />;
    default:
      return <PercentIcon className="h-5 w-5" />;
  }
};

interface PromotionCardProps {
  promotion: Promotion;
  onShowAnalytics: (promotion: Promotion) => void;
  mockCustomerGroups: Array<{ id: string; name: string }>;
  mockProducts: Array<{ id: string; name: string }>;
  mockPaymentMethods: Array<{ id: string; name: string }>;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  promotion,
  onShowAnalytics,
  mockCustomerGroups,
  mockProducts,
  mockPaymentMethods
}) => {
  const { toast } = useToast();

  return (
    <Card key={promotion.id} className="overflow-hidden">
      <div className="border-l-4 border-primary p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              {getPromotionIcon(promotion.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{promotion.name}</h3>
                <Badge 
                  variant={promotion.status === "active" ? "default" : 
                          promotion.status === "scheduled" ? "outline" : 
                          promotion.status === "expired" ? "secondary" : "destructive"}
                  className={promotion.status === "active" ? "bg-green-500" : ""}
                >
                  {promotion.status === "active" ? "Ativa" : 
                   promotion.status === "scheduled" ? "Agendada" : 
                   promotion.status === "expired" ? "Expirada" : "Rascunho"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{promotion.description}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  Válida: {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({getDaysRemaining(promotion.endDate)} dias restantes)
                </span>
              </div>
              
              {/* Additional details section */}
              <div className="mt-2 flex flex-wrap gap-2">
                {promotion.type === "buy_x_get_y" && (
                  <Badge variant="outline" className="text-xs">
                    Compre {promotion.conditions.buyQuantity} e Ganhe {promotion.conditions.getQuantity}
                  </Badge>
                )}
                {promotion.conditions.customerGroups && promotion.conditions.customerGroups.length > 0 && (
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {promotion.conditions.customerGroups.map(group => 
                      mockCustomerGroups.find(g => g.id === group)?.name
                    ).join(", ")}
                  </Badge>
                )}
                {promotion.conditions.products && promotion.conditions.products.length > 0 && (
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <ShoppingBag className="h-3 w-3" />
                    {promotion.conditions.products.map(product => 
                      mockProducts.find(p => p.id === product)?.name
                    ).join(", ")}
                  </Badge>
                )}
                {promotion.conditions.paymentMethods && promotion.conditions.paymentMethods.length > 0 && (
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    {promotion.conditions.paymentMethods.map(method => 
                      mockPaymentMethods.find(m => m.id === method)?.name
                    ).join(", ")}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="font-medium">
              {promotion.type === "buy_x_get_y" 
                ? `${promotion.conditions.getQuantity} grátis`
                : promotion.discountType === "percentage" 
                  ? `${promotion.discountValue}% OFF` 
                  : `R$ ${promotion.discountValue.toFixed(2)} OFF`}
            </Badge>
            <div className="text-sm">
              Uso: {promotion.conditions.usageCount} vezes
            </div>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onShowAnalytics(promotion)}>
                    Ver métricas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({
                    title: "Edição em breve",
                    description: "Esta funcionalidade será implementada em breve."
                  })}>
                    Editar promoção
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PromotionCard;
