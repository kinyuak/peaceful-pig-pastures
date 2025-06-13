
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Eye, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EditPigForm from './EditPigForm';

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

interface PigManagementProps {
  onAddPig: () => void;
}

const PigManagement = ({ onAddPig }: PigManagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPig, setSelectedPig] = useState<Pig | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Only TestSow data
  const [pigs, setPigs] = useState<Pig[]>([
    {
      id: '5',
      name: 'TestSow',
      pigId: '0980',
      breed: 'Yorkshire',
      dateOfBirth: '2021-01-15',
      weight: 220,
      category: 'Sow',
      status: 'Alive',
      healthStatus: 'Healthy',
      lastCheckup: '2024-06-12',
      boarTagNumber: 'B001',
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pig Management</h1>
              <p className="text-gray-600 mt-2">Monitor and manage your pig inventory</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <CardTitle className="text-sm font-medium">Under Treatment</CardTitle>
                <div className="text-yellow-600">🏥</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {pigs.filter(p => p.healthStatus === 'Under Treatment').length}
                </div>
                <p className="text-xs text-muted-foreground">Need attention</p>
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
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Weight (kg)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Last Checkup</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPigs.map((pig) => (
                  <TableRow key={pig.id}>
                    <TableCell className="font-medium">{pig.name}</TableCell>
                    <TableCell>{pig.pigId}</TableCell>
                    <TableCell>{pig.breed}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{pig.category}</Badge>
                    </TableCell>
                    <TableCell>{pig.weight}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(pig.status)}>
                        {pig.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getHealthStatusColor(pig.healthStatus)}>
                        {pig.healthStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(pig.lastCheckup).toLocaleDateString()}</TableCell>
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
                ))}
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
                  <h3 className="text-2xl font-bold text-gray-900">{selectedPig.name}</h3>
                  <p className="text-gray-600">ID: {selectedPig.pigId}</p>
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
                      <Badge className={getHealthStatusColor(selectedPig.healthStatus)}>{selectedPig.healthStatus}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Checkup:</span>
                      <span className="font-medium">{new Date(selectedPig.lastCheckup).toLocaleDateString()}</span>
                    </div>
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
