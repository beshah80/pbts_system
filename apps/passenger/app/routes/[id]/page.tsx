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
  const [route, setRoute] = useState<Route | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (routeId) {
      Promise.all([
        getRouteById(routeId),
        getSchedulesByRoute(routeId)
      ]).then(async ([routeData, schedulesData]) => {
        setRoute(routeData);
        setSchedules(schedulesData);
        
        // Route visualization removed to prevent excessive API calls
        setLoading(false);
      });
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
              Bus Stops ({route.stops.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {route.stops.map((stop, index) => (
                <div key={stop.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{stop.stopName}</h4>
                    <p className="text-sm text-slate-600">{stop.stopNameAmharic}</p>
                    {stop.landmarks && stop.landmarks.length > 0 && (
                      <div className="flex gap-2 mt-1">
                        {stop.landmarks.map((landmark, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {landmark}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right text-sm text-slate-600">
                    <div>Lat: {stop.latitude.toFixed(4)}</div>
                    <div>Lng: {stop.longitude.toFixed(4)}</div>
                  </div>
                </div>
              ))}
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