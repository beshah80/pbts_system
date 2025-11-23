'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock } from 'lucide-react';
import { Stop } from '@/types';

interface StopListProps {
  stops: Stop[];
  title?: string;
  showEstimatedTimes?: boolean;
}

export default function StopList({ stops, title = "Bus Stops", showEstimatedTimes = false }: StopListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {title} ({stops.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stops.map((stop, index) => (
            <div key={stop.id} className="flex items-start gap-4 p-3 border rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold flex-shrink-0">
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium truncate">{stop.stopName}</h4>
                  {showEstimatedTimes && stop.estimatedArrivalTime && (
                    <div className="flex items-center gap-1 text-sm text-slate-600 ml-2">
                      <Clock className="w-3 h-3" />
                      {stop.estimatedArrivalTime}
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-slate-600 mb-2">{stop.stopNameAmharic}</p>
                
                {stop.landmarks && stop.landmarks.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {stop.landmarks.map((landmark, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {landmark}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="text-xs text-slate-500">
                  Coordinates: {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}