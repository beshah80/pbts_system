import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const client = new MongoClient("mongodb+srv://beshah:hVxjRA7nRJAVWbHe@pbts.7p8na14.mongodb.net/")

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    await client.connect()
    const db = client.db('pbts_system')
    
    // Find user in MongoDB
    const user = await db.collection('users').findOne({ email })
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Check if user is admin
    if (user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied' },
        { status: 403 }
      )
    }
    
    return NextResponse.json({
      success: true,
      token: 'jwt-token-placeholder',
      admin: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  } finally {
    await client.close()
  }
}