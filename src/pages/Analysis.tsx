import React from 'react';
import { Target, TrendingUp, Brain } from 'lucide-react';
import TrendAnalysis from '../components/Analysis/TrendAnalysis';
import MetricCard from '../components/Cards/MetricCard';
import { useGoldData } from '../hooks/useGoldData';

const Analysis: React.FC = () => {
  const { modelMetrics, trendAnalysis } = useGoldData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Market Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Advanced analytical insights and model performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Brain className="w-4 h-4" />
          <span>AI Analysis</span>
        </div>
      </div>

      {/* Model Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Mean Absolute Error"
          value={`$${modelMetrics.mae.toFixed(2)}`}
          icon={Target}
          color="blue"
        />
        <MetricCard
          title="Root Mean Square Error"
          value={`$${modelMetrics.rmse.toFixed(2)}`}
          icon={TrendingUp}
          color="red"
        />
        <MetricCard
          title="Model Accuracy"
          value={`${modelMetrics.accuracy.toFixed(1)}%`}
          icon={Brain}
          color="green"
        />
        <MetricCard
          title="R² Score"
          value={modelMetrics.r2Score.toFixed(3)}
          icon={Target}
          color="gold"
        />
      </div>

      {/* Trend Analysis */}
      <TrendAnalysis analysis={trendAnalysis} />

      {/* Model Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Model Performance
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Accuracy</span>
                <span className="text-sm font-medium">{modelMetrics.accuracy.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${modelMetrics.accuracy}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">R² Score</span>
                <span className="text-sm font-medium">{modelMetrics.r2Score.toFixed(3)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${modelMetrics.r2Score * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Key Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Model shows high accuracy with low prediction error
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Strong correlation between predicted and actual values
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Current market conditions favor the {trendAnalysis.trend} trend
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recommendation confidence is at {trendAnalysis.confidence.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Technical Analysis Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">BUY</div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Strong upward momentum detected
            </p>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 mb-2">HOLD</div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Market consolidation phase
            </p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">WATCH</div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Monitor key support levels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;