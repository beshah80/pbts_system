import { Router } from 'express';
import { createBus, deleteBus, listBuses, updateBus, updateBusLocation, getBusLocations } from '../controllers/busesController';
import { authenticateToken } from '../middleware/authenticateToken';

export const busesRoutes = Router();

busesRoutes.get('/buses', authenticateToken, listBuses);
busesRoutes.post('/buses', authenticateToken, createBus);
busesRoutes.put('/buses', authenticateToken, updateBus);
busesRoutes.delete('/buses', authenticateToken, deleteBus);

// GPS Location Routes
busesRoutes.post('/gps/location', updateBusLocation); // Public for now (driver app needs fix)
busesRoutes.get('/buses/locations', getBusLocations); // Public for map
