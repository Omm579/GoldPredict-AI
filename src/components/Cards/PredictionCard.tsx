import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PredictionCardProps {
  period: string;
  price: number;
  confidence: number;
  change: number;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ 
  period, 
  price, 
  confidence, 
  change 
}) => {
  const getTrendIcon = () => {
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const Icon = getTrendIcon();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {period} Forecast
        </h3>
        <Icon className={`w-6 h-6 ${getTrendColor()}`} />
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Predicted Price</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${price.toFixed(2)}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Change</p>
            <p className={`text-lg font-semibold ${getTrendColor()}`}>
              {change > 0 ? '+' : ''}{change.toFixed(2)}%
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Confidence</p>
            <p className="text-lg font-semibold text-blue-600">
              {(confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 group-hover:bg-blue-500"
            style={{ width: `${confidence * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;