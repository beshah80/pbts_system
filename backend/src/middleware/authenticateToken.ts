import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

type AuthPayload = {
  id: string;
  name: string;
  role: 'ADMIN' | 'DRIVER';
  accountType: 'ADMIN' | 'DRIVER';
};

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthPayload;
    io?: import('socket.io').Server;
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, env.jwtSecret, (err: jwt.VerifyErrors | null, user: unknown) => {
    if (err || !user) {
      res.sendStatus(403);
      return;
    }

    req.user = user as AuthPayload;
    next();
  });
}
