
export type CampaignChannel = "sms" | "whatsapp" | "email";
export type CampaignStatus = "draft" | "scheduled" | "active" | "completed" | "paused";
export type IncentiveType = "none" | "coupon" | "loyalty";

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  customerCount: number;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
  expiresAt: string;
}

export interface CampaignIncentive {
  type: IncentiveType;
  couponId?: string;
  loyaltyPoints?: number;
}

export interface Campaign {
  id: string;
  name: string;
  segment: CustomerSegment;
  incentive: CampaignIncentive;
  channel: CampaignChannel;
  content: string;
  imageUrl?: string;
  status: CampaignStatus;
  createdAt: string;
  scheduledAt?: string;
}
