import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Bird, Plus, Search, Trash2, Egg, AlertTriangle, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Flock {
  id: string; name: string; type: 'Layer' | 'Broiler' | 'Kienyeji' | 'Ducks';
  birdCount: number; ageWeeks: number; eggsPerDay: number;
  mortality: number; lastVaccine: string; status: 'Active' | 'Sold' | 'Lost';
}

const seed: Flock[] = [
  { id: '1', name: 'Layer Batch A', type: 'Layer', birdCount: 500, ageWeeks: 28, eggsPerDay: 420, mortality: 8, lastVaccine: '2026-03-15', status: 'Active' },
  { id: '2', name: 'Broiler Round 12', type: 'Broiler', birdCount: 1200, ageWeeks: 5, eggsPerDay: 0, mortality: 24, lastVaccine: '2026-04-01', status: 'Active' },
  { id: '3', name: 'Kienyeji Free-Range', type: 'Kienyeji', birdCount: 80, ageWeeks: 16, eggsPerDay: 35, mortality: 3, lastVaccine: '2026-02-20', status: 'Active' },
  { id: '4', name: 'Ducks - Pond Side', type: 'Ducks', birdCount: 45, ageWeeks: 22, eggsPerDay: 28, mortality: 1, lastVaccine: '2026-03-01', status: 'Active' },
];

const statusColors: Record<string, string> = { Active: 'bg-success/10 text-success', Sold: 'bg-primary/10 text-primary', Lost: 'bg-destructive/10 text-destructive' };

export default function PoultryManagement() {
  const [list, setList] = useState<Flock[]>(seed);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Flock>>({ type: 'Layer', status: 'Active' });
  const { toast } = useToast();

  const filtered = list.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  const totalBirds = list.reduce((s, f) => s + f.birdCount, 0);
  const totalEggs = list.reduce((s, f) => s + f.eggsPerDay, 0);
  const totalMortality = list.reduce((s, f) => s + f.mortality, 0);

  const handleAdd = () => {
    if (!form.name) { toast({ title: 'Missing fields', variant: 'destructive' }); return; }
    setList(prev => [...prev, { ...form, id: Date.now().toString(),
      birdCount: Number(form.birdCount) || 0, ageWeeks: Number(form.ageWeeks) || 0,
      eggsPerDay: Number(form.eggsPerDay) || 0, mortality: Number(form.mortality) || 0,
      lastVaccine: form.lastVaccine || new Date().toISOString().split('T')[0],
    } as Flock]);
    setForm({ type: 'Layer', status: 'Active' });
    setOpen(false);
    toast({ title: 'Flock added' });
  };

  const stats = [
    { label: 'Total Flocks', value: list.length, icon: Users, color: 'text-orange-600' },
    { label: 'Total Birds', value: totalBirds.toLocaleString(), icon: Bird, color: 'text-primary' },
    { label: 'Eggs / Day', value: totalEggs.toLocaleString(), icon: Egg, color: 'text-amber-600' },
    { label: 'Mortality', value: totalMortality, icon: AlertTriangle, color: 'text-destructive' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div><h1 className="text-2xl md:text-3xl font-bold">Poultry Management</h1><p className="text-muted-foreground text-sm">Manage flocks, eggs and vaccination schedules.</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Add Flock</Button></DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add New Flock</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="sm:col-span-2"><Label>Flock Name *</Label><Input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><Label>Type</Label><Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as Flock['type'] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Layer">Layer</SelectItem><SelectItem value="Broiler">Broiler</SelectItem><SelectItem value="Kienyeji">Kienyeji</SelectItem><SelectItem value="Ducks">Ducks</SelectItem></SelectContent>
              </Select></div>
              <div><Label>Bird Count</Label><Input type="number" value={form.birdCount || ''} onChange={e => setForm(f => ({ ...f, birdCount: Number(e.target.value) }))} /></div>
              <div><Label>Age (weeks)</Label><Input type="number" value={form.ageWeeks || ''} onChange={e => setForm(f => ({ ...f, ageWeeks: Number(e.target.value) }))} /></div>
              <div><Label>Eggs per Day</Label><Input type="number" value={form.eggsPerDay || ''} onChange={e => setForm(f => ({ ...f, eggsPerDay: Number(e.target.value) }))} /></div>
              <div><Label>Mortality</Label><Input type="number" value={form.mortality || ''} onChange={e => setForm(f => ({ ...f, mortality: Number(e.target.value) }))} /></div>
              <div><Label>Last Vaccination</Label><Input type="date" value={form.lastVaccine || ''} onChange={e => setForm(f => ({ ...f, lastVaccine: e.target.value }))} /></div>
            </div>
            <DialogFooter><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={handleAdd}>Add Flock</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(s => (
          <Card key={s.label}><CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center"><s.icon className={`h-5 w-5 ${s.color}`} /></div>
            <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-lg font-bold">{s.value}</p></div>
          </CardContent></Card>
        ))}
      </div>

      <Card><CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search flocks..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader><TableRow>
              <TableHead>Flock</TableHead><TableHead>Type</TableHead><TableHead>Birds</TableHead>
              <TableHead>Age</TableHead><TableHead>Eggs/day</TableHead><TableHead>Mortality</TableHead>
              <TableHead>Last Vaccine</TableHead><TableHead>Status</TableHead><TableHead></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.map(f => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.name}</TableCell>
                  <TableCell>{f.type}</TableCell><TableCell>{f.birdCount.toLocaleString()}</TableCell>
                  <TableCell>{f.ageWeeks}w</TableCell><TableCell>{f.eggsPerDay}</TableCell>
                  <TableCell>{f.mortality}</TableCell><TableCell>{f.lastVaccine}</TableCell>
                  <TableCell><Badge className={statusColors[f.status]}>{f.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="sm" onClick={() => setList(prev => prev.filter(x => x.id !== f.id))}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-6">No flocks found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent></Card>
    </div>
  );
}