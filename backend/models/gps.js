const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../pbts.db');

class GPSModel {
  constructor() {
    this.db = new sqlite3.Database(dbPath);
    this.initTables();
  }

  initTables() {
    // GPS tracking table for real-time bus locations
    this.db.run(`
      CREATE TABLE IF NOT EXISTS gps_tracking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bus_id TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        speed REAL DEFAULT 0,
        heading REAL DEFAULT 0,
        accuracy REAL DEFAULT 0,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        route_id TEXT,
        driver_id TEXT,
        status TEXT DEFAULT 'ON_ROUTE'
      )
    `);

    // Bus status table for current operational status
    this.db.run(`
      CREATE TABLE IF NOT EXISTS bus_status (
        bus_id TEXT PRIMARY KEY,
        current_route_id TEXT,
        current_stop_id TEXT,
        occupancy INTEGER DEFAULT 0,
        status TEXT DEFAULT 'AVAILABLE',
        last_update DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for performance
    this.db.run(`CREATE INDEX IF NOT EXISTS idx_gps_bus_timestamp ON gps_tracking(bus_id, timestamp)`);
    this.db.run(`CREATE INDEX IF NOT EXISTS idx_gps_route ON gps_tracking(route_id)`);
  }

  // Insert new GPS location
  insertGPSLocation(data) {
    return new Promise((resolve, reject) => {
      const { busId, latitude, longitude, speed, heading, accuracy, routeId, driverId, status } = data;
      
      this.db.run(`
        INSERT INTO gps_tracking (bus_id, latitude, longitude, speed, heading, accuracy, route_id, driver_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [busId, latitude, longitude, speed || 0, heading || 0, accuracy || 0, routeId, driverId, status || 'ON_ROUTE'], 
      function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  // Get latest GPS location for a bus
  getLatestLocation(busId) {
    return new Promise((resolve, reject) => {
      this.db.get(`
        SELECT * FROM gps_tracking 
        WHERE bus_id = ? 
        ORDER BY timestamp DESC 
        LIMIT 1
      `, [busId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // Get all active buses on a route
  getActiveBusesOnRoute(routeId) {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT DISTINCT g1.* FROM gps_tracking g1
        INNER JOIN (
          SELECT bus_id, MAX(timestamp) as max_timestamp
          FROM gps_tracking
          WHERE route_id = ? AND timestamp > datetime('now', '-5 minutes')
          GROUP BY bus_id
        ) g2 ON g1.bus_id = g2.bus_id AND g1.timestamp = g2.max_timestamp
        WHERE g1.route_id = ?
      `, [routeId, routeId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Update bus status
  updateBusStatus(busId, status) {
    return new Promise((resolve, reject) => {
      this.db.run(`
        INSERT OR REPLACE INTO bus_status (bus_id, status, last_update)
        VALUES (?, ?, CURRENT_TIMESTAMP)
      `, [busId, status], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }

  // Get GPS history for a bus
  getGPSHistory(busId, hours = 1) {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT * FROM gps_tracking 
        WHERE bus_id = ? AND timestamp > datetime('now', '-${hours} hours')
        ORDER BY timestamp ASC
      `, [busId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = GPSModel;