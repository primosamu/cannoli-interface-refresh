
export type PromotionType = 
  | "product_discount" 
  | "time_limited" 
  | "order_value_discount" 
  | "coupon" 
  | "loyalty_points"
  | "combo_discount";

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
  description: string;
  type: PromotionType;
  discountValue: number;
  discountType: "percentage" | "fixed";
  startDate: string;
  endDate: string;
  status: PromotionStatus;
  conditions: PromotionCondition;
  isAccumulative: boolean;
  priority: number;
  statistics: PromotionStatistics;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  targetCustomers?: string[];
  code?: string;
  categoryRestrictions?: string[];
  maxUsagesPerCustomer?: number;
}
