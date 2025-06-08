import { useState, useEffect } from 'react';
import { GoldPrice, PredictionData, ModelMetrics, TrendAnalysis, TimeRange, PredictionPeriod } from '../types';
import { 
  generateHistoricalData, 
  generatePredictionData, 
  mockCurrentPrice, 
  mockModelMetrics, 
  mockTrendAnalysis 
} from '../data/mockData';

export const useGoldData = () => {
  const [historicalData, setHistoricalData] = useState<GoldPrice[]>([]);
  const [predictionData, setPredictionData] = useState<PredictionData[]>([]);
  const [currentPrice, setCurrentPrice] = useState<GoldPrice>(mockCurrentPrice);
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics>(mockModelMetrics);
  const [trendAnalysis, setTrendAnalysis] = useState<TrendAnalysis>(mockTrendAnalysis);
  const [loading, setLoading] = useState(false);

  const fetchHistoricalData = async (timeRange: TimeRange) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const days = {
      '7d': 7,
      '15d': 15,
      '30d': 30,
      '90d': 90,
      '1y': 365
    }[timeRange];
    
    const data = generateHistoricalData(days);
    setHistoricalData(data);
    setLoading(false);
  };

  const fetchPredictions = async (period: PredictionPeriod) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const days = {
      '7d': 7,
      '15d': 15,
      '30d': 30
    }[period];
    
    const data = generatePredictionData(days);
    setPredictionData(data);
    setLoading(false);
  };

  const refreshCurrentPrice = async () => {
    // Simulate real-time price update
    const newPrice = {
      ...mockCurrentPrice,
      price: mockCurrentPrice.price + (Math.random() - 0.5) * 10,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 2
    };
    setCurrentPrice(newPrice);
  };

  useEffect(() => {
    fetchHistoricalData('30d');
    fetchPredictions('7d');
    
    // Set up real-time price updates
    const interval = setInterval(refreshCurrentPrice, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return {
    historicalData,
    predictionData,
    currentPrice,
    modelMetrics,
    trendAnalysis,
    loading,
    fetchHistoricalData,
    fetchPredictions,
    refreshCurrentPrice
  };
};