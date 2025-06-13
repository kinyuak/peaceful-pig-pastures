
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
}

interface EditPigFormProps {
  pig: Pig;
  onClose: () => void;
  onSave: (pig: Pig) => void;
}

const EditPigForm = ({ pig, onClose, onSave }: EditPigFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: pig.name,
    pigId: pig.pigId,
    breed: pig.breed,
    dateOfBirth: pig.dateOfBirth,
    weight: pig.weight.toString(),
    category: pig.category,
    status: pig.status,
    healthStatus: pig.healthStatus,
    notes: pig.notes || '',
    boarTagNumber: pig.boarTagNumber || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.pigId || !formData.breed || !formData.dateOfBirth) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedPig = {
      ...pig,
      ...formData,
      weight: parseFloat(formData.weight) || pig.weight,
      lastCheckup: new Date().toISOString().split('T')[0]
    };

    onSave(updatedPig);
    toast({
      title: "Success!",
      description: `${formData.name} has been updated successfully.`,
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl text-farm-blue-700">Edit {pig.name}</CardTitle>
              <CardDescription>
                Update the information for this pig
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Pig Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter pig name"
                    required
                  />
                </div>
                
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Notes & Observations
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Add notes about this pig's health, behavior, breeding history, etc..."
                  rows={4}
                />
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
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPigForm;
