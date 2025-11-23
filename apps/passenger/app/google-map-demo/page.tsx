'use client';

import { useState, useEffect } from 'react';
import GoogleMap from '@/components/GoogleMap';
import { generateSampleRoute, generateMockBuses, BusPosition } from '@/lib/mockBusData';
import { Route, Stop } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Key, AlertCircle } from 'lucide-react';

export default function GoogleMapDemoPage() {
  const [route] = useState<Route>(generateSampleRoute());
  const [buses, setBuses] = useState<BusPosition[]>([]);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [selectedBus, setSelectedBus] = useState<BusPosition | null>(null);
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyDkjRxMmmiAocIMfYNP6sFkjW8apFysKWs');
  const [isApiKeyValid, setIsApiKeyValid] = useState(true);

  useEffect(() => {
    setBuses(generateMockBuses(route, 3));
  }, [route]);

  const validateApiKey = () => {
    if (apiKey.length > 30) {
      setIsApiKeyValid(true);
    } else {
      setIsApiKeyValid(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Google Maps Integration Demo
          </h1>
          <p className="text-gray-600">
            Real GPS tracking for Ethiopian Public Bus Transport System
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Google Maps API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Google Maps API Key
                </label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Enter your Google Maps API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={validateApiKey} variant="outline">
                    Validate
                  </Button>
                </div>
              </div>
              
              {!isApiKeyValid && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800 mb-1">API Key Required</p>
                      <p className="text-yellow-700 mb-2">
                        To use Google Maps, you need to:
                      </p>
                      <ol className="list-decimal list-inside text-yellow-700 space-y-1">
                        <li>Go to Google Cloud Console</li>
                        <li>Create a new project or select existing one</li>
                        <li>Enable Maps JavaScript API</li>
                        <li>Create an API key with proper restrictions</li>
                        <li>Add your domain to authorized referrers</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {isApiKeyValid && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">
                      API Key configured! Google Maps is ready to use.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {isApiKeyValid ? (
          <Card>
            <CardHeader>
              <CardTitle>Live GPS Tracking - {route.routeName}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <GoogleMap
                route={route}
                activeBuses={buses}
                onStopSelect={setSelectedStop}
                onBusSelect={setSelectedBus}
                apiKey={apiKey}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Google Maps Not Available
              </h3>
              <p className="text-gray-600">
                Please enter a valid Google Maps API key to view the interactive map
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Selected Stop</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStop ? (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedStop.stopName}</h3>
                    <p className="text-gray-600">{selectedStop.stopNameAmharic}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    GPS: {selectedStop.latitude.toFixed(6)}, {selectedStop.longitude.toFixed(6)}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Click on a bus stop marker to see details</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected Bus</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedBus ? (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedBus.busNumber}</h3>
                    <p className="text-gray-600">{selectedBus.busType} Bus</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    GPS: {selectedBus.coordinates[1].toFixed(6)}, {selectedBus.coordinates[0].toFixed(6)}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Click on a bus marker to see details</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}