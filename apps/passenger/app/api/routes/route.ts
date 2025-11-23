import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mongodb+srv://beshah_db_user:my_password@cluster0.v0n4kvy.mongodb.net/pbts_admin?retryWrites=true&w=majority&appName=Cluster0"
    }
  }
})

export async function GET() {
  try {
    const routes = await prisma.route.findMany({
      where: { isActive: true },
      include: { stops: true }
    })
    
    return NextResponse.json(routes)
  } catch (error) {
    console.error('Error fetching routes:', error)
    return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 })
  }
}