import { Router } from 'express';
import { getPopularRoutes, getRouteById, listRoutes, listStops, listTerminals, searchRoutes, trackRouteSearch } from '../controllers/routesController';

export const routesRoutes = Router();

routesRoutes.get('/routes', listRoutes);
routesRoutes.get('/routes/search', searchRoutes);
routesRoutes.get('/routes/popular', getPopularRoutes);
routesRoutes.post('/routes/:id/track', trackRouteSearch);
routesRoutes.get('/routes/:id', getRouteById);
routesRoutes.get('/stops', listStops);
routesRoutes.get('/terminals', listTerminals);
