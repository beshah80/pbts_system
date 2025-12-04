'use client';
import { useEffect, useRef } from 'react';

interface Stop {
  lon: number;
  lat: number;
  name: string;
  id: string;
}

interface Route {
  id: string;
  shortName: string;
  longName: string;
  stops: Stop[];
  mode: string;
}

interface InteractiveMapProps {
  route: Route;
}

export default function InteractiveMap({ route }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const mapId = `map-${route.id.replace(/[^a-zA-Z0-9]/g, '-')}`;

  useEffect(() => {
    if (!mapRef.current || !route.stops.length) return;

    const loadMap = async () => {
      const L = (await import('leaflet')).default;
      
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          // Ignore cleanup errors
        }
        mapInstanceRef.current = null;
      }

      if (mapRef.current) {
        mapRef.current.innerHTML = '';
        mapRef.current._leaflet_id = null;
      }

      // Wait for container to be ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!mapRef.current) return;

      const firstStop = route.stops[0];
      const map = L.map(mapRef.current).setView([firstStop.lat, firstStop.lon], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(map);

      const routeCoords = route.stops.map(stop => [stop.lat, stop.lon]);
      
      L.polyline(routeCoords, {
        color: '#3B82F6',
        weight: 5,
        opacity: 0.9
      }).addTo(map).bindPopup(`
        <div style="padding: 12px; min-width: 200px;">
          <h3 style="font-weight: bold; color: #3B82F6; margin: 0 0 8px 0; font-size: 16px;">${route.shortName}</h3>
          <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 1.4;">${route.longName}</p>
          <p style="margin: 0; font-size: 12px; color: #666;">${route.stops.length} stops • ${route.mode}</p>
        </div>
      `);

      route.stops.forEach((stop, index) => {
        const isFirst = index === 0;
        const isLast = index === route.stops.length - 1;
        
        let color = '#3B82F6';
        let size = 8;
        if (isFirst) { color = '#10B981'; size = 12; }
        if (isLast) { color = '#EF4444'; size = 12; }
        
        const marker = L.circleMarker([stop.lat, stop.lon], {
          radius: size,
          fillColor: color,
          color: '#fff',
          weight: 3,
          opacity: 1,
          fillOpacity: 1
        }).addTo(map);

        // Add permanent labels for start/end stops
        if (isFirst || isLast) {
          L.marker([stop.lat, stop.lon], {
            icon: L.divIcon({
              html: `<div style="background: ${color}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${stop.name}</div>`,
              className: 'custom-label',
              iconSize: [0, 0],
              iconAnchor: [0, -20]
            })
          }).addTo(map);
        }

        marker.bindPopup(`
          <div style="padding: 12px; min-width: 180px;">
            <h4 style="font-weight: 600; margin: 0 0 8px 0; font-size: 15px;">${stop.name}</h4>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Stop ${index + 1} of ${route.stops.length}</p>
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #888;">Lat: ${stop.lat.toFixed(6)}, Lon: ${stop.lon.toFixed(6)}</p>
            ${isFirst ? '<span style="font-size: 11px; background: #D1FAE5; color: #065F46; padding: 4px 8px; border-radius: 6px; font-weight: 500;">🚌 START</span>' : ''}
            ${isLast ? '<span style="font-size: 11px; background: #FEE2E2; color: #991B1B; padding: 4px 8px; border-radius: 6px; font-weight: 500;">🏁 END</span>' : ''}
          </div>
        `);
      });

      map.fitBounds(routeCoords, { padding: [30, 30] });
      
      // Ensure map renders properly
      setTimeout(() => {
        if (map) {
          map.invalidateSize();
          map.fitBounds(routeCoords, { padding: [30, 30] });
        }
      }, 200);
      
      mapInstanceRef.current = map;
    };

    loadMap();

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          // Ignore cleanup errors
        }
        mapInstanceRef.current = null;
      }
    };
  }, [route.id]);

  return (
    <div 
      ref={mapRef} 
      id={mapId}
      className="w-full h-full rounded-lg border border-gray-200"
      style={{ minHeight: '300px', background: '#f8fafc' }}
    />
  );
}