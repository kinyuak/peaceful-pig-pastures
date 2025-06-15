
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';
import PigManagement from '@/components/PigManagement';
import FarmCalendar from '@/components/FarmCalendar';
import AddPigForm from '@/components/AddPigForm';

interface IndexProps {
  defaultTab?: "home" | "pigs" | "calendar";
}

const TABS = ["home", "pigs", "calendar"] as const;
type TabType = typeof TABS[number];

const Index = ({ defaultTab }: IndexProps) => {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab || 'home');
  const [showAddPigForm, setShowAddPigForm] = useState(false);

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const handleAddPig = () => {
    setShowAddPigForm(true);
    if (activeTab !== 'pigs') {
      setActiveTab('pigs');
    }
  };

  const handleTabChange = (tab: string) => {
    // Only allow valid tabs
    if (TABS.includes(tab as TabType)) {
      setActiveTab(tab as TabType);
    }
  };

  const handleSavePig = (pigData: any) => {
    console.log('New pig data:', pigData);
    setShowAddPigForm(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage />;
      case 'pigs':
        return <PigManagement onAddPig={handleAddPig} />;
      case 'calendar':
        return <FarmCalendar />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onAddPig={handleAddPig}
      />
      {renderContent()}
      {showAddPigForm && (
        <AddPigForm
          onClose={() => setShowAddPigForm(false)}
          onSave={handleSavePig}
        />
      )}
    </div>
  );
};

export default Index;
