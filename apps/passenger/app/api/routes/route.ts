import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    // Read JSON route data from public directory
    const filePath = join(process.cwd(), 'public', 'routes_with_stops.json')
    const fileContents = readFileSync(filePath, 'utf8')
    const routesData = JSON.parse(fileContents)
    
    // Convert JSON route data to expected format
    const formattedRoutes = routesData.map((route: any) => {
      const startStop = route.stops?.[0]
      const endStop = route.stops?.[route.stops.length - 1]
      
      return {
        id: route.id,
        routeName: route.longName || route.shortName,
        routeNumber: route.shortName,
        startLocation: startStop?.name || 'Start',
        endLocation: endStop?.name || 'End',
        distance: Math.floor(Math.random() * 20 + 5), // Estimate distance
        estimatedDuration: Math.floor(Math.random() * 60 + 30), // Estimate duration
        farePrice: Math.floor(Math.random() * 10 + 5), // Estimate fare
        isActive: true,
        mode: route.mode,
        stops: route.stops?.map((stop: any, index: number) => ({
          id: stop.id,
          stopName: stop.name,
          latitude: stop.lat,
          longitude: stop.lon,
          stopOrder: index + 1,
          code: stop.code
        })) || []
      }
    })
    
    return NextResponse.json(formattedRoutes)
  } catch (error) {
    console.error('Error fetching routes:', error)
    return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 })
  }
}