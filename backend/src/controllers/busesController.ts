import type { Request, Response } from 'express';
import { prisma } from '../db/prisma';

function normalizeBusInput(body: any) {
  const busType = body.busType ?? body.type;
  const currentRouteId = body.currentRouteId ?? body.routeId;

  return {
    plateNumber: body.plateNumber,
    busNumber: body.busNumber,
    fleetNumber: body.fleetNumber,
    busType,
    status: body.status,
    capacity: body.capacity,
    standingCapacity: body.standingCapacity,
    currentPassengers: body.currentPassengers,
    currentRouteId,
    driverId: body.driverId,
    lastMaintenance: body.lastMaintenance ? new Date(body.lastMaintenance) : undefined,
    nextMaintenance: body.nextMaintenance ? new Date(body.nextMaintenance) : undefined,
    mileage: body.mileage,
    fuelLevel: body.fuelLevel,
    gpsEnabled: body.gpsEnabled,
    manufacturer: body.manufacturer,
    modelYear: body.modelYear,
  };
}

function presentBus(bus: any) {
  return {
    id: bus.id,
    plateNumber: bus.plateNumber,
    busNumber: bus.busNumber,
    type: bus.busType,
    status: bus.status,
    capacity: bus.capacity,
    currentPassengers: bus.currentPassengers,
    driverId: bus.driverId ?? undefined,
    routeId: bus.currentRouteId ?? undefined,
    lastMaintenance: bus.lastMaintenance ? new Date(bus.lastMaintenance).toISOString() : '',
    nextMaintenance: bus.nextMaintenance ? new Date(bus.nextMaintenance).toISOString() : '',
    mileage: bus.mileage ?? 0,
    fuelLevel: bus.fuelLevel ?? 0,
    gpsEnabled: Boolean(bus.gpsEnabled),
    createdAt: new Date(bus.createdAt).toISOString(),
    updatedAt: new Date(bus.updatedAt).toISOString(),
  };
}

export async function listBuses(_req: Request, res: Response) {
  try {
    const buses = await prisma.bus.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(buses.map(presentBus));
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function createBus(req: Request, res: Response) {
  try {
    const data = normalizeBusInput(req.body);

    if (!data.plateNumber || !data.busNumber || !data.busType || !data.capacity) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const created = await prisma.bus.create({
      data: {
        ...data,
        currentPassengers: data.currentPassengers ?? 0,
        status: data.status ?? 'ACTIVE',
        gpsEnabled: data.gpsEnabled ?? true,
      },
    });

    res.status(201).json(presentBus(created));
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function updateBus(req: Request, res: Response) {
  try {
    const id = String((req.body as any).id ?? '');
    if (!id) {
      res.status(400).json({ error: 'Missing id' });
      return;
    }

    const data = normalizeBusInput(req.body);

    const updated = await prisma.bus.update({
      where: { id },
      data: {
        ...data,
        lastMaintenance: data.lastMaintenance === undefined ? undefined : data.lastMaintenance,
        nextMaintenance: data.nextMaintenance === undefined ? undefined : data.nextMaintenance,
      },
    });

    res.json(presentBus(updated));
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function deleteBus(req: Request, res: Response) {
  try {
    const id = String(req.query.id ?? '');
    if (!id) {
      res.status(400).json({ error: 'Missing id' });
      return;
    }

    await prisma.bus.delete({ where: { id } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function updateBusLocation(req: Request, res: Response) {
  try {
    const { busId, latitude, longitude, speed, heading, driverId, status } = req.body;

    // Update active trip
    const activeTrip = await prisma.tripRecord.findFirst({
      where: {
        busId: busId,
        status: 'IN_PROGRESS'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (activeTrip) {
      await prisma.tripRecord.update({
        where: { id: activeTrip.id },
        data: {
          currentLatitude: latitude,
          currentLongitude: longitude,
          updatedAt: new Date()
        }
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating location", error);
    res.status(500).json({ error: 'Database error' });
  }
}

export async function getBusLocations(req: Request, res: Response) {
  try {
    const activeTrips = await prisma.tripRecord.findMany({
      where: {
        status: 'IN_PROGRESS',
        currentLatitude: { not: null },
        currentLongitude: { not: null }
      },
      include: {
        bus: true,
        route: true
      }
    });

    const locations = activeTrips.map(trip => ({
      busId: trip.busId,
      busNumber: trip.bus.busNumber,
      routeId: trip.routeId || trip.routeStaticId,
      routeNumber: trip.route?.routeNumber,
      latitude: trip.currentLatitude,
      longitude: trip.currentLongitude,
      heading: 0,
      speed: 0
    }));

    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations", error);
    res.status(500).json({ error: 'Database error' });
  }
}
