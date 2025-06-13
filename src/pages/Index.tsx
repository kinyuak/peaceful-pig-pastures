
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';
import PigManagement from '@/components/PigManagement';
import FarmCalendar from '@/components/FarmCalendar';
import AddPigForm from '@/components/AddPigForm';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showAddPigForm, setShowAddPigForm] = useState(false);

  const handleAddPig = () => {
    setShowAddPigForm(true);
    // If not on pig management page, switch to it
    if (activeTab !== 'pigs') {
      setActiveTab('pigs');
    }
  };

  const handleSavePig = (pigData: any) => {
    console.log('New pig data:', pigData);
    // Here you would typically save to database
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
        onTabChange={setActiveTab}
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
