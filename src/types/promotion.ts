

export type PromotionType = 
  | "product_discount"     // Desconto em produtos específicos
  | "combo_promotion"      // Combo de produtos
  | "happy_hour"          // Promoções por horário
  | "loyalty_reward"      // Fidelidade (cashback, pontos)
  | "coupon_discount"     // Cupom de desconto
  | "buy_x_get_y"         // Compre X Ganhe Y
  | "free_delivery"       // Frete grátis
  | "minimum_order";      // Desconto por valor mínimo

export type PromotionCategory = "desconto" | "combo" | "fidelidade" | "horario" | "cupom";

export type PromotionStatus = "active" | "scheduled" | "expired" | "draft";

export interface PromotionCondition {
  minOrderValue?: number;
  maxOrderValue?: number;
  customerGroups?: string[];
  paymentMethods?: string[];
  products?: string[];
  categories?: string[];
  usageLimit?: number;
  usageCount: number;
  buyQuantity?: number;
  getQuantity?: number;
  excludeProducts?: string[];
  scheduledDays?: string[];
  timeSlots?: Array<{ start: string; end: string }>;
  deliveryZones?: string[];
  maxUsagePerCustomer?: number;
}

export interface PromotionStatistics {
  usageCount: number;
  revenue: number;
  discountTotal: number;
  averageOrderValue: number;
  conversionRate?: number;
  customerRetention?: number;
}

export interface Promotion {
  id: string;
  name: string;
  code: string;
  description: string;
  type: PromotionType;
  category: PromotionCategory;
  discountValue: number;
  discountType: "percentage" | "fixed";
  startDate: string;
  endDate: string;
  status: PromotionStatus;
  isActive: boolean;
  conditions: PromotionCondition;
  isAccumulative: boolean;
  priority: number;
  statistics: PromotionStatistics;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  targetCustomers?: string[];
  categoryRestrictions?: string[];
  maxUsagesPerCustomer?: number;
}
