export type CampaignChannel = "sms" | "whatsapp" | "email";
export type WhatsAppMessageType = "utility" | "marketing";
export type CampaignStatus = "draft" | "scheduled" | "active" | "completed" | "paused";
export type IncentiveType = "none" | "coupon" | "loyalty";
export type AdPlatform = "meta" | "google" | "tiktok";
export type AdCampaignType = "local_visitors" | "delivery_orders" | "new_dish" | "special_event" | "brand_awareness";
export type CampaignExecutionType = "one-time" | "recurring";
export type CampaignTriggerType = "client_inactivity" | "first_purchase" | "repeat_purchase" | "birthday" | "time_based" | "manual";

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

export interface CampaignTrigger {
  type: CampaignTriggerType;
  inactivityDays?: number;
  purchaseCount?: number;
  weekday?: number;
  monthDay?: number;
  time?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  segment: CustomerSegment;
  incentive: CampaignIncentive;
  channel: CampaignChannel;
  whatsappType?: WhatsAppMessageType;
  content: string;
  imageUrl?: string;
  status: CampaignStatus;
  createdAt: string;
  scheduledAt?: string;
  executionType: CampaignExecutionType;
  trigger?: CampaignTrigger;
  isActive?: boolean;
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

export interface FoodServiceAd {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  dishName?: string;
  price?: string;
  discountPercentage?: number;
  callToAction: string;
  platform: AdPlatform;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  phone: string;
  businessHours: string;
  website?: string;
  deliveryOptions: string[];
  cuisineType: string;
  logoUrl?: string;
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
  restaurantInfo?: RestaurantInfo;
  targetAudience?: {
    location: {
      radiusKm: number;
      address: string;
    };
    interests?: string[];
    ageRange?: {
      min: number;
      max: number;
    };
  };
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

// Food Service specific campaign templates
export interface CampaignTemplate {
  id: string;
  name: string;
  type: AdCampaignType;
  description: string;
  platforms: AdPlatform[];
  imageUrl?: string;
  adTemplates: {
    headline: string;
    description: string;
    callToAction: string;
  }[];
}
