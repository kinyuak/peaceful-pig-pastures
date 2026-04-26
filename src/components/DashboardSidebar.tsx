import {
  LayoutDashboard,
  Bug,
  Wheat,
  TrendingUp,
  Package,
  Users,
  Store,
  Briefcase,
  Bot,
  Settings,
  Calendar,
  PawPrint,
  Beef,
  Bird,
  Rabbit,
  Sheet as SheetIcon,
  ChevronRight,
  Shield,
  Activity,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const mainItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Crops', url: '/crops', icon: Wheat },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
];

const livestockItems = [
  { title: 'Pigs', url: '/animals/pigs', icon: Bug },
  { title: 'Cattle', url: '/animals/cattle', icon: Beef },
  { title: 'Goats', url: '/animals/goats', icon: Rabbit },
  { title: 'Sheep', url: '/animals/sheep', icon: SheetIcon },
  { title: 'Poultry', url: '/animals/poultry', icon: Bird },
];

const operationItems = [
  { title: 'Sales', url: '/sales', icon: TrendingUp },
  { title: 'Inventory', url: '/inventory', icon: Package },
  { title: 'Staff', url: '/staff', icon: Users },
  { title: 'Marketplace', url: '/store', icon: Store },
];

const serviceItems = [
  { title: 'Labour Services', url: '/labour', icon: Briefcase },
  { title: 'AI Assistant', url: '/ai-assistant', icon: Bot },
  { title: 'Settings', url: '/settings', icon: Settings },
];

const adminItems = [
  { title: 'Platform Overview', url: '/dashboard', icon: Shield },
  { title: 'All Users', url: '/admin/users', icon: Users },
  { title: 'Trial Management', url: '/admin/trials', icon: Activity },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { role } = useAuth();

  const isActive = (path: string) => location.pathname === path;
  const livestockActive = livestockItems.some(i => isActive(i.url)) || isActive('/animals') || isActive('/pigs');
  const [livestockOpen, setLivestockOpen] = useState(livestockActive);

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive(item.url)}>
                <NavLink
                  to={item.url}
                  end
                  className="flex items-center gap-2 hover:bg-muted/50"
                  activeClassName="bg-primary/10 text-primary font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="AgriHerd" className="h-8 w-8" />
          {!collapsed && (
            <span className="font-bold text-primary text-sm">AgriHerd</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup('Main', mainItems)}

        <SidebarGroup>
          <SidebarGroupLabel>Livestock</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {collapsed ? (
                livestockItems.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink to={item.url} end className="flex items-center gap-2 hover:bg-muted/50" activeClassName="bg-primary/10 text-primary font-medium">
                        <item.icon className="h-4 w-4" />
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <Collapsible open={livestockOpen} onOpenChange={setLivestockOpen}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="flex items-center gap-2 w-full">
                        <PawPrint className="h-4 w-4" />
                        <span>Animals</span>
                        <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${livestockOpen ? 'rotate-90' : ''}`} />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {livestockItems.map(item => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild isActive={isActive(item.url)}>
                              <NavLink to={item.url} end className="flex items-center gap-2" activeClassName="bg-primary/10 text-primary font-medium">
                                <item.icon className="h-3.5 w-3.5" />
                                <span>{item.title}</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {renderGroup('Operations', operationItems)}
        {renderGroup('Services', serviceItems)}
        {role === 'admin' && renderGroup('Admin', adminItems)}
      </SidebarContent>
    </Sidebar>
  );
}
