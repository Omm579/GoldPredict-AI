import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { PredictionData } from '../../types';

interface PredictionChartProps {
  data: PredictionData[];
  title: string;
  height?: number;
}

const PredictionChart: React.FC<PredictionChartProps> = ({ data, title, height = 350 }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
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
            formatter={(value: number, name: string) => [
              name === 'predicted' ? `$${value.toFixed(2)}` : `${(value * 100).toFixed(1)}%`,
              name === 'predicted' ? 'Predicted Price' : 'Confidence'
            ]}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          
          <ReferenceLine y={2000} stroke="#ef4444" strokeDasharray="5 5" />
          
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: '#059669' }}
          />
          
          <Line
            type="monotone"
            dataKey="confidence"
            stroke="#6366f1"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            yAxisId="right"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;