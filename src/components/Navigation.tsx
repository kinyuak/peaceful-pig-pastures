import { useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { 
  Home, 
  Users, 
  Calendar, 
  Grid2x2, 
  List, 
  FileText, 
  Menu, 
  ShoppingCart,
  ChevronDown,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  User,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const farmManagementItems = [
  { id: 'pigs', label: 'Pig Management', icon: Users, to: "/pigs" },
  { id: 'inventory', label: 'Inventory', icon: Grid2x2, to: "/inventory" },
  { id: 'sales', label: 'Sales', icon: FileText, to: "/sales" },
  { id: 'staff', label: 'Staff Management', icon: List, to: "/staff" },
];

const mainNavItems = [
  { id: 'home', label: 'Home', icon: Home, to: "/" },
  { id: 'store', label: 'Store', icon: ShoppingCart, to: "/store" },
  { id: 'calendar', label: 'Calendar', icon: Calendar, to: "/calendar" },
];

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onAddPig?: () => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const getIsActive = (path: string) => {
    return location.pathname === path;
  };

  const isFarmManagementActive = farmManagementItems.some(item => location.pathname === item.to);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-card shadow-lg border-b border-border backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="AgriHerd Solutions Logo" className="h-10 w-10" />
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              AgriHerd Solutions
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Main nav items */}
            {mainNavItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  getIsActive(item.to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}

            {/* Farm Management Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isFarmManagementActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Farm Management</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {farmManagementItems.map((item) => (
                  <DropdownMenuItem key={item.id} asChild>
                    <Link to={item.to} className="flex items-center space-x-2 cursor-pointer">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dashboard Link (for logged in users) */}
            {user && (
              <NavLink
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  getIsActive('/dashboard')
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>
            )}
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {profile?.farm_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{profile?.farm_name || 'My Farm'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-1">
              {/* Main nav items */}
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    getIsActive(item.to)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}

              {/* Farm Management section */}
              <div className="pt-2 pb-1">
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Farm Management
                </p>
              </div>
              {farmManagementItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    getIsActive(item.to)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}

              {/* Dashboard for logged in users */}
              {user && (
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    getIsActive('/dashboard')
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </NavLink>
              )}

              {/* Auth buttons for mobile */}
              {!user && (
                <div className="pt-4 flex flex-col space-y-2">
                  <Button variant="outline" asChild className="justify-start">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="justify-start">
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}

              {/* Sign out for mobile */}
              {user && (
                <div className="pt-4 border-t border-border mt-4">
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-destructive hover:bg-destructive/10 w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

