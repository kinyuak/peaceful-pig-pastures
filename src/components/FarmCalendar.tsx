import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Clock, Syringe, Scale } from 'lucide-react';
import AddEventForm from './AddEventForm';

const FarmCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // Sample events - in real app this would come from database
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Vaccination - Bella (P001)",
      date: "2024-06-15",
      type: "health",
      time: "09:00",
      description: "Annual vaccination for sow Bella"
    },
    {
      id: 2,
      title: "Weight Check - Weaners",
      date: "2024-06-16",
      type: "monitoring",
      time: "14:00",
      description: "Weekly weight monitoring for weaner group"
    },
    {
      id: 3,
      title: "Expected Farrowing - Luna",
      date: "2024-06-18",
      type: "breeding",
      time: "All Day",
      description: "Expected farrowing date for sow Luna"
    },
    {
      id: 4,
      title: "Health Checkup - Rocky",
      date: "2024-06-20",
      type: "health",
      time: "10:30",
      description: "Follow-up health checkup for Rocky"
    }
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
    // Pre-fill with vaccination data
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
      case 'breeding': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

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
                    const hasEvent = events.some(event => 
                      new Date(event.date).toDateString() === date.toDateString()
                    );

                    return (
                      <div
                        key={i}
                        onClick={() => handleDateClick(date)}
                        className={`
                          p-2 h-12 flex items-center justify-center text-sm cursor-pointer rounded-md relative
                          ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                          ${isToday ? 'bg-farm-blue-600 text-white font-bold' : 'hover:bg-gray-100'}
                        `}
                      >
                        {date.getDate()}
                        {hasEvent && !isToday && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-farm-blue-600 rounded-full"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>
                  Next scheduled activities for your farm
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
                    <div key={event.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
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
                  <Calendar className="h-4 w-4 mr-2" />
                  Set Breeding Date
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
