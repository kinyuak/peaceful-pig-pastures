
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, AlertTriangle, Bell, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Pig {
  id: string;
  pigId: string;
  name: string;
  category: 'Sow' | 'Boar' | 'Weaner' | 'Porker';
  status: 'Alive' | 'Dead' | 'Sold';
  lastHeatDate?: string;
  lastServiceDate?: string;
  dateOfBirth: string;
}

interface HeatCycleData {
  isOnHeat: boolean;
  daysSinceLastHeat: number;
  nextExpectedHeat: string;
  daysUntilNextHeat: number;
  cycleStatus: 'Due' | 'Approaching' | 'Normal' | 'Overdue';
  breedingWindow: {
    start: string;
    end: string;
  };
}

interface HeatCycleTrackerProps {
  pig: Pig;
  onUpdateHeatDate: (pigId: string, heatDate: string) => void;
}

const HeatCycleTracker = ({ pig, onUpdateHeatDate }: HeatCycleTrackerProps) => {
  const { toast } = useToast();
  const [newHeatDate, setNewHeatDate] = useState('');
  
  const calculateHeatCycle = (pig: Pig): HeatCycleData => {
    const today = new Date();
    const lastHeat = pig.lastHeatDate ? new Date(pig.lastHeatDate) : null;
    
    if (!lastHeat) {
      return {
        isOnHeat: false,
        daysSinceLastHeat: 0,
        nextExpectedHeat: '',
        daysUntilNextHeat: 0,
        cycleStatus: 'Normal',
        breedingWindow: { start: '', end: '' }
      };
    }

    const daysSinceLastHeat = Math.floor((today.getTime() - lastHeat.getTime()) / (1000 * 60 * 60 * 24));
    const nextHeatDate = new Date(lastHeat.getTime() + (21 * 24 * 60 * 60 * 1000));
    const daysUntilNextHeat = Math.floor((nextHeatDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Breeding window: 12-24 hours after heat starts (optimal time)
    const breedingStart = new Date(nextHeatDate.getTime() + (12 * 60 * 60 * 1000));
    const breedingEnd = new Date(nextHeatDate.getTime() + (36 * 60 * 60 * 1000));

    let cycleStatus: 'Due' | 'Approaching' | 'Normal' | 'Overdue' = 'Normal';
    
    if (daysUntilNextHeat <= 0 && daysUntilNextHeat >= -2) {
      cycleStatus = 'Due';
    } else if (daysUntilNextHeat <= 3 && daysUntilNextHeat > 0) {
      cycleStatus = 'Approaching';
    } else if (daysUntilNextHeat < -2) {
      cycleStatus = 'Overdue';
    }

    const isOnHeat = daysSinceLastHeat >= 19 && daysSinceLastHeat <= 23;

    return {
      isOnHeat,
      daysSinceLastHeat,
      nextExpectedHeat: nextHeatDate.toISOString().split('T')[0],
      daysUntilNextHeat,
      cycleStatus,
      breedingWindow: {
        start: breedingStart.toISOString().split('T')[0],
        end: breedingEnd.toISOString().split('T')[0]
      }
    };
  };

  const heatData = calculateHeatCycle(pig);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Due': return 'bg-red-100 text-red-800';
      case 'Approaching': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Due': return <AlertTriangle className="h-4 w-4" />;
      case 'Approaching': return <Bell className="h-4 w-4" />;
      case 'Overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const handleRecordHeat = () => {
    if (!newHeatDate) {
      toast({
        title: "Error",
        description: "Please select a heat date.",
        variant: "destructive",
      });
      return;
    }

    onUpdateHeatDate(pig.id, newHeatDate);
    setNewHeatDate('');
    toast({
      title: "Heat Recorded",
      description: `Heat cycle recorded for ${pig.pigId}`,
    });
  };

  if (pig.category !== 'Sow' || pig.status !== 'Alive') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-600" />
          Heat Cycle Tracker - {pig.pigId}
        </CardTitle>
        <CardDescription>
          Monitor ovulation cycles and breeding windows
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            {getStatusIcon(heatData.cycleStatus)}
            <span className="font-medium">Current Status:</span>
          </div>
          <Badge className={getStatusColor(heatData.cycleStatus)}>
            {heatData.isOnHeat ? 'ON HEAT' : heatData.cycleStatus}
          </Badge>
        </div>

        {/* Cycle Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Last Heat Date:</span>
              <span className="font-medium">
                {pig.lastHeatDate ? new Date(pig.lastHeatDate).toLocaleDateString() : 'Not recorded'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Days Since Last Heat:</span>
              <span className="font-medium">{heatData.daysSinceLastHeat} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Expected Heat:</span>
              <span className="font-medium">
                {heatData.nextExpectedHeat ? new Date(heatData.nextExpectedHeat).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Days Until Next Heat:</span>
              <span className={`font-medium ${heatData.daysUntilNextHeat <= 3 ? 'text-red-600' : ''}`}>
                {heatData.daysUntilNextHeat > 0 ? `${heatData.daysUntilNextHeat} days` : 
                 heatData.daysUntilNextHeat === 0 ? 'Today' : `${Math.abs(heatData.daysUntilNextHeat)} days overdue`}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Optimal Breeding Window:</h4>
            <div className="flex justify-between">
              <span className="text-gray-600">Start:</span>
              <span className="font-medium">
                {heatData.breedingWindow.start ? new Date(heatData.breedingWindow.start).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">End:</span>
              <span className="font-medium">
                {heatData.breedingWindow.end ? new Date(heatData.breedingWindow.end).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Record New Heat */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Record New Heat Date</h4>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="heat-date">Heat Date</Label>
              <Input
                id="heat-date"
                type="date"
                value={newHeatDate}
                onChange={(e) => setNewHeatDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleRecordHeat} className="bg-pink-600 hover:bg-pink-700">
                Record Heat
              </Button>
            </div>
          </div>
        </div>

        {/* Breeding Recommendations */}
        {heatData.cycleStatus === 'Approaching' || heatData.cycleStatus === 'Due' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Breeding Recommendations:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Monitor for standing heat behavior</li>
              <li>• Check for clear vaginal discharge</li>
              <li>• Ensure optimal nutrition 2 weeks before breeding</li>
              <li>• Plan for artificial insemination or natural service</li>
              <li>• Record exact breeding time for pregnancy tracking</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HeatCycleTracker;
