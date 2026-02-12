import { Router } from 'express';
import { createSchedule, deleteSchedule, listSchedules, updateSchedule } from '../controllers/schedulesController';
import { authenticateToken } from '../middleware/authenticateToken';

export const schedulesRoutes = Router();

schedulesRoutes.get('/schedules', listSchedules);
schedulesRoutes.post('/schedules', authenticateToken, createSchedule);
schedulesRoutes.put('/schedules', authenticateToken, updateSchedule);
schedulesRoutes.delete('/schedules', authenticateToken, deleteSchedule);
