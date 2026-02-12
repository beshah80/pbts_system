import { Router } from 'express';
import { createFeedback, deleteFeedback, listFeedback } from '../controllers/feedbackController';
import { authenticateToken } from '../middleware/authenticateToken';

export const feedbackRoutes = Router();

feedbackRoutes.post('/feedback', createFeedback);
feedbackRoutes.get('/feedback', authenticateToken, listFeedback);
feedbackRoutes.delete('/feedback', authenticateToken, deleteFeedback);
