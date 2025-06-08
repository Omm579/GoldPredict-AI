import { GoldPrice, PredictionData, ModelMetrics, NewsItem, TrendAnalysis } from '../types';
import { subDays, format } from 'date-fns';

// Generate historical gold price data
export const generateHistoricalData = (days: number): GoldPrice[] => {
  const data: GoldPrice[] = [];
  const basePrice = 2000; // Starting price around $2000/oz
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const randomChange = (Math.random() - 0.5) * 50;
    const seasonalFactor = Math.sin((i / 365) * 2 * Math.PI) * 20;
    const trendFactor = (days - i) * 0.1;
    
    const price = basePrice + randomChange + seasonalFactor + trendFactor;
    const previousPrice = i < days - 1 ? data[data.length - 1]?.price || price : price;
    const change = price - previousPrice;
    const changePercent = (change / previousPrice) * 100;
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      price: Math.round(price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100
    });
  }
  
  return data;
};

// Generate prediction data
export const generatePredictionData = (period: number): PredictionData[] => {
  const data: PredictionData[] = [];
  const basePrice = 2050;
  
  for (let i = 1; i <= period; i++) {
    const date = format(new Date(Date.now() + i * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
    const trendFactor = Math.sin(i / 10) * 30;
    const randomFactor = (Math.random() - 0.5) * 40;
    const predicted = basePrice + trendFactor + randomFactor + (i * 2);
    const confidence = Math.max(0.6, 1 - (i / period) * 0.4);
    
    data.push({
      date,
      predicted: Math.round(predicted * 100) / 100,
      confidence: Math.round(confidence * 100) / 100
    });
  }
  
  return data;
};

export const mockCurrentPrice: GoldPrice = {
  date: format(new Date(), 'yyyy-MM-dd'),
  price: 2048.75,
  change: 12.30,
  changePercent: 0.6
};

export const mockModelMetrics: ModelMetrics = {
  mae: 8.45,
  rmse: 12.73,
  accuracy: 94.2,
  r2Score: 0.89
};

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Gold Prices Rise Amid Global Economic Uncertainty',
    summary: 'Gold futures climbed to new monthly highs as investors seek safe-haven assets amid geopolitical tensions and inflation concerns.',
    url: 'https://www.cnbctv18.com/market/commodities/gold-prices-rates-india-rise-fall-factors-outlook-investment-correction-19597898.htm',
    publishedAt: '2024-01-15T10:30:00Z',
    source: 'Financial Times'
  },
  {
    id: '2',
    title: 'Federal Reserve Policy Impact on Precious Metals',
    summary: 'Analysts discuss the potential impact of upcoming Federal Reserve decisions on gold and silver market dynamics.',
    url: 'https://www.reuters.com/markets/gold/',
    publishedAt: '2024-01-15T08:15:00Z',
    source: 'Reuters'
  },
  {
    id: '3',
    title: 'Central Bank Gold Purchases Reach Record Levels',
    summary: 'Global central banks continue their gold buying spree, with purchases reaching unprecedented levels in Q4 2023.',
    url: 'https://www.bloomberg.com/quote/XAU:CUR',
    publishedAt: '2024-01-14T16:45:00Z',
    source: 'Bloomberg'
  },
  {
    id: '4',
    title: 'India’s Gold Imports Surge Ahead of Wedding Season',
    summary: 'Gold imports in India surged this month as demand picked up ahead of the traditional wedding season, boosting market optimism.',
    url: 'https://economictimes.indiatimes.com/commoditysummary/symbol-GOLD.cms',
    publishedAt: '2024-01-14T12:20:00Z',
    source: 'Economic Times'
  }
];

export const mockTrendAnalysis: TrendAnalysis = {
  trend: 'upward',
  strength: 'moderate',
  confidence: 85.6,
  recommendation: 'Current market conditions suggest a favorable environment for gold investment. Consider gradual position building.'
};