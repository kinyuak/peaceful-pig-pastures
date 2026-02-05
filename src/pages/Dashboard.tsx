import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Plus,
  AlertTriangle,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const { profile } = useAuth();

  const quickActions = [
    { label: 'Add New Pig', icon: Plus, to: '/pigs', color: 'bg-primary' },
    { label: 'Record Sale', icon: TrendingUp, to: '/sales', color: 'bg-green-600' },
    { label: 'Schedule Event', icon: Calendar, to: '/calendar', color: 'bg-blue-600' },
    { label: 'View Inventory', icon: Package, to: '/inventory', color: 'bg-orange-600' },
  ];

  const stats = [
    { label: 'Total Pigs', value: '24', icon: Users, trend: '+3 this month' },
    { label: 'Upcoming Events', value: '5', icon: Calendar, trend: 'Next 7 days' },
    { label: 'Recent Sales', value: 'KES 45,000', icon: TrendingUp, trend: 'This week' },
    { label: 'Low Stock Items', value: '2', icon: AlertTriangle, trend: 'Needs attention' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {profile?.farm_name || 'Farmer'}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your farm today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.to}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className={`${action.color} p-3 rounded-full mb-3`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium text-sm">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Your scheduled tasks for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Vaccination - Sow #12</p>
                    <p className="text-sm text-muted-foreground">Tomorrow at 9:00 AM</p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Health</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Heat Check - Group B</p>
                    <p className="text-sm text-muted-foreground">Feb 7, 2026 at 8:00 AM</p>
                  </div>
                  <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">Breeding</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Feed Delivery</p>
                    <p className="text-sm text-muted-foreground">Feb 8, 2026 at 10:00 AM</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Supply</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/calendar">View All Events</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest updates from your farm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-medium">Sale completed</p>
                    <p className="text-sm text-muted-foreground">Sold 3 piglets for KES 15,000</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-medium">New pig added</p>
                    <p className="text-sm text-muted-foreground">Added boar "Max" to the herd</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <p className="font-medium">Low stock alert</p>
                    <p className="text-sm text-muted-foreground">Pig feed running low (20kg remaining)</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/sales">View All Sales</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
