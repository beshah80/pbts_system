import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { json } from 'body-parser';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { buildContext } from './middleware/context';

const PORT = process.env.PORT || 4000;

async function startServer() {
  const app = express();
  app.use(cors());

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(
    '/graphql',
    json(),
    expressMiddleware(server, {
      context: buildContext
    })
  );

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  httpServer.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
