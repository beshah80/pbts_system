import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma';
import { env } from '../config/env';

export async function login(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body as {
      email?: string;
      username?: string;
      password: string;
    };

    const loginField = email || username;
    if (!loginField || !password) {
      res.status(400).json({ error: 'Missing credentials' });
      return;
    }

    const admin = await prisma.admin.findFirst({
      where: {
        OR: [{ email: loginField }, { name: loginField }],
      },
    });

    let driver: any = null;
    if (!admin) {
      driver = await prisma.driver.findFirst({
        where: {
          OR: [{ email: loginField }, { employeeId: loginField }],
        },
      });
    }

    const account: any = admin || driver;
    if (!account || !bcrypt.compareSync(password, account.password)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      {
        id: account.id,
        name: admin ? account.name : `${account.firstName} ${account.lastName}`,
        role: admin ? 'ADMIN' : 'DRIVER',
        accountType: admin ? 'ADMIN' : 'DRIVER',
      },
      env.jwtSecret,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: account.id,
        name: admin ? account.name : `${account.firstName} ${account.lastName}`,
        role: admin ? 'ADMIN' : 'DRIVER',
        email: account.email,
        phone: driver ? driver.phoneNumber : null,
        accountType: admin ? 'ADMIN' : 'DRIVER',
      },
    });
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}
