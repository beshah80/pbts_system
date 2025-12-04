'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, Navigation, Bus } from 'lucide-react';
import { getRouteById, getSchedulesByRoute } from '@/lib/api';
import { Route, Schedule } from '@/types';
import Link from 'next/link';
import { formatTime, calculateEstimatedArrival } from '@/lib/utils';



export default function RouteDetailsPage() {
  const params = useParams();
  const routeId = params.id as string;
  console.log('Raw params:', params);
  console.log('Route ID from params:', routeId);
  console.log('Decoded route ID:', decodeURIComponent(routeId || ''));
  const [route, setRoute] = useState<Route | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (routeId) {
      const loadRoute = async () => {
        try {
          // Fetch and find route in JSON data
          console.log('Fetching route with ID:', routeId);
          const response = await fetch('/routes_with_stops.json');
          console.log('Fetch response status:', response.status, response.ok);
          const routesData = response.ok ? await response.json() : [];
          console.log('Routes data length:', routesData.length);
          const decodedRouteId = decodeURIComponent(routeId);
          console.log('Looking for route ID:', routeId);
          console.log('Decoded route ID:', decodedRouteId);
          console.log('Available route IDs:', routesData.map((r: any) => r.id).slice(0, 5));
          const jsonRoute = routesData.find((route: any) => route.id === decodedRouteId);
          console.log('Found route:', jsonRoute);
        
        if (jsonRoute) {
          const startStop = jsonRoute.stops?.[0];
          const endStop = jsonRoute.stops?.[jsonRoute.stops.length - 1];
          
          const formattedRoute = {
            id: jsonRoute.id,
            routeName: jsonRoute.longName || jsonRoute.shortName,
            routeNumber: jsonRoute.shortName,
            startLocation: startStop?.name || 'Start',
            endLocation: endStop?.name || 'End',
            distance: Math.floor(Math.random() * 20 + 5),
            estimatedDuration: Math.floor(Math.random() * 60 + 30),
            farePrice: Math.floor(Math.random() * 10 + 5),
            isActive: true,
            stops: jsonRoute.stops?.length || 0
          };
          
          setRoute(formattedRoute);
          
          // Generate sample schedules
          const sampleSchedules = [
            {
              id: '1',
              routeId: routeId,
              departureTime: '06:00',
              arrivalTime: '07:30',
              frequency: 15,
              weekdays: true,
              weekends: false
            },
            {
              id: '2',
              routeId: routeId,
              departureTime: '08:00',
              arrivalTime: '09:30',
              frequency: 10,
              weekdays: true,
              weekends: true
            },
            {
              id: '3',
              routeId: routeId,
              departureTime: '18:00',
              arrivalTime: '19:30',
              frequency: 20,
              weekdays: true,
              weekends: false
            }
          ];
          
          setSchedules(sampleSchedules);
        } else {
          setRoute(null);
          setSchedules([]);
        }
      } catch (error) {
        console.error('Error loading route:', error);
        setRoute(null);
        }
        
        setLoading(false);
      };
      
      loadRoute();
    }
  }, [routeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading route details...</p>
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
          <div className="flex items-center gap-4 mb-4">
            <Link href="/routes">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                ← Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{route.routeName}</h1>
              <p className="text-blue-100">Route {route.routeNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Route Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Route Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{route.farePrice} ETB</div>
                <div className="text-sm text-slate-600">Fare Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{route.distance} km</div>
                <div className="text-sm text-slate-600">Total Distance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{route.estimatedDuration} min</div>
                <div className="text-sm text-slate-600">Est. Duration</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Route Path</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">{route.startLocation}</span>
                </div>
                <div className="flex-1 mx-4 border-t-2 border-dashed border-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{route.endLocation}</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bus Stops */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Bus Stops ({typeof route.stops === 'number' ? route.stops : 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-slate-600">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p>This route has {typeof route.stops === 'number' ? route.stops : 0} stops</p>
              <p className="text-sm mt-2">From {route.startLocation} to {route.endLocation}</p>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Bus Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {schedules.length === 0 ? (
              <p className="text-slate-600 text-center py-8">No schedules available for this route.</p>
            ) : (
              <div className="space-y-3">
                {schedules.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Bus className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">
                          Departure: {formatTime(schedule.departureTime)}
                        </div>
                        <div className="text-sm text-slate-600">
                          Arrival: {formatTime(schedule.arrivalTime)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600">Every {schedule.frequency} min</div>
                      <div className="flex gap-2 mt-1">
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
          <Link href={`/tracking/${route.id}`} className="flex-1">
            <Button className="w-full">
              <Navigation className="w-4 h-4 mr-2" />
              Track Buses
            </Button>
          </Link>
          <Link href="/feedback" className="flex-1">
            <Button variant="outline" className="w-full">
              <Star className="w-4 h-4 mr-2" />
              Give Feedback
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}