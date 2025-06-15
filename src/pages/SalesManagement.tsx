
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { AddSaleDialog, AddSaleFormData } from "@/components/AddSaleDialog";

// Demo sales data now matches AddSaleFormData type
const demoSales: AddSaleFormData[] = [
  {
    id: "SALE-001",
    date: "2024-06-10",
    type: "Produce",
    item: "Maize",
    quantity: 100,
    unitPrice: 40,
    buyer: "John Doe",
    contact: "+254700123456",
    method: "Cash",
    salesperson: "Joyce Njoroge",
    location: "Local Market",
    remarks: "",
    status: "Completed",
    cost: 25,
    // produce fields, no pigTag/category/etc
  },
  {
    id: "SALE-002",
    date: "2024-06-12",
    type: "Livestock",
    item: "Pig (Tag: P0032)",
    pigTag: "P0032",
    category: "Weaner",
    weight: 45,
    saleType: "Direct",
    quantity: 1,
    unitPrice: 11000,
    buyer: "Grace Kimani",
    contact: "+254701678234",
    method: "Mpesa",
    salesperson: "Ezra Odule",
    location: "Farm Gate",
    remarks: "",
    status: "Completed",
    cost: 8000,
  }
];

// Helper for revenue and reporting
const getRevenue = (sales: AddSaleFormData[], type = "all") => {
  return sales
    .filter(s => (type === "all" ? true : s.type === type))
    .reduce((total, s) => total + (s.unitPrice * (s.quantity || 1)), 0);
};
const getCost = (sales: AddSaleFormData[], type = "all") => {
  return sales
    .filter(s => (type === "all" ? true : s.type === type))
    .reduce((total, s) => total + ((s.cost || 0) * (s.quantity || 1)), 0);
};

const salesStatuses = [
  "All", "Completed", "Pending", "Cancelled"
];

// ------ Chart Data Preparation ------
const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#fbbf24", "#6366f1"];

export default function SalesManagement() {
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sales, setSales] = useState<AddSaleFormData[]>([...demoSales]);

  // Chart data uses current visible sales
  const chartRevenueByType = [
    { name: "Produce", Revenue: getRevenue(sales, "Produce") },
    { name: "Livestock", Revenue: getRevenue(sales, "Livestock") },
  ];
  const chartSalesTypeSplit = [
    { name: "Produce", value: sales.filter((s) => s.type === "Produce").length },
    { name: "Livestock", value: sales.filter((s) => s.type === "Livestock").length },
  ];

  // Filtered sales for table view
  const filteredSales = sales.filter((s) => 
    (statusFilter === "All" || s.status === statusFilter) &&
    (s.item?.toLowerCase().includes(search.toLowerCase()) ||
    s.buyer?.toLowerCase().includes(search.toLowerCase()) ||
    s.id?.toLowerCase().includes(search.toLowerCase()))
  );

  // Add new sale
  const handleAddSale = (newSale: AddSaleFormData) => {
    // If Livestock: override item for display consistency
    let saleToAdd = { ...newSale };
    if (saleToAdd.type === "Livestock" && saleToAdd.pigTag) {
      saleToAdd.item = `Pig (${saleToAdd.pigTag})`;
    }
    setSales(prev => [saleToAdd, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="outline" asChild><a href="/">Home</a></Button>
        <h2 className="text-2xl font-bold text-farm-blue-700">Sales Management</h2>
      </div>
      <Tabs value={tab} onValueChange={setTab} className="w-full mb-6">
        <TabsList className="mb-2 flex flex-wrap gap-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="records">Sales Records</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 border-blue-100 bg-farm-blue-50">
              <div className="text-xs text-gray-500 mb-1">Total Revenue</div>
              <div className="text-2xl font-bold text-farm-blue-800">
                Ksh {getRevenue(sales).toLocaleString()}
              </div>
            </Card>
            <Card className="p-4 border-blue-100 bg-farm-blue-50">
              <div className="text-xs text-gray-500 mb-1">Livestock Sales</div>
              <div className="text-lg font-bold text-farm-blue-700">
                Ksh {getRevenue(sales, "Livestock").toLocaleString()}
              </div>
            </Card>
            <Card className="p-4 border-blue-100 bg-farm-blue-50">
              <div className="text-xs text-gray-500 mb-1">Produce Sales</div>
              <div className="text-lg font-bold text-farm-blue-700">
                Ksh {getRevenue(sales, "Produce").toLocaleString()}
              </div>
            </Card>
            <Card className="p-4 border-blue-100 bg-farm-blue-50">
              <div className="text-xs text-gray-500 mb-1">Total Profit</div>
              <div className="text-lg font-bold text-green-700">
                Ksh {(getRevenue(sales)-getCost(sales)).toLocaleString()}
              </div>
            </Card>
          </div>
          {/* --------- Analytics/Charts --------- */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Revenue by Type Bar Chart */}
            <div className="bg-white border rounded p-4 shadow-sm">
              <div className="font-semibold mb-2 text-farm-blue-600">Revenue Breakdown by Category</div>
              <ResponsiveContainer height={220} width="100%">
                <BarChart data={chartRevenueByType}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Revenue" fill="#3b82f6" barSize={60} radius={6}>
                    {chartRevenueByType.map((entry, idx) => (
                      <Cell key={`bar-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Sales Distribution Pie Chart */}
            <div className="bg-white border rounded p-4 shadow-sm">
              <div className="font-semibold mb-2 text-farm-blue-600">Sales Distribution</div>
              <ResponsiveContainer height={220} width="100%">
                <PieChart>
                  <Pie
                    data={chartSalesTypeSplit}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={70}
                    label
                  >
                    {chartSalesTypeSplit.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* --------- END: Analytics/Charts --------- */}
        </TabsContent>
        <TabsContent value="records">
          {/* Sales Records Table */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex gap-2 items-center">
              <Input
                type="text"
                placeholder="Search sales..."
                className="max-w-xs"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Search className="text-gray-500" size={18} />
            </div>
            <select className="border rounded px-2 py-1" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              {salesStatuses.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
            {/* Replace static Button with AddSaleDialog */}
            <AddSaleDialog onAddSale={handleAddSale} />
          </div>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sale ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Salesperson</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Sale</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map(sale => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.id}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.type}</TableCell>
                    <TableCell>
                      {sale.type === "Livestock" && sale.pigTag
                        ? `Pig (${sale.pigTag})`
                        : sale.item}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{sale.buyer}</span>
                        <span className="text-xs text-gray-500">{sale.contact}</span>
                      </div>
                    </TableCell>
                    <TableCell>{sale.salesperson}</TableCell>
                    <TableCell>
                      <span className={
                        sale.status === "Completed"
                          ? "text-green-700"
                          : sale.status === "Pending"
                          ? "text-orange-700"
                          : "text-red-700"
                      }>
                        {sale.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      Ksh {(sale.unitPrice * (sale.quantity || 1)).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredSales.length === 0 && (
              <div className="text-center text-gray-400 p-10">No sales found.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
