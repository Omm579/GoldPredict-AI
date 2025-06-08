export interface GoldPrice {
  date: string;
  price: number;
  change?: number;
  changePercent?: number;
}

export interface PredictionData {
  date: string;
  predicted: number;
  confidence: number;
  actual?: number;
}

export interface ModelMetrics {
  mae: number;
  rmse: number;
  accuracy: number;
  r2Score: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  source: string;
}

export interface TrendAnalysis {
  trend: 'upward' | 'downward' | 'sideways';
  strength: 'weak' | 'moderate' | 'strong';
  confidence: number;
  recommendation: string;
}

export type TimeRange = '7d' | '15d' | '30d' | '90d' | '1y';
export type PredictionPeriod = '7d' | '15d' | '30d';