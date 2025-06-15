
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
  category: 'Sow' | 'Boar' | 'Weaner' | 'Porker';
  status: 'Alive' | 'Dead' | 'Sold';
}

interface AddEventFormProps {
  onClose: () => void;
  onSave: (event: any) => void;
  selectedDate?: string;
}

const AddEventForm = ({ onClose, onSave, selectedDate }: AddEventFormProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    date: selectedDate || new Date().toISOString().split('T')[0],
    time: '09:00',
    type: 'health',
    description: '',
    pigId: ''
  });

  // Sample pigs data - in real app this would come from props or context
  const pigs: Pig[] = [
    {
      id: '1',
      name: 'TestSow',
      pigId: '0980',
      category: 'Sow',
      status: 'Alive'
    },
    {
      id: '2',
      name: 'TestSow02',
      pigId: '0985',
      category: 'Sow',
      status: 'Sold'
    }
  ];

  const filteredPigs = pigs.filter(pig => 
    pig.pigId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pig.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...formData
    };

    onSave(newEvent);
    toast({
      title: "Success!",
      description: "Event has been scheduled successfully.",
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-farm-blue-700">Add New Event</CardTitle>
              <CardDescription>
                Schedule a new farm activity or reminder
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">Health Check</SelectItem>
                  <SelectItem value="monitoring">Weight Check</SelectItem>
                  <SelectItem value="breeding">Breeding</SelectItem>
                  <SelectItem value="farrowing">Farrowing</SelectItem>
                  <SelectItem value="vaccination">Vaccination</SelectItem>
                  <SelectItem value="feeding">Feeding</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pigId">Select Pig (Optional)</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Search by Pig ID or Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={formData.pigId} onValueChange={(value) => handleInputChange('pigId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pig" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredPigs.map(pig => (
                      <SelectItem key={pig.id} value={pig.pigId}>
                        {pig.pigId} - {pig.name} ({pig.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter event description..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
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
                Schedule Event
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEventForm;
