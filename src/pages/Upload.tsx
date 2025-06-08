import React, { useState } from 'react';
import { Upload as UploadIcon, FileText, Database } from 'lucide-react';
import FileUpload from '../components/Upload/FileUpload';
import PriceChart from '../components/Charts/PriceChart';
import { GoldPrice } from '../types';

const Upload: React.FC = () => {
  const [uploadedData, setUploadedData] = useState<GoldPrice[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);

  const handleFileUpload = async (file: File) => {
    const text = await file.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    
    const data: GoldPrice[] = lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        date: values[0],
        price: parseFloat(values[1]),
        change: values[2] ? parseFloat(values[2]) : undefined,
        changePercent: values[3] ? parseFloat(values[3]) : undefined
      };
    }).filter(item => item.date && !isNaN(item.price));

    setUploadedData(data);
    
    // Simulate ML prediction on uploaded data
    setTimeout(() => {
      const mockPredictions = data.slice(-7).map((item, index) => ({
        date: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predicted: item.price + (Math.random() - 0.5) * 50,
        confidence: 0.8 + Math.random() * 0.15
      }));
      setPredictions(mockPredictions);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Upload Custom Data
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload your own gold price data for custom predictions and analysis
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Database className="w-4 h-4" />
          <span>CSV Format</span>
        </div>
      </div>

      {/* File Upload */}
      <FileUpload onFileUpload={handleFileUpload} />

      {/* Uploaded Data Visualization */}
      {uploadedData.length > 0 && (
        <div className="space-y-6">
          <PriceChart
            data={uploadedData}
            title="Uploaded Data Visualization"
            height={400}
            showArea={true}
          />

          {/* Data Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Data Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Records</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {uploadedData.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Date Range</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {uploadedData[0]?.date} to {uploadedData[uploadedData.length - 1]?.date}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Price</p>
                <p className="text-2xl font-bold text-gold-600">
                  ${(uploadedData.reduce((sum, item) => sum + item.price, 0) / uploadedData.length).toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Price Range</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  ${Math.min(...uploadedData.map(d => d.price)).toFixed(2)} - 
                  ${Math.max(...uploadedData.map(d => d.price)).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Predictions from Uploaded Data */}
          {predictions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Predictions Based on Your Data
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {predictions.map((pred, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        Day {index + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(pred.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      ${pred.predicted.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Confidence: {(pred.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sample Data Format */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Sample Data Format
        </h3>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
          <div className="text-gray-900 dark:text-white mb-2">CSV Structure:</div>
          <div className="text-gray-600 dark:text-gray-400">
            Date,Price,Change,ChangePercent<br/>
            2024-01-01,2050.25,12.30,0.6<br/>
            2024-01-02,2048.75,-1.50,-0.07<br/>
            2024-01-03,2055.00,6.25,0.31<br/>
            ...
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Tips for Best Results:
          </h4>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>• Include at least 30 days of historical data</li>
            <li>• Ensure consistent date format (YYYY-MM-DD)</li>
            <li>• Remove any missing or invalid price entries</li>
            <li>• More data generally leads to better predictions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;