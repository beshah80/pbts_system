import { Router } from 'express';
import { createDriver, deleteDriver, listDrivers, updateDriver } from '../controllers/driversController';
import { authenticateToken } from '../middleware/authenticateToken';

export const driversRoutes = Router();

driversRoutes.get('/drivers', authenticateToken, listDrivers);
driversRoutes.post('/drivers', authenticateToken, createDriver);
driversRoutes.put('/drivers', authenticateToken, updateDriver);
driversRoutes.delete('/drivers', authenticateToken, deleteDriver);
