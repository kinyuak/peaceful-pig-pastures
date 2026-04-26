import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Users, Building2, Shield, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface ProfileRow {
  id: string;
  farm_name: string | null;
  account_type: string | null;
  trial_active: boolean | null;
  trial_start_date: string | null;
  created_at: string;
  location: string | null;
}

const demoProfiles: ProfileRow[] = [
  { id: '1', farm_name: 'Kamau Farm', account_type: 'farmer', trial_active: true, trial_start_date: '2026-04-20T00:00:00Z', created_at: '2026-04-20T00:00:00Z', location: 'Kiambu' },
  { id: '2', farm_name: 'AgriCoop Kenya', account_type: 'organization', trial_active: true, trial_start_date: '2026-04-15T00:00:00Z', created_at: '2026-04-15T00:00:00Z', location: 'Nairobi' },
  { id: '3', farm_name: 'Wanjiku Dairy', account_type: 'farmer', trial_active: false, trial_start_date: '2026-03-01T00:00:00Z', created_at: '2026-03-01T00:00:00Z', location: 'Nakuru' },
  { id: '4', farm_name: 'Green Valley Org', account_type: 'organization', trial_active: true, trial_start_date: '2026-04-22T00:00:00Z', created_at: '2026-04-22T00:00:00Z', location: 'Eldoret' },
  { id: '5', farm_name: 'Ochieng Mixed Farm', account_type: 'farmer', trial_active: true, trial_start_date: '2026-04-10T00:00:00Z', created_at: '2026-04-10T00:00:00Z', location: 'Kisumu' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<ProfileRow[]>(demoProfiles);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !user.id.startsWith('bypass-')) {
      setLoading(true);
      supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(50)
        .then(({ data }) => { if (data && data.length) setProfiles(data as ProfileRow[]); setLoading(false); });
    }
  }, [user]);

  const farmers = profiles.filter(p => p.account_type === 'farmer');
  const orgs = profiles.filter(p => p.account_type === 'organization');
  const activeTrials = profiles.filter(p => p.trial_active).length;
  const expiredTrials = profiles.filter(p => !p.trial_active).length;

  const stats = [
    { label: 'Total Users', value: profiles.length, icon: Users, color: 'text-primary' },
    { label: 'Organizations', value: orgs.length, icon: Building2, color: 'text-blue-600' },
    { label: 'Active Trials', value: activeTrials, icon: Activity, color: 'text-success' },
    { label: 'Expired Trials', value: expiredTrials, icon: AlertTriangle, color: 'text-warning' },
  ];

  const chartData = [
    { name: 'Farmers', value: farmers.length, color: 'hsl(var(--primary))' },
    { name: 'Organizations', value: orgs.length, color: 'hsl(var(--success))' },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Shield className="h-7 w-7 text-primary" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Platform Admin</h1>
          <p className="text-muted-foreground text-sm">Overview of all users, organizations and trials.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(s => (
          <Card key={s.label}><CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center"><s.icon className={`h-5 w-5 ${s.color}`} /></div>
            <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-lg font-bold">{s.value}</p></div>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Recent Signups</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-[500px]">
                <TableHeader><TableRow>
                  <TableHead>Farm/Org</TableHead><TableHead>Type</TableHead>
                  <TableHead>Location</TableHead><TableHead>Trial</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {profiles.slice(0, 10).map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.farm_name || '—'}</TableCell>
                      <TableCell><Badge variant="outline">{p.account_type}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{p.location || '—'}</TableCell>
                      <TableCell>
                        <Badge className={p.trial_active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}>
                          {p.trial_active ? 'Active' : 'Expired'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Account Mix</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Quick Actions</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-1"><Link to="/admin/users"><Users className="h-5 w-5" /><span className="text-xs">All Users</span></Link></Button>
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-1"><Link to="/admin/trials"><Activity className="h-5 w-5" /><span className="text-xs">Trials</span></Link></Button>
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-1"><Link to="/store"><Building2 className="h-5 w-5" /><span className="text-xs">Marketplace</span></Link></Button>
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-1"><Link to="/settings"><Shield className="h-5 w-5" /><span className="text-xs">Settings</span></Link></Button>
        </CardContent>
      </Card>

      {loading && <p className="text-center text-muted-foreground text-sm mt-4">Loading platform data...</p>}
    </div>
  );
}