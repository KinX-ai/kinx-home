export interface HotspotTag {
  id: string;
  xPercent: number; // 0 to 100 for position on mockup
  yPercent: number;
  title: string;
  description: string;
  badge: string;
  iconName?: string;
}

export interface FeatureModule {
  id: string;
  name: string;
  tagline: string;
  category: 'core' | 'video' | 'image' | 'script' | 'ecommerce';
  badge: string;
  badgeColor: string;
  icon: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  uiMockup: {
    title: string;
    subtitle: string;
    tabs: string[];
    activeTab: string;
    sampleContent: any;
    controlBar: {
      model?: string;
      threads?: number;
      ratio?: string;
      resolution?: string;
      customInfo?: string;
    };
  };
  hotspots: HotspotTag[];
  realImage?: string;
  imageCaption?: string;
}

export interface SectionConfig {
  id: string;
  title?: string;
  name?: string;
  description: string;
  visible?: boolean;
  enabled?: boolean;
  order: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  targetAudience: string;
  priceFormatted: string;
  originalPrice?: string;
  billingPeriod: string;
  subHighlight?: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  specs?: {
    devices?: string;
    updates?: string;
    support?: string;
    veoAccess?: string;
  };
  ctaText?: string;
  ctaType?: 'primary' | 'secondary';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  channelName: string;
  avatar: string;
  stats: string;
  quote: string;
  verified: boolean;
  platform: 'youtube' | 'tiktok' | 'facebook';
}

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  category: 'installation' | 'features' | 'pricing' | 'support';
}

export interface UserSession {
  isLoggedIn: boolean;
  email: string;
  username: string;
  packageName: string;
  expireDate?: string;
}
