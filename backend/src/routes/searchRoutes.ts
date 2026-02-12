import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// GET /api/search/suggest?q={query}&limit={limit}
router.get('/suggest', async (req: Request, res: Response) => {
  try {
    const { q: query, limit = 5 } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // For now, read from info.json directly
    const infoPath = path.join(__dirname, '../../../asset/info.json');
    const infoData = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
    
    const allStops = new Map();
    infoData.forEach((route: any) => {
      route.stops.forEach((stop: any) => {
        if (!allStops.has(stop.id)) {
          allStops.set(stop.id, {
            id: stop.id,
            name: stop.name,
            latitude: stop.lat,
            longitude: stop.lon,
            type: stop.is_terminal ? 'TERMINAL' : 'BUS_STOP',
          });
        }
      });
    });

    // Filter stops based on query
    const filteredStops = Array.from(allStops.values())
      .filter(stop => 
        stop.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, Number(limit));

    res.json({ stops: filteredStops });
  } catch (error) {
    console.error('Error in suggest endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/search/routes
router.post('/routes', async (req: Request, res: Response) => {
  try {
    const { fromStopId, toStopId, includePartial = true } = req.body;

    if (!fromStopId || !toStopId) {
      return res.status(400).json({ error: 'Both fromStopId and toStopId are required' });
    }

    // For now, read from info.json directly
    const infoPath = path.join(__dirname, '../../../asset/info.json');
    const infoData = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
    
    const results = [];

    for (const route of infoData) {
      const fromStop = route.stops.find((s: any) => s.id === fromStopId);
      const toStop = route.stops.find((s: any) => s.id === toStopId);

      if (fromStop && toStop && fromStop.sequence < toStop.sequence) {
        // Get intermediate stops
        const intermediateStops = route.stops
          .filter((s: any) => s.sequence > fromStop.sequence && s.sequence < toStop.sequence)
          .map((s: any) => ({
            id: s.id,
            name: s.name,
            latitude: s.lat,
            longitude: s.lon,
            order: s.sequence,
          }));

        // Calculate total distance and time
        const totalDistance = route.stops.reduce((sum: number, stop: any) => 
          sum + (stop.distance_from_previous || 0), 0);
        const estimatedTime = toStop.timeFromStart - fromStop.timeFromStart || 30;

        results.push({
          routeId: route.id,
          routeName: route.longName,
          routeNumber: route.shortName,
          fromStop: {
            id: fromStopId,
            name: fromStop.name,
            latitude: fromStop.lat,
            longitude: fromStop.lon,
          },
          toStop: {
            id: toStopId,
            name: toStop.name,
            latitude: toStop.lat,
            longitude: toStop.lon,
          },
          intermediateStops,
          activeBuses: [], // Will be empty until we have real-time data
          nextDepartures: [],
          walkingDistance: {
            fromStart: 500,
            toDestination: 500,
          },
          estimatedTime,
          fare: 15, // Default fare
        });
      }
    }

    if (results.length === 0) {
      return res.json({
        routes: [],
        noResultsReason: 'No routes found between these stops. Please try different locations.',
      });
    }

    res.json({ routes: results });
  } catch (error) {
    console.error('Error in routes search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/search/availability?routeId={routeId}
router.get('/availability', async (req: Request, res: Response) => {
  try {
    const { routeId } = req.query;

    if (!routeId || typeof routeId !== 'string') {
      return res.status(400).json({ error: 'Route ID is required' });
    }

    // For now, return inactive since we don't have real-time data
    res.json({
      isActive: false,
      activeBuses: [],
      nextDepartures: [],
    });
  } catch (error) {
    console.error('Error in availability check:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as searchRoutes };
