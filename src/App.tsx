import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Charts from './pages/Charts';
import Analysis from './pages/Analysis';
import Upload from './pages/Upload';
import News from './pages/News';
import Settings from './pages/Settings';
import { useGoldData } from './hooks/useGoldData';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { currentPrice, refreshCurrentPrice } = useGoldData();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'predictions': return <Predictions />;
      case 'charts': return <Charts />;
      case 'analysis': return <Analysis />;
      case 'upload': return <Upload />;
      case 'news': return <News />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={sidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentPrice={currentPrice.price}
          priceChange={currentPrice.change || 0}
          onRefreshPrice={refreshCurrentPrice}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;