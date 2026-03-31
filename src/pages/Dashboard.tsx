import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  TrendingUp,
  Package,
  Plus,
  AlertTriangle,
  Clock,
  BarChart3,
} from 'lucide-react';

export default function Dashboard() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Total Animals', value: '0', icon: Users, color: 'text-primary' },
    { label: 'Revenue', value: 'KES 0', icon: TrendingUp, color: 'text-success' },
    { label: 'Upcoming Tasks', value: '0', icon: Calendar, color: 'text-accent' },
    { label: 'Low Stock Items', value: '0', icon: AlertTriangle, color: 'text-warning' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back, {profile?.farm_name || 'Farmer'}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's your farm overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="h-5 w-5" /> Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-1" asChild>
              <Link to="/pigs">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-xs">Add Animal</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-1" asChild>
              <Link to="/sales">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-xs">Record Sale</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-1" asChild>
              <Link to="/calendar">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-xs">Schedule Event</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-1" asChild>
              <Link to="/inventory">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-xs">View Inventory</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" /> Recent Activity
            </CardTitle>
            <CardDescription>Start adding data to see activity here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No recent activity yet.</p>
              <p className="text-xs mt-1">Add animals, record sales, or manage inventory to get started.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
