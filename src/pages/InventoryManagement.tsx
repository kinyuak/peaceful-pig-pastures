import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";

const demoProduce = [
  {
    id: "1",
    name: "Maize",
    category: "Produce",
    batch: "A223",
    quantity: 800,
    unit: "kg",
    added: "2024-06-10",
    expiry: "2024-10-12",
    supplier: "Farm Input Ltd",
    location: "Granary 1",
    cost: 0.3,
    usage: 120,
    notes: "For animal feed and sale."
  },
  {
    id: "2",
    name: "Beans",
    category: "Produce",
    batch: "B101",
    quantity: 90,
    unit: "kg",
    added: "2024-06-01",
    expiry: "2024-08-05",
    supplier: "Beans Co.",
    location: "Granary 1",
    cost: 0.6,
    usage: 16,
    notes: "Stock running low."
  },
];

const demoFeed = [
  {
    id: "f1",
    name: "Pig Pellets",
    category: "Feed",
    batch: "PEL998",
    quantity: 65,
    unit: "kg",
    added: "2024-06-03",
    expiry: "2024-08-01",
    supplier: "Pig Nutrition",
    location: "Feed Store",
    cost: 1.1,
    usage: 44,
    notes: "Active batch"
  },
  {
    id: "f2",
    name: "Minerals Supplement",
    category: "Feed",
    batch: "MIN223",
    quantity: 20,
    unit: "kg",
    added: "2024-06-12",
    expiry: "-",
    supplier: "VetMax",
    location: "Feed Store",
    cost: 2.4,
    usage: 6,
    notes: ""
  },
];

// For the demo, simple alert for low stock:
const getLowStockItems = (items: any[]) =>
  items.filter(item => item.quantity < 100);

