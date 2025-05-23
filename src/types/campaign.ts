export type CampaignChannel = "sms" | "whatsapp" | "email";
export type WhatsAppMessageType = "utility" | "marketing";
export type CampaignStatus = "draft" | "scheduled" | "active" | "completed" | "paused";
export type IncentiveType = "none" | "coupon" | "loyalty" | "cashback";
export type AdPlatform = "meta" | "google" | "tiktok";
export type AdCampaignType = "local_visitors" | "delivery_orders" | "new_dish" | "special_event" | "brand_awareness";
export type CampaignExecutionType = "one-time" | "recurring";
export type CampaignTriggerType = "client_inactivity" | "first_purchase" | "repeat_purchase" | "birthday" | "time_based" | "manual" | "immediate" | "scheduled";
export type ImageGenerationFormat = "square" | "portrait" | "story" | "banner" | "ad";
export type ImageGenerationStatus = "idle" | "generating" | "complete" | "error";
export type FrequencyUnit = "days" | "weeks" | "months";

export interface FrequencySettings {
  interval: number;
  unit: FrequencyUnit;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  format: ImageGenerationFormat;
  width: number;
  height: number;
  platform: string;
  createdAt: string;
}

export interface ImageGenerationOptions {
  prompt: string;
  formats: {
    id: string;
    name: string;
    width: number;
    height: number;
    platform: string;
    selected: boolean;
  }[];
  useRestaurantLogo?: boolean;
  useRestaurantColors?: boolean;
  style?: string;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  customerCount: number;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  discount: number;
  discountType: "percentage" | "fixed";
  expiresAt: string;
  minOrderValue?: number;
  maxUsage?: number;
  usageCount?: number;
  conditions?: {
    products?: string[];
    categories?: string[];
    customerGroups?: string[];
    paymentMethods?: string[];
  };
}

export interface LoyaltyConfig {
  pointsPerReal: number; // Quantos pontos por real gasto
  pointsValue: number; // Valor de cada ponto em reais
  minimumPoints: number; // Mínimo de pontos para resgate
  bonusMultiplier?: number; // Multiplicador de bônus (ex: 2x pontos)
  expirationDays?: number; // Dias para expirar os pontos
}

export interface CashbackConfig {
  percentage: number; // Percentual de cashback
  minOrderValue?: number; // Valor mínimo do pedido
  maxCashback?: number; // Valor máximo de cashback
  creditDays: number; // Dias para creditar o cashback
  expirationDays?: number; // Dias para expirar o cashback
}

export interface CampaignIncentive {
  type: IncentiveType;
  couponId?: string;
  coupon?: Coupon; // Dados completos do cupom
  loyaltyPoints?: number;
  loyaltyConfig?: LoyaltyConfig;
  cashbackConfig?: CashbackConfig;
}

export interface CampaignTrigger {
  type: CampaignTriggerType;
  inactivityDays?: number;
  purchaseCount?: number;
  weekday?: number;
  monthDay?: number;
  time?: string;
  recurringDays?: number[];  // Dias da semana (0 = domingo, 6 = sábado)
  recurringTime?: string;    // Horário de envio para campanhas recorrentes agendadas
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
  generatedImages?: GeneratedImage[];
  campaignStartDate?: string;  // Data de início para campanhas recorrentes
  campaignEndDate?: string;    // Data de término para campanhas recorrentes
  maxFrequency?: FrequencySettings;  // Configuração de frequência máxima
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
