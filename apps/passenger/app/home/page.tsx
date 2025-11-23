'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Clock, Star, ArrowRight, Wifi, WifiOff, AlertCircle, RefreshCw } from 'lucide-react';
import { usePassengerStore } from '@/lib/store';
import { searchRoutes, getPopularRoutes } from '@/lib/api';
import { Route, RouteSearchResult } from '@/types';
import { RealLocationData } from '@/lib/api';
import Link from 'next/link';
import { formatTime, getBusTypeColor } from '@/lib/utils';
import LocationSearch from '@/components/search/LocationSearch';
import BusStatusIndicator from '@/components/BusStatusIndicator';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';

export default function HomePage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [popularRoutes, setPopularRoutes] = useState<Route[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const { searchResults, isSearching, setSearchResults, setIsSearching, setSearchFilters } = usePassengerStore();
  const [isConnected, setIsConnected] = useState(true);
  const { updates, lastUpdateTime, getBusUpdate } = useRealTimeUpdates(searchResults);

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

  const handleRefresh = () => {
    if (fromLocation || toLocation) {
      handleSearch();
    } else {
      loadPopularRoutes();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Moovit-style Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight">
              Ethiopian Bus System
            </h1>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Your smart companion for public transport in Addis Ababa
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-2xl">🚌</span>
                <span className="font-medium">{popularRoutes.length} Active Routes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-2xl">📍</span>
                <span className="font-medium">Addis Ababa Coverage</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                {isConnected ? (
                  <Wifi className="w-4 h-4 text-green-300" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-300" />
                )}
                <span className="font-medium">
                  {isConnected ? 'Live Tracking' : 'Offline Mode'}
                </span>
              </div>
              {lastUpdateTime && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">
                    Updated {lastUpdateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Moovit-style Search Section */}
        <div className="-mt-12 relative z-10">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
                Plan Your Journey
              </CardTitle>
              <p className="text-gray-600">Find the best route and get real-time updates</p>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  From
                </label>
                <LocationSearch
                  placeholder="Enter starting location (e.g., Meskel Square, መስቀል አደባባይ)"
                  value={fromLocation}
                  onChange={setFromLocation}
                  onLocationSelect={(location: RealLocationData) => {
                    setFromLocation(location.name);
                  }}
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  To
                </label>
                <LocationSearch
                  placeholder="Enter destination (e.g., Bole Airport, ቦሌ አየር ማረፊያ)"
                  value={toLocation}
                  onChange={setToLocation}
                  onLocationSelect={(location: RealLocationData) => {
                    setToLocation(location.name);
                  }}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="ghost"
                onClick={() => {
                  const temp = fromLocation;
                  setFromLocation(toLocation);
                  setToLocation(temp);
                }}
                className="sm:w-auto border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                disabled={!fromLocation && !toLocation}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Swap
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRefresh}
                className="sm:w-auto"
                disabled={isSearching || isLoadingPopular}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${(isSearching || isLoadingPopular) ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Button 
                onClick={handleSearch} 
                disabled={isSearching || (!fromLocation && !toLocation)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching Routes...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search Routes
                </>
              )}
              </Button>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium">Search Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setError(null)}
                  className="ml-auto"
                >
                  Dismiss
                </Button>
              </div>
            )}

            {/* Quick Search Suggestions */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">🔥 Popular destinations:</p>
              <div className="flex flex-wrap gap-2">
                {['Meskel Square', 'Bole Airport', 'Mercato', 'Piazza', 'Kazanchis', 'Arat Kilo'].map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setError(null);
                      if (!fromLocation) {
                        setFromLocation(location);
                      } else {
                        setToLocation(location);
                      }
                    }}
                    className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  Found {searchResults.length} Route{searchResults.length > 1 ? 's' : ''}
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
                  className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                >
                  Clear Results
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {searchResults.map((result, index) => (
                <div key={result.route.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                          #{index + 1}
                        </div>
                        <h3 className="font-bold text-xl text-gray-800">{result.route.routeName}</h3>
                      </div>
                      <p className="text-gray-600 mb-3">Route {result.route.routeNumber}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">{result.route.startLocation}</span>
                        </div>
                        <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">{result.route.endLocation}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl">
                        <p className="text-2xl font-bold">{result.route.farePrice}</p>
                        <p className="text-sm opacity-90">ETB</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{result.route.estimatedDuration} min journey</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>Distance: {result.route.distance} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>Next: {formatTime(result.nextDepartures[0]?.departureTime || '00:00')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Star className="w-4 h-4" />
                      <span>Arrives: {result.estimatedArrival}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-slate-700">Live Bus Status:</p>
                      {isConnected && (
                        <div className="flex items-center gap-1 text-green-600 text-xs">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Live Updates
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      {result.currentBuses.length > 0 ? (
                        result.currentBuses.map((bus, busIndex) => {
                          const busUpdate = getBusUpdate(result.route.id, bus.id);
                          return (
                            <BusStatusIndicator
                              key={`${result.route.id}-${bus.id}-${busIndex}`}
                              bus={bus}
                              delay={busUpdate?.delay}
                              occupancy={busUpdate?.occupancy}
                              nextStopETA={busUpdate?.nextStopETA}
                              lastUpdate={busUpdate?.lastUpdate}
                            />
                          );
                        })
                      ) : (
                        <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
                          <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm">No buses currently active on this route</p>
                          <p className="text-xs">Check back later for live updates</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-600">
                      {result.route.stops.length} stops • {result.nextDepartures.length} departures today
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
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Popular Routes */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
              Popular Routes in Addis Ababa
            </CardTitle>
            <p className="text-gray-600 mt-2">Most frequently used routes by passengers</p>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {isLoadingPopular ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600">Loading popular routes...</p>
                </div>
              </div>
            ) : error && popularRoutes.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
                <p className="text-gray-600 mb-4">Failed to load popular routes</p>
                <Button onClick={loadPopularRoutes} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            ) : popularRoutes.length > 0 ? (
              popularRoutes.map((route, index) => (
              <Link key={route.id} href={`/routes/${route.id}`}>
                <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 cursor-pointer transition-all duration-200 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-full"></div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{route.routeName}</h3>
                        <p className="text-gray-600">Route {route.routeNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        <span className="font-bold">{route.farePrice} ETB</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{route.estimatedDuration} min</p>
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
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {route.distance} km
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {route.stops.length} stops
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      route.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {route.isActive ? '🟢 Active' : '🔴 Inactive'}
                    </div>
                  </div>
                </div>
              </Link>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No popular routes available at the moment</p>
                <p className="text-sm mt-2">Routes will appear here as they become active</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/routes">
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">All Routes</h3>
                <p className="text-gray-600">Browse all available routes</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/feedback">
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Feedback</h3>
                <p className="text-gray-600">Share your experience</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/map">
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Interactive Map</h3>
                <p className="text-gray-600">View routes on map</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}