import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

export interface JwtPayload {
  id: string;
  role: UserRole;
}

export interface GraphQLContext {
  prisma: PrismaClient;
  user: JwtPayload | null;
  createToken: (payload: JwtPayload) => string;
}

export async function buildContext({ req }: { req: Request }): Promise<GraphQLContext> {
  const auth = req.headers.authorization;
  let user: JwtPayload | null = null;

  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.slice('Bearer '.length).trim();
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as JwtPayload;
      user = decoded;
    } catch {
      user = null;
    }
  }

  const createToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: '12h',
    });
  };

  return {
    prisma,
    user,
    createToken,
  };
}
