'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, Search, X, Navigation } from 'lucide-react';
import { searchLocations, AddisLocation, ADDIS_LOCATIONS } from '@/lib/addisMapData';
import { trackDestinationSearch } from '@/lib/searchTracker';

interface LocationSearchProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onLocationSelect?: (location: AddisLocation) => void;
}

export default function LocationSearch({ 
  placeholder, 
  value, 
  onChange, 
  onLocationSelect 
}: LocationSearchProps) {
  const [suggestions, setSuggestions] = useState<AddisLocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation(position),
        (error) => console.log('Location access denied:', error)
      );
    }
  }, []);

  useEffect(() => {
    const searchSuggestions = () => {
      if (value.length < 1) {
        // Get locations from JSON data
        fetch('/routes_with_stops.json')
          .then(res => res.json())
          .then(routes => {
            const allStops = new Map();
            routes.forEach((route: any) => {
              route.stops?.forEach((stop: any) => {
                if (!allStops.has(stop.name)) {
                  allStops.set(stop.name, {
                    id: stop.id,
                    name: stop.name,
                    coordinates: [stop.lon, stop.lat],
                    type: 'bus_stop'
                  });
                }
              });
            });
            const popularLocations = Array.from(allStops.values()).slice(0, 6);
            setSuggestions(popularLocations);
            setShowSuggestions(true);
          })
          .catch(() => {
            const popularLocations = ADDIS_LOCATIONS.slice(0, 6);
            setSuggestions(popularLocations);
            setShowSuggestions(true);
          });
        return;
      }

      if (value.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      // Search in JSON data first
      fetch('/routes_with_stops.json')
        .then(res => res.json())
        .then(routes => {
          const allStops = new Map();
          routes.forEach((route: any) => {
            route.stops?.forEach((stop: any) => {
              if (stop.name.toLowerCase().includes(value.toLowerCase()) && !allStops.has(stop.name)) {
                allStops.set(stop.name, {
                  id: stop.id,
                  name: stop.name,
                  coordinates: [stop.lon, stop.lat],
                  type: 'bus_stop'
                });
              }
            });
          });
          const jsonResults = Array.from(allStops.values()).slice(0, 8);
          
          // Fallback to existing search if no JSON results
          if (jsonResults.length === 0) {
            const fallbackResults = searchLocations(value);
            setSuggestions(fallbackResults);
            setShowSuggestions(fallbackResults.length > 0);
          } else {
            setSuggestions(jsonResults);
            setShowSuggestions(true);
          }
        })
        .catch(() => {
          // Fallback to existing search
          const results = searchLocations(value);
          setSuggestions(results);
          setShowSuggestions(results.length > 0);
        })
        .finally(() => setLoading(false))
    };

    const debounceTimer = setTimeout(searchSuggestions, 200);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        target &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (location: AddisLocation) => {
    setShowSuggestions(false);
    onChange(location.name);
    trackDestinationSearch(location.name);
    onLocationSelect?.(location);
  };
  
  const handleCurrentLocation = () => {
    if (userLocation) {
      const currentLoc: AddisLocation = {
        id: 'current_location',
        name: 'Current Location',
        localizedNames: { am: 'የአሁኑ አካባቢ', en: 'Current Location' },
        coordinates: [userLocation.coords.longitude, userLocation.coords.latitude],
        type: 'current'
      };
      handleSuggestionClick(currentLoc);
    } else {
      // Request location permission
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation(position);
            const currentLoc: AddisLocation = {
              id: 'current_location',
              name: 'Current Location',
              localizedNames: { am: 'የአሁኑ አካባቢ', en: 'Current Location' },
              coordinates: [position.coords.longitude, position.coords.latitude],
              type: 'current'
            };
            handleSuggestionClick(currentLoc);
          },
          (error) => {
            console.error('Error getting location:', error);
            alert('Unable to get your current location. Please enable location services.');
          }
        );
      }
    }
  };

  const clearInput = () => {
    setShowSuggestions(false);
    setSuggestions([]);
    onChange('');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0 || value.length < 2) {
              setShowSuggestions(true);
            }
          }}
          className="pl-10 pr-20"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {userLocation && (
            <button
              onClick={handleCurrentLocation}
              className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
              title="Use current location"
            >
              <Navigation className="w-4 h-4" />
            </button>
          )}
          {value && (
            <button
              onClick={clearInput}
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-gray-50 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {loading && (
            <div className="p-1">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          {value.length < 2 && (
            <div className="px-4 py-2 text-xs text-gray-500 border-b border-slate-100">
              Popular locations in Addis Ababa
            </div>
          )}
          {suggestions.map((location, index) => (
            <button
              key={`${location.id}-${location.name}`}
              onClick={() => handleSuggestionClick(location)}
              className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 focus:outline-none focus:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {location.type === 'current' ? (
                    <Navigation className="w-4 h-4 text-blue-500" />
                  ) : (
                    <MapPin className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-900 truncate flex items-center gap-2">
                    {location.name}
                    {index === 0 && value.length >= 2 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Best match
                      </span>
                    )}
                  </div>
                  {location.localizedNames?.am && location.localizedNames.am !== location.name && (
                    <div className="text-sm text-slate-600 truncate">
                      {location.localizedNames.am}
                    </div>
                  )}
                  {location.address && (
                    <div className="text-xs text-slate-500 truncate">
                      {location.address}
                    </div>
                  )}
                  {location.type && location.type !== 'current' && (
                    <div className="text-xs text-blue-600 mt-1 capitalize">
                      {location.type.replace('amenity:', '').replace('_', ' ')}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}