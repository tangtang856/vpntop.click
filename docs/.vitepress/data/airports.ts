import airportsData from './airports.json';

export interface Plan {
  name: string;
  price: number;
  period: string;
  traffic: number;
  unitPricePerGb: number;
  features: string[];
}

export interface Airport {
  id: string;
  name: string;
  slug: string;
  description: string;
  officialUrl: string;
  affiliateUrl: string;
  coupon?: string;
  startingPrice: number;
  currency: string;
  plans: Plan[];
  protocols: string[];
  regions: string[];
  deviceLimit: string;
  aiSupport: string[];
  streamingSupport: string[];
  advantages: string[];
  disadvantages: string[];
  suitableFor: string[];
  sources: string[];
  lastVerified: string;
  testStatus: string;
}

export const airports: Airport[] = airportsData as Airport[];
