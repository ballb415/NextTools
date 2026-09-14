export type ToolCategory = "pdf" | "image" | "ai" | "conversion";

export interface ToolItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  category: ToolCategory;
  categoryName: string;
  iconName: string;
  href: string;
  isPopular?: boolean;
  isNew?: boolean;
  creditCost: number;
  badge?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  period: "month" | "one-time";
  description: string;
  credits: number;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  badge?: string;
}

export interface UserSessionPlaceholder {
  isLoggedIn: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    plan: "free" | "pro";
    credits: number;
  };
}

export interface AdminMetricsPlaceholder {
  totalRevenueThb: number;
  activeUsers: number;
  proSubscribers: number;
  creditsConsumedToday: number;
  totalToolsRun: number;
  systemStatus: "healthy" | "degraded" | "maintenance";
}
