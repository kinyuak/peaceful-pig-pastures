import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Activity, Pause, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Row {
  id: string; farm_name: string | null; account_type: string | null;
  trial_active: boolean | null; trial_start_date: string | null;
}

const demo: Row[] = [
  { id: '1', farm_name: 'Kamau Farm', account_type: 'farmer', trial_active: true, trial_start_date: '2026-04-20T00:00:00Z' },
  { id: '2', farm_name: 'AgriCoop Kenya', account_type: 'organization', trial_active: true, trial_start_date: '2026-04-15T00:00:00Z' },
  { id: '3', farm_name: 'Wanjiku Dairy', account_type: 'farmer', trial_active: false, trial_start_date: '2026-03-01T00:00:00Z' },
];

const daysLeft = (start: string | null) => {
  if (!start) return 0;
  const elapsed = Math.floor((Date.now() - new Date(start).getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, 5 - elapsed);
};

export default function AdminTrials() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>(demo);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (user && !user.id.startsWith('bypass-')) {
      supabase.from('profiles').select('id, farm_name, account_type, trial_active, trial_start_date')
        .then(({ data }) => { if (data && data.length) setRows(data as Row[]); });
    }
  }, [user]);

  const toggleTrial = async (row: Row) => {
    const newVal = !row.trial_active;
    setRows(prev => prev.map(r => r.id === row.id ? { ...r, trial_active: newVal } : r));
    if (user && !user.id.startsWith('bypass-')) {
      await supabase.from('profiles').update({ trial_active: newVal }).eq('id', row.id);
    }
    toast({ title: newVal ? 'Trial activated' : 'Trial deactivated', description: row.farm_name || '' });
  };

  const extendTrial = async (row: Row) => {
    const newDate = new Date().toISOString();
    setRows(prev => prev.map(r => r.id === row.id ? { ...r, trial_start_date: newDate, trial_active: true } : r));
    if (user && !user.id.startsWith('bypass-')) {
      await supabase.from('profiles').update({ trial_start_date: newDate, trial_active: true }).eq('id', row.id);
    }
    toast({ title: 'Trial extended', description: `${row.farm_name} trial reset to 5 days.` });
  };

  const filtered = rows.filter(r => (r.farm_name || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Activity className="h-7 w-7 text-primary" />
        <div><h1 className="text-2xl md:text-3xl font-bold">Trial Management</h1><p className="text-muted-foreground text-sm">Extend, pause or activate user trials.</p></div>
      </div>

      <Card><CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by farm name..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader><TableRow>
              <TableHead>Farm/Org</TableHead><TableHead>Type</TableHead>
              <TableHead>Started</TableHead><TableHead>Days Left</TableHead>
              <TableHead>Status</TableHead><TableHead>Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.farm_name || '—'}</TableCell>
                  <TableCell><Badge variant="outline">{r.account_type}</Badge></TableCell>
                  <TableCell className="text-sm">{r.trial_start_date ? new Date(r.trial_start_date).toLocaleDateString() : '—'}</TableCell>
                  <TableCell>{r.trial_active ? `${daysLeft(r.trial_start_date)} days` : '0'}</TableCell>
                  <TableCell><Badge className={r.trial_active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}>{r.trial_active ? 'Active' : 'Expired'}</Badge></TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => extendTrial(r)}>Extend</Button>
                    <Button size="sm" variant="ghost" onClick={() => toggleTrial(r)}>
                      {r.trial_active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-6">No trials found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent></Card>
    </div>
  );
}