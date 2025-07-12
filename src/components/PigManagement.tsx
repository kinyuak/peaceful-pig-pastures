import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Eye, Edit, Plus, Heart, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EditPigForm from './EditPigForm';
import PigSowSuggestions from "./PigSowSuggestions";
import PigReportsCharts from "./PigReportsCharts"; // <-- ADD import

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
  lastServiceDate?: string;
  lastHeatDate?: string;
  notes?: string;
  boarTagNumber?: string;
  // Comprehensive pig data
  litterNumber?: number;
  dueServedDate?: string;
  expectedFarrowingDate?: string;
  actualFarrowingDate?: string;
  noBornAlive?: number;
  noBornDead?: number;
  males?: number;
  females?: number;
  teethClippingDate?: string;
  maleCastrationDate?: string;
  malesCondition?: string;
  weanersTotal?: number;
  weanersCondition?: string;
  porkersTotal?: number;
  porkersCondition?: string;
  vaccineDate?: string;
  vaccineName?: string;
  vaccineMode?: string;
  vaccineAmount?: string;
  healthRecordDate?: string;
  healthCategory?: string;
  diagnosisCause?: string;
  precautionTaken?: string;
  noSurvived?: number;
  noDied?: number;
  remarks?: string;
  salesDate?: string;
  numbersSold?: string;
  salesWeight?: string;
  salesReason?: string;
  salesPerson?: string;
}

interface PigManagementProps {
  onAddPig: () => void;
}

