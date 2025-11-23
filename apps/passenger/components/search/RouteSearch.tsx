'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { usePassengerStore } from '@/lib/store';
import { searchRoutes } from '@/lib/api';

export default function RouteSearch() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const { setSearchResults, setIsSearching, setSearchFilters } = usePassengerStore();

  const handleSearch = async () => {
    if (!fromLocation && !toLocation) return;
    
    setIsSearching(true);
    setSearchFilters({ fromLocation, toLocation });
    
    try {
      const results = await searchRoutes(fromLocation, toLocation);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Find Your Route
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              From
            </label>
            <Input
              placeholder="Enter starting location"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
            />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={swapLocations}
            className="mt-6"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              To
            </label>
            <Input
              placeholder="Enter destination"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          onClick={handleSearch} 
          className="w-full"
          disabled={!fromLocation && !toLocation}
        >
          <Search className="w-4 h-4 mr-2" />
          Search Routes
        </Button>
      </CardContent>
    </Card>
  );
}