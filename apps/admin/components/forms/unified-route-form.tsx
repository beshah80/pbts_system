'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function UnifiedRouteForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    mode: 'BUS',
    shortName: '',
    longName: '',
    stops: [{ name: '', lat: 0, lon: 0 }]
  });

  const addStop = () => {
    setFormData({
      ...formData,
      stops: [...formData.stops, { name: '', lat: 0, lon: 0 }]
    });
  };

  const updateStop = (index: number, field: string, value: any) => {
    const newStops = [...formData.stops];
    newStops[index] = { ...newStops[index], [field]: value };
    setFormData({ ...formData, stops: newStops });
  };

  const removeStop = (index: number) => {
    setFormData({
      ...formData,
      stops: formData.stops.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRoute = {
      mode: formData.mode,
      shortName: formData.shortName,
      id: `1:${Date.now()}`,
      longName: formData.longName,
      stops: formData.stops.map((stop, index) => ({
        lon: Number(stop.lon),
        code: null,
        name: stop.name,
        id: `1:node/${Date.now()}${index}`,
        lat: Number(stop.lat)
      }))
    };

    // For now, just log the route data
    console.log('New route to add:', newRoute);
    alert('Route added successfully! (Demo mode)');
    onClose();
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Route</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Mode</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="BUS">BUS</option>
                <option value="MINIBUS">MINIBUS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Short Name</label>
              <input
                type="text"
                required
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Tx LID 009"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Long Name</label>
            <input
              type="text"
              required
              value={formData.longName}
              onChange={(e) => setFormData({ ...formData, longName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Torhayloch → Megenagna (Minibus)"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Stops</h3>
              <Button type="button" onClick={addStop} variant="outline" size="sm">
                Add Stop
              </Button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {formData.stops.map((stop, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 p-2 border rounded">
                  <input
                    type="text"
                    placeholder="Stop name"
                    value={stop.name}
                    onChange={(e) => updateStop(index, 'name', e.target.value)}
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    step="0.000001"
                    placeholder="Latitude"
                    value={stop.lat}
                    onChange={(e) => updateStop(index, 'lat', e.target.value)}
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    step="0.000001"
                    placeholder="Longitude"
                    value={stop.lon}
                    onChange={(e) => updateStop(index, 'lon', e.target.value)}
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <Button
                    type="button"
                    onClick={() => removeStop(index)}
                    variant="outline"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">Add Route</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}