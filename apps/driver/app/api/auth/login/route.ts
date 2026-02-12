import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const client = new MongoClient(process.env.DATABASE_URL || "mongodb+srv://beshah:hVxjRA7nRJAVWbHe@pbts.7p8na14.mongodb.net/");

export async function POST(request: NextRequest) {
  console.log('=== API LOGIN CALLED ===');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));
  
  try {
    const { username, password } = await request.json();
    
    console.log('Login attempt:', { username, passwordProvided: !!password });
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Employee ID and password are required' },
        { status: 400 }
      );
    }
    
    await client.connect();
    const db = client.db('pbts_system');
    
    // Find driver by employeeId or email
    const driver = await db.collection('drivers').findOne({
      $or: [
        { employeeId: username },
        { email: username }
      ]
    });
    
    console.log('Driver found:', !!driver);
    if (driver) {
      console.log('Driver ID:', driver.employeeId);
      console.log('Driver status:', driver.status);
      console.log('Has passwordHash:', !!driver.passwordHash);
    }
    
    if (!driver) {
      return NextResponse.json(
        { success: false, message: 'Invalid Employee ID or password' },
        { status: 401 }
      );
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, driver.passwordHash || driver.password);
    
    console.log('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid Employee ID or password' },
        { status: 401 }
      );
    }
    
    // Check if driver is active
    if (driver.status !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, message: 'Account is not active. Please contact administrator.' },
        { status: 403 }
      );
    }
    
    // Return driver data (excluding sensitive fields)
    const driverData = {
      id: driver._id.toString(),
      employeeId: driver.employeeId,
      firstName: driver.firstName,
      lastName: driver.lastName,
      email: driver.email,
      phoneNumber: driver.phoneNumber,
      licenseNumber: driver.licenseNumber,
      role: 'DRIVER',
      status: driver.status
    };
    
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: driverData,
      token: 'jwt-token-placeholder' // In production, use proper JWT
    });
    
  } catch (error) {
    console.error('Driver login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
