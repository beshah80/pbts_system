'use client';

import { useEffect, useRef } from 'react';
import { useRoutePlanner } from '@/hooks/useRoutePlanner';

interface RoutePathMapProps {
  startCoords: [number, number];
  endCoords: [number, number];
  className?: string;
}

export default function RoutePathMap({ startCoords, endCoords, className = '' }: RoutePathMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { planRoute, route, isPlanning } = useRoutePlanner();

  useEffect(() => {
    if (startCoords && endCoords) {
      planRoute(startCoords, endCoords);
    }
  }, [startCoords, endCoords, planRoute]);

  useEffect(() => {
    if (route && route.coordinates && mapRef.current) {
      // Simple visualization of route path
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = 400;
        canvas.height = 300;
        
        // Clear canvas
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw route path
        if (route.coordinates.length > 1) {
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 3;
          ctx.beginPath();
          
          // Normalize coordinates to canvas size
          const minLat = Math.min(...route.coordinates.map(c => c[0]));
          const maxLat = Math.max(...route.coordinates.map(c => c[0]));
          const minLng = Math.min(...route.coordinates.map(c => c[1]));
          const maxLng = Math.max(...route.coordinates.map(c => c[1]));
          
          route.coordinates.forEach((coord, index) => {
            const x = ((coord[1] - minLng) / (maxLng - minLng)) * (canvas.width - 40) + 20;
            const y = ((maxLat - coord[0]) / (maxLat - minLat)) * (canvas.height - 40) + 20;
            
            if (index === 0) {
              ctx.moveTo(x, y);
              // Start point
              ctx.fillStyle = '#10b981';
              ctx.beginPath();
              ctx.arc(x, y, 6, 0, 2 * Math.PI);
              ctx.fill();
            } else {
              ctx.lineTo(x, y);
              if (index === route.coordinates.length - 1) {
                // End point
                ctx.stroke();
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, 2 * Math.PI);
                ctx.fill();
              }
            }
          });
          
          ctx.strokeStyle = '#3b82f6';
          ctx.stroke();
        }
        
        // Replace map content
        mapRef.current.innerHTML = '';
        mapRef.current.appendChild(canvas);
      }
    }
  }, [route]);

  return (
    <div className={`bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      {isPlanning ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Planning route...</span>
        </div>
      ) : (
        <div ref={mapRef} className="w-full h-64 flex items-center justify-center">
          {!route && (
            <div className="text-center text-gray-500">
              <p>Route visualization</p>
              <p className="text-sm">Using routing graph data</p>
            </div>
          )}
        </div>
      )}
      
      {route && (
        <div className="p-4 bg-white border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Distance:</span>
              <span className="ml-2">{route.distance.toFixed(2)} km</span>
            </div>
            <div>
              <span className="font-medium">Est. Time:</span>
              <span className="ml-2">{route.estimatedTime} min</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}