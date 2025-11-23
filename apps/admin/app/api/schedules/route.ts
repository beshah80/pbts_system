import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const schedule = await prisma.schedule.create({
      data: {
        routeId: body.routeId,
        busId: body.busId,
        driverId: body.driverId,
        departureTime: body.departureTime,
        arrivalTime: body.arrivalTime,
        date: body.date,
        status: 'SCHEDULED'
      }
    })
    
    return NextResponse.json(schedule)
  } catch (error) {
    console.error('Error creating schedule:', error)
    return NextResponse.json(
      { error: 'Failed to create schedule' },
      { status: 500 }
    )
  }
}