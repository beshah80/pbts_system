import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory store for demo (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; expires: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email, action, code } = await request.json()
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    if (action === 'send') {
      // Generate 6-digit code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
      const expires = Date.now() + 10 * 60 * 1000 // 10 minutes
      
      // Store code (in production, send via email service)
      verificationCodes.set(email, { code: verificationCode, expires })
      
      console.log(`Verification code for ${email}: ${verificationCode}`) // For demo purposes
      
      return NextResponse.json({
        message: 'Verification code sent successfully',
        // For demo only - remove in production
        demoCode: verificationCode
      })
    }
    
    if (action === 'verify') {
      const stored = verificationCodes.get(email)
      
      if (!stored) {
        return NextResponse.json(
          { error: 'No verification code found for this email' },
          { status: 400 }
        )
      }
      
      if (Date.now() > stored.expires) {
        verificationCodes.delete(email)
        return NextResponse.json(
          { error: 'Verification code has expired' },
          { status: 400 }
        )
      }
      
      if (stored.code !== code) {
        return NextResponse.json(
          { error: 'Invalid verification code' },
          { status: 400 }
        )
      }
      
      // Clean up used code
      verificationCodes.delete(email)
      
      return NextResponse.json({
        message: 'Email verified successfully'
      })
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
    
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}