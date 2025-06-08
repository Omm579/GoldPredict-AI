import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Upload, 
  Newspaper, 
  Settings, 
  Target,
  LineChart,
  DollarSign 
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'predictions', label: 'Predictions', icon: TrendingUp },
  { id: 'charts', label: 'Charts', icon: LineChart },
  { id: 'analysis', label: 'Analysis', icon: Target },
  { id: 'upload', label: 'Upload Data', icon: Upload },
  { id: 'news', label: 'Market News', icon: Newspaper },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, isCollapsed }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                GoldPredict
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI Forecasting</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors duration-200 ${
                isActive 
                  ? 'bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 border-r-2 border-gold-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;