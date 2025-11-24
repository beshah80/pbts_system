'use client';

import BusStatusIndicator from '@/components/BusStatusIndicator';
import LocationSearch from '@/components/search/LocationSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
import { getPopularRoutes, RealLocationData, searchRoutes } from '@/lib/api';
import { useRoutePlanner } from '@/hooks/useRoutePlanner';
import { usePassengerStore } from '@/lib/store';
import { formatTime } from '@/lib/utils';
import { Route } from '@/types';
import { AlertCircle, ArrowRight, Clock, MapPin, RefreshCw, Search, Star, Wifi, WifiOff } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [popularRoutes, setPopularRoutes] = useState<Route[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const { searchResults, isSearching, setSearchResults, setIsSearching, setSearchFilters } = usePassengerStore();
  const [isConnected, setIsConnected] = useState(true);
  const { updates, lastUpdateTime, getBusUpdate } = useRealTimeUpdates(searchResults);
  const { planRoute, route: plannedRoute, isPlanning } = useRoutePlanner();

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch('/api/routes', {
          method: 'HEAD',
          signal: AbortSignal.timeout(3000)
        });
        setIsConnected(response.ok);
      } catch {
        setIsConnected(false);
      }
    };

    checkBackendConnection();
    const interval = setInterval(checkBackendConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadPopularRoutes();
  }, []);

  const loadPopularRoutes = async () => {
    try {
      setIsLoadingPopular(true);
      setError(null);
      const routes = await getPopularRoutes();
      setPopularRoutes(routes);
    } catch (err) {
      console.error('Failed to load popular routes:', err);
      setError('Failed to load popular routes. Please try again.');
    } finally {
      setIsLoadingPopular(false);
    }
  };

  const handleSearch = async () => {
    if (!fromLocation && !toLocation) {
      setError('Please enter at least one location to search');
      return;
    }

    setIsSearching(true);
    setError(null);
    setSearchFilters({ fromLocation, toLocation });

    try {
      // Skip route planning during search to prevent excessive API calls
      
      const results = await searchRoutes(fromLocation || undefined, toLocation || undefined);
      setSearchResults(results);

      if (results.length === 0) {
        setError('No routes found for the specified locations. Try different search terms or check spelling.');
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to search routes. Please check your connection and try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Helper function to convert location names to coordinates
  const getLocationCoordinates = async (location: string): Promise<[number, number] | null> => {
    const locationMap: { [key: string]: [number, number] } = {
      'meskel square': [38.7489895, 9.0448488],
      'bole airport': [38.7901014, 9.0077425],
      'mercato': [38.7622593, 8.9973568],
      'piazza': [38.7437676, 9.0468098],
      'kazanchis': [38.7669016, 9.0555153],
      'arat kilo': [38.7218441, 9.0582133]
    };
    
    const normalized = location.toLowerCase().trim();
    return locationMap[normalized] || null;
  };

  const handleRefresh = () => {
    if (fromLocation || toLocation) {
      handleSearch();
    } else {
      loadPopularRoutes();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ---------- HEADER ---------- */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white shadow-xl shadow-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">
            Ethiopian Bus System
          </h1>
          <p className="text-xl text-blue-100 mt-3 max-w-2xl mx-auto">
            Your smart companion for public transport in Addis Ababa
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-5 mt-6">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-lg px-5 py-2.5 rounded-full shadow-md">
              <span className="text-2xl">🚌</span>
              <span className="font-medium">{popularRoutes.length} Active Routes</span>
            </div>

            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-lg px-5 py-2.5 rounded-full shadow-md">
              <span className="text-2xl">📍</span>
              <span className="font-medium">Addis Ababa Coverage</span>
            </div>

            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-lg px-5 py-2.5 rounded-full shadow-md">
              {isConnected ? (
                <Wifi className="w-4 h-4 text-green-300" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-300" />
              )}
              <span className="font-medium">{isConnected ? 'Live Tracking' : 'Offline Mode'}</span>
            </div>

            {lastUpdateTime && (
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-lg px-5 py-2.5 rounded-full shadow-md">
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  Updated {lastUpdateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* ---------- SEARCH CARD (Moovit Style) ---------- */}
        <div className="-mt-20 relative z-20">
          <Card className="rounded-3xl shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-3 text-3xl font-bold text-gray-800">
                <div className="p-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-md">
                  <Search className="w-6 h-6 text-white" />
                </div>
                Plan Your Journey
              </CardTitle>
              <p className="text-gray-600 mt-1">Find the best route and get real-time updates</p>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* Location fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* FROM */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    From
                  </label>

                  <LocationSearch
                    placeholder="Enter starting location"
                    value={fromLocation}
                    onChange={setFromLocation}
                    onLocationSelect={(loc: RealLocationData) => setFromLocation(loc.name)}
                  />
                </div>

                {/* TO */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    To
                  </label>

                  <LocationSearch
                    placeholder="Enter destination"
                    value={toLocation}
                    onChange={setToLocation}
                    onLocationSelect={(loc: RealLocationData) => setToLocation(loc.name)}
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    const temp = fromLocation;
                    setFromLocation(toLocation);
                    setToLocation(temp);
                  }}
                  disabled={!fromLocation && !toLocation}
                  className="sm:w-auto border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-xl"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Swap
                </Button>

                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isSearching || isLoadingPopular}
                  className="sm:w-auto rounded-xl"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isSearching || isLoadingPopular ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>

                <Button
                  onClick={handleSearch}
                  disabled={isSearching || (!fromLocation && !toLocation)}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110
                  text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-150"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search Routes
                    </>
                  )}
                </Button>
              </div>

              {/* ERROR */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-red-700 font-semibold">{error}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setError(null)} className="ml-auto rounded-lg">
                    Dismiss
                  </Button>
                </div>
              )}

              {/* POPULAR TAGS */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">🔥 Popular destinations</p>
                <div className="flex flex-wrap gap-2">
                  {['Meskel Square', 'Bole Airport', 'Mercato', 'Piazza', 'Kazanchis', 'Arat Kilo'].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setError(null);
                        if (!fromLocation) setFromLocation(loc);
                        else setToLocation(loc);
                      }}
                      className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700
                      border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300
                      shadow-sm transition-all"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ---------- SEARCH RESULTS ---------- */}
        {searchResults.length > 0 && (
          <Card className="rounded-3xl shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  Found {searchResults.length} Routes
                </CardTitle>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchResults([]);
                    setFromLocation('');
                    setToLocation('');
                    setError(null);
                  }}
                  className="hover:bg-red-50 hover:text-red-700 rounded-lg"
                >
                  Clear
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              {searchResults.map((result, index) => {
                const route = result.route;

                return (
                  <div
                    key={route.id}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-150 relative overflow-hidden"
                  >
                    {/* SIDE BAR */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-cyan-500"></div>

                    <div className="flex justify-between items-start mb-4">
                      {/* ROUTE INFO */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                            #{index + 1}
                          </div>

                          <h3 className="font-bold text-2xl text-gray-800">{route.routeName}</h3>
                        </div>

                        <p className="text-gray-600 mb-3">Route {route.routeNumber}</p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">{route.startLocation}</span>
                          </div>

                          <div className="flex-1 border-t border-dashed border-gray-300 mx-2"></div>

                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm font-medium">{route.endLocation}</span>
                          </div>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="text-right ml-4">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-2 rounded-xl shadow">
                          <p className="text-2xl font-bold">{route.farePrice}</p>
                          <p className="text-xs opacity-90">ETB</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{route.estimatedDuration} min journey</p>
                      </div>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Distance: {route.distance} km
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Next: {formatTime(result.nextDepartures[0]?.departureTime || '00:00')}
                      </div>

                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" /> Arrives: {result.estimatedArrival}
                      </div>
                    </div>

                    {/* LIVE STATUS */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-700">Live Bus Status:</p>

                        {isConnected && (
                          <div className="flex items-center gap-1 text-green-600 text-xs">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Live Updates
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        {result.currentBuses.length > 0 ? (
                          result.currentBuses.map((bus) => {
                            const update = getBusUpdate(String(route.id), String(bus.id));

                            return (
                              <BusStatusIndicator
                                key={bus.id}
                                bus={{
                                  id: String(bus.id),
                                  plateNumber: bus.busNumber,
                                  busNumber: bus.busNumber,
                                  capacity: 50,
                                  busType: 'ANBESSA' as const,
                                  status: 'ON_ROUTE' as const
                                }}
                                delay={update?.delay}
                                occupancy={update?.occupancy}
                                nextStopETA={update?.nextStopETA}
                                lastUpdate={update?.lastUpdate}
                              />
                            );
                          })
                        ) : (
                          <div className="text-center py-4 bg-gray-50 rounded-xl text-gray-500">
                            <Clock className="w-7 h-7 mx-auto mb-2 text-gray-400" />
                            <p>No buses currently active</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        {route.stops.length} stops • {result.nextDepartures.length} departures today
                      </p>

                      <div className="flex gap-2">
                        <Link href={`/routes/${route.id}`}>
                          <Button size="sm" className="rounded-lg">Details</Button>
                        </Link>

                        <Link href={`/tracking/${route.id}`}>
                          <Button variant="outline" size="sm" className="rounded-lg">Track</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* POPULAR ROUTES */}
        <Card className="rounded-3xl shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-3xl">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
              Popular Routes in Addis Ababa
            </CardTitle>
            <p className="text-gray-600 mt-1">Most frequently used routes</p>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            {isLoadingPopular ? (
              <div className="py-12 text-center">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                <p className="text-gray-600 mt-2">Loading...</p>
              </div>
            ) : error && popularRoutes.length === 0 ? (
              <div className="py-12 text-center">
                <AlertCircle className="w-12 h-12 mx-auto text-red-400 mb-2" />
                <p className="text-gray-700 mb-3">Failed to load popular routes</p>
                <Button variant="outline" onClick={loadPopularRoutes} className="rounded-lg">
                  <RefreshCw className="w-4 h-4 mr-2" /> Retry
                </Button>
              </div>
            ) : popularRoutes.length > 0 ? (
              popularRoutes.map((route, i) => (
                <Link key={route.id} href={`/routes/${route.id}`}>
                  <div
                    className="bg-white p-5 rounded-2xl border border-gray-200 hover:shadow-xl
                    hover:border-blue-300 transition-all duration-150 cursor-pointer relative"
                  >
                    <div className="absolute top-0 right-0 w-14 h-14 bg-yellow-400/20 rounded-bl-3xl"></div>

                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500
                        flex items-center justify-center text-white text-sm font-bold shadow">
                          {i + 1}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{route.routeName}</h3>
                          <p className="text-gray-600 text-sm">Route {route.routeNumber}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {route.farePrice} ETB
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{route.estimatedDuration} min</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{route.startLocation}</span>
                      </div>

                      <ArrowRight className="w-4 h-4 text-gray-400" />

                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{route.endLocation}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {route.distance} km
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {route.stops.length} stops
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          route.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {route.isActive ? '🟢 Active' : '🔴 Inactive'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12 text-gray-600">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                No popular routes available
              </div>
            )}
          </CardContent>
        </Card>

        {/* ---------- QUICK ACTIONS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/routes">
            <Card className="rounded-3xl cursor-pointer shadow-md hover:shadow-xl border-0 bg-gradient-to-br from-blue-50 to-cyan-50 transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full
                flex items-center justify-center mx-auto mb-4 shadow-md">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">All Routes</h3>
                <p className="text-gray-600 text-sm">Browse all available routes</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/feedback">
            <Card className="rounded-3xl cursor-pointer shadow-md hover:shadow-xl border-0 bg-gradient-to-br from-yellow-50 to-orange-50 transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">Feedback</h3>
                <p className="text-gray-600 text-sm">Share your experience</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/map">
            <Card className="rounded-3xl cursor-pointer shadow-md hover:shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">Interactive Map</h3>
                <p className="text-gray-600 text-sm">View routes on the map</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
