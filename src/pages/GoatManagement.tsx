import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Rabbit, Plus, Search, Trash2, Heart, AlertTriangle, Droplet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Goat {
  id: string; tag: string; name: string; breed: string; dob: string;
  weight: number; category: 'Doe' | 'Buck' | 'Kid';
  purpose: 'Dairy' | 'Meat' | 'Dual'; milkYield: number;
  health: 'Healthy' | 'Sick' | 'Treatment'; lastKidding?: string;
}

const seed: Goat[] = [
  { id: '1', tag: 'G-001', name: 'Nala', breed: 'Toggenburg', dob: '2023-04-12', weight: 55, category: 'Doe', purpose: 'Dairy', milkYield: 3.2, health: 'Healthy', lastKidding: '2025-12-01' },
  { id: '2', tag: 'G-002', name: 'Goliath', breed: 'Boer', dob: '2022-08-30', weight: 95, category: 'Buck', purpose: 'Meat', milkYield: 0, health: 'Healthy' },
  { id: '3', tag: 'G-003', name: 'Lulu', breed: 'Galla', dob: '2024-03-15', weight: 42, category: 'Doe', purpose: 'Meat', milkYield: 0, health: 'Treatment' },
  { id: '4', tag: 'G-004', name: 'Pip', breed: 'Boer', dob: '2025-11-20', weight: 12, category: 'Kid', purpose: 'Meat', milkYield: 0, health: 'Healthy' },
];

const healthColors: Record<string, string> = { Healthy: 'bg-success/10 text-success', Sick: 'bg-destructive/10 text-destructive', Treatment: 'bg-warning/10 text-warning' };

export default function GoatManagement() {
  const [list, setList] = useState<Goat[]>(seed);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Goat>>({ category: 'Doe', purpose: 'Dairy', health: 'Healthy', milkYield: 0 });
  const { toast } = useToast();

  const filtered = list.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.tag.toLowerCase().includes(search.toLowerCase()));
  const totalMilk = list.reduce((s, g) => s + g.milkYield, 0);
  const sick = list.filter(g => g.health !== 'Healthy').length;

  const handleAdd = () => {
    if (!form.tag || !form.name) { toast({ title: 'Missing fields', variant: 'destructive' }); return; }
    setList(prev => [...prev, { ...form, id: Date.now().toString(), weight: Number(form.weight) || 0, milkYield: Number(form.milkYield) || 0 } as Goat]);
    setForm({ category: 'Doe', purpose: 'Dairy', health: 'Healthy', milkYield: 0 });
    setOpen(false);
    toast({ title: 'Goat added' });
  };

  const stats = [
    { label: 'Total Goats', value: list.length, icon: Rabbit, color: 'text-emerald-600' },
    { label: 'Does', value: list.filter(g => g.category === 'Doe').length, icon: Heart, color: 'text-pink-600' },
    { label: 'Daily Milk (L)', value: totalMilk.toFixed(1), icon: Droplet, color: 'text-blue-600' },
    { label: 'Needs Attention', value: sick, icon: AlertTriangle, color: 'text-warning' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div><h1 className="text-2xl md:text-3xl font-bold">Goat Management</h1><p className="text-muted-foreground text-sm">Track does, bucks, kids and production.</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Add Goat</Button></DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add New Goat</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div><Label>Tag *</Label><Input value={form.tag || ''} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} /></div>
              <div><Label>Name *</Label><Input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><Label>Breed</Label><Input value={form.breed || ''} onChange={e => setForm(f => ({ ...f, breed: e.target.value }))} placeholder="Boer, Galla, Toggenburg..." /></div>
              <div><Label>Date of Birth</Label><Input type="date" value={form.dob || ''} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} /></div>
              <div><Label>Weight (kg)</Label><Input type="number" value={form.weight || ''} onChange={e => setForm(f => ({ ...f, weight: Number(e.target.value) }))} /></div>
              <div><Label>Category</Label><Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as Goat['category'] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Doe">Doe</SelectItem><SelectItem value="Buck">Buck</SelectItem><SelectItem value="Kid">Kid</SelectItem></SelectContent>
              </Select></div>
              <div><Label>Purpose</Label><Select value={form.purpose} onValueChange={v => setForm(f => ({ ...f, purpose: v as Goat['purpose'] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Dairy">Dairy</SelectItem><SelectItem value="Meat">Meat</SelectItem><SelectItem value="Dual">Dual</SelectItem></SelectContent>
              </Select></div>
              <div><Label>Milk Yield (L/day)</Label><Input type="number" value={form.milkYield || ''} onChange={e => setForm(f => ({ ...f, milkYield: Number(e.target.value) }))} /></div>
              <div className="sm:col-span-2"><Label>Health</Label><Select value={form.health} onValueChange={v => setForm(f => ({ ...f, health: v as Goat['health'] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Healthy">Healthy</SelectItem><SelectItem value="Sick">Sick</SelectItem><SelectItem value="Treatment">Under Treatment</SelectItem></SelectContent>
              </Select></div>
            </div>
            <DialogFooter><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={handleAdd}>Add Goat</Button></DialogFooter>
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
          <Input placeholder="Search goats..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader><TableRow>
              <TableHead>Tag</TableHead><TableHead>Name</TableHead><TableHead>Breed</TableHead>
              <TableHead>Category</TableHead><TableHead>Purpose</TableHead><TableHead>Milk</TableHead>
              <TableHead>Health</TableHead><TableHead></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.map(g => (
                <TableRow key={g.id}>
                  <TableCell className="font-medium">{g.tag}</TableCell><TableCell>{g.name}</TableCell>
                  <TableCell>{g.breed}</TableCell><TableCell>{g.category}</TableCell>
                  <TableCell>{g.purpose}</TableCell><TableCell>{g.milkYield} L</TableCell>
                  <TableCell><Badge className={healthColors[g.health]}>{g.health}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="sm" onClick={() => setList(prev => prev.filter(x => x.id !== g.id))}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-6">No goats found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent></Card>
    </div>
  );
}