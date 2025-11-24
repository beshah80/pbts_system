const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3002", "http://localhost:3003", "http://localhost:3005"],
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3005;
const JWT_SECRET = 'pbts_secret_key_2024';

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

// Initialize Database
const db = new sqlite3.Database('./pbts.db');

// Create tables
db.serialize(() => {
  // Users table (admin, drivers)
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    phone TEXT,
    status TEXT DEFAULT 'ACTIVE',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Routes table
  db.run(`CREATE TABLE IF NOT EXISTS routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    routeNumber TEXT UNIQUE,
    routeName TEXT,
    startLocation TEXT,
    endLocation TEXT,
    distance REAL,
    estimatedDuration INTEGER,
    farePrice REAL,
    isActive BOOLEAN DEFAULT 1,
    stops TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Buses table
  db.run(`CREATE TABLE IF NOT EXISTS buses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    busNumber TEXT UNIQUE,
    plateNumber TEXT,
    capacity INTEGER,
    busType TEXT,
    status TEXT DEFAULT 'ACTIVE',
    currentRouteId INTEGER,
    driverId INTEGER,
    latitude REAL,
    longitude REAL,
    lastUpdate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (currentRouteId) REFERENCES routes(id),
    FOREIGN KEY (driverId) REFERENCES users(id)
  )`);

  // Schedules table
  db.run(`CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    routeId INTEGER,
    busId INTEGER,
    driverId INTEGER,
    startTime TEXT,
    endTime TEXT,
    date TEXT,
    status TEXT DEFAULT 'SCHEDULED',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (routeId) REFERENCES routes(id),
    FOREIGN KEY (busId) REFERENCES buses(id),
    FOREIGN KEY (driverId) REFERENCES users(id)
  )`);

  // Feedback table
  db.run(`CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    passengerName TEXT NOT NULL,
    passengerEmail TEXT,
    passengerPhone TEXT,
    routeId INTEGER,
    rating INTEGER,
    category TEXT,
    message TEXT,
    status TEXT DEFAULT 'PENDING',
    response TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (routeId) REFERENCES routes(id)
  )`);

  // Insert sample data
  insertSampleData();
});

function insertSampleData() {
  // Insert admin user
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (username, password, role, firstName, lastName, email) 
          VALUES ('admin', ?, 'ADMIN', 'System', 'Administrator', 'admin@pbts.et')`, [adminPassword]);

  // Insert sample driver
  const driverPassword = bcrypt.hashSync('password', 10);
  db.run(`INSERT OR IGNORE INTO users (username, password, role, firstName, lastName, phone) 
          VALUES ('D001', ?, 'DRIVER', 'John', 'Doe', '+251911234567')`, [driverPassword]);

  // Insert sample routes
  const routes = [
    ['R001', 'Meskel Square - Bole Airport', 'Meskel Square', 'Bole Airport', 15.2, 45, 25, 1, JSON.stringify([
      {name: 'Meskel Square', lat: 9.0054, lng: 38.7636},
      {name: 'Mexico Square', lat: 9.0084, lng: 38.7586},
      {name: 'Bole Airport', lat: 8.9806, lng: 38.7992}
    ])],
    ['R002', 'Mercato - Piazza', 'Mercato', 'Piazza', 8.5, 30, 15, 1, JSON.stringify([
      {name: 'Mercato', lat: 9.0317, lng: 38.7468},
      {name: 'Arat Kilo', lat: 9.0348, lng: 38.7636},
      {name: 'Piazza', lat: 9.0348, lng: 38.7636}
    ])],
    ['R003', 'Kazanchis - CMC', 'Kazanchis', 'CMC', 12.0, 35, 20, 1, JSON.stringify([
      {name: 'Kazanchis', lat: 9.0192, lng: 38.7525},
      {name: 'Aware', lat: 9.0250, lng: 38.7400},
      {name: 'CMC', lat: 9.0100, lng: 38.7300}
    ])]
  ];

  routes.forEach(route => {
    db.run(`INSERT OR IGNORE INTO routes (routeNumber, routeName, startLocation, endLocation, distance, estimatedDuration, farePrice, isActive, stops) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, route);
  });

  // Insert sample buses
  const buses = [
    ['ANB-001', 'ET-001-AA', 50, 'Standard', 'ACTIVE', 1, 1],
    ['SHG-002', 'ET-002-AA', 45, 'Standard', 'ACTIVE', 2, 1],
    ['CMC-003', 'ET-003-AA', 60, 'Large', 'MAINTENANCE', 3, null]
  ];

  buses.forEach(bus => {
    db.run(`INSERT OR IGNORE INTO buses (busNumber, plateNumber, capacity, busType, status, currentRouteId, driverId) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`, bus);
  });
}

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

// Routes

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }
    });
  });
});

// Routes API
app.get('/api/routes', (req, res) => {
  const { from, to } = req.query;
  
  let query = 'SELECT * FROM routes WHERE isActive = 1';
  let params = [];

  if (from || to) {
    if (from && to) {
      query += ' AND (startLocation LIKE ? OR endLocation LIKE ?) AND (startLocation LIKE ? OR endLocation LIKE ?)';
      params = [`%${from}%`, `%${from}%`, `%${to}%`, `%${to}%`];
    } else if (from) {
      query += ' AND (startLocation LIKE ? OR endLocation LIKE ?)';
      params = [`%${from}%`, `%${from}%`];
    } else if (to) {
      query += ' AND (startLocation LIKE ? OR endLocation LIKE ?)';
      params = [`%${to}%`, `%${to}%`];
    }
  }

  db.all(query, params, (err, routes) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    const routesWithBuses = routes.map(route => {
      return new Promise((resolve) => {
        db.all('SELECT * FROM buses WHERE currentRouteId = ? AND status = "ACTIVE"', [route.id], (err, buses) => {
          resolve({
            ...route,
            stops: JSON.parse(route.stops || '[]'),
            currentBuses: buses || [],
            nextDepartures: [
              { departureTime: '06:00', busId: buses[0]?.id },
              { departureTime: '06:30', busId: buses[0]?.id },
              { departureTime: '07:00', busId: buses[0]?.id }
            ]
          });
        });
      });
    });

    Promise.all(routesWithBuses).then(results => {
      res.json(results);
    });
  });
});

// Get single route
app.get('/api/routes/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM routes WHERE id = ?', [id], (err, route) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    db.all('SELECT * FROM buses WHERE currentRouteId = ?', [id], (err, buses) => {
      res.json({
        ...route,
        stops: JSON.parse(route.stops || '[]'),
        currentBuses: buses || []
      });
    });
  });
});

// Buses API
app.get('/api/buses', authenticateToken, (req, res) => {
  db.all(`SELECT b.*, r.routeName, u.firstName, u.lastName 
          FROM buses b 
          LEFT JOIN routes r ON b.currentRouteId = r.id 
          LEFT JOIN users u ON b.driverId = u.id`, (err, buses) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(buses);
  });
});

// Feedback API
app.post('/api/feedback', (req, res) => {
  const { passengerName, passengerEmail, passengerPhone, routeId, rating, category, message } = req.body;

  if (!passengerName || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  db.run(`INSERT INTO feedback (passengerName, passengerEmail, passengerPhone, routeId, rating, category, message) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [passengerName, passengerEmail, passengerPhone, routeId, rating, category, message],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, message: 'Feedback submitted successfully' });
    }
  );
});

app.get('/api/feedback', authenticateToken, (req, res) => {
  db.all(`SELECT f.*, r.routeName 
          FROM feedback f 
          LEFT JOIN routes r ON f.routeId = r.id 
          ORDER BY f.createdAt DESC`, (err, feedback) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(feedback);
  });
});

// Real-time updates via Socket.IO
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send bus location updates
  setInterval(() => {
    db.all('SELECT * FROM buses WHERE status = "ACTIVE"', (err, buses) => {
      if (!err && buses.length > 0) {
        socket.emit('busUpdates', buses);
      }
    });
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`PBTS Backend running on port ${PORT}`);
});