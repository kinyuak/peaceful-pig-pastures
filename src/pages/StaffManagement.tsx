import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import StaffEditDialog from "@/components/StaffEditDialog";

const demoStaff = [
  {
    id: "S001",
    name: "Joyce Njoroge",
    role: "Farm Manager",
    phone: "+254712345678",
    email: "joyce@farm.com",
    dateJoined: "2022-03-01",
    tasks: "Oversees all operations",
    shift: "Full-Time",
    employment: "Full-time",
    status: "Active",
    salary: 420,
    photo: "",
    payroll: [{ month: "June", paid: true }, { month: "May", paid: true }],
    attendance: 24,
    leave: [],
    bonus: 40,
    deductions: 0,
    remarks: ""
  },
  {
    id: "S002",
    name: "Ezra Odule",
    role: "Pig Attendant",
    phone: "+254798562313",
    email: "ezra@farm.com",
    dateJoined: "2024-01-10",
    tasks: "Pig feeding, cleaning",
    shift: "Day",
    employment: "Part-time",
    status: "Active",
    salary: 220,
    photo: "",
    payroll: [{ month: "June", paid: false }, { month: "May", paid: true }],
    attendance: 13,
    leave: [{ from: "2024-06-10", to: "2024-06-16", reason: "Sick" }],
    bonus: 0,
    deductions: 10,
    remarks: "On medical leave"
  },
  {
    id: "S003",
    name: "Doris Mutua",
    role: "Field Worker",
    phone: "+254789523183",
    email: "doris@farm.com",
    dateJoined: "2023-07-20",
    tasks: "Maize field work",
    shift: "Day",
    employment: "Casual",
    status: "On Leave",
    salary: 50,
    photo: "",
    payroll: [{ month: "June", paid: false }, { month: "May", paid: false }],
    attendance: 7,
    leave: [{ from: "2024-06-12", to: "2024-06-24", reason: "Family" }],
    bonus: 0,
    deductions: 0,
    remarks: ""
  }
];

const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#1e40af"];

// Fake summaries for chart
const attendanceData = [
  { name: "Present", value: demoStaff.reduce((s, d) => s + d.attendance, 0) },
  { name: "Leave", value: demoStaff.reduce((s, d) => s + (d.leave?.length ? 1 : 0), 0) },
  { name: "Absent", value: 5 }
];

