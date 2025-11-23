'use client';

import { useEffect, useRef } from 'react';

import type { Route } from '@/lib/api';

interface GoogleMapProps {
  selectedRoute?: Route | null;
  routes: Route[];
}

declare global {
  interface Window {
    L: any;
  }
}

export default function GoogleMap({ selectedRoute, routes }: GoogleMapProps) {
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

      landmarks.forEach(landmark => {
        const marker = window.L.marker(landmark.position)
          .addTo(mapInstance.current)
          .bindPopup(`<b>${landmark.icon} ${landmark.title}</b>`);
        markersRef.current.push(marker);
      });
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    if (selectedRoute && mapInstance.current && window.L) {
      // Clear previous route
      if (routeLayerRef.current) {
        mapInstance.current.removeLayer(routeLayerRef.current);
      }

      // Create route path
      const routeCoords = [
        [9.0120, 38.7634], // Start
        [9.0250, 38.7600], // Middle
        [8.9844, 38.7967]  // End
      ];

      routeLayerRef.current = window.L.polyline(routeCoords, {
        color: '#3B82F6',
        weight: 4,
        opacity: 0.8
      }).addTo(mapInstance.current);

      // Add bus stops
      selectedRoute.stops?.forEach((stop, index) => {
        const lat = stop.latitude || (9.0120 + (index * 0.01));
        const lng = stop.longitude || (38.7634 + (index * 0.01));
        
        const stopMarker = window.L.marker([lat, lng])
          .addTo(mapInstance.current)
          .bindPopup(`<b>🚌 ${stop.stopName}</b><br/>Bus Stop`);
        markersRef.current.push(stopMarker);
      });

      // Fit map to route
      mapInstance.current.fitBounds(routeLayerRef.current.getBounds());
    }
  }, [selectedRoute]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    />
  );
}