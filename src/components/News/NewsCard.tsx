import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import { NewsItem } from '../../types';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gold-600 transition-colors">
          {news.title}
        </h3>
        <a href={news.url} target="_blank" rel="noopener noreferrer">
  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gold-500 transition-colors flex-shrink-0 ml-2" />
</a>

      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {news.summary}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium">{news.source}</span>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{formatDate(news.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;