export default function StaffManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [staff, setStaff] = useState([...demoStaff]);
  const navigate = useNavigate();

  // State for add staff dialog
  const [openAdd, setOpenAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    dateJoined: "",
    shift: "",
    employment: "",
    status: "Active",
    salary: "",
  });

  // Unique roles from staff list
  const rolesAvailable = Array.from(new Set(staff.map(s => s.role).filter(Boolean)));

  // State for editing
  const [editingStaff, setEditingStaff] = useState<any | null>(null);

  // Handler for form fields
  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  // Generate next staff id
  function getNextStaffId() {
    const nums = staff.map(s => Number(s.id.replace("S", ""))).filter(n => !isNaN(n));
    const next = (nums.length ? Math.max(...nums) : 0) + 1;
    return `S${String(next).padStart(3, "0")}`;
  }

  function handleAddStaff(e: React.FormEvent) {
    e.preventDefault();
    // Simple validation: require name, role, phone, salary
    if (!form.name || !form.role || !form.phone || !form.salary) {
      return;
    }
    const newStaff = {
      id: getNextStaffId(),
      name: form.name,
      role: form.role,
      phone: form.phone,
      email: form.email,
      dateJoined: form.dateJoined || new Date().toISOString().slice(0,10),
      tasks: "",
      shift: form.shift,
      employment: form.employment,
      status: form.status,
      salary: Number(form.salary) || 0,
      photo: "",
      payroll: [{ month: "June", paid: false }, { month: "May", paid: false }],
      attendance: 0,
      leave: [],
      bonus: 0,
      deductions: 0,
      remarks: ""
    };
    setStaff(prev => [...prev, newStaff]);
    setForm({
      name: "",
      role: "",
      phone: "",
      email: "",
      dateJoined: "",
      shift: "",
      employment: "",
      status: "Active",
      salary: "",
    });
    setOpenAdd(false);
  }

  // Handler for updating staff
  function handleUpdateStaff(updated: any) {
    setStaff(prev =>
      prev.map(s => (s.id === updated.id ? { ...s, ...updated } : s))
    );
    setEditingStaff(null);
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="outline" onClick={() => navigate("/")}>Home</Button>
        <h2 className="text-2xl font-bold text-farm-blue-700">Staff Management</h2>
      </div>
      <Card className="p-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <Input
            placeholder="Search staff..."
            className="max-w-xs"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="border rounded px-2 py-1" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            {rolesAvailable.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button>Add Staff</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Staff Member</DialogTitle>
              </DialogHeader>
              <form className="space-y-3 mt-3" onSubmit={handleAddStaff}>
                <div className="flex gap-2">
                  <Input placeholder="Name" name="name" value={form.name} onChange={handleFormChange} required />
                  {/* Role dropdown */}
                  <select
                    className="border rounded px-2 py-2 w-full"
                    name="role"
                    value={form.role}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select role</option>
                    {rolesAvailable.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                    {/* Allow entering a custom role */}
                    {!rolesAvailable.includes(form.role) && form.role ? (
                      <option value={form.role}>{form.role}</option>
                    ) : null}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Phone" name="phone" value={form.phone} onChange={handleFormChange} required />
                  <Input placeholder="Email" name="email" value={form.email} onChange={handleFormChange} type="email" />
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Start Date" name="dateJoined" value={form.dateJoined} onChange={handleFormChange} type="date" />
                  <Input placeholder="Salary" name="salary" value={form.salary} onChange={handleFormChange} type="number" min="0" required />
                </div>
                <div className="flex gap-2">
                  <select className="border rounded px-2 py-1 w-full" name="shift" value={form.shift} onChange={handleFormChange}>
                    <option value="">Shift</option>
                    <option>Day</option>
                    <option>Night</option>
                    <option>Full-Time</option>
                  </select>
                  <select className="border rounded px-2 py-1 w-full" name="employment" value={form.employment} onChange={handleFormChange}>
                    <option value="">Employment</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Casual</option>
                  </select>
                  <select className="border rounded px-2 py-1 w-full" name="status" value={form.status} onChange={handleFormChange}>
                    <option>Active</option>
                    <option>On Leave</option>
                    <option>Left</option>
                  </select>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Staff</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {/* Staff Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Employment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Leave</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff
              .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
              .filter(s => roleFilter === "all" || s.role === roleFilter)
              .map(s => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{s.name}</span>
                      <span className="text-xs text-gray-500">{s.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>{s.role}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{s.phone}</span>
                      <span className="text-xs text-gray-500">{s.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{s.dateJoined}</TableCell>
                  <TableCell>{s.shift}</TableCell>
                  <TableCell>{s.employment}</TableCell>
                  <TableCell>
                    <span className={
                      s.status === 'Active' ? 'text-green-700' :
                      s.status === 'On Leave' ? 'text-orange-700' :
                      'text-red-700'
                    }>
                      {s.status}
                    </span>
                  </TableCell>
                  <TableCell>${s.salary}</TableCell>
                  <TableCell>{s.attendance}</TableCell>
                  <TableCell>
                    {s.leave.length > 0
                      ? s.leave.map(lv => (
                        <div key={lv.from}>
                          {lv.from}–{lv.to} ({lv.reason})
                        </div>
                      ))
                      : "-"
                    }
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingStaff(s)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="mt-3 text-right text-xs text-gray-400">Demo pagination</div>
      </Card>
      {/* Edit Dialog */}
      <StaffEditDialog
        open={!!editingStaff}
        staff={editingStaff}
        onOpenChange={v => !v && setEditingStaff(null)}
        onSave={handleUpdateStaff}
        roles={rolesAvailable}
      />
    </div>
  );
}
