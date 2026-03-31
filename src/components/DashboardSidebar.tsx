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
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const mainItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Animals', url: '/pigs', icon: Bug },
  { title: 'Crops', url: '/crops', icon: Wheat },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
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

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
        {renderGroup('Operations', operationItems)}
        {renderGroup('Services', serviceItems)}
      </SidebarContent>
    </Sidebar>
  );
}
