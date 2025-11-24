import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { calculateRealDistance, calculateTravelTime, getLocationCoordinates } from '@/lib/routeCalculations'

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
    
    // Calculate real distances and times using routing data
    const enhancedRoutes = routes.map(route => {
      const startCoords = getLocationCoordinates(route.startLocation);
      const endCoords = getLocationCoordinates(route.endLocation);
      
      let realDistance = route.distance;
      let realDuration = route.estimatedDuration;
      
      if (startCoords && endCoords) {
        try {
          realDistance = calculateRealDistance(startCoords, endCoords);
          realDuration = calculateTravelTime(realDistance);
          console.log(`Route ${route.routeNumber}: ${route.startLocation} → ${route.endLocation}`);
          console.log(`Original: ${route.distance}km, ${route.estimatedDuration}min`);
          console.log(`Calculated: ${realDistance.toFixed(2)}km, ${realDuration}min`);
        } catch (error) {
          console.log(`Calculation failed for route ${route.routeNumber}: ${error}`);
        }
      } else {
        console.log(`No coordinates found for route ${route.routeNumber}: ${route.startLocation} → ${route.endLocation}`);
      }
      
      return {
        ...route,
        distance: Math.round(realDistance * 100) / 100,
        estimatedDuration: realDuration
      };
    });
    
    return NextResponse.json(enhancedRoutes)
  } catch (error) {
    console.error('Error fetching routes:', error)
    return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 })
  }
}