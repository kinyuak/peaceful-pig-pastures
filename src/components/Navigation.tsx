
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Users, Calendar, Plus } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddPig: () => void;
}

const Navigation = ({ activeTab, onTabChange, onAddPig }: NavigationProps) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'pigs', label: 'Pig Management', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-farm-blue-700">
              Peaceful Meadow Farm
            </h1>
            <div className="flex space-x-4">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-farm-blue-100 text-farm-blue-700'
                        : 'text-gray-600 hover:text-farm-blue-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <Button 
            onClick={onAddPig}
            className="bg-farm-blue-600 hover:bg-farm-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Pig
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
