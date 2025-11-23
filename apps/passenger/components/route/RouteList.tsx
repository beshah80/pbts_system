'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star } from 'lucide-react';
import { RouteSearchResult } from '@/types';
import Link from 'next/link';
import { formatTime, getBusTypeColor } from '@/lib/utils';

interface RouteListProps {
  results: RouteSearchResult[];
  loading?: boolean;
}

export default function RouteList({ results, loading }: RouteListProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Searching for routes...</p>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Routes Found</h3>
          <p className="text-slate-600">Try adjusting your search criteria or check for alternative locations.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={result.route.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{result.route.routeName}</h3>
                <p className="text-slate-600">Route {result.route.routeNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{result.route.farePrice} ETB</p>
                <p className="text-sm text-slate-600">{result.route.estimatedDuration} minutes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-sm">Distance: {result.route.distance} km</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm">
                  Next: {formatTime(result.nextDepartures[0]?.departureTime || '00:00')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-slate-400" />
                <span className="text-sm">Est. arrival: {result.estimatedArrival}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Available Buses:</h4>
              <div className="flex gap-2">
                {result.currentBuses.length > 0 ? (
                  result.currentBuses.map((bus) => (
                    <span key={bus.id} className={`px-2 py-1 rounded text-xs ${getBusTypeColor(bus.busType)}`}>
                      {bus.busType} - {bus.busNumber}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">No buses currently active</span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-600">
                {result.nextDepartures.length > 0 && (
                  <span>Next {result.nextDepartures.length} departures available</span>
                )}
              </div>
              <div className="flex gap-2">
                <Link href={`/routes/${result.route.id}`}>
                  <Button size="sm">View Details</Button>
                </Link>
                <Link href={`/tracking/${result.route.id}`}>
                  <Button variant="outline" size="sm">Track</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}