import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { GoldPrice } from '../../types';

interface PriceChartProps {
  data: GoldPrice[];
  title: string;
  height?: number;
  showArea?: boolean;
}

const PriceChart: React.FC<PriceChartProps> = ({ 
  data, 
  title, 
  height = 300, 
  showArea = false 
}) => {
  const ChartComponent = showArea ? AreaChart : LineChart;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            className="text-xs"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis 
            className="text-xs"
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          
          {showArea ? (
            <>
              <defs>
                <linearGradient id="goldGradient\" x1="0\" y1="0\" x2="0\" y2="1">
                  <stop offset="5%\" stopColor="#D4AF37\" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="price"
                stroke="#D4AF37"
                strokeWidth={2}
                fill="url(#goldGradient)"
              />
            </>
          ) : (
            <Line
              type="monotone"
              dataKey="price"
              stroke="#D4AF37"
              strokeWidth={2}
              dot={{ fill: '#D4AF37', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#B8941F' }}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;