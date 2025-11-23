'use client';

import { useState, useEffect } from 'react';
import InteractiveMap from '@/components/InteractiveMap';
import { generateSampleRoute, generateMockBuses, BusPosition } from '@/lib/mockBusData';
import { Route, Stop } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Play, Pause } from 'lucide-react';

export default function MapDemoPage() {
  const [route] = useState<Route>(generateSampleRoute());
  const [buses, setBuses] = useState<BusPosition[]>([]);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [selectedBus, setSelectedBus] = useState<BusPosition | null>(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(true);

  useEffect(() => {
    setBuses(generateMockBuses(route, 4));
  }, [route]);

  const refreshBuses = () => {
    setBuses(generateMockBuses(route, 4));
    setSelectedBus(null);
  };

  const toggleSimulation = () => {
    setIsSimulationRunning(!isSimulationRunning);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Interactive Bus Route Map Demo
          </h1>
          <p className="text-gray-600">
            Real-time bus tracking simulation for Ethiopian Public Bus Transport System
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={refreshBuses} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Buses
          </Button>
          <Button 
            onClick={toggleSimulation} 
            variant={isSimulationRunning ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {isSimulationRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isSimulationRunning ? 'Pause' : 'Start'} Simulation
          </Button>
        </div>

        <InteractiveMap
          route={route}
          activeBuses={buses}
          onStopSelect={setSelectedStop}
          onBusSelect={setSelectedBus}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Stop Information</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStop ? (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedStop.stopName}</h3>
                    <p className="text-gray-600">{selectedStop.stopNameAmharic}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Stop Order:</span>
                      <p className="font-medium">{selectedStop.stopOrder}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Next Bus:</span>
                      <p className="font-medium">{selectedStop.estimatedArrivalTime}</p>
                    </div>
                  </div>
                  {selectedStop.landmarks && (
                    <div>
                      <span className="text-gray-500 text-sm">Nearby Landmarks:</span>
                      <ul className="mt-1 text-sm">
                        {selectedStop.landmarks.map((landmark, index) => (
                          <li key={index} className="text-gray-700">• {landmark}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Click on a bus stop to see details</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bus Information</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedBus ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedBus.busNumber}</h3>
                      <p className="text-gray-600">{selectedBus.busType} Bus</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedBus.status === 'ON_ROUTE' ? 'bg-green-100 text-green-800' :
                      selectedBus.status === 'DELAYED' ? 'bg-yellow-100 text-yellow-800' :
                      selectedBus.status === 'BOARDING' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedBus.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Occupancy:</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedBus.occupancy > 90 ? 'bg-red-500' :
                              selectedBus.occupancy > 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${selectedBus.occupancy}%` }}
                          />
                        </div>
                        <span className="font-medium">{Math.round(selectedBus.occupancy)}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Speed:</span>
                      <p className="font-medium">{Math.round(selectedBus.speed)} km/h</p>
                    </div>
                  </div>
                  
                  {selectedBus.delay > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                      <span className="text-yellow-800 text-sm font-medium">
                        Delayed by {Math.round(selectedBus.delay)} minutes
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Click on a bus to see details</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}