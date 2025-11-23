import { useState, useEffect, useCallback } from 'react';
import { RouteSearchResult, Bus } from '@/types';

interface RealTimeUpdate {
  routeId: string;
  busId: string;
  position: {
    latitude: number;
    longitude: number;
  };
  status: Bus['status'];
  delay: number;
  occupancy: number;
  nextStopETA: string;
  lastUpdate: number;
}

export function useRealTimeUpdates(searchResults: RouteSearchResult[]) {
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  const generateMockUpdate = useCallback((routeId: string, busId: string): RealTimeUpdate => {
    const statuses: Bus['status'][] = ['ON_ROUTE', 'DELAYED', 'UNDER_MAINTENANCE'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Generate realistic coordinates around Addis Ababa
    const baseLatitude = 9.0084;
    const baseLongitude = 38.7648;
    const offset = 0.05; // ~5km radius
    
    return {
      routeId,
      busId,
      position: {
        latitude: baseLatitude + (Math.random() - 0.5) * offset,
        longitude: baseLongitude + (Math.random() - 0.5) * offset,
      },
      status: randomStatus,
      delay: randomStatus === 'DELAYED' ? Math.floor(Math.random() * 15) + 1 : 0,
      occupancy: Math.floor(Math.random() * 80) + 20, // 20-100%
      nextStopETA: new Date(Date.now() + Math.random() * 20 * 60000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      lastUpdate: Date.now()
    };
  }, []);

  const startRealTimeUpdates = useCallback(() => {
    if (searchResults.length === 0) return;

    setIsConnected(true);
    
    // Initial updates
    const initialUpdates: RealTimeUpdate[] = [];
    searchResults.forEach(result => {
      result.currentBuses.forEach(bus => {
        initialUpdates.push(generateMockUpdate(result.route.id, bus.id));
      });
    });
    setUpdates(initialUpdates);
    setLastUpdateTime(new Date());

    // Set up periodic updates every 30 seconds
    const interval = setInterval(() => {
      const newUpdates: RealTimeUpdate[] = [];
      searchResults.forEach(result => {
        result.currentBuses.forEach(bus => {
          newUpdates.push(generateMockUpdate(result.route.id, bus.id));
        });
      });
      setUpdates(newUpdates);
      setLastUpdateTime(new Date());
    }, 30000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [searchResults, generateMockUpdate]);

  useEffect(() => {
    if (searchResults.length > 0) {
      const cleanup = startRealTimeUpdates();
      return cleanup;
    }
  }, [searchResults.length, startRealTimeUpdates]);

  const getBusUpdate = (routeId: string, busId: string) => {
    return updates.find(update => update.routeId === routeId && update.busId === busId);
  };

  const getRouteUpdates = (routeId: string) => {
    return updates.filter(update => update.routeId === routeId);
  };

  return {
    updates,
    isConnected,
    lastUpdateTime,
    getBusUpdate,
    getRouteUpdates,
    startRealTimeUpdates
  };
}