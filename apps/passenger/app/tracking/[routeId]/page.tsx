'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Bus, Navigation, RefreshCw, AlertCircle, Zap } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import { getRouteById, getSchedulesByRoute } from '@/lib/api';
import { Route, Schedule, Bus as BusType } from '@/types';
import Link from 'next/link';
import { formatTime, getBusTypeColor, getStatusColor } from '@/lib/utils';

// Enhanced bus tracking data with real-time simulation
const generateMockBusPositions = (routeId: string) => [
  {
    id: '1',
    plateNumber: 'AA-001-001',
    busNumber: 'ANB-001',
    busType: 'ANBESSA' as const,
    status: 'ON_ROUTE' as const,
    currentStopId: '1',
    nextStopId: '2',
    estimatedArrival: '08:15',
    delay: 0,
    occupancyLevel: Math.floor(Math.random() * 30) + 60
  },
  {
    id: '2',
    plateNumber: 'AA-002-002',
    busNumber: 'SHG-001',
    busType: 'SHEGER' as const,
    status: Math.random() > 0.7 ? 'DELAYED' as const : 'ON_ROUTE' as const,
    currentStopId: '2',
    nextStopId: '3',
    estimatedArrival: '08:25',
    delay: Math.random() > 0.7 ? Math.floor(Math.random() * 8) + 2 : 0,
    occupancyLevel: Math.floor(Math.random() * 40) + 50
  },
  {
    id: '3',
    plateNumber: 'AA-003-003',
    busNumber: 'VEL-001',
    busType: 'VELOCITY' as const,
    status: 'ON_ROUTE' as const,
    currentStopId: '3',
    nextStopId: '4',
    estimatedArrival: '08:35',
    delay: 0,
    occupancyLevel: Math.floor(Math.random() * 25) + 40
  }
];

export default function TrackingPage() {
  const params = useParams();
  const routeId = params.routeId as string;
  const [route, setRoute] = useState<Route | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [buses, setBuses] = useState(() => generateMockBusPositions(routeId));
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (routeId) {
      Promise.all([
        getRouteById(routeId),
        getSchedulesByRoute(routeId)
      ]).then(([routeData, schedulesData]) => {
        setRoute(routeData);
        setSchedules(schedulesData);
        setLoading(false);
      });
    }
  }, [routeId]);

  const refreshTracking = () => {
    setLastUpdated(new Date());
    // Simulate real-time updates with new data
    setBuses(generateMockBusPositions(routeId));
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshTracking, 30000);
    return () => clearInterval(interval);
  }, [routeId]);

  const getOccupancyColor = (level: number) => {
    if (level >= 90) return 'bg-red-100 text-red-800';
    if (level >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getOccupancyText = (level: number) => {
    if (level >= 90) return 'Very Crowded';
    if (level >= 70) return 'Moderately Crowded';
    return 'Available Seats';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading tracking information...</p>
        </div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Route Not Found</h2>
          <p className="text-slate-600 mb-4">The requested route could not be found.</p>
          <Link href="/routes">
            <Button>Back to Routes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href={`/routes/${route.id}`}>
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                  ← Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Track Buses</h1>
                <p className="text-blue-100">{route.routeName} - Route {route.routeNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                <Zap className="w-3 h-3" />
                Live Tracking
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshTracking}
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
          <p className="text-sm text-blue-200">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Active Buses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="w-5 h-5" />
              Active Buses ({buses.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {buses.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No buses currently active on this route.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {buses.map((bus) => {
                  const currentStop = route.stops.find(stop => stop.id === bus.currentStopId);
                  const nextStop = route.stops.find(stop => stop.id === bus.nextStopId);
                  
                  return (
                    <div key={bus.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{bus.busNumber}</h3>
                          <p className="text-sm text-slate-600">{bus.plateNumber}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${getBusTypeColor(bus.busType)}`}>
                            {bus.busType}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(bus.status)}`}>
                            {bus.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium">Current Stop</p>
                            <p className="text-sm text-slate-600">{currentStop?.stopName || 'Unknown'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium">Next Stop</p>
                            <p className="text-sm text-slate-600">{nextStop?.stopName || 'End of route'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium">Est. Arrival</p>
                            <p className="text-sm text-slate-600">
                              {formatTime(bus.estimatedArrival)}
                              {bus.delay > 0 && (
                                <span className="text-red-600 ml-1">(+{bus.delay}min)</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Occupancy:</span>
                          <span className={`px-2 py-1 rounded text-xs ${getOccupancyColor(bus.occupancyLevel)}`}>
                            {getOccupancyText(bus.occupancyLevel)} ({bus.occupancyLevel}%)
                          </span>
                        </div>
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              bus.occupancyLevel >= 90 ? 'bg-red-500' : 
                              bus.occupancyLevel >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${bus.occupancyLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interactive Route Map */}
        <InteractiveMap 
          route={route}
          activeBuses={buses.map(bus => ({
            ...bus,
            coordinates: [0, 0] as [number, number],
            speed: Math.floor(Math.random() * 40) + 20,
            delay: bus.status === 'DELAYED' ? Math.floor(Math.random() * 10) + 5 : 0
          }))}
          onStopSelect={(stop) => {
            console.log('Selected stop:', stop);
          }}
          onBusSelect={(bus) => {
            console.log('Selected bus:', bus);
          }}
        />

        {/* Next Departures */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upcoming Departures
            </CardTitle>
          </CardHeader>
          <CardContent>
            {schedules.length === 0 ? (
              <p className="text-slate-600 text-center py-4">No scheduled departures available.</p>
            ) : (
              <div className="space-y-3">
                {schedules.slice(0, 5).map((schedule) => (
                  <div key={schedule.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-medium">{formatTime(schedule.departureTime)}</p>
                        <p className="text-sm text-slate-600">Every {schedule.frequency} minutes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">
                        Arrives: {formatTime(schedule.arrivalTime)}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {schedule.weekdays && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Weekdays</span>
                        )}
                        {schedule.weekends && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Weekends</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Link href={`/routes/${route.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Route Details
            </Button>
          </Link>
          <Link href="/feedback" className="flex-1">
            <Button variant="outline" className="w-full">
              Report Issue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}