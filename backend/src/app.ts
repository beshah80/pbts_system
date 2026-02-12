import cors from 'cors';
import express from 'express';
import type { Server as SocketIOServer } from 'socket.io';
import { apiRoutes } from './routes';
import { env } from './config/env';

export function createApp(io: SocketIOServer) {
  const app = express();

  app.use(
    cors({
      origin: env.corsOrigins,
      methods: ['GET', 'POST'],
    })
  );
  app.use(express.json());

  app.use((req, _res, next) => {
    req.io = io;
    next();
  });

  app.use('/api', apiRoutes);

  return app;
}
