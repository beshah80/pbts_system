'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Clock, Filter, ArrowLeft } from 'lucide-react';
import { getAllRoutes } from '@/lib/api';
import { Route } from '@/types';
import Link from 'next/link';
import { formatTime, getBusTypeColor } from '@/lib/utils';

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRoutes().then((data) => {
      setRoutes(data);
      setFilteredRoutes(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = routes.filter(route =>
        route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.endLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoutes(filtered);
    } else {
      setFilteredRoutes(routes);
    }
  }, [searchTerm, routes]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading routes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/home">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">All Routes</h1>
          <p className="text-blue-100">Browse all available bus routes</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search routes, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Routes List */}
        <div className="space-y-4">
          {filteredRoutes.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-slate-600">No routes found matching your search.</p>
              </CardContent>
            </Card>
          ) : (
            filteredRoutes.map((route) => (
              <Card key={route.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{route.routeName}</h3>
                      <p className="text-slate-600">Route {route.routeNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{route.farePrice} ETB</p>
                      <p className="text-sm text-slate-600">{route.estimatedDuration} minutes</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">Distance: {route.distance} km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">Duration: {route.estimatedDuration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${route.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {route.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Route Path:</h4>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{route.startLocation}</span>
                      <span>→</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{route.endLocation}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Stops ({route.stops.length}):</h4>
                    <div className="flex flex-wrap gap-2">
                      {route.stops.slice(0, 4).map((stop) => (
                        <span key={stop.id} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm">
                          {stop.stopName}
                        </span>
                      ))}
                      {route.stops.length > 4 && (
                        <span className="text-slate-500 text-sm">+{route.stops.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Link href={`/routes/${route.id}`}>
                        <Button>View Details</Button>
                      </Link>
                      <Link href={`/tracking/${route.id}`}>
                        <Button variant="outline">Track Buses</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}