import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mongodb+srv://beshah_db_user:my_password@cluster0.v0n4kvy.mongodb.net/pbts_admin?retryWrites=true&w=majority&appName=Cluster0"
    }
  }
});

export async function GET() {
  try {
    const buses = await prisma.bus.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    return NextResponse.json({ error: 'Failed to fetch buses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const bus = await prisma.bus.create({
      data: {
        plateNumber: data.plateNumber,
        busNumber: data.busNumber,
        capacity: data.capacity,
        busType: data.busType,
        status: data.status,
        lastMaintenance: new Date(),
        nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        mileage: 0,
        fuelLevel: 100
      }
    });
    
    return NextResponse.json(bus);
  } catch (error) {
    console.error('Error creating bus:', error);
    return NextResponse.json({ error: 'Failed to create bus' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json();
    
    const bus = await prisma.bus.update({
      where: { id },
      data: {
        plateNumber: data.plateNumber,
        busNumber: data.busNumber,
        capacity: data.capacity,
        busType: data.busType,
        status: data.status
      }
    });
    
    return NextResponse.json(bus);
  } catch (error) {
    console.error('Error updating bus:', error);
    return NextResponse.json({ error: 'Failed to update bus' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Bus ID is required' }, { status: 400 });
    }
    
    // Delete related records first
    await prisma.$transaction(async (tx) => {
      // Delete related incidents
      await tx.incident.deleteMany({
        where: { busId: id }
      });
      
      // Delete related schedules
      await tx.schedule.deleteMany({
        where: { busId: id }
      });
      
      // Delete related feedback
      await tx.feedback.deleteMany({
        where: { busId: id }
      });
      
      // Delete related revenue
      await tx.revenue.deleteMany({
        where: { busId: id }
      });
      
      // Finally delete the bus
      await tx.bus.delete({
        where: { id }
      });
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting bus:', error);
    return NextResponse.json({ error: 'Failed to delete bus' }, { status: 500 });
  }
}