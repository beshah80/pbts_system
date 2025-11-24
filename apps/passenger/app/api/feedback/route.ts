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
    
    // Validate required fields
    if (!body.passengerEmail || !body.message || !body.category) {
      return NextResponse.json(
        { error: 'Email, message, and category are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.passengerEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate message length
    if (body.message.length > 500) {
      return NextResponse.json(
        { error: 'Message must be 500 characters or less' },
        { status: 400 }
      )
    }

    // Check daily rate limit (3 feedbacks per email per day)
    const today = new Date().toISOString().split('T')[0]
    const existingFeedbacks = await prisma.feedback.findMany({
      where: {
        createdAt: {
          gte: new Date(today + 'T00:00:00.000Z'),
          lt: new Date(today + 'T23:59:59.999Z')
        }
      }
    })

    // Count feedbacks from this email today (simulate email tracking)
    const emailFeedbackCount = existingFeedbacks.filter(f => 
      f.adminResponse?.includes(body.passengerEmail) || 
      f.message.includes(body.passengerEmail)
    ).length

    if (emailFeedbackCount >= 3) {
      return NextResponse.json(
        { error: 'Daily feedback limit reached (3 per day)' },
        { status: 429 }
      )
    }
    
    const feedback = await prisma.feedback.create({
      data: {
        routeId: body.routeId || null,
        busId: body.busId || null,
        driverId: body.driverId || null,
        rating: body.rating,
        category: body.category,
        message: `${body.message}\n\n[Email: ${body.passengerEmail}]`,
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