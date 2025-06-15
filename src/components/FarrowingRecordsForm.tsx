import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Plus, Trash2 } from 'lucide-react';

interface FarrowingRecord {
  id: string;
  litterNumber: number;
  dueDate: string;
  actualDate: string;
  bornAlive: number;
  bornDead: number;
  males: number;
  females: number;
  adoptedPiglets: number;
  teethClippingDate: string;
  castrationDate: string;
  condition: string;
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
  method: string;
  amount: string;
}

interface SalesRecord {
  id: string;
  date: string;
  numberSold: number;
  weight: string;
  reason: string;
  endConsumer: string;
  saleMadeBy: string;
}

interface FarrowingRecordsFormProps {
  initialNotes: string;
  onSave: (notes: string) => void;
}

const FarrowingRecordsForm = ({ initialNotes, onSave }: FarrowingRecordsFormProps) => {
  const [farrowingRecords, setFarrowingRecords] = useState<FarrowingRecord[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [vaccineRecords, setVaccineRecords] = useState<VaccineRecord[]>([]);
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>([]);
  const [extraNotes, setExtraNotes] = useState('');

  const addFarrowingRecord = () => {
    const newRecord: FarrowingRecord = {
      id: Date.now().toString(),
      litterNumber: farrowingRecords.length + 1,
      dueDate: '',
      actualDate: '',
      bornAlive: 0,
      bornDead: 0,
      males: 0,
      females: 0,
      adoptedPiglets: 0,
      teethClippingDate: '',
      castrationDate: '',
      condition: ''
    };
    setFarrowingRecords([...farrowingRecords, newRecord]);
  };

  const updateFarrowingRecord = (id: string, field: string, value: any) => {
    setFarrowingRecords(prev => 
      prev.map(record => 
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const removeFarrowingRecord = (id: string) => {
    setFarrowingRecords(prev => prev.filter(record => record.id !== id));
  };

  const addHealthRecord = () => {
    const newRecord: HealthRecord = {
      id: Date.now().toString(),
      date: '',
      category: '',
      diagnosis: '',
      treatment: '',
      survived: 0,
      died: 0,
      remarks: ''
    };
    setHealthRecords([...healthRecords, newRecord]);
  };

  const updateHealthRecord = (id: string, field: string, value: any) => {
    setHealthRecords(prev => 
      prev.map(record => 
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const removeHealthRecord = (id: string) => {
    setHealthRecords(prev => prev.filter(record => record.id !== id));
  };

  const addVaccineRecord = () => {
    const newRecord: VaccineRecord = {
      id: Date.now().toString(),
      date: '',
      vaccineName: '',
      method: '',
      amount: ''
    };
    setVaccineRecords([...vaccineRecords, newRecord]);
  };

  const updateVaccineRecord = (id: string, field: string, value: any) => {
    setVaccineRecords(prev => 
      prev.map(record => 
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const removeVaccineRecord = (id: string) => {
    setVaccineRecords(prev => prev.filter(record => record.id !== id));
  };

  const addSalesRecord = () => {
    const newRecord: SalesRecord = {
      id: Date.now().toString(),
      date: '',
      numberSold: 0,
      weight: '',
      reason: '',
      endConsumer: '',
      saleMadeBy: ''
    };
    setSalesRecords([...salesRecords, newRecord]);
  };

  const updateSalesRecord = (id: string, field: string, value: any) => {
    setSalesRecords(prev => 
      prev.map(record => 
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const removeSalesRecord = (id: string) => {
    setSalesRecords(prev => prev.filter(record => record.id !== id));
  };

  const generateFormattedNotes = () => {
    let notes = 'PEACEFUL MEADOW FARM\nFARROWING RECORDS\n\n';
    
    // Farrowing Records
    if (farrowingRecords.length > 0) {
      notes += 'LITTER RECORDS:\n';
      farrowingRecords.forEach(record => {
        notes += `LITTER ${record.litterNumber}: Due ${record.dueDate}, Actual ${record.actualDate} - ${record.bornAlive} alive (${record.males}M, ${record.females}F)`;
        if (record.adoptedPiglets > 0) {
          notes += ` + ${record.adoptedPiglets} adopted`;
        }
        notes += '\n';
        if (record.teethClippingDate) {
          notes += `  Teeth clipping: ${record.teethClippingDate}\n`;
        }
        if (record.castrationDate) {
          notes += `  Castration: ${record.castrationDate}\n`;
        }
        if (record.condition) {
          notes += `  Condition: ${record.condition}\n`;
        }
      });
      notes += '\n';
    }

    // Health Records
    if (healthRecords.length > 0) {
      notes += 'HEALTH RECORDS:\n';
      healthRecords.forEach(record => {
        notes += `${record.date}: ${record.category} - ${record.diagnosis}\n`;
        notes += `  Treatment: ${record.treatment}\n`;
        notes += `  Outcome: ${record.survived} survived, ${record.died} died\n`;
        if (record.remarks) {
          notes += `  Remarks: ${record.remarks}\n`;
        }
      });
      notes += '\n';
    }

    // Vaccine Records
    if (vaccineRecords.length > 0) {
      notes += 'VACCINE APPLICATION:\n';
      vaccineRecords.forEach(record => {
        notes += `${record.date}: ${record.vaccineName} - ${record.method}`;
        if (record.amount) {
          notes += ` (${record.amount})`;
        }
        notes += '\n';
      });
      notes += '\n';
    }

    // Sales Records
    if (salesRecords.length > 0) {
      notes += 'SALES:\n';
      salesRecords.forEach(record => {
        notes += `${record.date}: ${record.numberSold} sold`;
        if (record.weight) {
          notes += ` (${record.weight})`;
        }
        if (record.reason) {
          notes += ` - ${record.reason}`;
        }
        if (record.endConsumer) {
          notes += ` (End Consumer: ${record.endConsumer})`;
        }
        if (record.saleMadeBy) {
          notes += ` (Sale Made By: ${record.saleMadeBy})`;
        }
        notes += '\n';
      });
      notes += '\n';
    }

    // Extra Notes
    if (extraNotes.trim()) {
      notes += 'ADDITIONAL NOTES:\n';
      notes += extraNotes.trim() + '\n';
    }

    return notes;
  };

  const handleSave = () => {
    const formattedNotes = generateFormattedNotes();
    onSave(formattedNotes);
  };

  return (
    <div className="space-y-6">
      {/* Farrowing Records */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Farrowing Records
            </CardTitle>
            <Button onClick={addFarrowingRecord} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Litter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {farrowingRecords.map((record) => (
            <div key={record.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Litter {record.litterNumber}</h4>
                <Button 
                  onClick={() => removeFarrowingRecord(record.id)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={record.dueDate}
                    onChange={(e) => updateFarrowingRecord(record.id, 'dueDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Actual Date</Label>
                  <Input
                    type="date"
                    value={record.actualDate}
                    onChange={(e) => updateFarrowingRecord(record.id, 'actualDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Adopted Piglets</Label>
                  <Input
                    type="number"
                    value={record.adoptedPiglets}
                    onChange={(e) => updateFarrowingRecord(record.id, 'adoptedPiglets', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Born Alive</Label>
                  <Input
                    type="number"
                    value={record.bornAlive}
                    onChange={(e) => updateFarrowingRecord(record.id, 'bornAlive', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Born Dead</Label>
                  <Input
                    type="number"
                    value={record.bornDead}
                    onChange={(e) => updateFarrowingRecord(record.id, 'bornDead', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Males</Label>
                  <Input
                    type="number"
                    value={record.males}
                    onChange={(e) => updateFarrowingRecord(record.id, 'males', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Females</Label>
                  <Input
                    type="number"
                    value={record.females}
                    onChange={(e) => updateFarrowingRecord(record.id, 'females', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Teeth Clipping Date</Label>
                  <Input
                    type="date"
                    value={record.teethClippingDate}
                    onChange={(e) => updateFarrowingRecord(record.id, 'teethClippingDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Castration Date</Label>
                  <Input
                    type="date"
                    value={record.castrationDate}
                    onChange={(e) => updateFarrowingRecord(record.id, 'castrationDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Input
                    value={record.condition}
                    onChange={(e) => updateFarrowingRecord(record.id, 'condition', e.target.value)}
                    placeholder="e.g., Good condition"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Health Records */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Health Records</CardTitle>
            <Button onClick={addHealthRecord} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Health Record
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {healthRecords.map((record) => (
            <div key={record.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Health Record</h4>
                <Button 
                  onClick={() => removeHealthRecord(record.id)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={record.date}
                    onChange={(e) => updateHealthRecord(record.id, 'date', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select 
                    value={record.category} 
                    onValueChange={(value) => updateHealthRecord(record.id, 'category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Piglet">Piglet</SelectItem>
                      <SelectItem value="Weaner">Weaner</SelectItem>
                      <SelectItem value="Sow">Sow</SelectItem>
                      <SelectItem value="Boar">Boar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Diagnosis/Cause</Label>
                  <Input
                    value={record.diagnosis}
                    onChange={(e) => updateHealthRecord(record.id, 'diagnosis', e.target.value)}
                    placeholder="e.g., Iron deficiency prevention"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Treatment</Label>
                  <Input
                    value={record.treatment}
                    onChange={(e) => updateHealthRecord(record.id, 'treatment', e.target.value)}
                    placeholder="e.g., Iron injection"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Survived</Label>
                  <Input
                    type="number"
                    value={record.survived}
                    onChange={(e) => updateHealthRecord(record.id, 'survived', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Died</Label>
                  <Input
                    type="number"
                    value={record.died}
                    onChange={(e) => updateHealthRecord(record.id, 'died', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Remarks</Label>
                  <Input
                    value={record.remarks}
                    onChange={(e) => updateHealthRecord(record.id, 'remarks', e.target.value)}
                    placeholder="e.g., Well responded"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Vaccine Records */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Vaccine Records</CardTitle>
            <Button onClick={addVaccineRecord} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Vaccine Record
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {vaccineRecords.map((record) => (
            <div key={record.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Vaccine Record</h4>
                <Button 
                  onClick={() => removeVaccineRecord(record.id)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={record.date}
                    onChange={(e) => updateVaccineRecord(record.id, 'date', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vaccine Name</Label>
                  <Input
                    value={record.vaccineName}
                    onChange={(e) => updateVaccineRecord(record.id, 'vaccineName', e.target.value)}
                    placeholder="e.g., PORCILIS COLICLOS"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Method</Label>
                  <Select 
                    value={record.method} 
                    onValueChange={(value) => updateVaccineRecord(record.id, 'method', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Injection">Injection</SelectItem>
                      <SelectItem value="Oral">Oral</SelectItem>
                      <SelectItem value="Nasal">Nasal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    value={record.amount}
                    onChange={(e) => updateVaccineRecord(record.id, 'amount', e.target.value)}
                    placeholder="e.g., 2ml"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sales Records */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Sales Records</CardTitle>
            <Button onClick={addSalesRecord} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Sales Record
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {salesRecords.map((record) => (
            <div key={record.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Sales Record</h4>
                <Button 
                  onClick={() => removeSalesRecord(record.id)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={record.date}
                    onChange={(e) => updateSalesRecord(record.id, 'date', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Number Sold</Label>
                  <Input
                    type="number"
                    value={record.numberSold}
                    onChange={(e) => updateSalesRecord(record.id, 'numberSold', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight</Label>
                  <Input
                    value={record.weight}
                    onChange={(e) => updateSalesRecord(record.id, 'weight', e.target.value)}
                    placeholder="e.g., 71kg dead weight"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Input
                    value={record.reason}
                    onChange={(e) => updateSalesRecord(record.id, 'reason', e.target.value)}
                    placeholder="e.g., Unable to conceive"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Consumer</Label>
                  <Input
                    value={record.endConsumer}
                    onChange={(e) => updateSalesRecord(record.id, 'endConsumer', e.target.value)}
                    placeholder="e.g., Geoffrey"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sale Made By</Label>
                  <Input
                    value={record.saleMadeBy}
                    onChange={(e) => updateSalesRecord(record.id, 'saleMadeBy', e.target.value)}
                    placeholder="e.g., Farm Manager"
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
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Extra Notes</Label>
            <Textarea
              value={extraNotes}
              onChange={(e) => setExtraNotes(e.target.value)}
              placeholder="Any additional observations or notes..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-farm-blue-600 hover:bg-farm-blue-700">
          Save Records
        </Button>
      </div>
    </div>
  );
};

export default FarrowingRecordsForm;
