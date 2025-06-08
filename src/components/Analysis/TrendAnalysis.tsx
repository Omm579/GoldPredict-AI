import React from 'react';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import { TrendAnalysis as TrendAnalysisType } from '../../types';

interface TrendAnalysisProps {
  analysis: TrendAnalysisType;
}

const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ analysis }) => {
  const getTrendIcon = () => {
    switch (analysis.trend) {
      case 'upward': return TrendingUp;
      case 'downward': return TrendingDown;
      default: return Minus;
    }
  };

  const getTrendColor = () => {
    switch (analysis.trend) {
      case 'upward': return 'text-green-600';
      case 'downward': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStrengthColor = () => {
    switch (analysis.strength) {
      case 'strong': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const TrendIcon = getTrendIcon();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Trend Analysis
        </h3>
        <Target className="w-6 h-6 text-gold-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getTrendColor().replace('text-', 'bg-').replace('600', '100')} mb-3 mx-auto`}>
            <TrendIcon className={`w-6 h-6 ${getTrendColor()}`} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Trend Direction</p>
          <p className={`text-lg font-semibold capitalize ${getTrendColor()}`}>
            {analysis.trend}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-3 mx-auto">
            <div className={`w-6 h-6 rounded-full ${getStrengthColor()}`} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Trend Strength</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
            {analysis.strength}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-3 mx-auto">
            <span className="text-lg font-bold text-purple-600">
              {Math.round(analysis.confidence)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Confidence</p>
          <p className="text-lg font-semibold text-purple-600">
            High
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Investment Recommendation
        </h4>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200">
            {analysis.recommendation}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${analysis.confidence}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
          Analysis Confidence: {analysis.confidence.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

export default TrendAnalysis;