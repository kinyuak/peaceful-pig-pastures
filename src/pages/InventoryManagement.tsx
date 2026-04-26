import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: string; name: string; category: string; batch: string; quantity: number; unit: string;
  added: string; expiry: string; supplier: string; location: string; cost: number; usage: number; notes: string;
}

const initialProduce: InventoryItem[] = [
  { id: "1", name: "Maize", category: "Produce", batch: "A223", quantity: 800, unit: "kg", added: "2024-06-10", expiry: "2024-10-12", supplier: "Farm Input Ltd", location: "Granary 1", cost: 0.3, usage: 120, notes: "For animal feed and sale." },
  { id: "2", name: "Beans", category: "Produce", batch: "B101", quantity: 90, unit: "kg", added: "2024-06-01", expiry: "2024-08-05", supplier: "Beans Co.", location: "Granary 1", cost: 0.6, usage: 16, notes: "Stock running low." },
];

const initialFeed: InventoryItem[] = [
  { id: "f1", name: "Pig Pellets", category: "Feed", batch: "PEL998", quantity: 65, unit: "kg", added: "2024-06-03", expiry: "2024-08-01", supplier: "Pig Nutrition", location: "Feed Store", cost: 1.1, usage: 44, notes: "Active batch" },
  { id: "f2", name: "Minerals Supplement", category: "Feed", batch: "MIN223", quantity: 20, unit: "kg", added: "2024-06-12", expiry: "-", supplier: "VetMax", location: "Feed Store", cost: 2.4, usage: 6, notes: "" },
];

const getLowStockItems = (items: InventoryItem[]) => items.filter(item => item.quantity < 100);
const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#1e40af"];

export default function InventoryManagement() {
  const [tab, setTab] = useState("produce");
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [produce, setProduce] = useState<InventoryItem[]>(initialProduce);
  const [feed, setFeed] = useState<InventoryItem[]>(initialFeed);
  const [form, setForm] = useState({ name: "", category: "Produce", batch: "", quantity: "", unit: "", added: "", expiry: "", supplier: "", location: "", cost: "", usage: "", notes: "" });
  const { toast } = useToast();

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.name) return;
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      batch: form.batch,
      quantity: parseFloat(form.quantity) || 0,
      unit: form.unit,
      added: form.added || new Date().toISOString().split('T')[0],
      expiry: form.expiry || '-',
      supplier: form.supplier,
      location: form.location,
      cost: parseFloat(form.cost) || 0,
      usage: parseFloat(form.usage) || 0,
      notes: form.notes,
    };
    if (form.category === 'Feed') {
      setFeed(prev => [...prev, newItem]);
    } else {
      setProduce(prev => [...prev, newItem]);
    }
    setForm({ name: "", category: "Produce", batch: "", quantity: "", unit: "", added: "", expiry: "", supplier: "", location: "", cost: "", usage: "", notes: "" });
    setAddOpen(false);
    toast({ title: 'Item added', description: `${newItem.name} has been added to inventory.` });
  };

  const data = tab === "produce" ? produce : feed;
  const lowStock = getLowStockItems(data);
  const pieData = data.map((item) => ({ name: item.name, value: item.quantity }));
  const barData = data.map((item) => ({ name: item.name, usage: item.usage }));

  const renderTable = (items: InventoryItem[]) => (
    <div className="overflow-x-auto">
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead><TableHead>Batch</TableHead><TableHead>Qty</TableHead>
          <TableHead>Unit</TableHead><TableHead>Supplier</TableHead><TableHead>Cost/Unit</TableHead><TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.filter(i => i.name.toLowerCase().includes(search.toLowerCase())).map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell><TableCell>{item.batch}</TableCell>
            <TableCell>{item.quantity}</TableCell><TableCell>{item.unit}</TableCell>
            <TableCell>{item.supplier}</TableCell><TableCell>${item.cost}</TableCell>
            <TableCell>{item.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );

  const renderAddDialog = () => (
    <Dialog open={addOpen} onOpenChange={setAddOpen}>
      <DialogTrigger asChild><Button>Add New Item</Button></DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Add New Inventory Item</DialogTitle></DialogHeader>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <Input placeholder="Name" name="name" value={form.name} onChange={handleFieldChange} required />
          <select name="category" value={form.category} onChange={handleFieldChange} className="rounded-md border px-3 py-2">
            <option value="Produce">Produce</option><option value="Feed">Feed</option>
          </select>
          <Input placeholder="Batch" name="batch" value={form.batch} onChange={handleFieldChange} />
          <Input type="number" placeholder="Quantity" name="quantity" value={form.quantity} onChange={handleFieldChange} />
          <Input placeholder="Unit" name="unit" value={form.unit} onChange={handleFieldChange} />
          <Input type="date" name="added" value={form.added} onChange={handleFieldChange} />
          <Input type="date" placeholder="Expiry" name="expiry" value={form.expiry} onChange={handleFieldChange} />
          <Input placeholder="Supplier" name="supplier" value={form.supplier} onChange={handleFieldChange} />
          <Input placeholder="Location" name="location" value={form.location} onChange={handleFieldChange} />
          <Input type="number" placeholder="Cost/Unit" name="cost" value={form.cost} onChange={handleFieldChange} />
          <Input type="number" placeholder="Usage Rate" name="usage" value={form.usage} onChange={handleFieldChange} />
          <div className="md:col-span-2"><Input placeholder="Notes" name="notes" value={form.notes} onChange={handleFieldChange} /></div>
        </form>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Inventory Management</h2>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="produce">Farm Produce</TabsTrigger>
          <TabsTrigger value="feed">Animal Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="produce">
          <Card className="p-4">
            {lowStock.length > 0 && tab === "produce" && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Low Stock Alert</AlertTitle>
                <AlertDescription>Low stock: {getLowStockItems(produce).map(i => i.name).join(", ")}</AlertDescription>
              </Alert>
            )}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <Input placeholder="Search..." className="max-w-xs" value={search} onChange={e => setSearch(e.target.value)} />
              {renderAddDialog()}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-sm">Stock Levels</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" outerRadius={70} label={({ name, percent }) => `${name} (${Math.round(percent * 100)}%)`}>
                      {pieData.map((_, idx) => <Cell key={idx} fill={colors[idx % colors.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-sm">Usage Rate</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="usage" fill={colors[2]} /></BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            {renderTable(produce)}
          </Card>
        </TabsContent>
        <TabsContent value="feed">
          <Card className="p-4">
            {getLowStockItems(feed).length > 0 && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Low Stock Alert</AlertTitle>
                <AlertDescription>Low stock: {getLowStockItems(feed).map(i => i.name).join(", ")}</AlertDescription>
              </Alert>
            )}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <Input placeholder="Search..." className="max-w-xs" value={search} onChange={e => setSearch(e.target.value)} />
              {renderAddDialog()}
            </div>
            {renderTable(feed)}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
