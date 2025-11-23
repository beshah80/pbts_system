import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mongodb+srv://beshah_db_user:my_password@cluster0.v0n4kvy.mongodb.net/pbts_admin?retryWrites=true&w=majority&appName=Cluster0"
    }
  }
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const feedback = await prisma.feedback.create({
      data: {
        routeId: body.routeId,
        busId: body.busId || null,
        driverId: body.driverId || null,
        rating: body.rating,
        category: body.category,
        message: body.message,
        status: 'PENDING',
        priority: body.rating <= 2 ? 'HIGH' : body.rating <= 3 ? 'MEDIUM' : 'LOW'
      }
    })
    
    return NextResponse.json({
      id: feedback.id,
      message: 'Feedback submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}