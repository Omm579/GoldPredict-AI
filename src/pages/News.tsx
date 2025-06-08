import React, { useState, useEffect } from 'react';
import { Newspaper, Clock, ExternalLink } from 'lucide-react';
import NewsCard from '../components/News/NewsCard';
import { mockNews } from '../data/mockData';
import { NewsItem } from '../types';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Market News
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Latest gold market news and analysis from trusted sources
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Updated 5 min ago</span>
        </div>
      </div>

      {/* Featured News */}
      <div className="bg-gradient-gold rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Newspaper className="w-6 h-6" />
          <h2 className="text-xl font-bold">Featured Story</h2>
        </div>
        <h3 className="text-2xl font-bold mb-3">
          {news[0]?.title}
        </h3>
        <p className="text-gold-100 mb-4">
          {news[0]?.summary}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-gold-200">
            {news[0]?.source}
          </span>
          <a
  href={"https://www.cnbctv18.com/market/commodities/gold-prices-rates-india-rise-fall-factors-outlook-investment-correction-19597898.htm"}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg"
>
  <span>Read More</span>
  <ExternalLink className="w-4 h-4" />
</a>

        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(1).map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>

      {/* Market Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Market Alerts
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Gold breaks above $2,050 resistance level
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                2 hours ago
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                High trading volume detected in gold futures
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                4 hours ago
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Federal Reserve meeting scheduled for next week
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                6 hours ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;