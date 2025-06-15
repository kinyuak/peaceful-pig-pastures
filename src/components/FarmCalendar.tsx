import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Clock, Syringe, Scale, AlertTriangle, Heart, TrendingUp } from 'lucide-react';
import AddEventForm from './AddEventForm';

const FarmCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // Sample pig data - in real app this would come from database
  const samplePigs = [
    {
      id: '1',
      pigId: 'P001',
      name: 'Bella',
      breed: 'Large White',
      category: 'Sow' as const,
      status: 'Alive' as const,
      lastHeatDate: '2024-06-10',
      weight: 165,
      healthStatus: 'Healthy' as const,
      dateOfBirth: '2022-03-15'
    },
    {
      id: '2',
      pigId: 'P002',
      name: 'Luna',
      breed: 'Landrace',
      category: 'Sow' as const,
      status: 'Alive' as const,
      lastHeatDate: '2024-06-05',
      weight: 158,
      healthStatus: 'Healthy' as const,
      dateOfBirth: '2022-01-20'
    }
  ];

  // Calculate heat cycle events for pigs
  const calculateHeatEvents = () => {
    const heatEvents: any[] = [];
    
    samplePigs.forEach(pig => {
      if (pig.category === 'Sow' && pig.lastHeatDate) {
        const lastHeat = new Date(pig.lastHeatDate);
        const nextHeat = new Date(lastHeat.getTime() + (21 * 24 * 60 * 60 * 1000));
        const today = new Date();
        
        // Add next expected heat event
        heatEvents.push({
          id: `heat-${pig.id}`,
          title: `Expected Heat - ${pig.name} (${pig.pigId})`,
          date: nextHeat.toISOString().split('T')[0],
          type: 'breeding',
          time: 'Monitor',
          description: `Expected heat cycle for sow ${pig.name}`,
          pigId: pig.pigId,
          priority: nextHeat <= new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000)) ? 'high' : 'normal'
        });
      }
    });
    
    return heatEvents;
  };
  
  // Sample events - in real app this would come from database
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Vaccination - Bella (P001)",
      date: "2024-06-15",
      type: "health",
      time: "09:00",
      description: "Annual vaccination for sow Bella",
      priority: 'high'
    },
    {
      id: 2,
      title: "Weight Check - Weaners",
      date: "2024-06-16",
      type: "monitoring",
      time: "14:00",
      description: "Weekly weight monitoring for weaner group",
      priority: 'normal'
    },
    {
      id: 3,
      title: "Expected Farrowing - Luna",
      date: "2024-06-18",
      type: "breeding",
      time: "All Day",
      description: "Expected farrowing date for sow Luna",
      priority: 'high'
    },
    {
      id: 4,
      title: "Health Checkup - Rocky",
      date: "2024-06-20",
      type: "health",
      time: "10:30",
      description: "Follow-up health checkup for Rocky",
      priority: 'normal'
    },
    ...calculateHeatEvents()
  ]);

  const handleAddEvent = (selectedDate?: string) => {
    setSelectedDate(selectedDate || '');
    setShowAddEvent(true);
    console.log('Add Event clicked for date:', selectedDate);
  };

  const handleSaveEvent = (newEvent: any) => {
    setEvents(prev => [...prev, newEvent]);
    setShowAddEvent(false);
  };

  const handleScheduleVaccination = () => {
    setSelectedDate('');
    setShowAddEvent(true);
    console.log('Schedule Vaccination clicked');
  };

  const handlePlanWeightCheck = () => {
    setSelectedDate('');
    setShowAddEvent(true);
    console.log('Plan Weight Check clicked');
  };

  const handleSetBreedingDate = () => {
    setSelectedDate('');
    setShowAddEvent(true);
    console.log('Set Breeding Date clicked');
  };

  const handleHealthCheckup = () => {
    setSelectedDate('');
    setShowAddEvent(true);
    console.log('Health Checkup clicked');
  };

  const handleDateClick = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    console.log('Date clicked:', dateString);
    handleAddEvent(dateString);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'health': return 'bg-red-100 text-red-800';
      case 'monitoring': return 'bg-blue-100 text-blue-800';
      case 'breeding': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'health': return <Syringe className="h-4 w-4" />;
      case 'monitoring': return <Scale className="h-4 w-4" />;
      case 'breeding': return <Heart className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? 'border-l-4 border-red-500' : 'border-l-4 border-blue-500';
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8);

  const urgentEvents = events
    .filter(event => {
      const eventDate = new Date(event.date);
      const today = new Date();
      const daysUntil = Math.floor((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 3 && daysUntil >= 0;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getKenyaHealthTips = () => {
    const currentMonth = new Date().getMonth();
    const tips = [];

    // Nanyuki specific tips
    tips.push({
      title: "Nanyuki Climate Management",
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      content: [
        "Monitor temperature drops at night (2000m altitude)",
        "Ensure adequate ventilation without drafts",
        "Provide extra bedding during cold months",
        "Watch for respiratory issues in dry weather"
      ]
    });

    // Seasonal feeding advice
    if (currentMonth >= 2 && currentMonth <= 5) {
      tips.push({
        title: "Long Rains Season (Mar-Jun)",
        icon: <Syringe className="h-5 w-5 text-green-600" />,
        content: [
          "Increase parasite prevention measures",
          "Ensure proper drainage in pig housing",
          "Utilize fresh green feeds when available",
          "Monitor feed storage for mold"
        ]
      });
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      tips.push({
        title: "Short Rains Season (Oct-Dec)",
        icon: <Scale className="h-5 w-5 text-orange-600" />,
        content: [
          "Prepare for cooler temperatures",
          "Stock quality feeds before price increases",
          "Plan breeding for favorable weather",
          "Maintain clean water sources"
        ]
      });
    } else {
      tips.push({
        title: "Dry Season Management",
        icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
        content: [
          "Ensure constant water supply",
          "Provide shade and cooling",
          "Supplement with vitamins A, D, E",
          "Control dust in pig areas"
        ]
      });
    }

    tips.push({
      title: "Local Feed Optimization",
      icon: <Heart className="h-5 w-5 text-purple-600" />,
      content: [
        "Use maize germ from local mills",
        "Include sweet potato vines in diet",
        "Source sunflower cake locally",
        "Consider cassava leaves as supplement"
      ]
    });

    return tips;
  };

  const healthTips = getKenyaHealthTips();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farm Calendar</h1>
            <p className="text-gray-600 mt-2">Schedule and track important farm activities</p>
          </div>
          <Button 
            onClick={() => handleAddEvent()}
            className="bg-farm-blue-600 hover:bg-farm-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        {/* Urgent Alerts */}
        {urgentEvents.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Urgent Events (Next 3 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {urgentEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-orange-200">
                    {getEventIcon(event.type)}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(event.date).toLocaleDateString()} - {event.time}
                      </p>
                    </div>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-farm-blue-600" />
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <CardDescription>
                  Click on any date to view or add events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6);
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const dayEvents = events.filter(event => 
                      new Date(event.date).toDateString() === date.toDateString()
                    );
                    const hasUrgentEvent = dayEvents.some(event => event.priority === 'high');

                    return (
                      <div
                        key={i}
                        onClick={() => handleDateClick(date)}
                        className={`
                          p-2 h-16 flex flex-col items-center justify-start text-sm cursor-pointer rounded-md relative border
                          ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                          ${isToday ? 'bg-farm-blue-600 text-white font-bold border-farm-blue-600' : 'hover:bg-gray-100 border-gray-200'}
                          ${hasUrgentEvent && !isToday ? 'border-red-300 bg-red-50' : ''}
                        `}
                      >
                        <span className="mb-1">{date.getDate()}</span>
                        {dayEvents.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {dayEvents.slice(0, 2).map((event, idx) => (
                              <div 
                                key={idx} 
                                className={`w-2 h-2 rounded-full ${
                                  event.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'
                                }`}
                              ></div>
                            ))}
                            {dayEvents.length > 2 && (
                              <span className="text-xs">+{dayEvents.length - 2}</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Calendar Reports */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This Month's Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Events:</span>
                      <span className="font-medium">{events.filter(e => new Date(e.date).getMonth() === currentDate.getMonth()).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Health Events:</span>
                      <span className="font-medium">{events.filter(e => e.type === 'health' && new Date(e.date).getMonth() === currentDate.getMonth()).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Breeding Events:</span>
                      <span className="font-medium">{events.filter(e => e.type === 'breeding' && new Date(e.date).getMonth() === currentDate.getMonth()).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Urgent Events:</span>
                      <span className="font-medium text-red-600">{urgentEvents.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pig Health Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Sows:</span>
                      <span className="font-medium">{samplePigs.filter(p => p.category === 'Sow').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">On Heat Cycle:</span>
                      <span className="font-medium">{samplePigs.filter(p => p.lastHeatDate).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Weight:</span>
                      <span className="font-medium">{Math.round(samplePigs.reduce((acc, p) => acc + p.weight, 0) / samplePigs.length)}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Healthy Status:</span>
                      <span className="font-medium text-green-600">{samplePigs.filter(p => p.healthStatus === 'Healthy').length}/{samplePigs.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>
                  Next scheduled activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No upcoming events scheduled</p>
                  </div>
                ) : (
                  upcomingEvents.map(event => (
                    <div key={event.id} className={`border rounded-lg p-4 hover:shadow-sm transition-shadow ${getPriorityColor(event.priority || 'normal')}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getEventIcon(event.type)}
                          <h4 className="font-medium text-sm">{event.title}</h4>
                        </div>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-4">
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{event.description}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>
                  Common farm scheduling tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleScheduleVaccination}
                >
                  <Syringe className="h-4 w-4 mr-2" />
                  Schedule Vaccination
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handlePlanWeightCheck}
                >
                  <Scale className="h-4 w-4 mr-2" />
                  Plan Weight Check
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleSetBreedingDate}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Record Heat Date
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleHealthCheckup}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Health Checkup
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Health Tips and Recommendations */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Kenya/Nanyuki Health Tips & Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthTips.map((tip, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {tip.icon}
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Event Modal */}
        {showAddEvent && (
          <AddEventForm
            selectedDate={selectedDate}
            onClose={() => setShowAddEvent(false)}
            onSave={handleSaveEvent}
          />
        )}
      </div>
    </div>
  );
};

export default FarmCalendar;
