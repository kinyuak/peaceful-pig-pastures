import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Eye, Edit, Plus, Heart, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EditPigForm from './EditPigForm';
import PigSowSuggestions from "./PigSowSuggestions";

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

  // Updated pigs data with heat cycle information
  const [pigs, setPigs] = useState<Pig[]>([
    {
      id: '1',
      name: 'TestSow',
      pigId: '0980',
      breed: 'Yorkshire',
      dateOfBirth: '2021-01-15',
      weight: 220,
      category: 'Sow',
      status: 'Alive',
      healthStatus: 'Healthy',
      lastCheckup: '2024-06-12',
      lastServiceDate: '2024-01-17',
      lastHeatDate: '2024-01-15', // 2 days before service
      boarTagNumber: 'B001',
      // ... keep existing code (notes section)
      notes: `PEACEFUL MEADOW FARM
FARROWING RECORDS

SOW TAG 0980 BOAR TAG

LITTER 4: Due 4/10/2024, Actual 4/7/2024 - 2 alive (1M, 1F) + 1 adopted = 3 total
LITTER 5: Due 24/10/2024, Actual 25/10/2024 - 12 alive (6M, 6F)
LITTER 6: Due 1/6/2025, Actual 1/6/2025 - 11 alive

TEETH CLIPPING & CASTRATION:
- 4th Litter: Teeth clipping 4/9/2024, Hernia condition
- 5th Litter: Teeth clipping 30/10/2024, Male castration 21/11/2024 - Good condition
- 6th Litter: Teeth clipping 3/6/2025

WEANERS & PORKERS:
- 6/26/2024: 3 weaners - Good condition
- 8/26/2024: 2 porkers - Good condition
- 2/1/2025: 9 weaners - Good condition

HEALTH RECORDS:
4th Litter:
- 7/16/2024: Weaner worm infestation, dewormed - 3 survived
- 8/15/2024: Weaner diarrhea, given Amprocox - 1 died, rest good

5th Litter:
- 27/10/2024: Piglets - 2 died, 10 remain
- 30/10/2024: Iron deficiency prevention injection - 1 died, rest good

SALES:
- Jan 2025: 1 weaner sold (Geoffrey)`
    },
    {
      id: '2',
      name: 'TestSow02',
      pigId: '0985',
      breed: 'Yorkshire',
      dateOfBirth: '2021-03-20',
      weight: 215,
      category: 'Sow',
      status: 'Sold',
      healthStatus: 'Healthy',
      lastCheckup: '2025-05-29',
      lastServiceDate: '2024-05-27',
      lastHeatDate: '2024-05-25', // 2 days before service
      boarTagNumber: '2055',
      // ... keep existing code (notes section)
      notes: `PEACEFUL MEADOW FARM
FARROWING RECORDS

SOW TAG 0985 BOAR TAG 2055

LITTER 5: Due 9/10/2024, Actual 9/10/2024 - 4 alive (3M, 6F) + 5 adopted piglets

TEETH CLIPPING & CASTRATION:
- 5th Litter: Teeth clipping 12/10/2024, Male castration 21/11/2024

WEANERS & PORKERS:
- 2/1/2025: 9 weaners - Good condition

VACCINE APPLICATION:
- 6/20/2024: PORCILIS COLICLOS injection - 2ml

HEALTH RECORDS:
5th Litter:
- 12/10/2024: Piglets iron deficiency prevention injection - 9 survived, well responded
- 4/11/2024: 2nd iron injection - 9 survived, good condition

SALES:
- 30/5/2025: Sow sold 71kg dead weight - Unable to conceive (Geoffrey)`
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
