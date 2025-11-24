import { useState } from 'react';

interface RouteResult {
  path: string[];
  distance: number;
  coordinates: [number, number][];
  estimatedTime: number;
}

export function useRoutePlanner() {
  const [isPlanning, setIsPlanning] = useState(false);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const planRoute = async (startCoords: [number, number], endCoords: [number, number]) => {
    setIsPlanning(true);
    setError(null);
    
    try {
      // Validate coordinates
      if (!startCoords || !endCoords || startCoords.length !== 2 || endCoords.length !== 2) {
        throw new Error('Invalid coordinates provided');
      }

      const response = await fetch('/api/route-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startCoords, endCoords })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to plan route');
      }

      setRoute(data.route);
      return data.route;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Route planning failed';
      setError(errorMessage);
      console.error('Route planning error:', err);
      return null;
    } finally {
      setIsPlanning(false);
    }
  };

  const clearRoute = () => {
    setRoute(null);
    setError(null);
  };

  return {
    planRoute,
    clearRoute,
    route,
    isPlanning,
    error
  };
}