'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Bus,
  Wifi,
  WifiOff
} from 'lucide-react';

interface Stop {
  name: string;
  lat: number;
  lng: number;
}

interface Bus {
  id: number;
  busNumber: string;
  status: string;
  latitude?: number;
  longitude?: number;
}

interface Route {
  id: number;
  routeName: string;
  routeNumber: string;
  stops: Stop[];
  currentBuses: Bus[];
  isActive: boolean;
}

interface InteractiveMapProps {
  routes?: Route[];
  selectedRouteId?: number;
  onRouteSelect?: (routeId: number) => void;
  showBuses?: boolean;
  showStops?: boolean;
  className?: string;
}

export default function InteractiveMap({ 
  routes = [], 
  selectedRouteId, 
  onRouteSelect, 
  showBuses = true, 
  showStops = true,
  className = ""
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState({ lat: 9.0054, lng: 38.7636 });

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/routes', { 
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

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 1, 8));
  const handleResetView = () => {
    setCenter({ lat: 9.0054, lng: 38.7636 });
    setZoom(12);
  };

  const handleRouteClick = (routeId: number) => {
    if (onRouteSelect) onRouteSelect(routeId);
    const route = routes.find(r => r.id === routeId);
    if (route?.stops.length > 0) {
      setCenter({ lat: route.stops[0].lat, lng: route.stops[0].lng });
    }
  };

  const activeBuses = routes.flatMap(r => r.currentBuses?.filter(b => b.status === 'ACTIVE') || []);

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Interactive Route Map
          </CardTitle>
          <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
            isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isConnected ? 'Live' : 'Offline'}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="relative">
          <div 
            ref={mapRef}
            className="h-96 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden"
          >
            {/* Map Grid */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Routes */}
            {routes.map((route, routeIndex) => (
              <div key={route.id} className="absolute inset-0">
                <svg className="w-full h-full">
                  <path
                    d={`M ${50 + routeIndex * 60} 50 Q ${150 + routeIndex * 40} ${100 + routeIndex * 30} ${250 + routeIndex * 60} ${150 + routeIndex * 40}`}
                    stroke={selectedRouteId === route.id ? '#3b82f6' : '#94a3b8'}
                    strokeWidth={selectedRouteId === route.id ? '4' : '2'}
                    fill="none"
                    strokeDasharray={route.isActive ? 'none' : '5,5'}
                    className="transition-all duration-300"
                  />
                </svg>

                {showStops && route.stops?.map((stop, stopIndex) => (
                  <div
                    key={`${route.id}-${stopIndex}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{
                      left: `${20 + routeIndex * 15 + stopIndex * 25}%`,
                      top: `${30 + routeIndex * 10 + stopIndex * 15}%`
                    }}
                    title={stop.name}
                  >
                    <div className={`w-3 h-3 rounded-full border-2 border-white shadow-lg ${
                      selectedRouteId === route.id ? 'bg-blue-500' : 'bg-gray-400'
                    } group-hover:scale-125 transition-transform`} />
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {stop.name}
                    </div>
                  </div>
                ))}

                <div
                  className="absolute cursor-pointer"
                  style={{
                    left: `${30 + routeIndex * 20}%`,
                    top: `${20 + routeIndex * 15}%`
                  }}
                  onClick={() => handleRouteClick(route.id)}
                >
                  <div className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    selectedRouteId === route.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-blue-50'
                  } shadow-md`}>
                    {route.routeNumber}
                  </div>
                </div>
              </div>
            ))}

            {/* Active Buses */}
            {showBuses && activeBuses.map((bus, busIndex) => (
              <div
                key={bus.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{
                  left: `${40 + busIndex * 30}%`,
                  top: `${50 + busIndex * 20}%`
                }}
                title={`Bus ${bus.busNumber}`}
              >
                <div className="relative">
                  <Bus className="w-6 h-6 text-green-600 drop-shadow-lg" />
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-1 py-0.5 rounded">
                    {bus.busNumber}
                  </div>
                </div>
              </div>
            ))}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="sm" variant="outline" onClick={handleZoomIn} className="w-8 h-8 p-0 bg-white shadow-md">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleZoomOut} className="w-8 h-8 p-0 bg-white shadow-md">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleResetView} className="w-8 h-8 p-0 bg-white shadow-md">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}