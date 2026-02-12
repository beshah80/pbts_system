import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { busesRoutes } from './busesRoutes';
import { driversRoutes } from './driversRoutes';
import { feedbackRoutes } from './feedbackRoutes';
import { healthRoutes } from './healthRoutes';
import { routesRoutes } from './routesRoutes';
import { schedulesRoutes } from './schedulesRoutes';
import { searchRoutes } from './searchRoutes';

export const apiRoutes = Router();

apiRoutes.use('/', healthRoutes);
apiRoutes.use('/', authRoutes);
apiRoutes.use('/', routesRoutes);
apiRoutes.use('/', feedbackRoutes);
apiRoutes.use('/', busesRoutes);
apiRoutes.use('/', driversRoutes);
apiRoutes.use('/', schedulesRoutes);
apiRoutes.use('/search', searchRoutes);
