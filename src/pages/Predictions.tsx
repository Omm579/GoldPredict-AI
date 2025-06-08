import React, { useState } from 'react';
import { Calendar, TrendingUp, Brain } from 'lucide-react';
import PredictionChart from '../components/Charts/PredictionChart';
import PredictionCard from '../components/Cards/PredictionCard';
import { useGoldData } from '../hooks/useGoldData';
import { PredictionPeriod } from '../types';

const Predictions: React.FC = () => {
  const { predictionData, fetchPredictions, loading } = useGoldData();
  const [selectedPeriod, setSelectedPeriod] = useState<PredictionPeriod>('7d');

  const periods = [
    { id: '7d' as PredictionPeriod, label: '7 Days', days: 7 },
    { id: '15d' as PredictionPeriod, label: '15 Days', days: 15 },
    { id: '30d' as PredictionPeriod, label: '30 Days', days: 30 },
  ];

  const handlePeriodChange = (period: PredictionPeriod) => {
    setSelectedPeriod(period);
    fetchPredictions(period);
  };

  const predictions = [
    { period: '7-Day', price: 2065.30, confidence: 0.92, change: 0.8 },
    { period: '15-Day', price: 2078.45, confidence: 0.87, change: 1.4 },
    { period: '30-Day', price: 2095.80, confidence: 0.82, change: 2.3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Price Predictions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            AI-powered gold price forecasting using advanced machine learning models
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Brain className="w-4 h-4" />
          <span>LSTM Neural Network</span>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Calendar className="w-5 h-5 text-gold-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Prediction Period
          </h3>
        </div>
        <div className="flex space-x-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => handlePeriodChange(period.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-gradient-gold text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {predictions.map((pred, index) => (
          <PredictionCard key={index} {...pred} />
        ))}
      </div>

      {/* Prediction Chart */}
      <PredictionChart
        data={predictionData}
        title={`${periods.find(p => p.id === selectedPeriod)?.label} Price Forecast`}
        height={400}
      />

      {/* Model Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Model Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Current Model: LSTM Neural Network
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 3-layer LSTM architecture</li>
              <li>• Trained on 5 years of historical data</li>
              <li>• Includes technical indicators</li>
              <li>• Real-time model updates</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Features Used
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Historical price data</li>
              <li>• Trading volume</li>
              <li>• Market volatility</li>
              <li>• Economic indicators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;