import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wheat, Sprout, CalendarDays, Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Crop {
  id: string;
  name: string;
  type: string;
  field: string;
  plantingDate: string;
  expectedHarvest: string;
  status: 'growing' | 'harvested' | 'planned';
  area: string;
}

const demoCrops: Crop[] = [
  { id: '1', name: 'Maize', type: 'Cereal', field: 'Field A', plantingDate: '2026-01-15', expectedHarvest: '2026-05-15', status: 'growing', area: '2 acres' },
  { id: '2', name: 'Beans', type: 'Legume', field: 'Field B', plantingDate: '2026-02-01', expectedHarvest: '2026-05-01', status: 'growing', area: '1 acre' },
  { id: '3', name: 'Tomatoes', type: 'Vegetable', field: 'Greenhouse 1', plantingDate: '2026-03-10', expectedHarvest: '2026-06-10', status: 'planned', area: '0.5 acres' },
  { id: '4', name: 'Wheat', type: 'Cereal', field: 'Field C', plantingDate: '2025-11-01', expectedHarvest: '2026-03-01', status: 'harvested', area: '3 acres' },
];

const statusColors: Record<string, string> = {
  growing: 'bg-success/10 text-success',
  harvested: 'bg-primary/10 text-primary',
  planned: 'bg-accent/10 text-accent-foreground',
};

export default function CropsManagement() {
  const [crops, setCrops] = useState<Crop[]>(demoCrops);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'Cereal', field: '', plantingDate: '', expectedHarvest: '', status: 'planned' as Crop['status'], area: '' });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!form.name || !form.field) return;
    const newCrop: Crop = { ...form, id: Date.now().toString() };
    setCrops(prev => [...prev, newCrop]);
    setForm({ name: '', type: 'Cereal', field: '', plantingDate: '', expectedHarvest: '', status: 'planned', area: '' });
    setAddOpen(false);
    toast({ title: 'Crop added', description: `${form.name} has been added.` });
  };

  const filtered = crops.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const growing = crops.filter(c => c.status === 'growing').length;
  const harvested = crops.filter(c => c.status === 'harvested').length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Crops Management</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card><CardContent className="p-5 flex items-center gap-4"><div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center"><Wheat className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Total Crops</p><p className="text-xl font-bold">{crops.length}</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-4"><div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center"><Sprout className="h-6 w-6 text-success" /></div><div><p className="text-sm text-muted-foreground">Currently Growing</p><p className="text-xl font-bold">{growing}</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-4"><div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center"><CalendarDays className="h-6 w-6 text-accent-foreground" /></div><div><p className="text-sm text-muted-foreground">Harvested</p><p className="text-xl font-bold">{harvested}</p></div></CardContent></Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search crops..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Add Crop</Button></DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>Add New Crop</DialogTitle></DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input placeholder="Crop Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cereal">Cereal</SelectItem>
                    <SelectItem value="Legume">Legume</SelectItem>
                    <SelectItem value="Vegetable">Vegetable</SelectItem>
                    <SelectItem value="Fruit">Fruit</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Field / Plot" value={form.field} onChange={e => setForm(f => ({ ...f, field: e.target.value }))} />
                <Input placeholder="Area (e.g. 2 acres)" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} />
                <Input type="date" value={form.plantingDate} onChange={e => setForm(f => ({ ...f, plantingDate: e.target.value }))} />
                <Input type="date" value={form.expectedHarvest} onChange={e => setForm(f => ({ ...f, expectedHarvest: e.target.value }))} />
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd}>Save Crop</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead>Field</TableHead>
              <TableHead>Area</TableHead><TableHead>Planted</TableHead><TableHead>Harvest</TableHead><TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(crop => (
              <TableRow key={crop.id}>
                <TableCell className="font-medium">{crop.name}</TableCell>
                <TableCell>{crop.type}</TableCell>
                <TableCell>{crop.field}</TableCell>
                <TableCell>{crop.area}</TableCell>
                <TableCell>{crop.plantingDate}</TableCell>
                <TableCell>{crop.expectedHarvest}</TableCell>
                <TableCell><Badge className={statusColors[crop.status]}>{crop.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </Card>
    </div>
  );
}
