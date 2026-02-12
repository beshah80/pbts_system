import clientPromise from './mongodb'

export interface Bus {
  _id?: string
  busNumber: string
  routeId: string
  driverId?: string
  status: 'active' | 'inactive' | 'maintenance'
  location?: {
    lat: number
    lng: number
  }
  createdAt: Date
}

export interface Route {
  _id?: string
  routeName: string
  startPoint: string
  endPoint: string
  stops: string[]
  status: 'active' | 'inactive'
  createdAt: Date
}

export interface Driver {
  _id?: string
  name: string
  email: string
  phone: string
  licenseNumber: string
  status: 'active' | 'inactive'
  createdAt: Date
}

export class AdminService {
  private async getDb() {
    const client = await clientPromise
    return client.db('pbts_system')
  }

  // Bus operations
  async getBuses() {
    const db = await this.getDb()
    return db.collection<Bus>('buses').find({}).toArray()
  }

  async createBus(bus: Omit<Bus, '_id' | 'createdAt'>) {
    const db = await this.getDb()
    return db.collection<Bus>('buses').insertOne({
      ...bus,
      createdAt: new Date()
    })
  }

  // Route operations
  async getRoutes() {
    const db = await this.getDb()
    return db.collection<Route>('routes').find({}).toArray()
  }

  async createRoute(route: Omit<Route, '_id' | 'createdAt'>) {
    const db = await this.getDb()
    return db.collection<Route>('routes').insertOne({
      ...route,
      createdAt: new Date()
    })
  }

  // Driver operations
  async getDrivers() {
    const db = await this.getDb()
    return db.collection<Driver>('drivers').find({}).toArray()
  }

  async createDriver(driver: Omit<Driver, '_id' | 'createdAt'>) {
    const db = await this.getDb()
    return db.collection<Driver>('drivers').insertOne({
      ...driver,
      createdAt: new Date()
    })
  }

  // Dashboard stats
  async getDashboardStats() {
    const db = await this.getDb()
    
    const [busCount, routeCount, driverCount] = await Promise.all([
      db.collection('buses').countDocuments(),
      db.collection('routes').countDocuments(),
      db.collection('drivers').countDocuments()
    ])

    return {
      totalBuses: busCount,
      activeRoutes: routeCount,
      totalDrivers: driverCount,
      onTimePerformance: 92 // This would come from real tracking data
    }
  }
}

export const adminService = new AdminService()