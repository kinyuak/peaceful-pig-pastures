import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { AddSaleDialog, AddSaleFormData } from "@/components/AddSaleDialog";

const demoSales: AddSaleFormData[] = [
  {
    id: "SALE-001", date: "2024-06-10", type: "Produce", item: "Maize",
    quantity: 100, unitPrice: 40, buyer: "John Doe", contact: "+254700123456",
    method: "Cash", salesperson: "Joyce Njoroge", location: "Local Market",
    remarks: "", status: "Completed", cost: 25,
  },
  {
    id: "SALE-002", date: "2024-06-12", type: "Livestock", item: "Pig (Tag: P0032)",
    pigTag: "P0032", category: "Weaner", weight: 45, saleType: "Direct",
    quantity: 1, unitPrice: 11000, buyer: "Grace Kimani", contact: "+254701678234",
    method: "Mpesa", salesperson: "Ezra Odule", location: "Farm Gate",
    remarks: "", status: "Completed", cost: 8000,
  }
];

const getRevenue = (sales: AddSaleFormData[], type = "all") =>
  sales.filter(s => (type === "all" ? true : s.type === type))
    .reduce((total, s) => total + (s.unitPrice * (s.quantity || 1)), 0);

const getCost = (sales: AddSaleFormData[], type = "all") =>
  sales.filter(s => (type === "all" ? true : s.type === type))
    .reduce((total, s) => total + ((s.cost || 0) * (s.quantity || 1)), 0);

const salesStatuses = ["All", "Completed", "Pending", "Cancelled"];
const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#fbbf24", "#6366f1"];

export default function SalesManagement() {
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sales, setSales] = useState<AddSaleFormData[]>([...demoSales]);

  const chartRevenueByType = [
    { name: "Produce", Revenue: getRevenue(sales, "Produce") },
    { name: "Livestock", Revenue: getRevenue(sales, "Livestock") },
  ];
  const chartSalesTypeSplit = [
    { name: "Produce", value: sales.filter((s) => s.type === "Produce").length },
    { name: "Livestock", value: sales.filter((s) => s.type === "Livestock").length },
  ];

  const filteredSales = sales.filter((s) =>
    (statusFilter === "All" || s.status === statusFilter) &&
    (s.item?.toLowerCase().includes(search.toLowerCase()) ||
    s.buyer?.toLowerCase().includes(search.toLowerCase()) ||
    s.id?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddSale = (newSale: AddSaleFormData) => {
    let saleToAdd = { ...newSale };
    if (saleToAdd.type === "Livestock" && saleToAdd.pigTag) {
      saleToAdd.item = `Pig (${saleToAdd.pigTag})`;
    }
    setSales(prev => [saleToAdd, ...prev]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Sales Management</h2>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="records">Sales Records</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4"><div className="text-xs text-muted-foreground mb-1">Total Revenue</div><div className="text-2xl font-bold text-primary">Ksh {getRevenue(sales).toLocaleString()}</div></Card>
            <Card className="p-4"><div className="text-xs text-muted-foreground mb-1">Livestock Sales</div><div className="text-lg font-bold">Ksh {getRevenue(sales, "Livestock").toLocaleString()}</div></Card>
            <Card className="p-4"><div className="text-xs text-muted-foreground mb-1">Produce Sales</div><div className="text-lg font-bold">Ksh {getRevenue(sales, "Produce").toLocaleString()}</div></Card>
            <Card className="p-4"><div className="text-xs text-muted-foreground mb-1">Total Profit</div><div className="text-lg font-bold text-success">Ksh {(getRevenue(sales) - getCost(sales)).toLocaleString()}</div></Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <div className="font-semibold mb-2 text-sm">Revenue Breakdown</div>
              <ResponsiveContainer height={180} width="100%">
                <BarChart data={chartRevenueByType}>
                  <XAxis dataKey="name" /><YAxis /><Tooltip />
                  <Bar dataKey="Revenue" fill="#3b82f6" barSize={60} radius={6}>
                    {chartRevenueByType.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-4">
              <div className="font-semibold mb-2 text-sm">Sales Distribution</div>
              <ResponsiveContainer height={180} width="100%">
                <PieChart>
                  <Pie data={chartSalesTypeSplit} dataKey="value" nameKey="name" outerRadius={70} label>
                    {chartSalesTypeSplit.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                  </Pie>
                  <Tooltip /><Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="records">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div className="flex gap-2 items-center">
              <Input placeholder="Search sales..." className="max-w-xs" value={search} onChange={e => setSearch(e.target.value)} />
              <Search className="text-muted-foreground" size={18} />
            </div>
            <select className="border rounded px-2 py-1 text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              {salesStatuses.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
            <AddSaleDialog onAddSale={handleAddSale} />
          </div>
          <Card className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sale ID</TableHead><TableHead>Date</TableHead><TableHead>Type</TableHead>
                  <TableHead>Item</TableHead><TableHead>Buyer</TableHead>
                  <TableHead className="hidden sm:table-cell">Salesperson</TableHead>
                  <TableHead>Status</TableHead><TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map(sale => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.id}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.type}</TableCell>
                    <TableCell>{sale.type === "Livestock" && sale.pigTag ? `Pig (${sale.pigTag})` : sale.item}</TableCell>
                    <TableCell><div className="flex flex-col"><span>{sale.buyer}</span><span className="text-xs text-muted-foreground">{sale.contact}</span></div></TableCell>
                    <TableCell className="hidden sm:table-cell">{sale.salesperson}</TableCell>
                    <TableCell><span className={sale.status === "Completed" ? "text-success" : sale.status === "Pending" ? "text-warning" : "text-destructive"}>{sale.status}</span></TableCell>
                    <TableCell>Ksh {(sale.unitPrice * (sale.quantity || 1)).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredSales.length === 0 && <div className="text-center text-muted-foreground p-6">No sales found.</div>}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
