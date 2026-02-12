import type { Request, Response } from 'express';
import { prisma } from '../db/prisma';

export async function createFeedback(req: Request, res: Response) {
  try {
    const body = req.body as any;
    const email = body.email ?? body.passengerEmail;
    const rating = Number(body.rating ?? 5);
    const category = body.category ?? 'OTHER';
    const message = String(body.message ?? '');
    const routeStaticId = body.routeStaticId ?? body.routeId;
    const stopStaticId = body.stopStaticId ?? body.stopId;

    if (!email || !message) {
      res.status(400).json({ error: 'Email and message are required' });
      return;
    }

    const created = await prisma.passengerFeedback.create({
      data: {
        email,
        rating: Number.isFinite(rating) ? rating : 5,
        category,
        message,
        routeStaticId,
        stopStaticId,
      },
    });

    res.status(201).json({ id: created.id, message: 'Feedback submitted successfully' });
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function listFeedback(_req: Request, res: Response) {
  try {
    const feedback = await prisma.passengerFeedback.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(
      feedback.map((f) => ({
        id: f.id,
        email: f.email,
        rating: f.rating,
        category: f.category,
        message: f.message,
        comment: f.message,
        contactInfo: `Email - ${f.email}`,
        status: f.status,
        priority: 'MEDIUM',
        routeId: f.routeStaticId ?? undefined,
        stopId: f.stopStaticId ?? undefined,
        createdAt: new Date(f.createdAt).toISOString(),
        updatedAt: new Date(f.updatedAt).toISOString(),
      }))
    );
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function deleteFeedback(req: Request, res: Response) {
  try {
    const ids = (req.body as any)?.ids as unknown;
    if (Array.isArray(ids) && ids.length > 0) {
      await prisma.passengerFeedback.deleteMany({
        where: { id: { in: ids.map((x) => String(x)) } },
      });
      res.json({ success: true });
      return;
    }

    await prisma.passengerFeedback.deleteMany({});
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}
