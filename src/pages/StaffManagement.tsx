
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

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

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-farm-blue-700 mb-6">Staff Management</h2>
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
            {[...new Set(demoStaff.map(s => s.role))].map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <Button>Add Staff</Button>
        </div>
        {/* Attendance Chart */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Card className="flex-1 p-6">
            <h3 className="font-semibold mb-2">Attendance Overview</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {attendanceData.map((_, idx) => (
                    <Cell fill={colors[idx % colors.length]} key={idx} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card className="flex-1 p-6">
            <h3 className="font-semibold mb-2">Payroll Status (Last 2 Months)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={
                  demoStaff.map(staff => ({
                    name: staff.name,
                    June: staff.payroll[0]?.paid ? 1 : 0,
                    May: staff.payroll[1]?.paid ? 1 : 0,
                  }))
                }
              >
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} tickCount={2} domain={[0, 1]} />
                <Legend />
                <Bar dataKey="June" fill={colors[0]} />
                <Bar dataKey="May" fill={colors[1]} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </Card>
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
            {demoStaff
              .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
              .filter(s => roleFilter === "all" || s.role === roleFilter)
              .map(staff => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{staff.name}</span>
                      <span className="text-xs text-gray-500">{staff.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{staff.phone}</span>
                      <span className="text-xs text-gray-500">{staff.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{staff.dateJoined}</TableCell>
                  <TableCell>{staff.shift}</TableCell>
                  <TableCell>{staff.employment}</TableCell>
                  <TableCell>
                    <span className={
                      staff.status === 'Active' ? 'text-green-700' :
                      staff.status === 'On Leave' ? 'text-orange-700' :
                      'text-red-700'
                    }>
                      {staff.status}
                    </span>
                  </TableCell>
                  <TableCell>${staff.salary}</TableCell>
                  <TableCell>{staff.attendance}</TableCell>
                  <TableCell>
                    {staff.leave.length > 0
                      ? staff.leave.map(lv => (
                        <div key={lv.from}>
                          {lv.from}–{lv.to} ({lv.reason})
                        </div>
                      ))
                      : "-"
                    }
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="mt-3 text-right text-xs text-gray-400">Demo pagination</div>
      </Card>
    </div>
  );
}
