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


// Fetch real bus data for the route
const fetchRouteBuses = async (routeId: string) => {
  try {
    const response = await fetch(`http://localhost:3005/api/buses`);
    if (!response.ok) return [];
    
    const allBuses = await response.json();
    return allBuses.filter((bus: any) => bus.currentRouteId === routeId);
  } catch (error) {
    console.error('Error fetching buses:', error);
    return [];
  }
};

export default function TrackingPage() {
  const params = useParams();
  const routeId = params.routeId as string;
  const [route, setRoute] = useState<Route | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());


  useEffect(() => {
    if (routeId) {
      Promise.all([
        getRouteById(routeId),
        getSchedulesByRoute(routeId),
        fetchRouteBuses(routeId)
      ]).then(async ([routeData, schedulesData, busesData]) => {
        setRoute(routeData);
        setSchedules(schedulesData);
        setBuses(busesData);
        setLoading(false);
      });
    }
  }, [routeId]);

  const refreshTracking = async () => {
    setLastUpdated(new Date());
    const busesData = await fetchRouteBuses(routeId);
    setBuses(busesData);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshTracking, 30000);
    return () => clearInterval(interval);
  }, [routeId]);

  const getOccupancyColor = (passengers: number) => {
    return 'bg-blue-100 text-blue-800'; // Simple color for passenger count
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
                  const currentStop = null; // Stops data not available as array
                  const nextStop = null; // Stops data not available as array
                  
                  return (
                    <div key={bus.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{bus.busNumber || bus.plateNumber}</h3>
                          <p className="text-sm text-slate-600">{bus.plateNumber}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${getBusTypeColor(bus.busType || 'ANBESSA')}`}>
                            {bus.busType || 'ANBESSA'}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(bus.status || 'ACTIVE')}`}>
                            {(bus.status || 'ACTIVE').replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium">Current Stop</p>
                            <p className="text-sm text-slate-600">{bus.currentStopId ? `Stop ${bus.currentStopId}` : 'In transit'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium">Next Stop</p>
                            <p className="text-sm text-slate-600">{bus.nextStopId ? `Stop ${bus.nextStopId}` : 'End of route'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium">Est. Arrival</p>
                            <p className="text-sm text-slate-600">
                              {bus.estimatedArrival ? formatTime(bus.estimatedArrival) : 'N/A'}
                              {bus.delay && bus.delay > 0 && (
                                <span className="text-red-600 ml-1">(+{bus.delay}min)</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Occupancy:</span>
                          <span className={`px-2 py-1 rounded text-xs ${getOccupancyColor(bus.currentPassengers || 0)}`}>
                            {bus.currentPassengers ? `${bus.currentPassengers}/${bus.capacity} passengers` : 'No data'}
                          </span>
                        </div>
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              (bus.currentPassengers / bus.capacity * 100) >= 90 ? 'bg-red-500' : 
                              (bus.currentPassengers / bus.capacity * 100) >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${bus.currentPassengers && bus.capacity ? (bus.currentPassengers / bus.capacity * 100) : 0}%` }}
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