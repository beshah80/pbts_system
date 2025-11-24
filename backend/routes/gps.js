const express = require('express');
const router = express.Router();

// GET /api/gps/location - GPS system status
router.get('/location', (req, res) => {
  res.json({ 
    status: 'GPS system online', 
    endpoints: {
      'POST /location': 'Update bus location',
      'GET /bus/:busId': 'Get bus location',
      'GET /route/:routeId': 'Get route buses'
    },
    timestamp: new Date().toISOString()
  });
});

// POST /api/gps/location - Update bus GPS location (from driver app)
router.post('/location', async (req, res) => {
  try {
    const { busId, latitude, longitude, speed, heading, accuracy, routeId, driverId, status } = req.body;
    
    if (!busId || !latitude || !longitude) {
      return res.status(400).json({ error: 'Bus ID, latitude, and longitude are required' });
    }

    // Emit real-time update via Socket.IO
    req.io.emit('busLocationUpdate', {
      busId,
      latitude,
      longitude,
      speed: speed || 0,
      heading: heading || 0,
      status: status || 'ON_ROUTE',
      timestamp: new Date().toISOString()
    });

    res.json({ success: true, message: 'GPS location updated', busId, latitude, longitude });
  } catch (error) {
    console.error('GPS location update error:', error);
    res.status(500).json({ error: 'Failed to update GPS location' });
  }
});

// GET /api/gps/bus/:busId - Get latest location for specific bus
router.get('/bus/:busId', async (req, res) => {
  try {
    const { busId } = req.params;
    const location = await gpsModel.getLatestLocation(busId);
    
    if (!location) {
      return res.status(404).json({ error: 'Bus location not found' });
    }

    res.json(location);
  } catch (error) {
    console.error('Get bus location error:', error);
    res.status(500).json({ error: 'Failed to get bus location' });
  }
});

// GET /api/gps/route/:routeId - Get all active buses on route
router.get('/route/:routeId', async (req, res) => {
  try {
    const { routeId } = req.params;
    const buses = await gpsModel.getActiveBusesOnRoute(routeId);
    
    res.json(buses);
  } catch (error) {
    console.error('Get route buses error:', error);
    res.status(500).json({ error: 'Failed to get route buses' });
  }
});

// GET /api/gps/history/:busId - Get GPS history for bus
router.get('/history/:busId', async (req, res) => {
  try {
    const { busId } = req.params;
    const { hours = 1 } = req.query;
    
    const history = await gpsModel.getGPSHistory(busId, parseInt(hours));
    res.json(history);
  } catch (error) {
    console.error('Get GPS history error:', error);
    res.status(500).json({ error: 'Failed to get GPS history' });
  }
});

// PUT /api/gps/status/:busId - Update bus status
router.put('/status/:busId', async (req, res) => {
  try {
    const { busId } = req.params;
    const { status } = req.body;
    
    await gpsModel.updateBusStatus(busId, status);
    
    // Emit status update
    req.io.emit('busStatusUpdate', { busId, status });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Update bus status error:', error);
    res.status(500).json({ error: 'Failed to update bus status' });
  }
});

module.exports = router;