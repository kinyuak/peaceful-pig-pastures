
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface LitterRecord {
  id: string;
  litterNumber: number;
  dueDate: string;
  actualDate: string;
  bornAlive: number;
  bornDead: number;
  males: number;
  females: number;
  adoptedPiglets: number;
}

interface HealthRecord {
  id: string;
  date: string;
  category: string;
  diagnosis: string;
  treatment: string;
  survived: number;
  died: number;
  remarks: string;
}

interface VaccineRecord {
  id: string;
  date: string;
  vaccineName: string;
  applicationMode: string;
  amount: string;
}

interface SalesRecord {
  id: string;
  date: string;
  numberSold: string;
  weight: string;
  reason: string;
  buyer: string;
}

interface FarrowingRecordsFormProps {
  initialNotes?: string;
  onSave: (notes: string) => void;
}

const FarrowingRecordsForm = ({ initialNotes = '', onSave }: FarrowingRecordsFormProps) => {
  const [farmName] = useState('PEACEFUL MEADOW FARM');
  const [sowTag, setSowTag] = useState('');
  const [boarTag, setBoarTag] = useState('');
  
  // Litter Records
  const [litters, setLitters] = useState<LitterRecord[]>([{
    id: '1',
    litterNumber: 1,
    dueDate: '',
    actualDate: '',
    bornAlive: 0,
    bornDead: 0,
    males: 0,
    females: 0,
    adoptedPiglets: 0
  }]);

  // Teeth Clipping & Castration
  const [teethClippingDate, setTeethClippingDate] = useState<Date>();
  const [castrationDate, setCastrationDate] = useState<Date>();
  const [maleCondition, setMaleCondition] = useState('');

  // Weaners & Porkers
  const [weanerDate, setWeanerDate] = useState<Date>();
  const [weanerCount, setWeanerCount] = useState('');
  const [weanerCondition, setWeanerCondition] = useState('');

  // Health Records
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([{
    id: '1',
    date: '',
    category: '',
    diagnosis: '',
    treatment: '',
    survived: 0,
    died: 0,
    remarks: ''
  }]);

  // Vaccine Records
  const [vaccines, setVaccines] = useState<VaccineRecord[]>([{
    id: '1',
    date: '',
    vaccineName: '',
    applicationMode: '',
    amount: ''
  }]);

  // Sales Records
  const [sales, setSales] = useState<SalesRecord[]>([{
    id: '1',
    date: '',
    numberSold: '',
    weight: '',
    reason: '',
    buyer: ''
  }]);

  // Extra Notes
  const [extraNotes, setExtraNotes] = useState('');

  const addLitter = () => {
    setLitters([...litters, {
      id: Date.now().toString(),
      litterNumber: litters.length + 1,
      dueDate: '',
      actualDate: '',
      bornAlive: 0,
      bornDead: 0,
      males: 0,
      females: 0,
      adoptedPiglets: 0
    }]);
  };

  const removeLitter = (id: string) => {
    setLitters(litters.filter(l => l.id !== id));
  };

  const addHealthRecord = () => {
    setHealthRecords([...healthRecords, {
      id: Date.now().toString(),
      date: '',
      category: '',
      diagnosis: '',
      treatment: '',
      survived: 0,
      died: 0,
      remarks: ''
    }]);
  };

  const removeHealthRecord = (id: string) => {
    setHealthRecords(healthRecords.filter(h => h.id !== id));
  };

  const addVaccine = () => {
    setVaccines([...vaccines, {
      id: Date.now().toString(),
      date: '',
      vaccineName: '',
      applicationMode: '',
      amount: ''
    }]);
  };

  const removeVaccine = (id: string) => {
    setVaccines(vaccines.filter(v => v.id !== id));
  };

  const addSale = () => {
    setSales([...sales, {
      id: Date.now().toString(),
      date: '',
      numberSold: '',
      weight: '',
      reason: '',
      buyer: ''
    }]);
  };

  const removeSale = (id: string) => {
    setSales(sales.filter(s => s.id !== id));
  };

  const DatePicker = ({ date, onDateChange, placeholder }: { date?: Date, onDateChange: (date: Date | undefined) => void, placeholder: string }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );

  const handleSave = () => {
    // Compile all data into formatted notes
    let compiledNotes = `${farmName}\nFARROWING RECORDS\n\nSOW TAG ${sowTag} BOAR TAG ${boarTag}\n\n`;
    
    // Litter Records
    if (litters.some(l => l.dueDate || l.actualDate)) {
      compiledNotes += "LITTER RECORDS:\n";
      litters.forEach(litter => {
        if (litter.dueDate || litter.actualDate) {
          compiledNotes += `Litter ${litter.litterNumber}: Due ${litter.dueDate}, Actual ${litter.actualDate} - ${litter.bornAlive} alive (${litter.males}M, ${litter.females}F)`;
          if (litter.adoptedPiglets > 0) {
            compiledNotes += ` + ${litter.adoptedPiglets} adopted`;
          }
          compiledNotes += '\n';
        }
      });
      compiledNotes += '\n';
    }

    // Teeth Clipping & Castration
    if (teethClippingDate || castrationDate) {
      compiledNotes += "TEETH CLIPPING & CASTRATION:\n";
      if (teethClippingDate) {
        compiledNotes += `Teeth clipping: ${format(teethClippingDate, "dd/MM/yyyy")}\n`;
      }
      if (castrationDate) {
        compiledNotes += `Male castration: ${format(castrationDate, "dd/MM/yyyy")}`;
        if (maleCondition) {
          compiledNotes += ` - ${maleCondition}`;
        }
        compiledNotes += '\n';
      }
      compiledNotes += '\n';
    }

    // Weaners & Porkers
    if (weanerDate) {
      compiledNotes += "WEANERS & PORKERS:\n";
      compiledNotes += `${format(weanerDate, "dd/MM/yyyy")}: ${weanerCount} weaners - ${weanerCondition}\n\n`;
    }

    // Vaccine Records
    if (vaccines.some(v => v.date || v.vaccineName)) {
      compiledNotes += "VACCINE APPLICATION:\n";
      vaccines.forEach(vaccine => {
        if (vaccine.date || vaccine.vaccineName) {
          compiledNotes += `${vaccine.date}: ${vaccine.vaccineName} - ${vaccine.applicationMode} - ${vaccine.amount}\n`;
        }
      });
      compiledNotes += '\n';
    }

    // Health Records
    if (healthRecords.some(h => h.date || h.diagnosis)) {
      compiledNotes += "HEALTH RECORDS:\n";
      healthRecords.forEach(record => {
        if (record.date || record.diagnosis) {
          compiledNotes += `${record.date}: ${record.category} - ${record.diagnosis} - ${record.treatment}`;
          if (record.survived || record.died) {
            compiledNotes += ` - ${record.survived} survived, ${record.died} died`;
          }
          if (record.remarks) {
            compiledNotes += ` - ${record.remarks}`;
          }
          compiledNotes += '\n';
        }
      });
      compiledNotes += '\n';
    }

    // Sales Records
    if (sales.some(s => s.date || s.numberSold)) {
      compiledNotes += "SALES:\n";
      sales.forEach(sale => {
        if (sale.date || sale.numberSold) {
          compiledNotes += `${sale.date}: ${sale.numberSold} sold - ${sale.weight} - ${sale.reason} (${sale.buyer})\n`;
        }
      });
      compiledNotes += '\n';
    }

    // Extra Notes
    if (extraNotes.trim()) {
      compiledNotes += "ADDITIONAL NOTES:\n";
      compiledNotes += extraNotes;
    }

    onSave(compiledNotes);
  };

  return (
    <div className="space-y-6">
      {/* Header Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Farm & Animal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sowTag">Sow Tag Number</Label>
              <Input
                id="sowTag"
                value={sowTag}
                onChange={(e) => setSowTag(e.target.value)}
                placeholder="e.g., 0980"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="boarTag">Boar Tag Number</Label>
              <Input
                id="boarTag"
                value={boarTag}
                onChange={(e) => setBoarTag(e.target.value)}
                placeholder="e.g., B001"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Litter Records */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Litter Records</CardTitle>
          <Button onClick={addLitter} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Litter
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {litters.map((litter) => (
            <div key={litter.id} className="border p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Litter {litter.litterNumber}</h4>
                {litters.length > 1 && (
                  <Button
                    onClick={() => removeLitter(litter.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={litter.dueDate}
                    onChange={(e) => {
                      const updatedLitters = litters.map(l =>
                        l.id === litter.id ? { ...l, dueDate: e.target.value } : l
                      );
                      setLitters(updatedLitters);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Actual Date</Label>
                  <Input
                    type="date"
                    value={litter.actualDate}
                    onChange={(e) => {
                      const updatedLitters = litters.map(l =>
                        l.id === litter.id ? { ...l, actualDate: e.target.value } : l
                      );
                      setLitters(updatedLitters);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Born Alive</Label>
                  <Input
                    type="number"
                    min="0"
                    value={litter.bornAlive || ''}
                    onChange={(e) => {
                      const updatedLitters = litters.map(l =>
                        l.id === litter.id ? { ...l, bornAlive: parseInt(e.target.value) || 0 } : l
                      );
                      setLitters(updatedLitters);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Born Dead</Label>
                  <Input
                    type="number"
                    min="0"
                    value={litter.bornDead || ''}
                    onChange={(e) => {
                      const updatedLitters = litters.map(l =>
                        l.id === litter.id ? { ...l, bornDead: parseInt(e.target.value) || 0 } : l
                      );
                      setLitters(updatedLitters);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Males</Label>
                  <Input
                    type="number"
                    min="0"
                    value={litter.males || ''}
                    onChange={(e) => {
                      const updatedLitters = litters.map(l =>
                        l.id === litter.id ? { ...l, males: parseInt(e.target.value) || 0 } : l
                      );
                      setLitters(updatedLitters);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Females</Label>
                  <Input
                    type="number"
                    min="0"
                    value={litter.females || ''}
                    onChange={(e) => {
                      const updatedLitters = litters.map(l =>
                        l.id === litter.id ? { ...l, females: parseInt(e.target.value) || 0 } : l
                      );
                      setLitters(updatedLitters);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Adopted Piglets</Label>
                  <Input
                    type="number"
                    min="0"
                    value={litter.adoptedPiglets || ''}
                    onChange={(e) => {
                      const updatedLitters = litters.map(l =>
                        l.id === litter.id ? { ...l, adoptedPiglets: parseInt(e.target.value) || 0 } : l
                      );
                      setLitters(updatedLitters);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Teeth Clipping & Castration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Teeth Clipping & Castration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Teeth Clipping Date</Label>
              <DatePicker
                date={teethClippingDate}
                onDateChange={setTeethClippingDate}
                placeholder="Select date"
              />
            </div>
            <div className="space-y-2">
              <Label>Male Castration Date</Label>
              <DatePicker
                date={castrationDate}
                onDateChange={setCastrationDate}
                placeholder="Select date"
              />
            </div>
            <div className="space-y-2">
              <Label>Male Condition</Label>
              <Input
                value={maleCondition}
                onChange={(e) => setMaleCondition(e.target.value)}
                placeholder="e.g., Good condition"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weaners & Porkers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weaners & Porkers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Weaner Date</Label>
              <DatePicker
                date={weanerDate}
                onDateChange={setWeanerDate}
                placeholder="Select date"
              />
            </div>
            <div className="space-y-2">
              <Label>Number of Weaners</Label>
              <Input
                value={weanerCount}
                onChange={(e) => setWeanerCount(e.target.value)}
                placeholder="e.g., 9"
              />
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Input
                value={weanerCondition}
                onChange={(e) => setWeanerCondition(e.target.value)}
                placeholder="e.g., Good condition"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vaccine Records */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Vaccine Application</CardTitle>
          <Button onClick={addVaccine} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Vaccine
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {vaccines.map((vaccine) => (
            <div key={vaccine.id} className="border p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Vaccine Record</h4>
                {vaccines.length > 1 && (
                  <Button
                    onClick={() => removeVaccine(vaccine.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={vaccine.date}
                    onChange={(e) => {
                      const updatedVaccines = vaccines.map(v =>
                        v.id === vaccine.id ? { ...v, date: e.target.value } : v
                      );
                      setVaccines(updatedVaccines);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vaccine Name</Label>
                  <Input
                    value={vaccine.vaccineName}
                    onChange={(e) => {
                      const updatedVaccines = vaccines.map(v =>
                        v.id === vaccine.id ? { ...v, vaccineName: e.target.value } : v
                      );
                      setVaccines(updatedVaccines);
                    }}
                    placeholder="e.g., PORCILIS COLICLOS"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Application Mode</Label>
                  <Input
                    value={vaccine.applicationMode}
                    onChange={(e) => {
                      const updatedVaccines = vaccines.map(v =>
                        v.id === vaccine.id ? { ...v, applicationMode: e.target.value } : v
                      );
                      setVaccines(updatedVaccines);
                    }}
                    placeholder="e.g., Injection"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount (ml)</Label>
                  <Input
                    value={vaccine.amount}
                    onChange={(e) => {
                      const updatedVaccines = vaccines.map(v =>
                        v.id === vaccine.id ? { ...v, amount: e.target.value } : v
                      );
                      setVaccines(updatedVaccines);
                    }}
                    placeholder="e.g., 2"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Health Records */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Health Records</CardTitle>
          <Button onClick={addHealthRecord} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Record
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {healthRecords.map((record) => (
            <div key={record.id} className="border p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Health Record</h4>
                {healthRecords.length > 1 && (
                  <Button
                    onClick={() => removeHealthRecord(record.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={record.date}
                    onChange={(e) => {
                      const updatedRecords = healthRecords.map(h =>
                        h.id === record.id ? { ...h, date: e.target.value } : h
                      );
                      setHealthRecords(updatedRecords);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={record.category}
                    onChange={(e) => {
                      const updatedRecords = healthRecords.map(h =>
                        h.id === record.id ? { ...h, category: e.target.value } : h
                      );
                      setHealthRecords(updatedRecords);
                    }}
                    placeholder="e.g., Piglet, Weaner, Sow"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Diagnosis/Cause</Label>
                  <Input
                    value={record.diagnosis}
                    onChange={(e) => {
                      const updatedRecords = healthRecords.map(h =>
                        h.id === record.id ? { ...h, diagnosis: e.target.value } : h
                      );
                      setHealthRecords(updatedRecords);
                    }}
                    placeholder="e.g., Iron deficiency prevention"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Treatment</Label>
                  <Input
                    value={record.treatment}
                    onChange={(e) => {
                      const updatedRecords = healthRecords.map(h =>
                        h.id === record.id ? { ...h, treatment: e.target.value } : h
                      );
                      setHealthRecords(updatedRecords);
                    }}
                    placeholder="e.g., Iron injection"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Survived</Label>
                  <Input
                    type="number"
                    min="0"
                    value={record.survived || ''}
                    onChange={(e) => {
                      const updatedRecords = healthRecords.map(h =>
                        h.id === record.id ? { ...h, survived: parseInt(e.target.value) || 0 } : h
                      );
                      setHealthRecords(updatedRecords);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Died</Label>
                  <Input
                    type="number"
                    min="0"
                    value={record.died || ''}
                    onChange={(e) => {
                      const updatedRecords = healthRecords.map(h =>
                        h.id === record.id ? { ...h, died: parseInt(e.target.value) || 0 } : h
                      );
                      setHealthRecords(updatedRecords);
                    }}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Remarks</Label>
                  <Input
                    value={record.remarks}
                    onChange={(e) => {
                      const updatedRecords = healthRecords.map(h =>
                        h.id === record.id ? { ...h, remarks: e.target.value } : h
                      );
                      setHealthRecords(updatedRecords);
                    }}
                    placeholder="e.g., Well responded, Good condition"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sales Records */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Sales Records</CardTitle>
          <Button onClick={addSale} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Sale
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {sales.map((sale) => (
            <div key={sale.id} className="border p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Sales Record</h4>
                {sales.length > 1 && (
                  <Button
                    onClick={() => removeSale(sale.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={sale.date}
                    onChange={(e) => {
                      const updatedSales = sales.map(s =>
                        s.id === sale.id ? { ...s, date: e.target.value } : s
                      );
                      setSales(updatedSales);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Number/ID Sold</Label>
                  <Input
                    value={sale.numberSold}
                    onChange={(e) => {
                      const updatedSales = sales.map(s =>
                        s.id === sale.id ? { ...s, numberSold: e.target.value } : s
                      );
                      setSales(updatedSales);
                    }}
                    placeholder="e.g., 985"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight</Label>
                  <Input
                    value={sale.weight}
                    onChange={(e) => {
                      const updatedSales = sales.map(s =>
                        s.id === sale.id ? { ...s, weight: e.target.value } : s
                      );
                      setSales(updatedSales);
                    }}
                    placeholder="e.g., 71kg dead weight"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Input
                    value={sale.reason}
                    onChange={(e) => {
                      const updatedSales = sales.map(s =>
                        s.id === sale.id ? { ...s, reason: e.target.value } : s
                      );
                      setSales(updatedSales);
                    }}
                    placeholder="e.g., Unable to conceive"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Buyer</Label>
                  <Input
                    value={sale.buyer}
                    onChange={(e) => {
                      const updatedSales = sales.map(s =>
                        s.id === sale.id ? { ...s, buyer: e.target.value } : s
                      );
                      setSales(updatedSales);
                    }}
                    placeholder="e.g., Geoffrey"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Extra Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="extraNotes">Extra Notes & Observations</Label>
            <Textarea
              id="extraNotes"
              value={extraNotes}
              onChange={(e) => setExtraNotes(e.target.value)}
              placeholder="Add any additional notes, observations, or important information..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-farm-blue-600 hover:bg-farm-blue-700">
          Save Farrowing Records
        </Button>
      </div>
    </div>
  );
};

export default FarrowingRecordsForm;
