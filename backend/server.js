const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');
const { PrismaClient } = require('@prisma/client');

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3003"],
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3005;
const JWT_SECRET = process.env.JWT_SECRET || 'pbts_secret_key_2024';

// Middleware
app.use(cors());
app.use(express.json());

// Add Socket.IO to request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// GPS Routes
const gpsRoutes = require('./routes/gps');
app.use('/api/gps', gpsRoutes);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Authentication
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const loginField = email || username;

    // Check Admin table first
    let admin = await prisma.admin.findFirst({
      where: { 
        OR: [
          { email: loginField },
          { name: loginField }
        ]
      }
    });

    // Check Driver table if not found in Admin table
    let driver = null;
    if (!admin) {
      driver = await prisma.driver.findFirst({
        where: { 
          OR: [
            { email: loginField },
            { employeeId: loginField }
          ]
        }
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
        accountType: admin ? 'ADMIN' : 'DRIVER'
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
        accountType: admin ? 'ADMIN' : 'DRIVER'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Admin Registration
app.post('/api/auth/register-admin', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    res.json({
      success: true,
      message: 'Admin registered successfully',
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Driver Registration
app.post('/api/auth/register-driver', async (req, res) => {
  try {
    const { 
      employeeId, firstName, lastName, email, password, phoneNumber,
      licenseNumber, address, dateOfBirth, experience, 
      emergencyName, emergencyPhone, emergencyRelation 
    } = req.body;

    if (!employeeId || !firstName || !lastName || !licenseNumber || !password) {
      return res.status(400).json({ error: 'Employee ID, name, license number and password are required' });
    }

    // Check if driver already exists
    const existingDriver = await prisma.driver.findFirst({
      where: {
        OR: [
          { employeeId },
          { licenseNumber },
          { email: email || '' }
        ]
      }
    });
    
    if (existingDriver) {
      return res.status(400).json({ error: 'Driver with this employee ID, license or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create driver
    const driver = await prisma.driver.create({
      data: {
        employeeId,
        firstName,
        lastName,
        licenseNumber,
        phoneNumber: phoneNumber || '',
        email: email || null,
        password: hashedPassword,
        address: address || '',
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
        hireDate: new Date(),
        status: 'ACTIVE',
        experience: experience || 0,
        emergencyName: emergencyName || '',
        emergencyPhone: emergencyPhone || '',
        emergencyRelation: emergencyRelation || ''
      }
    });

    res.json({
      success: true,
      message: 'Driver registered successfully',
      driver: {
        id: driver.id,
        employeeId: driver.employeeId,
        name: `${driver.firstName} ${driver.lastName}`,
        email: driver.email,
        licenseNumber: driver.licenseNumber
      }
    });
  } catch (error) {
    console.error('Driver registration error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Import fare calculation
const { calculateFare } = require('./calculate-fare');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes API
app.get('/api/routes', async (req, res) => {
  try {
    const routes = await prisma.route.findMany({
      include: {
        routeStops: {
          include: {
            stop: true
          },
          orderBy: {
            sequence: 'asc'
          }
        },
        schedules: true
      }
    });
    
    const formattedRoutes = routes.map(route => {
      const distance = route.distanceKm || 10;
      const averageSpeed = 25;
      const estimatedDuration = Math.round((distance / averageSpeed) * 60);
      const farePrice = calculateFare(distance, 'MINI_BUS');
      
      // Get ordered stop names
      const stopNames = route.routeStops.map(rs => rs.stop.name);
      const startLocation = stopNames[0] || 'Unknown';
      const endLocation = stopNames[stopNames.length - 1] || 'Unknown';
      
      return {
        id: route.id,
        routeName: route.name,
        routeNumber: route.code,
        startLocation: startLocation,
        endLocation: endLocation,
        distance: distance,
        estimatedDuration: estimatedDuration,
        farePrice: farePrice,
        isActive: route.isActive,
        stops: stopNames,
        stopCount: stopNames.length,
        schedules: route.schedules?.length || 0,
        fullStopDetails: route.routeStops.map(rs => ({
          id: rs.stop.id,
          name: rs.stop.name,
          sequence: rs.sequence,
          latitude: rs.stop.latitude,
          longitude: rs.stop.longitude
        }))
      };
    });
    
    res.json(formattedRoutes);
  } catch (error) {
    console.error('Routes API error:', error);
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
});

// Get single route
app.get('/api/routes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const route = await prisma.route.findUnique({
      where: { id },
      include: {
        routeStops: {
          include: {
            stop: true
          },
          orderBy: {
            sequence: 'asc'
          }
        },
        buses: true,
        schedules: true
      }
    });

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    // Format the response with complete stop information
    const formattedRoute = {
      ...route,
      stops: route.routeStops.map(rs => rs.stop.name),
      fullStopDetails: route.routeStops.map(rs => ({
        id: rs.stop.id,
        name: rs.stop.name,
        sequence: rs.sequence,
        latitude: rs.stop.latitude,
        longitude: rs.stop.longitude,
        distanceFromStart: rs.distanceFromStartKm,
        estimatedTravelTime: rs.estimatedTravelMinutes
      }))
    };

    res.json(formattedRoute);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Schedules API
app.get('/api/schedules', async (req, res) => {
  try {
    const schedules = await prisma.schedule.findMany({
      include: {
        route: true
      }
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Stops API
app.get('/api/stops', async (req, res) => {
  try {
    const stops = await prisma.stop.findMany({
      include: {
        routes: {
          include: {
            route: true
          }
        }
      }
    });
    res.json(stops);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Buses API
app.get('/api/buses', async (req, res) => {
  try {
    const buses = await prisma.bus.findMany({});

    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Feedback API
app.post('/api/feedback', async (req, res) => {
  try {
    const { passengerName, passengerEmail, passengerPhone, routeId, rating, category, message } = req.body;

    if (!passengerName || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    const feedback = await prisma.feedback.create({
      data: {
        comment: message,
        rating: rating || 5,
        category: category || 'OTHER',
        contactInfo: `${passengerName} - ${passengerEmail || passengerPhone}`,
        routeId: routeId || null
      }
    });

    // Emit real-time notification to admin
    req.io.emit('newFeedback', {
      id: feedback.id,
      message: 'New passenger feedback received',
      feedback: feedback
    });

    res.json({ id: feedback.id, message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const feedback = await prisma.feedback.findMany({
      include: {
        route: true
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete single feedback
app.delete('/api/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.feedback.delete({
      where: { id }
    });
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete multiple feedback
app.delete('/api/feedback', async (req, res) => {
  try {
    const { ids } = req.body;
    if (ids && ids.length > 0) {
      await prisma.feedback.deleteMany({
        where: {
          id: { in: ids }
        }
      });
      res.json({ message: `${ids.length} feedback deleted successfully` });
    } else {
      // Delete all feedback
      const result = await prisma.feedback.deleteMany({});
      res.json({ message: `All ${result.count} feedback deleted successfully` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Drivers API
app.get('/api/drivers', async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      include: {
        buses: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Incidents API
app.get('/api/incidents', async (req, res) => {
  try {
    // Return empty array since incident model is not defined in schema
    res.json([]);
  } catch (error) {
    console.error('Incidents API error:', error);
    res.json([]);
  }
});

// Real-time updates via Socket.IO
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send bus location updates
  const updateInterval = setInterval(async () => {
    try {
      const buses = await prisma.bus.findMany({
        where: { status: 'ACTIVE' },
        include: {
          route: true
        }
      });
      
      if (buses.length > 0) {
        socket.emit('busUpdates', buses);
      }
    } catch (error) {
      console.error('Error fetching bus updates:', error);
    }
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(updateInterval);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

server.listen(PORT, () => {
  console.log(`PBTS Backend running on port ${PORT}`);
  console.log('Using MongoDB Atlas with Prisma');
});