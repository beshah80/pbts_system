import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('pbts_system')
    
    // Test connection by getting database stats
    const stats = await db.stats()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Connected to MongoDB',
      dbName: stats.db,
      collections: stats.collections 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to connect to MongoDB' },
      { status: 500 }
    )
  }
}