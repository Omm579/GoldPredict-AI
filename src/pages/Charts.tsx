import React, { useState } from 'react';
import { BarChart3, Calendar, Download } from 'lucide-react';
import PriceChart from '../components/Charts/PriceChart';
import { useGoldData } from '../hooks/useGoldData';
import { TimeRange } from '../types';

const Charts: React.FC = () => {
  const { historicalData, fetchHistoricalData, loading } = useGoldData();
  const [selectedRange, setSelectedRange] = useState<TimeRange>('30d');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const timeRanges = [
    { id: '7d' as TimeRange, label: '7 Days' },
    { id: '15d' as TimeRange, label: '15 Days' },
    { id: '30d' as TimeRange, label: '30 Days' },
    { id: '90d' as TimeRange, label: '3 Months' },
    { id: '1y' as TimeRange, label: '1 Year' },
  ];

  const handleRangeChange = (range: TimeRange) => {
    setSelectedRange(range);
    fetchHistoricalData(range);
  };

  const handleExport = () => {
    const csvContent = historicalData.map(item => 
      `${item.date},${item.price},${item.change || 0},${item.changePercent || 0}`
    ).join('\n');
    
    const blob = new Blob([`Date,Price,Change,Change%\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gold-prices-${selectedRange}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Interactive Charts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive gold price analysis and visualization
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-gold text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Chart Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gold-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Time Range
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => handleRangeChange(range.id)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRange === range.id
                    ? 'bg-gradient-gold text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <BarChart3 className="w-5 h-5 text-gold-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Chart Type
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded font-medium text-sm transition-colors ${
                chartType === 'line'
                  ? 'bg-gold-100 dark:bg-gold-900/20 text-gold-700 dark:text-gold-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gold-600'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded font-medium text-sm transition-colors ${
                chartType === 'area'
                  ? 'bg-gold-100 dark:bg-gold-900/20 text-gold-700 dark:text-gold-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gold-600'
              }`}
            >
              Area
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <PriceChart
        data={historicalData}
        title={`Gold Price - ${timeRanges.find(r => r.id === selectedRange)?.label}`}
        height={500}
        showArea={chartType === 'area'}
      />

      {/* Price Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Price Statistics ({timeRanges.find(r => r.id === selectedRange)?.label})
        </h3>
        
        {historicalData.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Highest</p>
              <p className="text-xl font-bold text-green-600">
                ${Math.max(...historicalData.map(d => d.price)).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Lowest</p>
              <p className="text-xl font-bold text-red-600">
                ${Math.min(...historicalData.map(d => d.price)).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Average</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ${(historicalData.reduce((sum, d) => sum + d.price, 0) / historicalData.length).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Volatility</p>
              <p className="text-xl font-bold text-blue-600">
                {(Math.max(...historicalData.map(d => d.price)) - Math.min(...historicalData.map(d => d.price))).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;