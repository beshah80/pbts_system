import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { startCoords, endCoords } = await request.json();
    
    if (!startCoords || !endCoords || !Array.isArray(startCoords) || !Array.isArray(endCoords)) {
      return NextResponse.json(
        { error: 'Valid start and end coordinates are required' },
        { status: 400 }
      );
    }

    // Simple distance calculation as fallback
    const distance = calculateDistance(startCoords, endCoords);
    const estimatedTime = Math.round(distance * 2);

    return NextResponse.json({
      success: true,
      route: {
        path: ['start', 'end'],
        distance: Math.round(distance * 100) / 100,
        coordinates: [startCoords, endCoords],
        estimatedTime
      }
    });

  } catch (error) {
    console.error('Route planning error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Simple distance calculation using Haversine formula
function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}