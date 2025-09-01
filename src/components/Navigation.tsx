
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, Calendar, Plus, Grid2x2, List, FileText, Menu, Eye } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, to: "/" },
  { id: 'pigs', label: 'Pig Management', icon: Users, to: "/pigs" },
  { id: 'inventory', label: 'Inventory', icon: Grid2x2, to: "/inventory" },
  { id: 'sales', label: 'Sales', icon: FileText, to: "/sales" },
  { id: 'staff', label: 'Staff Management', icon: List, to: "/staff" },
  { id: 'calendar', label: 'Calendar', icon: Calendar, to: "/calendar" },
];

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onAddPig?: () => void;
}

const Navigation = ({ activeTab, onTabChange, onAddPig }: NavigationProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const getIsActive = (tab: (typeof tabs)[number]) => {
    if (activeTab && onTabChange) {
      return activeTab === tab.id;
    }
    return location.pathname === tab.to;
  };

  return (
    <nav className="bg-card shadow-lg border-b border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row, with logo & burger/menu button (mobile) */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">
              AgriHerd Solutions
            </h1>
          </div>
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-accent text-accent-foreground hover:bg-accent/80"
            >
              <Eye className="h-4 w-4" />
              <span>{showDemo ? 'Hide Demo' : 'Show Demo'}</span>
            </button>
            {showDemo && (
              <div className="flex space-x-4 animate-fade-in">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = getIsActive(tab);
                  return (
                    <div key={tab.id} className="flex items-center space-x-1">
                      <NavLink
                        to={tab.to}
                        className={
                          `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ` +
                          (isActive
                            ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                            : 'text-muted-foreground hover:text-primary hover:bg-primary/5')
                        }
                        onClick={onTabChange ? () => onTabChange(tab.id) : undefined}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </NavLink>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Mobile nav burger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Open menu"
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <Menu className="h-6 w-6 text-primary" />
            </button>
          </div>
        </div>
        {/* Mobile menu (collapsible) */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col mt-2 pb-4 animate-fade-in">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="flex items-center space-x-2 px-3 py-2 mb-2 rounded-lg text-base font-medium transition-all duration-200 bg-accent text-accent-foreground hover:bg-accent/80"
            >
              <Eye className="h-5 w-5" />
              <span>{showDemo ? 'Hide Demo' : 'Show Demo'}</span>
            </button>
            {showDemo && (
              <div className="flex flex-col space-y-1 animate-fade-in">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = getIsActive(tab);
                  return (
                    <NavLink
                      key={tab.id}
                      to={tab.to}
                      className={
                        `flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ` +
                        (isActive
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                          : 'text-muted-foreground hover:text-primary hover:bg-primary/5')
                      }
                      onClick={() => {
                        if(onTabChange) onTabChange(tab.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

