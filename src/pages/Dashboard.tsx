import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import {
  Users, Calendar, TrendingUp, Package, Plus, AlertTriangle, Clock, BarChart3,
  Building2, MapPin, UserPlus, Eye,
} from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  animals: number;
  revenue: number;
  status: 'active' | 'inactive';
}

const demoFarmers: Farmer[] = [
  { id: '1', name: 'John Kamau', farmName: 'Kamau Farm', location: 'Kiambu', animals: 45, revenue: 120000, status: 'active' },
  { id: '2', name: 'Mary Wanjiku', farmName: 'Wanjiku Dairy', location: 'Nakuru', animals: 30, revenue: 85000, status: 'active' },
  { id: '3', name: 'Peter Ochieng', farmName: 'Ochieng Mixed Farm', location: 'Kisumu', animals: 60, revenue: 200000, status: 'active' },
  { id: '4', name: 'Grace Muthoni', farmName: 'Muthoni Poultry', location: 'Nyeri', animals: 500, revenue: 95000, status: 'inactive' },
];

function FarmerDashboard() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Total Animals', value: '0', icon: Users, color: 'text-primary' },
    { label: 'Revenue', value: 'KES 0', icon: TrendingUp, color: 'text-success' },
    { label: 'Upcoming Tasks', value: '0', icon: Calendar, color: 'text-accent-foreground' },
    { label: 'Low Stock Items', value: '0', icon: AlertTriangle, color: 'text-warning' },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back, {profile?.farm_name || 'Farmer'}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's your farm overview.</p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Plus className="h-5 w-5" /> Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-1" asChild><Link to="/pigs"><Users className="h-5 w-5 text-primary" /><span className="text-xs">Add Animal</span></Link></Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-1" asChild><Link to="/sales"><TrendingUp className="h-5 w-5 text-primary" /><span className="text-xs">Record Sale</span></Link></Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-1" asChild><Link to="/calendar"><Calendar className="h-5 w-5 text-primary" /><span className="text-xs">Schedule Event</span></Link></Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-1" asChild><Link to="/inventory"><Package className="h-5 w-5 text-primary" /><span className="text-xs">View Inventory</span></Link></Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Clock className="h-5 w-5" /> Recent Activity</CardTitle>
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
    </>
  );
}

function OrgDashboard() {
  const { profile } = useAuth();
  const [farmers, setFarmers] = useState<Farmer[]>(demoFarmers);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: '', farmName: '', location: '' });

  const totalAnimals = farmers.reduce((s, f) => s + f.animals, 0);
  const totalRevenue = farmers.reduce((s, f) => s + f.revenue, 0);
  const activeFarmers = farmers.filter(f => f.status === 'active').length;

  const handleAddFarmer = () => {
    if (!form.name || !form.farmName) return;
    setFarmers(prev => [...prev, {
      id: Date.now().toString(),
      name: form.name,
      farmName: form.farmName,
      location: form.location,
      animals: 0,
      revenue: 0,
      status: 'active',
    }]);
    setForm({ name: '', farmName: '', location: '' });
    setAddOpen(false);
  };

  const stats = [
    { label: 'Total Farmers', value: farmers.length.toString(), icon: Users, color: 'text-primary' },
    { label: 'Active Farmers', value: activeFarmers.toString(), icon: Building2, color: 'text-success' },
    { label: 'Total Animals', value: totalAnimals.toLocaleString(), icon: Users, color: 'text-accent-foreground' },
    { label: 'Total Revenue', value: `KES ${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-primary' },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {profile?.farm_name || 'Organization'} Dashboard 🏢
        </h1>
        <p className="text-muted-foreground mt-1">Manage your farmers and operations.</p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {farmers.filter(f => f.status === 'active').slice(0, 3).map(farmer => (
          <Card key={farmer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{farmer.farmName}</h3>
                  <p className="text-sm text-muted-foreground">{farmer.name}</p>
                </div>
                <Badge className="bg-success/10 text-success">{farmer.status}</Badge>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {farmer.location}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Animals:</span> <span className="font-medium">{farmer.animals}</span></div>
                <div><span className="text-muted-foreground">Revenue:</span> <span className="font-medium">KES {farmer.revenue.toLocaleString()}</span></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">All Farmers</CardTitle>
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild><Button size="sm"><UserPlus className="h-4 w-4 mr-2" />Add Farmer</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add New Farmer</DialogTitle></DialogHeader>
                <div className="space-y-4 mt-2">
                  <Input placeholder="Farmer Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  <Input placeholder="Farm Name" value={form.farmName} onChange={e => setForm(f => ({ ...f, farmName: e.target.value }))} />
                  <Input placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddFarmer}>Add Farmer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead><TableHead>Farm</TableHead><TableHead>Location</TableHead>
                <TableHead>Animals</TableHead><TableHead>Revenue</TableHead><TableHead>Status</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farmers.map(farmer => (
                <TableRow key={farmer.id}>
                  <TableCell className="font-medium">{farmer.name}</TableCell>
                  <TableCell>{farmer.farmName}</TableCell>
                  <TableCell>{farmer.location}</TableCell>
                  <TableCell>{farmer.animals}</TableCell>
                  <TableCell>KES {farmer.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={farmer.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}>
                      {farmer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const { profile, role } = useAuth();
  if (role === 'admin') return <AdminDashboard />;
  return profile?.account_type === 'organization' ? <OrgDashboard /> : <FarmerDashboard />;
}
