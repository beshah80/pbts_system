import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { createApp } from './app';
import { env } from './config/env';
import { prisma } from './db/prisma';
import { loadRouteData } from './services/routeData';

loadRouteData();

const server = http.createServer();

const io = new SocketIOServer(server, {
  cors: {
    origin: env.corsOrigins,
    methods: ['GET', 'POST'],
  },
});

const app = createApp(io);
server.on('request', app);

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    return;
  });
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

server.listen(env.port, () => {
  return;
});
