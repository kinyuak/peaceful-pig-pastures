
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StaffType {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  dateJoined: string;
  shift: string;
  employment: string;
  status: string;
  salary: number;
  [key: string]: any;
}

interface StaffEditDialogProps {
  open: boolean;
  staff: StaffType | null;
  onOpenChange: (open: boolean) => void;
  onSave: (updated: StaffType) => void;
  roles: string[];
}

export default function StaffEditDialog({
  open,
  staff,
  onOpenChange,
  onSave,
  roles
}: StaffEditDialogProps) {
  const [form, setForm] = useState<StaffType | null>(null);

  useEffect(() => {
    setForm(staff);
  }, [staff]);

  if (!form) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => prev ? { ...prev, [name]: name === "salary" ? Number(value) : value } : null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form!);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
        </DialogHeader>
        <form className="space-y-3 mt-2" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            {/* Role dropdown */}
            <select
              className="border rounded px-2 py-2 w-full"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
              {!roles.includes(form.role) && form.role ? (
                <option value={form.role}>{form.role}</option>
              ) : null}
            </select>
          </div>
          <div className="flex gap-2">
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
            <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          </div>
          <div className="flex gap-2">
            <Input name="dateJoined" value={form.dateJoined} onChange={handleChange} type="date" placeholder="Start Date" />
            <Input name="salary" value={form.salary} onChange={handleChange} type="number" placeholder="Salary" min="0" required />
          </div>
          <div className="flex gap-2">
            <select className="border rounded px-2 py-1 w-full" name="shift" value={form.shift} onChange={handleChange}>
              <option value="">Shift</option>
              <option>Day</option>
              <option>Night</option>
              <option>Full-Time</option>
            </select>
            <select className="border rounded px-2 py-1 w-full" name="employment" value={form.employment} onChange={handleChange}>
              <option value="">Employment</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Casual</option>
            </select>
            <select className="border rounded px-2 py-1 w-full" name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>On Leave</option>
              <option>Left</option>
            </select>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