export default function InventoryManagement() {
  const [tab, setTab] = useState("produce");
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: tab === "produce" ? "Produce" : "Feed",
    batch: "",
    quantity: "",
    unit: "",
    added: "",
    expiry: "",
    supplier: "",
    location: "",
    cost: "",
    usage: "",
    notes: "",
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const data = tab === "produce" ? demoProduce : demoFeed;
  const lowStock = getLowStockItems(data);
  const pieData = data.map((item) => ({ name: item.name, value: item.quantity }));
  const barData = data.map((item) => ({ name: item.name, usage: item.usage }));
  const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#1e40af"];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-farm-blue-700 mb-6">Inventory Management</h2>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="produce">Farm Produce</TabsTrigger>
          <TabsTrigger value="feed">Animal Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="produce">
          <Card className="p-4">
            {/* Low stock alert */}
            {lowStock.length > 0 && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Low Stock Alert</AlertTitle>
                <AlertDescription>
                  Low stock for: {lowStock.map(i => i.name).join(", ")}
                </AlertDescription>
              </Alert>
            )}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <Input
                placeholder="Search produce..."
                className="max-w-xs"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setAddOpen(true)}>Add New Item</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Inventory Item</DialogTitle>
                  </DialogHeader>
                  {/* Inventory Add Form */}
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Name</label>
                      <Input name="name" value={form.name} onChange={handleFieldChange} required />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Category</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleFieldChange}
                        className="w-full rounded-md border border-gray-200 px-3 py-2"
                      >
                        <option value="Produce">Produce</option>
                        <option value="Feed">Feed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Batch/Lot Number</label>
                      <Input name="batch" value={form.batch} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Quantity in Stock</label>
                      <Input type="number" name="quantity" value={form.quantity} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Unit</label>
                      <Input name="unit" value={form.unit} onChange={handleFieldChange} placeholder="kg, litres, units" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Date Added</label>
                      <Input type="date" name="added" value={form.added} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Expiry Date</label>
                      <Input type="date" name="expiry" value={form.expiry} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Supplier/Source</label>
                      <Input name="supplier" value={form.supplier} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Storage Location</label>
                      <Input name="location" value={form.location} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Cost per Unit</label>
                      <Input type="number" name="cost" value={form.cost} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Usage Rate</label>
                      <Input type="number" name="usage" value={form.usage} onChange={handleFieldChange} placeholder="per month" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">Notes/Remarks</label>
                      <Input name="notes" value={form.notes} onChange={handleFieldChange} />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button
                      onClick={() => setAddOpen(false)}
                      type="button"
                      variant="ghost"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => setAddOpen(false)}
                    >
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {/* Charts */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <Card className="p-6 flex-1">
                <h3 className="font-semibold mb-2">Stock Levels</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${Math.round(percent * 100)}%)`
                      }
                      dataKey="value"
                      outerRadius={80}
                    >
                      {pieData.map((_, idx) => (
                        <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
              <Card className="p-6 flex-1">
                <h3 className="font-semibold mb-2">Monthly Usage Rate</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill={colors[2]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            {/* Inventory Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Cost/Unit</TableHead>
                  <TableHead>Usage Rate</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data
                  .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                  .map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.batch}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.added}</TableCell>
                      <TableCell>{item.expiry}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>${item.cost}</TableCell>
                      <TableCell>{item.usage} /month</TableCell>
                      <TableCell>{item.notes}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="mt-3 text-right text-xs text-gray-400">Demo pagination</div>
          </Card>
        </TabsContent>
        <TabsContent value="feed">
          {/* Just reusing produce section for demo; swap data/labels */}
          {/* Can copy/paste above content and just replace data with demoFeed */}
          <Card className="p-4">
            {getLowStockItems(demoFeed).length > 0 && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Low Stock Alert</AlertTitle>
                <AlertDescription>
                  Low stock for: {getLowStockItems(demoFeed).map(i => i.name).join(", ")}
                </AlertDescription>
              </Alert>
            )}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <Input
                placeholder="Search feed..."
                className="max-w-xs"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setAddOpen(true)}>Add New Item</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Inventory Item</DialogTitle>
                  </DialogHeader>
                  {/* Inventory Add Form */}
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Name</label>
                      <Input name="name" value={form.name} onChange={handleFieldChange} required />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Category</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleFieldChange}
                        className="w-full rounded-md border border-gray-200 px-3 py-2"
                      >
                        <option value="Produce">Produce</option>
                        <option value="Feed">Feed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Batch/Lot Number</label>
                      <Input name="batch" value={form.batch} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Quantity in Stock</label>
                      <Input type="number" name="quantity" value={form.quantity} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Unit</label>
                      <Input name="unit" value={form.unit} onChange={handleFieldChange} placeholder="kg, litres, units" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Date Added</label>
                      <Input type="date" name="added" value={form.added} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Expiry Date</label>
                      <Input type="date" name="expiry" value={form.expiry} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Supplier/Source</label>
                      <Input name="supplier" value={form.supplier} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Storage Location</label>
                      <Input name="location" value={form.location} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Cost per Unit</label>
                      <Input type="number" name="cost" value={form.cost} onChange={handleFieldChange} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Usage Rate</label>
                      <Input type="number" name="usage" value={form.usage} onChange={handleFieldChange} placeholder="per month" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">Notes/Remarks</label>
                      <Input name="notes" value={form.notes} onChange={handleFieldChange} />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button
                      onClick={() => setAddOpen(false)}
                      type="button"
                      variant="ghost"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => setAddOpen(false)}
                    >
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {/* Charts */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <Card className="p-6 flex-1">
                <h3 className="font-semibold mb-2">Stock Levels</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={demoFeed.map((item) => ({ name: item.name, value: item.quantity }))}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${Math.round(percent * 100)}%)`
                      }
                      dataKey="value"
                      outerRadius={80}
                    >
                      {demoFeed.map((_, idx) => (
                        <Cell key={`cell-feed-${idx}`} fill={colors[idx % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
              <Card className="p-6 flex-1">
                <h3 className="font-semibold mb-2">Monthly Usage Rate</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={demoFeed.map((item) => ({ name: item.name, usage: item.usage }))}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill={colors[1]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Cost/Unit</TableHead>
                  <TableHead>Usage Rate</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoFeed
                  .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                  .map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.batch}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.added}</TableCell>
                      <TableCell>{item.expiry}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>${item.cost}</TableCell>
                      <TableCell>{item.usage} /month</TableCell>
                      <TableCell>{item.notes}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="mt-3 text-right text-xs text-gray-400">Demo pagination</div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
