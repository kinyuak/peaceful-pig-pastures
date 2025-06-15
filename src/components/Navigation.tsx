
import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, Calendar, Plus, Grid2x2, List } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, to: "/" },
  { id: 'pigs', label: 'Pig Management', icon: Users, to: "/pigs" },
  { id: 'inventory', label: 'Inventory', icon: Grid2x2, to: "/inventory" },
  { id: 'staff', label: 'Staff Management', icon: List, to: "/staff" },
  { id: 'calendar', label: 'Calendar', icon: Calendar, to: "/calendar" },
];

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onAddPig?: () => void;
}

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-farm-blue-700">
              Peaceful Meadow Farm
            </h1>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex space-x-4">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <NavLink
                    to={tab.to}
                    key={tab.id}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive || location.pathname === tab.to
                          ? 'bg-farm-blue-100 text-farm-blue-700'
                          : 'text-gray-600 hover:text-farm-blue-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
