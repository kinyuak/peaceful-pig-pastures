
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FarrowingRecordsForm from './FarrowingRecordsForm';
import HeatCycleTracker from './HeatCycleTracker';
import PigHealthReports from './PigHealthReports';

interface Pig {
  id: string;
  name: string;
  pigId: string;
  breed: string;
  dateOfBirth: string;
  weight: number;
  category: 'Sow' | 'Boar' | 'Weaner' | 'Porker';
  status: 'Alive' | 'Dead' | 'Sold';
  healthStatus: 'Healthy' | 'Sick' | 'Under Treatment';
  lastCheckup: string;
  notes?: string;
  boarTagNumber?: string;
  lastHeatDate?: string;
  lastServiceDate?: string;
}

interface EditPigFormProps {
  pig: Pig;
  onClose: () => void;
  onSave: (pig: Pig) => void;
}

const EditPigForm = ({ pig, onClose, onSave }: EditPigFormProps) => {
  const { toast } = useToast();
  const [showFarrowingForm, setShowFarrowingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    pigId: pig.pigId,
    breed: pig.breed,
    dateOfBirth: pig.dateOfBirth,
    weight: pig.weight.toString(),
    category: pig.category,
    status: pig.status,
    healthStatus: pig.healthStatus,
    notes: pig.notes || '',
    boarTagNumber: pig.boarTagNumber || '',
    lastHeatDate: pig.lastHeatDate || '',
    lastServiceDate: pig.lastServiceDate || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pigId || !formData.breed || !formData.dateOfBirth) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedPig: Pig = {
      ...pig,
      pigId: formData.pigId,
      breed: formData.breed,
      dateOfBirth: formData.dateOfBirth,
      weight: parseFloat(formData.weight) || pig.weight,
      category: formData.category,
      status: formData.status,
      healthStatus: formData.healthStatus,
      notes: formData.notes,
      boarTagNumber: formData.boarTagNumber,
      lastHeatDate: formData.lastHeatDate,
      lastServiceDate: formData.lastServiceDate,
      lastCheckup: new Date().toISOString().split('T')[0]
    };

    onSave(updatedPig);
    toast({
      title: "Success!",
      description: `Pig ${formData.pigId} has been updated successfully.`,
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFarrowingRecordsSave = (notes: string) => {
    setFormData(prev => ({ ...prev, notes }));
    setShowFarrowingForm(false);
    toast({
      title: "Records Saved",
      description: "Farrowing records have been saved successfully.",
    });
  };

  const handleUpdateHeatDate = (pigId: string, heatDate: string) => {
    setFormData(prev => ({ ...prev, lastHeatDate: heatDate }));
  };

  if (showFarrowingForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-6xl max-h-[95vh] overflow-y-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl text-farm-blue-700">Farrowing Records - {pig.pigId}</CardTitle>
                <CardDescription>
                  Detailed breeding and health records
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFarrowingForm(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <FarrowingRecordsForm
              initialNotes={formData.notes}
              onSave={handleFarrowingRecordsSave}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl text-farm-blue-700">Edit Pig {pig.pigId}</CardTitle>
              <CardDescription>
                Update information and monitor health metrics
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'basic' 
                  ? 'bg-white text-farm-blue-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab('heat')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'heat' 
                  ? 'bg-white text-farm-blue-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Heat Cycle
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'health' 
                  ? 'bg-white text-farm-blue-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Health Reports
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'records' 
                  ? 'bg-white text-farm-blue-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Records
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'basic' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pigId">Pig ID/Tag Number *</Label>
                    <Input
                      id="pigId"
                      value={formData.pigId}
                      onChange={(e) => handleInputChange('pigId', e.target.value)}
                      placeholder="e.g., P005"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="breed">Breed *</Label>
                    <Select value={formData.breed} onValueChange={(value) => handleInputChange('breed', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select breed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yorkshire">Yorkshire</SelectItem>
                        <SelectItem value="Duroc">Duroc</SelectItem>
                        <SelectItem value="Hampshire">Hampshire</SelectItem>
                        <SelectItem value="Landrace">Landrace</SelectItem>
                        <SelectItem value="Pietrain">Pietrain</SelectItem>
                        <SelectItem value="Large White">Large White</SelectItem>
                        <SelectItem value="Chester White">Chester White</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sow">Sow (Breeding Female)</SelectItem>
                        <SelectItem value="Boar">Boar (Breeding Male)</SelectItem>
                        <SelectItem value="Weaner">Weaner (Young Pig)</SelectItem>
                        <SelectItem value="Porker">Porker (Market Pig)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Current Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="Enter weight"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="boarTagNumber">Boar Tag Number</Label>
                    <Input
                      id="boarTagNumber"
                      value={formData.boarTagNumber}
                      onChange={(e) => handleInputChange('boarTagNumber', e.target.value)}
                      placeholder="Enter boar tag number if applicable"
                    />
                  </div>
                </div>

                {/* Heat Cycle Information for Sows */}
                {formData.category === 'Sow' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lastHeatDate">Last Heat Date</Label>
                      <Input
                        id="lastHeatDate"
                        type="date"
                        value={formData.lastHeatDate}
                        onChange={(e) => handleInputChange('lastHeatDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastServiceDate">Last Service Date</Label>
                      <Input
                        id="lastServiceDate"
                        type="date"
                        value={formData.lastServiceDate}
                        onChange={(e) => handleInputChange('lastServiceDate', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Health & Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Health & Status
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={formData.status}
                      onValueChange={(value) => handleInputChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alive">Alive</SelectItem>
                        <SelectItem value="Dead">Dead</SelectItem>
                        <SelectItem value="Sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="healthStatus">Health Status</Label>
                    <Select 
                      value={formData.healthStatus}
                      onValueChange={(value) => handleInputChange('healthStatus', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Healthy">Healthy</SelectItem>
                        <SelectItem value="Sick">Sick</SelectItem>
                        <SelectItem value="Under Treatment">Under Treatment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-farm-blue-600 hover:bg-farm-blue-700"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'heat' && (
            <HeatCycleTracker 
              pig={{...pig, ...formData, weight: parseFloat(formData.weight) || pig.weight}} 
              onUpdateHeatDate={handleUpdateHeatDate}
            />
          )}

          {activeTab === 'health' && (
            <PigHealthReports pig={{...pig, ...formData, weight: parseFloat(formData.weight) || pig.weight}} />
          )}

          {activeTab === 'records' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Farrowing Records & Notes
                </h3>
                <Button
                  type="button"
                  onClick={() => setShowFarrowingForm(true)}
                  variant="outline"
                  size="sm"
                >
                  Open Structured Form
                </Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Current Records:</p>
                <div className="max-h-96 overflow-y-auto">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                    {formData.notes || 'No records entered yet. Click "Open Structured Form" to add detailed farrowing records.'}
                  </pre>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                  className="flex-1 bg-farm-blue-600 hover:bg-farm-blue-700"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPigForm;
