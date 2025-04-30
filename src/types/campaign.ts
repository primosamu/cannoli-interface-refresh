
export type CampaignChannel = "sms" | "whatsapp" | "email";
export type WhatsAppMessageType = "utility" | "marketing";
export type CampaignStatus = "draft" | "scheduled" | "active" | "completed" | "paused";
export type IncentiveType = "none" | "coupon" | "loyalty";
export type AdPlatform = "meta" | "google" | "tiktok";
export type AdCampaignType = "awareness" | "consideration" | "conversion" | "sales" | "traffic" | "leads" | "app_installs";

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
  whatsappType?: WhatsAppMessageType;
  content: string;
  imageUrl?: string;
  status: CampaignStatus;
  createdAt: string;
  scheduledAt?: string;
}

export interface AdCreative {
  id: string;
  name: string;
  type: "image" | "video" | "carousel" | "collection";
  headline?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  callToAction?: string;
  previewUrl?: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  platform: AdPlatform;
  type: AdCampaignType;
  budget: number;
  dailyBudget?: number;
  startDate: string;
  endDate?: string;
  status: CampaignStatus;
  creatives: AdCreative[];
  targetingOptions?: Record<string, any>;
  metrics?: {
    impressions: number;
    clicks: number;
    ctr: number;
    spend: number;
    conversions: number;
    costPerConversion: number;
    roi: number;
  };
  reportData?: {
    dateRange: string;
    engagementRate?: number;
    reachIncrease?: number;
    audienceOverlap?: number;
    conversionRate?: number;
    topPerformingAd?: string;
  };
}
