const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3003'],
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3005;
const JWT_SECRET = process.env.JWT_SECRET || 'pbts_secret_key_2024';

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

// ---------- Static (info.json) loader ----------
let routeData = [];

function loadRouteData() {
  try {
    const filePath = path.join(__dirname, '../asset/info.json');
    routeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`Loaded ${routeData.length} routes from asset/info.json`);
  } catch (error) {
    console.error('Failed to load route data:', error);
    routeData = [];
  }
}

loadRouteData();

function getUniqueStopsFromRoutes(routes) {
  const stopsMap = new Map();

  routes.forEach((route) => {
    (route.stops || []).forEach((stop) => {
      if (!stopsMap.has(stop.id)) {
        stopsMap.set(stop.id, {
          id: stop.id,
          name: stop.name,
          latitude: stop.lat,
          longitude: stop.lon,
          isTerminal: stop.is_terminal,
        });
      }
    });
  });

  return Array.from(stopsMap.values());
}

// ---------- Auth middleware ----------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ---------- Health ----------
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ---------- Auth (Admin/Driver only) ----------
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const loginField = email || username;

    let admin = await prisma.admin.findFirst({
      where: {
        OR: [{ email: loginField }, { name: loginField }],
      },
    });

    let driver = null;
    if (!admin) {
      driver = await prisma.driver.findFirst({
        where: {
          OR: [{ email: loginField }, { employeeId: loginField }],
        },
      });
    }

    const account = admin || driver;
    if (!account || !bcrypt.compareSync(password, account.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: account.id,
        name: admin ? account.name : `${account.firstName} ${account.lastName}`,
        role: admin ? 'ADMIN' : 'DRIVER',
        accountType: admin ? 'ADMIN' : 'DRIVER',
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: account.id,
        name: admin ? account.name : `${account.firstName} ${account.lastName}`,
        role: admin ? 'ADMIN' : 'DRIVER',
        email: account.email,
        phone: driver ? driver.phoneNumber : null,
        accountType: admin ? 'ADMIN' : 'DRIVER',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// ---------- Static Routes/Stops/Terminals (authoritative from info.json) ----------
app.get('/api/routes', (req, res) => {
  const formattedRoutes = routeData.map((route) => {
    const totalDistanceKm =
      (route.stops || []).reduce((sum, stop, index) => {
        if (index === 0) return 0;
        return sum + (stop.distance_from_previous || 0);
      }, 0) / 1000;

    const stops = (route.stops || []).map((stop) => ({
      id: stop.id,
      stopName: stop.name,
      latitude: stop.lat,
      longitude: stop.lon,
      stopOrder: stop.sequence,
      isTerminal: stop.is_terminal,
    }));

    const startStop = stops[0];
    const endStop = stops[stops.length - 1];

    return {
      id: route.id,
      routeNumber: route.shortName,
      routeName: route.longName,
      startLocation: startStop?.stopName || 'Start',
      endLocation: endStop?.stopName || 'End',
      distance: totalDistanceKm || 0,
      estimatedDuration: totalDistanceKm ? Math.round((totalDistanceKm / 25) * 60) : 0,
      farePrice: 0,
      isActive: true,
      stops,
    };
  });

  res.json(formattedRoutes);
});

app.get('/api/routes/:id', (req, res) => {
  const route = routeData.find((r) => r.id === req.params.id);
  if (!route) return res.status(404).json({ error: 'Route not found' });
  res.json(route);
});

app.get('/api/stops', (req, res) => {
  res.json(getUniqueStopsFromRoutes(routeData));
});

app.get('/api/terminals', (req, res) => {
  const stops = getUniqueStopsFromRoutes(routeData);
  res.json(stops.filter((s) => s.isTerminal));
});

// Mock Schedules Endpoint (Since we don't have real schedule feed in info.json)
app.get('/api/schedules', (req, res) => {
  const schedules = [];
  const now = new Date();

  routeData.forEach(route => {
    // Create departures every 15 mins for next 2 hours
    for (let i = 0; i < 8; i++) {
      const departureTime = new Date(now.getTime() + i * 15 * 60000);
      schedules.push({
        id: `sch-${route.id}-${i}`,
        routeId: route.id,
        routeStaticId: route.shortName, // Allow matching by both ID and Name
        departureTime: departureTime.toISOString(),
        status: 'SCHEDULED',
        busId: Math.floor(Math.random() * 50) + 1
      });
    }
  });

  res.json(schedules);
});

app.get('/api/routes/search', (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'From and to parameters required' });
  }

  // Use enhanced search with fuzzy matching
  const matchingRoutes = routeData.filter((route) => {
    if (!route.stops || route.stops.length < 2) return false;

    const fromLower = String(from).toLowerCase().trim();
    const toLower = String(to).toLowerCase().trim();

    // Find matching stops with fuzzy matching
    const fromMatches = [];
    const toMatches = [];

    route.stops.forEach((stop, index) => {
      const stopName = stop.name.toLowerCase();

      // Exact or contains match
      if (stopName.includes(fromLower) || fromLower.includes(stopName) ||
        stopName.split(/\s+/).some(word => word.startsWith(fromLower) || fromLower.startsWith(word))) {
        fromMatches.push(index);
      }

      if (stopName.includes(toLower) || toLower.includes(stopName) ||
        stopName.split(/\s+/).some(word => word.startsWith(toLower) || toLower.startsWith(word))) {
        toMatches.push(index);
      }
    });

    // Check if there's a valid path (from before to)
    return fromMatches.some(fi => toMatches.some(ti => fi < ti));
  });

  // Format the results with accurate distance and time calculations
  const formattedRoutes = matchingRoutes.map((route) => {
    try {
      const fromLower = String(from).toLowerCase().trim();
      const toLower = String(to).toLowerCase().trim();

      // Safety check
      if (!route.stops || route.stops.length < 2) {
        return null;
      }

      // Find the best matching stops
      let fromIndex = -1;
      let toIndex = -1;

      route.stops.forEach((stop, index) => {
        if (!stop || !stop.name) return;
        const stopName = stop.name.toLowerCase();
        if (fromIndex === -1 && (stopName.includes(fromLower) || fromLower.includes(stopName))) {
          fromIndex = index;
        }
        if (stopName.includes(toLower) || toLower.includes(stopName)) {
          if (toIndex === -1 || index > fromIndex) {
            toIndex = index;
          }
        }
      });

      if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
        return null;
      }

      // Calculate segment distance
      let segmentDistance = 0;
      for (let i = fromIndex + 1; i <= toIndex; i++) {
        if (route.stops[i] && route.stops[i].distance_from_previous) {
          segmentDistance += route.stops[i].distance_from_previous;
        }
      }
      segmentDistance = segmentDistance / 1000; // Convert to km

      // Calculate travel time (25 km/h average)
      const segmentDuration = Math.round((segmentDistance / 25) * 60);

      // Get stops in segment
      const segmentStops = route.stops.slice(fromIndex, toIndex + 1)
        .filter(stop => stop && stop.name) // Filter out invalid stops
        .map((stop) => ({
          id: stop.id || '',
          stopName: stop.name || '',
          latitude: stop.lat || 0,
          longitude: stop.lon || 0,
          stopOrder: stop.sequence || 0,
          isTerminal: Boolean(stop.is_terminal),
        }));

      if (segmentStops.length === 0) {
        return null;
      }

      const totalDistanceKm =
        (route.stops || []).reduce((sum, stop, index) => {
          if (index === 0 || !stop || !stop.distance_from_previous) return sum;
          return sum + stop.distance_from_previous;
        }, 0) / 1000;

      const startStop = segmentStops[0];
      const endStop = segmentStops[segmentStops.length - 1];

      return {
        id: route.id || '',
        routeNumber: route.shortName || '',
        routeName: route.longName || '',
        startLocation: startStop?.stopName || 'Start',
        endLocation: endStop?.stopName || 'End',
        distance: segmentDistance || 0,
        estimatedDuration: segmentDuration || 0,
        farePrice: Math.round((segmentDistance || 0) * 0.5), // Approximate: 0.5 ETB per km
        isActive: true,
        stops: segmentStops,
        totalRouteDistance: totalDistanceKm || 0,
      };
    } catch (error) {
      console.error('Error formatting route:', route.id, error);
      return null;
    }
  }).filter(Boolean); // Remove null results

  res.json(formattedRoutes);
});

// ---------- Feedback (OTP gating to be implemented next) ----------
// Placeholder: keep endpoint but do NOT allow creating feedback without OTP verification.
app.post('/api/feedback', (req, res) => {
  res.status(501).json({ error: 'OTP-verified feedback is not implemented yet' });
});

app.get('/api/feedback', authenticateToken, async (req, res) => {
  try {
    const feedback = await prisma.passengerFeedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ---------- Socket.IO ----------
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

server.listen(PORT, () => {
  console.log(`PBTS Backend running on port ${PORT}`);
});
