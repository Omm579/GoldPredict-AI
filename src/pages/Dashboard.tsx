import React from 'react';
import { TrendingUp, DollarSign, Target, Activity } from 'lucide-react';
import MetricCard from '../components/Cards/MetricCard';
import PredictionCard from '../components/Cards/PredictionCard';
import PriceChart from '../components/Charts/PriceChart';
import { useGoldData } from '../hooks/useGoldData';

const Dashboard: React.FC = () => {
  const { historicalData, predictionData, currentPrice, modelMetrics, loading } = useGoldData();

  const recentData = historicalData.slice(-7);
  const predictions = [
    { period: '7-Day', price: 2065.30, confidence: 0.92, change: 0.8 },
    { period: '15-Day', price: 2078.45, confidence: 0.87, change: 1.4 },
    { period: '30-Day', price: 2095.80, confidence: 0.82, change: 2.3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gold Price Dashboard
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Current Price"
          value={`$${currentPrice.price.toFixed(2)}`}
          change={currentPrice.changePercent}
          icon={DollarSign}
          color="gold"
          trend={currentPrice.change > 0 ? 'up' : 'down'}
        />
        <MetricCard
          title="Model Accuracy"
          value={`${modelMetrics.accuracy}%`}
          icon={Target}
          color="green"
        />
        <MetricCard
          title="Prediction RMSE"
          value={modelMetrics.rmse.toFixed(2)}
          icon={Activity}
          color="blue"
        />
        <MetricCard
          title="R² Score"
          value={modelMetrics.r2Score.toFixed(3)}
          icon={TrendingUp}
          color="blue"
        />
      </div>

      {/* Price Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceChart
          data={recentData}
          title="7-Day Price History"
          height={300}
          showArea={true}
        />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Price Predictions
          </h3>
          {predictions.map((pred, index) => (
            <PredictionCard key={index} {...pred} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Market Activity
        </h3>
        <div className="space-y-3">
          {recentData.slice(-5).map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${item.change && item.change > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ${item.price.toFixed(2)}
                </span>
                {item.change && (
                  <span className={`text-xs ml-2 ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;