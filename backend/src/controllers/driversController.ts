import type { Request, Response } from 'express';
import { prisma } from '../db/prisma';

function presentDriver(driver: any) {
  return {
    id: driver.id,
    firstName: driver.firstName,
    lastName: driver.lastName,
    licenseNumber: driver.licenseNumber,
    phoneNumber: driver.phoneNumber,
    email: driver.email ?? undefined,
    address: driver.address,
    dateOfBirth: new Date(driver.dateOfBirth).toISOString(),
    hireDate: new Date(driver.hireDate).toISOString(),
    status: driver.status,
    experience: driver.experience ?? 0,
    rating: driver.rating ?? 0,
    totalTrips: driver.totalTrips ?? 0,
    currentBusId: driver.currentBusId ?? undefined,
    emergencyContact: {
      name: driver.emergencyName,
      phone: driver.emergencyPhone,
      relationship: driver.emergencyRelation,
    },
    createdAt: new Date(driver.createdAt).toISOString(),
    updatedAt: new Date(driver.updatedAt).toISOString(),
  };
}

export async function listDrivers(_req: Request, res: Response) {
  try {
    const drivers = await prisma.driver.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(drivers.map(presentDriver));
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function createDriver(req: Request, res: Response) {
  try {
    const body = req.body as any;

    const emergency = body.emergencyContact ?? {};

    const employeeId = body.employeeId;
    const password = body.password;

    if (!employeeId || !password) {
      res.status(400).json({ error: 'Missing employeeId or password' });
      return;
    }

    const created = await prisma.driver.create({
      data: {
        employeeId,
        firstName: body.firstName,
        lastName: body.lastName,
        licenseNumber: body.licenseNumber,
        phoneNumber: body.phoneNumber,
        email: body.email,
        password,
        address: body.address,
        dateOfBirth: new Date(body.dateOfBirth),
        hireDate: new Date(body.hireDate),
        status: body.status ?? 'ACTIVE',
        experience: body.experience ?? 0,
        rating: body.rating ?? 0,
        totalTrips: body.totalTrips ?? 0,
        emergencyName: emergency.name,
        emergencyPhone: emergency.phone,
        emergencyRelation: emergency.relationship,
        photoUrl: body.photoUrl,
      },
    });

    res.status(201).json(presentDriver(created));
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function updateDriver(req: Request, res: Response) {
  try {
    const id = String((req.body as any).id ?? '');
    if (!id) {
      res.status(400).json({ error: 'Missing id' });
      return;
    }

    const body = req.body as any;
    const emergency = body.emergencyContact;

    const updated = await prisma.driver.update({
      where: { id },
      data: {
        employeeId: body.employeeId,
        firstName: body.firstName,
        lastName: body.lastName,
        licenseNumber: body.licenseNumber,
        phoneNumber: body.phoneNumber,
        email: body.email,
        password: body.password,
        address: body.address,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
        hireDate: body.hireDate ? new Date(body.hireDate) : undefined,
        status: body.status,
        experience: body.experience,
        rating: body.rating,
        totalTrips: body.totalTrips,
        emergencyName: emergency?.name,
        emergencyPhone: emergency?.phone,
        emergencyRelation: emergency?.relationship,
        photoUrl: body.photoUrl,
      },
    });

    res.json(presentDriver(updated));
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function deleteDriver(req: Request, res: Response) {
  try {
    const id = String(req.query.id ?? '');
    if (!id) {
      res.status(400).json({ error: 'Missing id' });
      return;
    }

    await prisma.driver.delete({ where: { id } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}
