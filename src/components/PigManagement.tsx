
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Users, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
}

interface PigManagementProps {
  onAddPig: () => void;
}

const PigManagement = ({ onAddPig }: PigManagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sample data - in real app this would come from a database
  const [pigs] = useState<Pig[]>([
    {
      id: '1',
      name: 'Bella',
      pigId: 'P001',
      breed: 'Yorkshire',
      dateOfBirth: '2023-03-15',
      weight: 180,
      category: 'Sow',
      status: 'Alive',
      healthStatus: 'Healthy',
      lastCheckup: '2024-06-01'
    },
    {
      id: '2',
      name: 'Max',
      pigId: 'P002',
      breed: 'Duroc',
      dateOfBirth: '2022-08-10',
      weight: 250,
      category: 'Boar',
      status: 'Alive',
      healthStatus: 'Healthy',
      lastCheckup: '2024-05-28'
    },
    {
      id: '3',
      name: 'Luna',
      pigId: 'P003',
      breed: 'Hampshire',
      dateOfBirth: '2024-01-20',
      weight: 45,
      category: 'Weaner',
      status: 'Alive',
      healthStatus: 'Under Treatment',
      lastCheckup: '2024-06-10'
    },
    {
      id: '4',
      name: 'Rocky',
      pigId: 'P004',
      breed: 'Landrace',
      dateOfBirth: '2023-11-05',
      weight: 120,
      category: 'Porker',
      status: 'Alive',
      healthStatus: 'Healthy',
      lastCheckup: '2024-06-05'
    }
  ]);

  const categories = ['All', 'Sow', 'Boar', 'Weaner', 'Porker'];

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Sow': return '🐷';
      case 'Boar': return '🐗';
      case 'Weaner': return '🐽';
      case 'Porker': return '🐖';
      default: return '🐷';
    }
  };

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
              Add New Pig
            </Button>
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

        {/* Pig Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPigs.map((pig) => (
            <Card key={pig.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getCategoryIcon(pig.category)}</div>
                    <div>
                      <CardTitle className="text-lg">{pig.name}</CardTitle>
                      <CardDescription>ID: {pig.pigId}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(pig.status)}>
                    {pig.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Breed:</span>
                    <span className="font-medium">{pig.breed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Category:</span>
                    <Badge variant="secondary">{pig.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weight:</span>
                    <span className="font-medium">{pig.weight} kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Health:</span>
                    <Badge className={getHealthStatusColor(pig.healthStatus)}>
                      {pig.healthStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Checkup:</span>
                    <span className="text-sm">{new Date(pig.lastCheckup).toLocaleDateString()}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPigs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pigs found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'All' 
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first pig to the system."
              }
            </p>
            <Button onClick={onAddPig} className="bg-farm-blue-600 hover:bg-farm-blue-700">
              Add New Pig
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PigManagement;
