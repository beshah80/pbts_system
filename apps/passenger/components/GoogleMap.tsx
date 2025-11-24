'use client';

import { useEffect, useRef } from 'react';

import type { Route, Stop } from '@/types';
import type { BusPosition } from '@/lib/mockBusData';
import { Dispatch, SetStateAction } from 'react';

interface GoogleMapProps {
  route: Route;
  activeBuses: BusPosition[];
  onStopSelect: Dispatch<SetStateAction<Stop | null>>;
  onBusSelect: Dispatch<SetStateAction<BusPosition | null>>;
  apiKey: string;
}

declare global {
  interface Window {
    L: any;
  }
}

export default function GoogleMap({ route, activeBuses, onStopSelect, onBusSelect, apiKey }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const routeLayerRef = useRef<any>(null);

  useEffect(() => {
    const loadLeaflet = () => {
      if (window.L) {
        initializeMap();
        return;
      }

      // Load Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.L) return;

      // Addis Ababa coordinates
      mapInstance.current = window.L.map(mapRef.current).setView([9.0320, 38.7469], 12);

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      // Add Ethiopian landmarks
      const landmarks = [
        { position: [9.0120, 38.7634], title: 'Meskel Square መስቀል አደባባይ', icon: '🏛️' },
        { position: [8.9844, 38.7967], title: 'Bole Airport ቦሌ አየር ማረፊያ', icon: '✈️' },
        { position: [9.0307, 38.7468], title: 'Mercato መርካቶ', icon: '🏪' },
        { position: [9.0420, 38.7469], title: 'Piazza ፒያሳ', icon: '🏢' },
        { position: [9.0250, 38.7600], title: 'Kazanchis ካዛንችስ', icon: '🏦' },
        { position: [9.0380, 38.7520], title: 'Arat Kilo አራት ኪሎ', icon: '🎓' }
      ];

      // Don't add landmarks initially, they'll be added when route is loaded
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    if (route && mapInstance.current && window.L) {
      // Clear previous markers and routes
      markersRef.current.forEach(marker => mapInstance.current.removeLayer(marker));
      markersRef.current = [];
      if (routeLayerRef.current) {
        mapInstance.current.removeLayer(routeLayerRef.current);
      }

      // Create route path from stops
      const routeCoords = route.stops.map(stop => [stop.latitude, stop.longitude]);

      if (routeCoords.length > 0) {
        routeLayerRef.current = window.L.polyline(routeCoords, {
          color: '#3B82F6',
          weight: 4,
          opacity: 0.8
        }).addTo(mapInstance.current);
      }

      // Add bus stops
      route.stops.forEach((stop) => {
        const stopMarker = window.L.marker([stop.latitude, stop.longitude])
          .addTo(mapInstance.current)
          .bindPopup(`<b>🚌 ${stop.stopName}</b><br/>${stop.stopNameAmharic || 'Bus Stop'}`)
          .on('click', () => onStopSelect(stop));
        markersRef.current.push(stopMarker);
      });

      // Add active buses
      activeBuses.forEach((bus) => {
        const busIcon = window.L.divIcon({
          html: `<div style="background: #10B981; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">🚌</div>`,
          className: 'custom-bus-icon',
          iconSize: [24, 24]
        });
        
        const busMarker = window.L.marker([bus.coordinates[1], bus.coordinates[0]], { icon: busIcon })
          .addTo(mapInstance.current)
          .bindPopup(`<b>🚌 ${bus.busNumber}</b><br/>${bus.busType} Bus<br/>Speed: ${bus.speed} km/h`)
          .on('click', () => onBusSelect(bus));
        markersRef.current.push(busMarker);
      });

      // Fit map to route if available
      if (routeLayerRef.current) {
        mapInstance.current.fitBounds(routeLayerRef.current.getBounds());
      }
    }
  }, [route, activeBuses, onStopSelect, onBusSelect]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    />
  );
}