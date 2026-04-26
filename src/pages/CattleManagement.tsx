import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Beef, Plus, Search, Trash2, Heart, AlertTriangle, Droplet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Cattle {
  id: string; tag: string; name: string; breed: string; dob: string;
  weight: number; category: 'Cow' | 'Bull' | 'Heifer' | 'Calf';
  milkYield: number; health: 'Healthy' | 'Sick' | 'Treatment';
  expectedCalving?: string; notes?: string;
}

const seed: Cattle[] = [
  { id: '1', tag: 'C-001', name: 'Bella', breed: 'Friesian', dob: '2022-03-15', weight: 450, category: 'Cow', milkYield: 22, health: 'Healthy', expectedCalving: '2026-08-10' },
  { id: '2', tag: 'C-002', name: 'Duke', breed: 'Boran', dob: '2021-06-20', weight: 620, category: 'Bull', milkYield: 0, health: 'Healthy' },
  { id: '3', tag: 'C-003', name: 'Daisy', breed: 'Ayrshire', dob: '2023-09-05', weight: 320, category: 'Heifer', milkYield: 0, health: 'Treatment', notes: 'Vaccination due' },
  { id: '4', tag: 'C-004', name: 'Spot', breed: 'Jersey', dob: '2025-11-12', weight: 95, category: 'Calf', milkYield: 0, health: 'Healthy' },
];

const healthColors: Record<string, string> = {
  Healthy: 'bg-success/10 text-success',
  Sick: 'bg-destructive/10 text-destructive',
  Treatment: 'bg-warning/10 text-warning',
};

export default function CattleManagement() {
  const [list, setList] = useState<Cattle[]>(seed);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Cattle>>({ category: 'Cow', health: 'Healthy', milkYield: 0 });
  const { toast } = useToast();

  const filtered = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.tag.toLowerCase().includes(search.toLowerCase()));
  const totalMilk = list.filter(c => c.category === 'Cow').reduce((s, c) => s + c.milkYield, 0);
  const sick = list.filter(c => c.health !== 'Healthy').length;

  const handleAdd = () => {
    if (!form.tag || !form.name) { toast({ title: 'Missing fields', description: 'Tag and name are required', variant: 'destructive' }); return; }
    setList(prev => [...prev, { ...form, id: Date.now().toString(), weight: Number(form.weight) || 0, milkYield: Number(form.milkYield) || 0 } as Cattle]);
    setForm({ category: 'Cow', health: 'Healthy', milkYield: 0 });
    setOpen(false);
    toast({ title: 'Cattle added', description: `${form.name} added to the herd.` });
  };

  const handleDelete = (id: string) => {
    setList(prev => prev.filter(c => c.id !== id));
    toast({ title: 'Removed', description: 'Cattle record deleted.' });
  };

  const stats = [
    { label: 'Total Cattle', value: list.length, icon: Beef, color: 'text-primary' },
    { label: 'Lactating Cows', value: list.filter(c => c.category === 'Cow').length, icon: Heart, color: 'text-success' },
    { label: 'Daily Milk (L)', value: totalMilk.toFixed(1), icon: Droplet, color: 'text-blue-600' },
    { label: 'Needs Attention', value: sick, icon: AlertTriangle, color: 'text-warning' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Cattle Management</h1>
          <p className="text-muted-foreground text-sm">Track herd health, milk yield and breeding.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Add Cattle</Button></DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add New Cattle</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div><Label>Tag *</Label><Input value={form.tag || ''} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} /></div>
              <div><Label>Name *</Label><Input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><Label>Breed</Label><Input value={form.breed || ''} onChange={e => setForm(f => ({ ...f, breed: e.target.value }))} placeholder="Friesian, Boran..." /></div>
              <div><Label>Date of Birth</Label><Input type="date" value={form.dob || ''} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} /></div>
              <div><Label>Weight (kg)</Label><Input type="number" value={form.weight || ''} onChange={e => setForm(f => ({ ...f, weight: Number(e.target.value) }))} /></div>
              <div><Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as Cattle['category'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Cow">Cow</SelectItem><SelectItem value="Bull">Bull</SelectItem><SelectItem value="Heifer">Heifer</SelectItem><SelectItem value="Calf">Calf</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label>Milk Yield (L/day)</Label><Input type="number" value={form.milkYield || ''} onChange={e => setForm(f => ({ ...f, milkYield: Number(e.target.value) }))} /></div>
              <div><Label>Health</Label>
                <Select value={form.health} onValueChange={v => setForm(f => ({ ...f, health: v as Cattle['health'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Healthy">Healthy</SelectItem><SelectItem value="Sick">Sick</SelectItem><SelectItem value="Treatment">Under Treatment</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2"><Label>Expected Calving Date</Label><Input type="date" value={form.expectedCalving || ''} onChange={e => setForm(f => ({ ...f, expectedCalving: e.target.value }))} /></div>
            </div>
            <DialogFooter><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={handleAdd}>Add Cattle</Button></DialogFooter>
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
          <Input placeholder="Search by name or tag..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader><TableRow>
              <TableHead>Tag</TableHead><TableHead>Name</TableHead><TableHead>Breed</TableHead>
              <TableHead>Category</TableHead><TableHead>Weight</TableHead><TableHead>Milk/day</TableHead>
              <TableHead>Health</TableHead><TableHead></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.tag}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.breed}</TableCell>
                  <TableCell>{c.category}</TableCell>
                  <TableCell>{c.weight} kg</TableCell>
                  <TableCell>{c.milkYield} L</TableCell>
                  <TableCell><Badge className={healthColors[c.health]}>{c.health}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="sm" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-6">No cattle found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent></Card>
    </div>
  );
}