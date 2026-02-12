import type { Request, Response } from 'express';
import { prisma } from '../db/prisma';

function presentSchedule(schedule: any) {
  const departureTime = new Date(schedule.departureTime);
  const arrivalTime = schedule.arrivalTime ? new Date(schedule.arrivalTime) : null;

  return {
    id: schedule.id,
    routeId: schedule.routeStaticId,
    busId: schedule.busId,
    driverId: schedule.driverId,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime ? arrivalTime.toISOString() : '',
    date: departureTime.toISOString().split('T')[0],
    status: schedule.status,
    createdAt: new Date(schedule.createdAt).toISOString(),
    updatedAt: new Date(schedule.updatedAt).toISOString(),
  };
}

export async function listSchedules(_req: Request, res: Response) {
  try {
    const schedules = await prisma.schedule.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(schedules.map(presentSchedule));
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function createSchedule(req: Request, res: Response) {
  try {
    const body = req.body as any;

    const routeStaticId = body.routeStaticId ?? body.routeId;
    const busId = body.busId;
    const driverId = body.driverId;
    const departureTime = body.departureTime;

    if (!routeStaticId || !busId || !driverId || !departureTime) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const created = await prisma.schedule.create({
      data: {
        routeStaticId,
        busId,
        driverId,
        departureTime: new Date(departureTime),
        arrivalTime: body.arrivalTime ? new Date(body.arrivalTime) : undefined,
        status: body.status ?? 'SCHEDULED',
      },
    });

    res.status(201).json(presentSchedule(created));
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function updateSchedule(req: Request, res: Response) {
  try {
    const body = req.body as any;
    const id = String(body.id ?? '');
    if (!id) {
      res.status(400).json({ error: 'Missing id' });
      return;
    }

    const routeStaticId = body.routeStaticId ?? body.routeId;

    const updated = await prisma.schedule.update({
      where: { id },
      data: {
        routeStaticId,
        busId: body.busId,
        driverId: body.driverId,
        departureTime: body.departureTime ? new Date(body.departureTime) : undefined,
        arrivalTime: body.arrivalTime ? new Date(body.arrivalTime) : undefined,
        status: body.status,
      },
    });

    res.json(presentSchedule(updated));
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function deleteSchedule(req: Request, res: Response) {
  try {
    const id = String(req.query.id ?? '');
    if (!id) {
      res.status(400).json({ error: 'Missing id' });
      return;
    }

    await prisma.schedule.delete({ where: { id } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}
