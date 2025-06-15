
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type SaleType = "Produce" | "Livestock";

export interface AddSaleFormData {
  id: string;
  date: string;
  type: SaleType;
  item: string;
  pigTag?: string;
  category?: string;
  weight?: number;
  saleType?: string;
  quantity: number;
  unitPrice: number;
  buyer: string;
  contact: string;
  method: string;
  salesperson: string;
  location: string;
  remarks: string;
  status: string;
  cost: number;
}

export interface AddSaleDialogProps {
  onAddSale: (data: AddSaleFormData) => void;
}

const defaultForm: AddSaleFormData = {
  id: "",
  date: new Date().toISOString().slice(0, 10),
  type: "Produce",
  item: "",
  pigTag: "",
  category: "",
  weight: undefined,
  saleType: "",
  quantity: 1,
  unitPrice: 0,
  buyer: "",
  contact: "",
  method: "",
  salesperson: "",
  location: "",
  remarks: "",
  status: "Completed",
  cost: 0,
};

export const AddSaleDialog: React.FC<AddSaleDialogProps> = ({ onAddSale }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AddSaleFormData>({ ...defaultForm });

  // Helper to generate simple Sale ID
  const generateId = () =>
    "SALE-" + Math.random().toString(36).slice(2, 7).toUpperCase();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quantity" ||
        name === "unitPrice" ||
        name === "cost" ||
        name === "weight"
          ? value === "" ? "" : Number(value)
          : value,
    }));
  };

  const handleTypeSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({
      ...defaultForm,
      type: e.target.value as SaleType,
      date: prev.date,
      id: prev.id || generateId(),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure a Sale ID exists
    const saleWithId = { ...form, id: form.id || generateId() };
    onAddSale(saleWithId);
    setForm({ ...defaultForm, id: "", date: new Date().toISOString().slice(0, 10) });
    setOpen(false);
  };

  // Sale fields based on type
  const isProduce = form.type === "Produce";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="w-full md:w-auto">
          Add New Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full md:max-w-lg w-[98vw] md:w-auto p-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">Add New Sale</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[65vh] max-h-[65vh] px-2 md:px-0 md:max-h-[65vh]">
            <div className="grid gap-2 md:gap-3 pb-2 mt-2">
              {/* Type */}
              <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                <label className="text-sm w-full sm:w-32 font-medium">Type</label>
                <select
                  name="type"
                  className="border px-2 py-1 rounded w-full"
                  value={form.type}
                  onChange={handleTypeSwitch}
                >
                  <option value="Produce">Produce</option>
                  <option value="Livestock">Livestock</option>
                </select>
              </div>
              {/* Date */}
              <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                <label className="text-sm w-full sm:w-32 font-medium">Date</label>
                <Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleInput}
                  required
                />
              </div>
              {/* Item fields */}
              {isProduce ? (
                <>
                  <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                    <label className="text-sm w-full sm:w-32 font-medium">Item Name</label>
                    <Input name="item" value={form.item} onChange={handleInput} required />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                    <label className="text-sm w-full sm:w-32 font-medium">Quantity</label>
                    <Input
                      name="quantity"
                      type="number"
                      min={1}
                      value={form.quantity}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                    <label className="text-sm w-full sm:w-32 font-medium">Pig Tag #</label>
                    <Input name="pigTag" value={form.pigTag} onChange={handleInput} required />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                    <label className="text-sm w-full sm:w-32 font-medium">Category</label>
                    <Input name="category" value={form.category} onChange={handleInput} required />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                    <label className="text-sm w-full sm:w-32 font-medium">Weight (kg)</label>
                    <Input
                      name="weight"
                      type="number"
                      min={0}
                      value={form.weight || ""}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                    <label className="text-sm w-full sm:w-32 font-medium">Sale Type</label>
                    <Input name="saleType" value={form.saleType} onChange={handleInput} />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                    <label className="text-sm w-full sm:w-32 font-medium">Unit Price</label>
                    <Input
                      name="unitPrice"
                      type="number"
                      min={0}
                      value={form.unitPrice}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                    <label className="text-sm w-full sm:w-32 font-medium">Quantity</label>
                    <Input
                      name="quantity"
                      type="number"
                      min={1}
                      value={form.quantity}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </>
              )}
              {/* Shared Fields */}
              {isProduce && (
                <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                  <label className="text-sm w-full sm:w-32 font-medium">Unit Price</label>
                  <Input
                    name="unitPrice"
                    type="number"
                    min={0}
                    value={form.unitPrice}
                    onChange={handleInput}
                    required
                  />
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                <label className="text-sm w-full sm:w-32 font-medium">Cost per Unit</label>
                <Input
                  name="cost"
                  type="number"
                  min={0}
                  value={form.cost}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                <label className="text-sm w-full sm:w-32 font-medium">Buyer Name</label>
                <Input name="buyer" value={form.buyer} onChange={handleInput} required />
              </div>
              <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                <label className="text-sm w-full sm:w-32 font-medium">Buyer Contact</label>
                <Input name="contact" value={form.contact} onChange={handleInput} />
              </div>
              <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                <label className="text-sm w-full sm:w-32 font-medium">Method</label>
                <select
                  name="method"
                  className="border px-2 py-1 rounded w-full"
                  value={form.method}
                  onChange={handleInput}
                >
                  <option value=""></option>
                  <option value="Cash">Cash</option>
                  <option value="Mpesa">Mpesa</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                <label className="text-sm w-full sm:w-32 font-medium">Salesperson</label>
                <Input name="salesperson" value={form.salesperson} onChange={handleInput} />
              </div>
              <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                <label className="text-sm w-full sm:w-32 font-medium">Location</label>
                <Input name="location" value={form.location} onChange={handleInput} />
              </div>
              <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                <label className="text-sm w-full sm:w-32 font-medium">Status</label>
                <select
                  name="status"
                  className="border px-2 py-1 rounded w-full"
                  value={form.status}
                  onChange={handleInput}
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center">
                <label className="text-sm w-full sm:w-32 font-medium">Remarks</label>
                <Input name="remarks" value={form.remarks} onChange={handleInput} />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="flex flex-col md:flex-row gap-2 w-full justify-end mt-4">
            <Button type="submit" className="w-full md:w-auto">Add Sale</Button>
            <DialogClose asChild>
              <Button variant="outline" type="button" className="w-full md:w-auto">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
// ... end of file ...
