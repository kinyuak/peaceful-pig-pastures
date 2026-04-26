import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sheet as SheetIcon, Plus, Search, Trash2, Heart, AlertTriangle, Scissors } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Sheep {
  id: string; tag: string; name: string; breed: string; dob: string;
  weight: number; category: 'Ewe' | 'Ram' | 'Lamb';
  woolYield: number; health: 'Healthy' | 'Sick' | 'Treatment'; lastLambing?: string;
}

const seed: Sheep[] = [
  { id: '1', tag: 'S-001', name: 'Wooly', breed: 'Dorper', dob: '2023-02-10', weight: 65, category: 'Ewe', woolYield: 4.5, health: 'Healthy', lastLambing: '2025-10-15' },
  { id: '2', tag: 'S-002', name: 'Rambo', breed: 'Merino', dob: '2022-05-01', weight: 90, category: 'Ram', woolYield: 6.8, health: 'Healthy' },
  { id: '3', tag: 'S-003', name: 'Cloudy', breed: 'Romney', dob: '2024-08-20', weight: 50, category: 'Ewe', woolYield: 3.2, health: 'Treatment' },
  { id: '4', tag: 'S-004', name: 'Tiny', breed: 'Dorper', dob: '2026-01-10', weight: 8, category: 'Lamb', woolYield: 0, health: 'Healthy' },
];

const healthColors: Record<string, string> = { Healthy: 'bg-success/10 text-success', Sick: 'bg-destructive/10 text-destructive', Treatment: 'bg-warning/10 text-warning' };

export default function SheepManagement() {
  const [list, setList] = useState<Sheep[]>(seed);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Sheep>>({ category: 'Ewe', health: 'Healthy', woolYield: 0 });
  const { toast } = useToast();

  const filtered = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.tag.toLowerCase().includes(search.toLowerCase()));
  const totalWool = list.reduce((s, x) => s + x.woolYield, 0);
  const sick = list.filter(s => s.health !== 'Healthy').length;

  const handleAdd = () => {
    if (!form.tag || !form.name) { toast({ title: 'Missing fields', variant: 'destructive' }); return; }
    setList(prev => [...prev, { ...form, id: Date.now().toString(), weight: Number(form.weight) || 0, woolYield: Number(form.woolYield) || 0 } as Sheep]);
    setForm({ category: 'Ewe', health: 'Healthy', woolYield: 0 });
    setOpen(false);
    toast({ title: 'Sheep added' });
  };

  const stats = [
    { label: 'Total Sheep', value: list.length, icon: SheetIcon, color: 'text-blue-600' },
    { label: 'Ewes', value: list.filter(s => s.category === 'Ewe').length, icon: Heart, color: 'text-pink-600' },
    { label: 'Wool Yield (kg/yr)', value: totalWool.toFixed(1), icon: Scissors, color: 'text-amber-600' },
    { label: 'Needs Attention', value: sick, icon: AlertTriangle, color: 'text-warning' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div><h1 className="text-2xl md:text-3xl font-bold">Sheep Management</h1><p className="text-muted-foreground text-sm">Track flocks, lambing and wool production.</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Add Sheep</Button></DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add New Sheep</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div><Label>Tag *</Label><Input value={form.tag || ''} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} /></div>
              <div><Label>Name *</Label><Input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><Label>Breed</Label><Input value={form.breed || ''} onChange={e => setForm(f => ({ ...f, breed: e.target.value }))} placeholder="Dorper, Merino..." /></div>
              <div><Label>Date of Birth</Label><Input type="date" value={form.dob || ''} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} /></div>
              <div><Label>Weight (kg)</Label><Input type="number" value={form.weight || ''} onChange={e => setForm(f => ({ ...f, weight: Number(e.target.value) }))} /></div>
              <div><Label>Category</Label><Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as Sheep['category'] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Ewe">Ewe</SelectItem><SelectItem value="Ram">Ram</SelectItem><SelectItem value="Lamb">Lamb</SelectItem></SelectContent>
              </Select></div>
              <div><Label>Wool Yield (kg/yr)</Label><Input type="number" step="0.1" value={form.woolYield || ''} onChange={e => setForm(f => ({ ...f, woolYield: Number(e.target.value) }))} /></div>
              <div><Label>Health</Label><Select value={form.health} onValueChange={v => setForm(f => ({ ...f, health: v as Sheep['health'] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Healthy">Healthy</SelectItem><SelectItem value="Sick">Sick</SelectItem><SelectItem value="Treatment">Under Treatment</SelectItem></SelectContent>
              </Select></div>
            </div>
            <DialogFooter><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={handleAdd}>Add Sheep</Button></DialogFooter>
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
          <Input placeholder="Search sheep..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader><TableRow>
              <TableHead>Tag</TableHead><TableHead>Name</TableHead><TableHead>Breed</TableHead>
              <TableHead>Category</TableHead><TableHead>Weight</TableHead><TableHead>Wool/yr</TableHead>
              <TableHead>Health</TableHead><TableHead></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.tag}</TableCell><TableCell>{s.name}</TableCell>
                  <TableCell>{s.breed}</TableCell><TableCell>{s.category}</TableCell>
                  <TableCell>{s.weight} kg</TableCell><TableCell>{s.woolYield} kg</TableCell>
                  <TableCell><Badge className={healthColors[s.health]}>{s.health}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="sm" onClick={() => setList(prev => prev.filter(x => x.id !== s.id))}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-6">No sheep found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent></Card>
    </div>
  );
}