const PigManagement = ({ onAddPig }: PigManagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPig, setSelectedPig] = useState<Pig | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Calculate age in years, months, weeks, and days
  const calculateAge = (dateOfBirth: string) => {
    const birth = new Date(dateOfBirth);
    const now = new Date();
    const ageInMs = now.getTime() - birth.getTime();
    const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(ageInDays / 365);
    const months = Math.floor((ageInDays % 365) / 30);
    const weeks = Math.floor((ageInDays % 30) / 7);
    const days = ageInDays % 7;
    
    return { years, months, weeks, days, totalWeeks: Math.floor(ageInDays / 7) };
  };

  // Calculate expected farrowing date (115 days from last service)
  const calculateExpectedFarrowing = (lastServiceDate?: string) => {
    if (!lastServiceDate) return null;
    const serviceDate = new Date(lastServiceDate);
    const expectedDate = new Date(serviceDate.getTime() + (115 * 24 * 60 * 60 * 1000));
    return expectedDate.toISOString().split('T')[0];
  };

  // Calculate heat cycle status
  const calculateHeatStatus = (pig: Pig) => {
    if (pig.category !== 'Sow' || pig.status !== 'Alive' || !pig.lastHeatDate) {
      return null;
    }

    const today = new Date();
    const lastHeat = new Date(pig.lastHeatDate);
    const daysSinceLastHeat = Math.floor((today.getTime() - lastHeat.getTime()) / (1000 * 60 * 60 * 24));
    const nextHeatDate = new Date(lastHeat.getTime() + (21 * 24 * 60 * 60 * 1000));
    const daysUntilNextHeat = Math.floor((nextHeatDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilNextHeat <= 0 && daysUntilNextHeat >= -2) {
      return { status: 'due', daysUntilNextHeat, message: 'Due Now' };
    } else if (daysUntilNextHeat <= 3 && daysUntilNextHeat > 0) {
      return { status: 'approaching', daysUntilNextHeat, message: `${daysUntilNextHeat} days` };
    } else if (daysUntilNextHeat < -2) {
      return { status: 'overdue', daysUntilNextHeat, message: `${Math.abs(daysUntilNextHeat)} days overdue` };
    }
    
    return { status: 'normal', daysUntilNextHeat, message: `${daysUntilNextHeat} days` };
  };

  // Comprehensive pig data from provided table
  const [pigs, setPigs] = useState<Pig[]>([
    {
      id: '1',
      name: 'Sow 1892',
      pigId: '1892',
      breed: 'Yorkshire',
      dateOfBirth: '2022-01-01',
      weight: 210,
      category: 'Sow',
      status: 'Alive',
      healthStatus: 'Healthy',
      lastCheckup: '2025-05-12',
      litterNumber: 1,
      dueServedDate: '2025-01-14',
      expectedFarrowingDate: '2025-05-09',
      actualFarrowingDate: '2025-05-11',
      noBornAlive: 9,
      noBornDead: 0,
      teethClippingDate: '2025-05-12',
      weanersTotal: 0,
      porkersTotal: 0,
      vaccineDate: '2024-12-20',
      vaccineName: 'Porcilis Coliclos',
      vaccineMode: 'Injection',
      vaccineAmount: '2ml',
      healthRecordDate: '2025-05-12',
      healthCategory: 'Piglet',
      diagnosisCause: 'Prevent Iron Deficiency',
      precautionTaken: 'Iron Injection',
      noSurvived: 9,
      noDied: 0,
      notes: 'Active litter, all piglets healthy'
    },
    {
      id: '2',
      name: 'Sow 2060',
      pigId: '2060',
      breed: 'Yorkshire',
      dateOfBirth: '2021-06-01',
      weight: 220,
      category: 'Sow',
      status: 'Alive',
      healthStatus: 'Healthy',
      lastCheckup: '2025-01-08',
      litterNumber: 2,
      dueServedDate: '2024-08-14',
      expectedFarrowingDate: '2024-12-08',
      actualFarrowingDate: '2024-12-08',
      noBornAlive: 3,
      noBornDead: 0,
      teethClippingDate: null,
      weanersTotal: 0,
      porkersTotal: 0,
      noSurvived: 0,
      noDied: 0,
      remarks: '2 piglets died, 1 given to tag 0982',
      salesDate: '2025-01-08',
      numbersSold: '4 Porkers',
      salesPerson: 'Geoffry'
    },
    {
      id: '3',
      name: 'Sow 0982',
      pigId: '0982',
      breed: 'Yorkshire',
      dateOfBirth: '2020-03-01',
      weight: 118,
      category: 'Sow',
      status: 'Sold',
      healthStatus: 'Healthy',
      lastCheckup: '2024-07-16',
      litterNumber: 5,
      dueServedDate: '2024-08-22',
      expectedFarrowingDate: '2024-12-15',
      actualFarrowingDate: '2024-12-15',
      noBornAlive: 12,
      noBornDead: 0,
      teethClippingDate: '2024-12-18',
      maleCastrationDate: '2025-01-27',
      malesCondition: '6 castrated, good',
      weanersTotal: 10,
      weanersCondition: 'Good',
      healthRecordDate: '2024-12-18',
      healthCategory: 'Piglets',
      diagnosisCause: 'Prevent Iron Deficiency',
      precautionTaken: 'Injecting Iron',
      noSurvived: 10,
      noDied: 1,
      remarks: 'Good',
      salesDate: '2025-03-24',
      numbersSold: 'Tag 0982',
      salesWeight: '118kg',
      salesReason: 'Aggressiveness',
      salesPerson: 'Geoffry'
    },
    {
      id: '4',
      name: 'Sow 0980',
      pigId: '0980',
      breed: 'Yorkshire',
      dateOfBirth: '2020-01-01',
      weight: 195,
      category: 'Sow',
      status: 'Alive',
      healthStatus: 'Healthy',
      lastCheckup: '2024-10-30',
      litterNumber: 5,
      dueServedDate: '2024-06-30',
      expectedFarrowingDate: '2024-10-24',
      actualFarrowingDate: '2024-10-25',
      noBornAlive: 12,
      noBornDead: 0,
      males: 6,
      females: 6,
      teethClippingDate: '2024-10-30',
      maleCastrationDate: '2024-11-21',
      malesCondition: 'Good',
      weanersTotal: 9,
      weanersCondition: 'Good',
      healthRecordDate: '2024-10-30',
      healthCategory: 'Piglets',
      diagnosisCause: 'Prevent Iron Deficiency',
      precautionTaken: 'Injecting Iron',
      noSurvived: 10,
      noDied: 1,
      remarks: 'Good',
      salesDate: 'Jan-25',
      numbersSold: '1 Weaner',
      salesPerson: 'Geoffry'
    },
    {
      id: '5',
      name: 'Sow 2041',
      pigId: '2041',
      breed: 'Yorkshire',
      dateOfBirth: '2020-04-01',
      weight: 234,
      category: 'Sow',
      status: 'Sold',
      healthStatus: 'Healthy',
      lastCheckup: '2024-12-30',
      boarTagNumber: '2055',
      litterNumber: 5,
      dueServedDate: '2024-08-30',
      expectedFarrowingDate: '2024-12-24',
      actualFarrowingDate: '2024-12-25',
      noBornAlive: 16,
      noBornDead: 0,
      teethClippingDate: '2024-12-30',
      weanersTotal: 6,
      weanersCondition: 'Good',
      healthRecordDate: '2024-12-30',
      healthCategory: 'Piglets',
      diagnosisCause: 'Prevent Iron Deficiency',
      precautionTaken: 'Iron injection',
      noSurvived: 10,
      noDied: 4,
      remarks: '4 piglets had low immunity',
      salesDate: '2025-03-24',
      numbersSold: '2041',
      salesWeight: '234kg',
      salesReason: 'Overweight',
      salesPerson: 'Geoffry'
    },
    {
      id: '6',
      name: 'Gilt A',
      pigId: 'Gilt A',
      breed: 'Yorkshire',
      dateOfBirth: '2023-01-01',
      weight: 67,
      category: 'Sow',
      status: 'Sold',
      healthStatus: 'Healthy',
      lastCheckup: '2024-06-15',
      litterNumber: 1,
      dueServedDate: '2024-01-21',
      expectedFarrowingDate: '2024-01-20',
      actualFarrowingDate: '2024-04-24',
      noBornAlive: 5,
      noBornDead: 0,
      males: 3,
      females: 2,
      teethClippingDate: '2024-05-08',
      maleCastrationDate: '2024-07-18',
      malesCondition: 'Good',
      weanersTotal: 5,
      weanersCondition: 'Healthy',
      porkersTotal: 5,
      healthRecordDate: '2024-06-15',
      healthCategory: 'Piglets',
      diagnosisCause: 'Body weakness',
      precautionTaken: 'Given multivitamin',
      noSurvived: 5,
      noDied: 0,
      remarks: 'Recovering',
      salesDate: '2024-09-28',
      numbersSold: '1',
      salesWeight: '67kg',
      salesReason: 'Porker',
      salesPerson: 'Geoffrey'
    },
    {
      id: '7',
      name: 'Gilt B',
      pigId: 'Gilt B',
      breed: 'Yorkshire',
      dateOfBirth: '2023-02-01',
      weight: 107,
      category: 'Sow',
      status: 'Sold',
      healthStatus: 'Healthy',
      lastCheckup: '2024-08-15',
      litterNumber: 1,
      dueServedDate: '2024-02-03',
      expectedFarrowingDate: '2024-05-29',
      actualFarrowingDate: '2024-05-30',
      noBornAlive: 13,
      noBornDead: 2,
      males: 5,
      females: 6,
      teethClippingDate: '2024-06-03',
      maleCastrationDate: '2024-07-18',
      malesCondition: 'Good',
      weanersTotal: 6,
      weanersCondition: 'Good',
      porkersTotal: 2,
      healthRecordDate: '2024-08-15',
      healthCategory: 'Piglets',
      diagnosisCause: 'Prevent Iron Deficiency',
      precautionTaken: 'Given Iron',
      noSurvived: 13,
      noDied: 0,
      remarks: 'Health improvement',
      salesDate: '2024-09-28',
      numbersSold: 'Sow',
      salesWeight: '107kg',
      salesReason: 'Porker',
      salesPerson: 'Geoffry'
    },
    {
      id: '8',
      name: 'Gilt C',
      pigId: 'Gilt C',
      breed: 'Yorkshire',
      dateOfBirth: '2023-03-01',
      weight: 87,
      category: 'Sow',
      status: 'Sold',
      healthStatus: 'Healthy',
      lastCheckup: '2024-08-15',
      litterNumber: 4,
      dueServedDate: '2024-03-03',
      expectedFarrowingDate: '2024-05-28',
      actualFarrowingDate: '2024-05-29',
      noBornAlive: 7,
      noBornDead: 2,
      males: 3,
      females: 4,
      teethClippingDate: '2024-06-03',
      maleCastrationDate: '2024-07-18',
      malesCondition: 'Good',
      weanersTotal: 5,
      weanersCondition: 'Good',
      porkersTotal: 3,
      healthRecordDate: '2024-08-15',
      healthCategory: 'Piglets',
      diagnosisCause: 'Prevent Iron Deficiency',
      precautionTaken: 'Given Iron',
      noSurvived: 7,
      noDied: 0,
      salesDate: '2024-09-28',
      numbersSold: 'Sow',
      salesWeight: '87kg',
      salesReason: 'Porker',
      salesPerson: 'Geoffry'
    },
    {
      id: '9',
      name: 'Gilt D',
      pigId: 'Gilt D',
      breed: 'Yorkshire',
      dateOfBirth: '2023-04-01',
      weight: 180,
      category: 'Sow',
      status: 'Sold',
      healthStatus: 'Healthy',
      lastCheckup: '2024-10-12',
      litterNumber: 1,
      dueServedDate: '2024-06-08',
      expectedFarrowingDate: '2024-10-01',
      actualFarrowingDate: '2024-10-13',
      noBornAlive: 9,
      noBornDead: 0,
      males: 7,
      females: 2,
      teethClippingDate: '2024-10-12',
      maleCastrationDate: '2024-11-21',
      weanersTotal: 6,
      weanersCondition: 'Good',
      healthRecordDate: '2024-10-12',
      healthCategory: 'Piglet',
      diagnosisCause: 'Prevent Iron Deficiency',
      precautionTaken: 'Injecting Iron',
      noSurvived: 9,
      noDied: 0,
      remarks: 'Well responded',
      salesDate: '2025-01-08',
      numbersSold: 'Sow',
      salesReason: 'Porker',
      salesPerson: 'Geoffry'
    },
    {
      id: '10',
      name: 'Gilt E',
      pigId: 'Gilt E',
      breed: 'Yorkshire',
      dateOfBirth: '2023-05-01',
      weight: 160,
      category: 'Sow',
      status: 'Alive',
      healthStatus: 'Healthy',
      lastCheckup: '2024-10-07',
      litterNumber: 5,
      dueServedDate: '2024-06-14',
      expectedFarrowingDate: '2024-10-07',
      actualFarrowingDate: '2024-10-07',
      noBornAlive: 5,
      noBornDead: 0,
      teethClippingDate: '2024-10-12',
      remarks: '5 piglets given to tag 0985'
    },
    {
      id: '11',
      name: 'Gilt F',
      pigId: 'Gilt F',
      breed: 'Yorkshire',
      dateOfBirth: '2023-06-01',
      weight: 170,
      category: 'Sow',
      status: 'Alive',
      healthStatus: 'Healthy',
      lastCheckup: '2024-11-11',
      litterNumber: 1,
      dueServedDate: '2024-07-14',
      expectedFarrowingDate: '2024-11-05',
      actualFarrowingDate: '2024-11-05',
      noBornAlive: 7,
      noBornDead: 0,
      teethClippingDate: '2024-11-11',
      healthRecordDate: '2024-11-11',
      healthCategory: 'Piglet',
      diagnosisCause: 'Prevent Iron Deficiency',
      precautionTaken: 'Injecting Iron',
      noSurvived: 6,
      noDied: 1,
      remarks: 'Well responding'
    },
    {
      id: '12',
      name: 'Gilt G',
      pigId: 'Gilt G',
      breed: 'Yorkshire',
      dateOfBirth: '2023-07-01',
      weight: 71,
      category: 'Sow',
      status: 'Sold',
      healthStatus: 'Healthy',
      lastCheckup: '2024-11-23',
      litterNumber: 1,
      dueServedDate: '2024-07-28',
      expectedFarrowingDate: '2024-11-19',
      actualFarrowingDate: '2024-11-19',
      noBornAlive: 10,
      noBornDead: 0,
      teethClippingDate: '2024-11-23',
      weanersTotal: 9,
      weanersCondition: 'Good',
      healthRecordDate: '2024-11-23',
      healthCategory: 'Piglet',
      diagnosisCause: 'Prevent Iron Deficiency',
      precautionTaken: 'Injecting Iron',
      noSurvived: 10,
      noDied: 0,
      remarks: 'Well responding',
      salesDate: '2025-02-19',
      numbersSold: 'Sow',
      salesWeight: '71kg',
      salesReason: 'Porker',
      salesPerson: 'Geoffry'
    },
    {
      id: '13',
      name: 'Gilt H',
      pigId: 'Gilt H',
      breed: 'Yorkshire',
      dateOfBirth: '2023-08-01',
      weight: 89,
      category: 'Sow',
      status: 'Sold',
      healthStatus: 'Healthy',
      lastCheckup: '2024-11-23',
      litterNumber: 1,
      dueServedDate: '2024-07-28',
      expectedFarrowingDate: '2024-11-19',
      actualFarrowingDate: '2024-11-20',
      noBornAlive: 10,
      noBornDead: 0,
      teethClippingDate: '2024-11-23',
      weanersTotal: 8,
      weanersCondition: 'Good',
      healthRecordDate: '2024-11-23',
      healthCategory: 'Piglet',
      diagnosisCause: 'Prevent Iron Deficiency',
      precautionTaken: 'Injecting Iron',
      noSurvived: 10,
      noDied: 0,
      remarks: 'Well responding',
      salesDate: '2025-02-19',
      numbersSold: 'Sow',
      salesWeight: '89kg',
      salesReason: 'Porker',
      salesPerson: 'Geoffrey'
    }
  ]);

  const categories = ['All', 'Sow', 'Boar', 'Weaner', 'Porker'];

  const handleViewDetails = (pig: Pig) => {
    setSelectedPig(pig);
    console.log('Viewing details for pig:', pig.name);
  };

  const handleEditPig = (pig: Pig) => {
    setSelectedPig(pig);
    setShowEditForm(true);
    console.log('Editing pig:', pig.name);
  };

  const handleSavePig = (updatedPig: Pig) => {
    setPigs(prevPigs => 
      prevPigs.map(pig => 
        pig.id === updatedPig.id ? updatedPig : pig
      )
    );
    setShowEditForm(false);
    setSelectedPig(null);
  };

  const filteredPigs = pigs.filter(pig => {
    const matchesSearch = pig.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pig.pigId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pig.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pig.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive': return 'bg-green-100 text-green-800';
      case 'Dead': return 'bg-red-100 text-red-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Sick': return 'bg-red-100 text-red-800';
      case 'Under Treatment': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHeatStatusColor = (status: string) => {
    switch (status) {
      case 'due': return 'bg-red-100 text-red-800';
      case 'approaching': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Count sows due for heat
  const sowsDueForHeat = pigs.filter(pig => {
    const heatStatus = calculateHeatStatus(pig);
    return heatStatus && (heatStatus.status === 'due' || heatStatus.status === 'overdue');
  }).length;

  // -- NEW SECTION: Aggregate all sow notes for overview charts --
  const sowNotes = pigs
    .filter(p => p.category === "Sow" && p.notes)
    .map(p => p.notes)
    .join('\n');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pig Management</h1>
              <p className="text-gray-600 mt-2">Monitor and manage your pig inventory</p>
            </div>
            <Button 
              onClick={onAddPig}
              className="bg-farm-blue-600 hover:bg-farm-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Pig
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pigs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-farm-blue-600">{pigs.length}</div>
                <p className="text-xs text-muted-foreground">Active livestock</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Healthy Pigs</CardTitle>
                <div className="text-green-600">❤️</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {pigs.filter(p => p.healthStatus === 'Healthy').length}
                </div>
                <p className="text-xs text-muted-foreground">In good health</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Breeding Sows</CardTitle>
                <div>🐷</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-farm-blue-600">
                  {pigs.filter(p => p.category === 'Sow').length}
                </div>
                <p className="text-xs text-muted-foreground">Reproductive females</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heat Due/Overdue</CardTitle>
                <Heart className="h-4 w-4 text-pink-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pink-600">{sowsDueForHeat}</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Under Treatment</CardTitle>
                <div className="text-yellow-600">🏥</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {pigs.filter(p => p.healthStatus === 'Under Treatment').length}
                </div>
                <p className="text-xs text-muted-foreground">Medical care</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, ID, or breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-farm-blue-600 hover:bg-farm-blue-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* === NEW DASHBOARD CHARTS: GLOBAL SOW OUTCOME CHARTS === */}
        {sowNotes && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="block">Sow Performance Charts (All Sows)</span>
            </h2>
            <PigReportsCharts notes={sowNotes} />
          </div>
        )}

        {/* Pig Table */}
        <Card>
          <CardHeader>
            <CardTitle>Livestock Inventory</CardTitle>
            <CardDescription>Complete overview of all pigs in the farm</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Weight (kg)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Next Heat</TableHead>
                  <TableHead>Expected Farrowing</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPigs.map((pig) => {
                  const age = calculateAge(pig.dateOfBirth);
                  const expectedFarrowing = calculateExpectedFarrowing(pig.lastServiceDate);
                  const heatStatus = calculateHeatStatus(pig);
                  
                  return (
                    <TableRow key={pig.id}>
                      <TableCell className="font-medium">{pig.pigId}</TableCell>
                      <TableCell>{pig.breed}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{pig.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {age.years}y {age.months}m {age.weeks}w {age.days}d
                          <div className="text-xs text-gray-500">({age.totalWeeks} weeks)</div>
                        </div>
                      </TableCell>
                      <TableCell>{pig.weight}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(pig.status)}>
                          {pig.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getHealthStatusColor(pig.healthStatus)}>
                          {pig.status === 'Sold' ? 'N/A' : pig.healthStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {heatStatus ? (
                          <div className="flex items-center gap-1">
                            {(heatStatus.status === 'due' || heatStatus.status === 'overdue') && (
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                            )}
                            <Badge className={getHeatStatusColor(heatStatus.status)} variant="outline">
                              {heatStatus.message}
                            </Badge>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {expectedFarrowing && pig.status === 'Alive' && pig.category === 'Sow' ? (
                          <div className="text-sm">
                            {new Date(expectedFarrowing).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDetails(pig)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditPig(pig)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredPigs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Users className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pigs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pig Details Modal */}
        {selectedPig && !showEditForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedPig.pigId}</h3>
                  <p className="text-gray-600">Breed: {selectedPig.breed}</p>
                </div>
                <Button 
                  onClick={() => setSelectedPig(null)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Basic Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Breed:</span>
                      <span className="font-medium">{selectedPig.breed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date of Birth:</span>
                      <span className="font-medium">{new Date(selectedPig.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <div className="font-medium text-right">
                        {(() => {
                          const age = calculateAge(selectedPig.dateOfBirth);
                          return `${age.years}y ${age.months}m ${age.weeks}w ${age.days}d (${age.totalWeeks} weeks)`;
                        })()}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <Badge variant="secondary">{selectedPig.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Weight:</span>
                      <span className="font-medium">{selectedPig.weight} kg</span>
                    </div>
                    {selectedPig.boarTagNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Boar Tag:</span>
                        <span className="font-medium">{selectedPig.boarTagNumber}</span>
                      </div>
                    )}
                    {selectedPig.lastServiceDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected Farrowing:</span>
                        <span className="font-medium">
                          {calculateExpectedFarrowing(selectedPig.lastServiceDate) ? 
                            new Date(calculateExpectedFarrowing(selectedPig.lastServiceDate)!).toLocaleDateString() : 
                            'N/A'
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Health & Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={getStatusColor(selectedPig.status)}>{selectedPig.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Health Status:</span>
                      <Badge className={getHealthStatusColor(selectedPig.healthStatus)}>{selectedPig.status === 'Sold' ? 'N/A' : selectedPig.healthStatus}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Checkup:</span>
                      <span className="font-medium">{new Date(selectedPig.lastCheckup).toLocaleDateString()}</span>
                    </div>
                    {selectedPig.category === 'Sow' && selectedPig.lastHeatDate && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Heat:</span>
                          <span className="font-medium">{new Date(selectedPig.lastHeatDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next Heat:</span>
                          <div className="font-medium text-right">
                            {(() => {
                              const heatStatus = calculateHeatStatus(selectedPig);
                              return heatStatus ? heatStatus.message : 'Unknown';
                            })()}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {selectedPig.notes && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Records & Notes</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{selectedPig.notes}</pre>
                  </div>
                </div>
              )}
              
              {/* Sow-specific suggestions (analysis & tips) */}
              {selectedPig.category === "Sow" && (
                <PigSowSuggestions pig={selectedPig} />
              )}
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleEditPig(selectedPig)}
                    className="bg-farm-blue-600 hover:bg-farm-blue-700"
                  >
                    Edit Pig
                  </Button>
                  <Button 
                    onClick={() => setSelectedPig(null)}
                    variant="outline"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Form Modal */}
        {showEditForm && selectedPig && (
          <EditPigForm
            pig={selectedPig}
            onClose={() => {
              setShowEditForm(false);
              setSelectedPig(null);
            }}
            onSave={handleSavePig}
          />
        )}
      </div>
    </div>
  );
};

export default PigManagement;
