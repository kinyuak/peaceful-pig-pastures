import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Clock, CheckCircle, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LabourRequest {
  id: string;
  taskType: string;
  date: string;
  workersNeeded: number;
  location: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed';
}

const demoRequests: LabourRequest[] = [
  { id: '1', taskType: 'Planting', date: '2026-04-10', workersNeeded: 5, location: 'Field A', notes: 'Maize planting season', status: 'confirmed' },
  { id: '2', taskType: 'Harvesting', date: '2026-04-15', workersNeeded: 8, location: 'Field C', notes: 'Wheat harvest', status: 'pending' },
  { id: '3', taskType: 'Spraying', date: '2026-03-20', workersNeeded: 3, location: 'Greenhouse 1', notes: 'Pest control', status: 'completed' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning',
  confirmed: 'bg-primary/10 text-primary',
  completed: 'bg-success/10 text-success',
};

export default function LabourServices() {
  const [requests, setRequests] = useState<LabourRequest[]>(demoRequests);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ taskType: 'Planting', date: '', workersNeeded: '', location: '', notes: '' });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!form.date || !form.location) return;
    const newReq: LabourRequest = {
      id: Date.now().toString(),
      taskType: form.taskType,
      date: form.date,
      workersNeeded: parseInt(form.workersNeeded) || 1,
      location: form.location,
      notes: form.notes,
      status: 'pending',
    };
    setRequests(prev => [...prev, newReq]);
    setForm({ taskType: 'Planting', date: '', workersNeeded: '', location: '', notes: '' });
    setAddOpen(false);
    toast({ title: 'Request submitted', description: 'Your labour request has been submitted.' });
  };

  const pending = requests.filter(r => r.status === 'pending').length;
  const confirmed = requests.filter(r => r.status === 'confirmed').length;
  const completed = requests.filter(r => r.status === 'completed').length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Labour Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card><CardContent className="p-5 flex items-center gap-4"><div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center"><Clock className="h-6 w-6 text-warning" /></div><div><p className="text-sm text-muted-foreground">Pending</p><p className="text-xl font-bold">{pending}</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-4"><div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center"><Briefcase className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Confirmed</p><p className="text-xl font-bold">{confirmed}</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-4"><div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center"><CheckCircle className="h-6 w-6 text-success" /></div><div><p className="text-sm text-muted-foreground">Completed</p><p className="text-xl font-bold">{completed}</p></div></CardContent></Card>
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Labour Requests</h3>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Book Labour</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Book Casual Labour</DialogTitle></DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Select value={form.taskType} onValueChange={v => setForm(f => ({ ...f, taskType: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planting">Planting</SelectItem>
                    <SelectItem value="Harvesting">Harvesting</SelectItem>
                    <SelectItem value="Spraying">Spraying</SelectItem>
                    <SelectItem value="Fencing">Fencing</SelectItem>
                    <SelectItem value="Feeding">Feeding</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                <Input type="number" placeholder="Workers needed" value={form.workersNeeded} onChange={e => setForm(f => ({ ...f, workersNeeded: e.target.value }))} />
                <Input placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                <div className="md:col-span-2">
                  <Textarea placeholder="Notes..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead><TableHead>Date</TableHead><TableHead>Workers</TableHead>
              <TableHead>Location</TableHead><TableHead>Notes</TableHead><TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map(req => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">{req.taskType}</TableCell>
                <TableCell>{req.date}</TableCell>
                <TableCell>{req.workersNeeded}</TableCell>
                <TableCell>{req.location}</TableCell>
                <TableCell className="max-w-[200px] truncate">{req.notes}</TableCell>
                <TableCell><Badge className={statusColors[req.status]}>{req.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
