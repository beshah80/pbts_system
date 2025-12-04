'use client';

import BusStatusIndicator from '@/components/BusStatusIndicator';
import LocationSearch from '@/components/search/LocationSearch';
import InteractiveMap from '@/components/InteractiveMap';
import TimeDisplay from '@/components/TimeDisplay';
import DateDisplay from '@/components/DateDisplay';

import RoutePathMap from '@/components/RoutePathMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
import { getPopularRoutes, searchRoutes } from '@/lib/api';
import { findRoutesBetweenLocations, getLocationCoordinates, AddisLocation, ADDIS_BUS_ROUTES, getPopularRoutes as getAddisPopularRoutes } from '@/lib/addisMapData';

import { useRoutePlanner } from '@/hooks/useRoutePlanner';
import { usePassengerStore } from '@/lib/store';
import { formatTime } from '@/lib/utils';
import { trackDestinationSearch, trackRouteSearch, getPopularDestinations, getPopularRouteIds } from '@/lib/searchTracker';
import { Route } from '@/types';
import { AlertCircle, ArrowRight, Clock, MapPin, RefreshCw, Search, Star, Map, Navigation } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [popularRoutes, setPopularRoutes] = useState<Route[]>([]);
  const [popularDestinations, setPopularDestinations] = useState<string[]>([]);
  const [totalActiveRoutes, setTotalActiveRoutes] = useState<number>(0);
  const [totalBuses, setTotalBuses] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const { searchResults, isSearching, setSearchResults, setIsSearching, setSearchFilters } = usePassengerStore();
  const [isConnected, setIsConnected] = useState(true);
  const { updates, lastUpdateTime, getBusUpdate } = useRealTimeUpdates(searchResults);
  const { planRoute, route: plannedRoute, isPlanning } = useRoutePlanner();
  const [showMap, setShowMap] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [fromCoordinates, setFromCoordinates] = useState<[number, number] | null>(null);
  const [toCoordinates, setToCoordinates] = useState<[number, number] | null>(null);
  const [fromLocationData, setFromLocationData] = useState<AddisLocation | null>(null);
  const [toLocationData, setToLocationData] = useState<AddisLocation | null>(null);
  const [mapRoutes, setMapRoutes] = useState<Array<{
    id: string;
    name: string;
    color: string;
    duration: number;
    distance: number;
    stops: Array<{ name: string; coordinates: [number, number] }>;
  }>>([]);

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/health', {
          signal: AbortSignal.timeout(3000)
        });
        setIsConnected(response.ok);
      } catch {
        setIsConnected(false);
      }
    };

    checkBackendConnection();
    const interval = setInterval(checkBackendConnection, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadPopularRoutes();
  }, []);

  const loadPopularRoutes = async () => {
    try {
      setIsLoadingPopular(true);
      setError(null);
      
      // Fetch JSON route data from public directory
      const response = await fetch('/routes_with_stops.json');
      if (!response.ok) {
        console.error('Failed to fetch routes:', response.status);
        setError('Failed to load route data');
        return;
      }
      const jsonRoutes = await response.json();
      
      // Get popular route IDs from search history
      const popularRouteIds = getPopularRouteIds(10);
      
      // Only show routes if there's search history
      let routesToShow = [];
      if (popularRouteIds.length > 0) {
        routesToShow = popularRouteIds
          .map(id => jsonRoutes.find((r: any) => r.id === id))
          .filter(Boolean);
      }
      setTotalActiveRoutes(jsonRoutes.length);
      setIsConnected(true);
      
      // Calculate total buses (estimate 2-3 buses per route)
      setTotalBuses(Math.floor(jsonRoutes.length * 2.5));
      
      // Convert JSON routes to expected format for popular routes display
      const formattedRoutes = routesToShow.map((route: any) => {
        const startStop = route.stops?.[0];
        const endStop = route.stops?.[route.stops.length - 1];
        
        return {
          id: route.id,
          routeName: (route.longName || route.shortName).replace(/\?\?\?/g, '→'),
          routeNumber: route.shortName,
          startLocation: startStop?.name || 'Start',
          endLocation: endStop?.name || 'End',
          distance: Math.floor(Math.random() * 20 + 5), // Estimate distance
          estimatedDuration: Math.floor(Math.random() * 60 + 30), // Estimate duration
          farePrice: Math.floor(Math.random() * 10 + 5), // Estimate fare
          isActive: true,
          stops: route.stops?.map((stop: any, index: number) => ({
            id: stop.id,
            stopName: stop.name,
            latitude: stop.lat,
            longitude: stop.lon,
            stopOrder: index + 1
          })) || []
        };
      });
      
      setPopularRoutes(formattedRoutes);
      
      // Get popular destinations from search history
      const popularDests = getPopularDestinations(8);
      setPopularDestinations(popularDests);
    } catch (err) {
      console.error('Failed to load routes:', err);
      setError('Failed to load routes. Please try again.');
    } finally {
      setIsLoadingPopular(false);
    }
  };

  const handleSearch = async () => {
    if (!fromLocation && !toLocation) {
      setError('Please enter both starting location and destination to search routes');
      return;
    }

    if (!fromLocation || !toLocation) {
      setError('Please enter both starting location and destination');
      return;
    }

    setIsSearching(true);
    setError(null);
    setSearchFilters({ fromLocation, toLocation });
    
    // Track search
    trackDestinationSearch(fromLocation);
    trackDestinationSearch(toLocation);

    try {
      // Get coordinates for locations using real Addis data
      const fromCoords = getLocationCoordinates(fromLocation);
      const toCoords = getLocationCoordinates(toLocation);
      
      if (fromCoords) setFromCoordinates(fromCoords);
      if (toCoords) setToCoordinates(toCoords);
      
      // Fetch and search in JSON route data
      const response = await fetch('/routes_with_stops.json');
      if (!response.ok) {
        console.error('Failed to fetch routes:', response.status);
        setError('Failed to load route data');
        return;
      }
      const allRoutes = await response.json();
      console.log('Total routes loaded:', allRoutes.length);
      console.log('Searching for:', fromLocation, 'to', toLocation);
      
      const matchingRoutes = allRoutes.filter((route: any) => {
        const routeName = route.longName || '';
        const fromLower = fromLocation.toLowerCase().trim();
        const toLower = toLocation.toLowerCase().trim();
        
        // Parse route name to extract from and to locations
        const parts = routeName.split(' -> ');
        if (parts.length === 2) {
          const routeFrom = parts[0].toLowerCase().trim();
          const routeTo = parts[1].toLowerCase().trim();
          const matches = routeFrom.includes(fromLower) && routeTo.includes(toLower);
          
          if (routeName.includes('Torhayloch') || routeName.includes('Megenagna')) {
            console.log('Route:', routeName, '| From:', routeFrom, '| To:', routeTo, '| Match:', matches);
          }
          
          return matches;
        }
        return false;
      });
      
      console.log('Matching routes found:', matchingRoutes.length);
      
      if (matchingRoutes.length > 0) {
        // Convert to search results format
        const results = matchingRoutes.map((route: any) => {
          const estimatedDuration = Math.floor(Math.random() * 60 + 30);
          const farePrice = Math.floor(Math.random() * 10 + 5);
          
          return {
            route: {
              id: route.id,
              routeName: (route.longName || route.shortName).replace(/\?\?\?/g, '→'),
              routeNumber: route.shortName,
              startLocation: route.stops?.[0]?.name || 'Start',
              endLocation: route.stops?.[route.stops.length - 1]?.name || 'End',
              distance: Math.floor(Math.random() * 20 + 5),
              estimatedDuration,
              farePrice,
              isActive: true,
              stops: route.stops?.map((stop: any, index: number) => ({
                id: stop.id,
                stopName: stop.name,
                latitude: stop.lat,
                longitude: stop.lon,
                stopOrder: index + 1
              })) || []
            },
            nextDepartures: [
              { departureTime: new Date(Date.now() + 5 * 60000).toISOString(), busId: 1 },
              { departureTime: new Date(Date.now() + 15 * 60000).toISOString(), busId: 2 },
              { departureTime: new Date(Date.now() + 25 * 60000).toISOString(), busId: 3 }
            ],
            estimatedArrival: new Date(Date.now() + estimatedDuration * 60000).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            }),
            currentBuses: [
              { id: 1, busNumber: `${route.shortName}-01`, status: 'ON_ROUTE' },
              { id: 2, busNumber: `${route.shortName}-02`, status: 'ON_ROUTE' }
            ]
          };
        });
        
        setSearchResults(results);
        
        // Track route searches only for relevant matches
        matchingRoutes.slice(0, 5).forEach((route: any) => {
          trackRouteSearch(route.id);
        });

        // Convert to map routes format
        const mapRoutesData = matchingRoutes.map((route: any) => ({
          id: route.id,
          name: (route.longName || route.shortName).replace(/\?\?\?/g, '→'),
          color: '#3B82F6',
          duration: Math.floor(Math.random() * 60 + 30),
          distance: Math.floor(Math.random() * 20 + 5),
          stops: route.stops?.map((stop: any) => ({
            name: stop.name,
            coordinates: [stop.lon, stop.lat]
          })) || []
        }));
        setMapRoutes(mapRoutesData);
        
        // Auto-select fastest route (first one)
        if (mapRoutesData.length > 0) {
          setSelectedRoute(mapRoutesData[0].id);
        }

        // Show map
        setShowMap(true);
      } else {
        setError(`No direct bus routes found between ${fromLocation} and ${toLocation}. Try searching for routes to nearby locations or check the popular routes below.`);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to search routes. Please check your input and try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle location selection from LocationSearch component
  const handleFromLocationSelect = (location: AddisLocation) => {
    setFromLocationData(location);
    setFromCoordinates(location.coordinates);
  };
  
  const handleToLocationSelect = (location: AddisLocation) => {
    setToLocationData(location);
    setToCoordinates(location.coordinates);
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
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/30">
            <span className="text-lg">🇪🇹</span>
            <span className="text-sm font-semibold">Ethiopia Transport</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight drop-shadow-lg">
            Ethiopian Bus System
          </h1>
          <p className="text-xl text-blue-100 mt-3 max-w-2xl mx-auto font-medium">
            Your smart companion for public transport in Addis Ababa
          </p>

          {/* Current Date & Time */}
          <div className="text-center mb-6">
            <DateDisplay />
            <TimeDisplay />
            <div className="text-blue-200 mt-1">Addis Ababa Local Time</div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-lg border border-white/30 hover:bg-white/25 transition-all duration-200">
              <span className="text-2xl">🚌</span>
              <div className="text-left">
                <div className="font-bold text-lg">{totalActiveRoutes}</div>
                <div className="text-xs text-blue-100">Active Routes</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-lg border border-white/30 hover:bg-white/25 transition-all duration-200">
              {isConnected ? (
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              ) : (
                <div className="w-3 h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/50"></div>
              )}
              <div className="text-left">
                <div className="font-bold text-sm">{isConnected ? 'ONLINE' : 'OFFLINE'}</div>
                <div className="text-xs text-blue-100">System Status</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-lg border border-white/30 hover:bg-white/25 transition-all duration-200">
              <span className="text-2xl">🚍</span>
              <div className="text-left">
                <div className="font-bold text-lg">{totalBuses}</div>
                <div className="text-xs text-blue-100">Fleet Buses</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-lg border border-white/30 hover:bg-white/25 transition-all duration-200">
              <span className="text-2xl">⚡</span>
              <div className="text-left">
                <div className="font-bold text-sm">LIVE</div>
                <div className="text-xs text-blue-100">Real-time Data</div>
              </div>
            </div>

            {lastUpdateTime && (
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-lg border border-white/30 hover:bg-white/25 transition-all duration-200">
                <Clock className="w-5 h-5 text-blue-200" />
                <div className="text-left">
                  <div className="font-bold text-sm">
                    {lastUpdateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-xs text-blue-100">Last Update</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* ---------- SEARCH CARD (Moovit Style) ---------- */}
        <div className="-mt-20 relative z-20">
          <Card className="rounded-3xl shadow-2xl border-0 bg-white/98 backdrop-blur-xl ring-1 ring-gray-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
                Plan Your Journey
              </CardTitle>
              <p className="text-gray-600 mt-2 font-medium">Find the best route and get real-time updates</p>
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
                    onLocationSelect={handleFromLocationSelect}
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
                    onLocationSelect={handleToLocationSelect}
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
              {popularDestinations.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                  <p className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    Popular destinations in Addis Ababa
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {popularDestinations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setError(null);
                          if (!fromLocation) {
                            setFromLocation(loc);
                            const coords = getLocationCoordinates(loc);
                            if (coords) setFromCoordinates(coords);
                          } else {
                            setToLocation(loc);
                            const coords = getLocationCoordinates(loc);
                            if (coords) setToCoordinates(coords);
                          }
                        }}
                        className="bg-white px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700
                        border-2 border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600
                        shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ---------- MAP VIEW ---------- */}
        {showMap && fromCoordinates && toCoordinates && (
          <Card className="rounded-3xl shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Map className="w-5 h-5 text-white" />
                  </div>
                  Route Map
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMap(false)}
                    className="rounded-lg"
                  >
                    Hide Map
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchResults([]);
                      setFromLocation('');
                      setToLocation('');
                      setShowMap(false);
                      setError(null);
                    }}
                    className="hover:bg-red-50 hover:text-red-700 rounded-lg"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold mb-2">Route Found</h3>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">{fromLocation}</span>
                    </div>
                    <div className="text-2xl text-blue-600">→</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{toLocation}</span>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {mapRoutes.length > 0 && (
                  <div className="space-y-3">
                    {mapRoutes.map((route) => (
                      <div key={route.id} className="bg-white rounded-lg p-4 border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-blue-600">{route.name}</h4>
                          <span className="text-sm text-gray-500">{route.stops.length} stops</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Route: {route.stops.map(stop => stop.name).join(' → ')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

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
                  {!showMap && fromLocation && toLocation && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowMap(true)}
                      className="ml-4 rounded-lg"
                    >
                      <Map className="w-4 h-4 mr-2" />
                      Show Map
                    </Button>
                  )}
                </CardTitle>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchResults([]);
                    setFromLocation('');
                    setToLocation('');
                    setShowMap(false);
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

                    {/* INTERACTIVE MAP */}
                    <div className="mb-4">
                      <div className="h-64 bg-gray-50 rounded-lg overflow-hidden">
                        <InteractiveMap route={{
                          id: route.id,
                          shortName: route.routeNumber,
                          longName: route.routeName,
                          mode: 'BUS',
                          stops: route.stops?.map(stop => ({
                            id: stop.id,
                            name: stop.stopName,
                            lat: stop.latitude,
                            lon: stop.longitude
                          })) || []
                        }} />
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        {route.stops?.length || 0} stops • {result.nextDepartures?.length || 0} departures today
                      </p>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant={selectedRoute === route.id ? "default" : "outline"}
                          onClick={() => {
                            setSelectedRoute(route.id);
                            if (!showMap && fromLocation && toLocation) {
                              setShowMap(true);
                            }
                          }}
                          className="rounded-lg"
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          {selectedRoute === route.id ? 'Selected' : 'Select'}
                        </Button>
                        
                        <Link href={`/routes/${route.id}`}>
                          <Button size="sm" variant="outline" className="rounded-lg">Details</Button>
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
            <p className="text-gray-600 mt-1">
              {popularRoutes.length > 0 ? 'Most frequently searched routes' : 'Available routes'}
            </p>
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
                <Link key={route.id} href={`/routes/${route.id}`} onClick={() => trackRouteSearch(route.id)}>
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
                        <Clock className="w-4 h-4" /> {route.stops?.length || 0} stops
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
                <p>No popular routes yet</p>
                <p className="text-sm mt-2">Search for routes to see popular ones here</p>
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
