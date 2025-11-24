# GPS System Quick Start

## GPS System Ready
Backend running on port 3005
GPS endpoints: `http://localhost:3005/api/gps`

## Key Endpoints
- `POST /api/gps/location` - Update bus location
- `GET /api/gps/bus/:busId` - Get bus location
- `GET /api/gps/route/:routeId` - Get route buses

## Test GPS
```bash
curl -X POST http://localhost:3005/api/gps/location \
  -H "Content-Type: application/json" \
  -d '{"busId":"ANB-001","latitude":9.0054,"longitude":38.7636,"speed":25}'
```

Real-time updates via Socket.IO on port 3005.