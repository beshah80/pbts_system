import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Bus {
    id: ID!
    plateNumber: String!
    busNumber: String!
    busType: BusType!
    status: BusStatus!
    capacity: Int!
    currentPassengers: Int!
    currentRouteId: String
    driverId: String
    lastMaintenance: String!
    nextMaintenance: String!
    mileage: Int!
    fuelLevel: Int!
    gpsEnabled: Boolean!
    createdAt: String!
    updatedAt: String!
    driver: Driver
    route: Route
  }

  type Driver {
    id: ID!
    firstName: String!
    lastName: String!
    licenseNumber: String!
    phoneNumber: String!
    email: String
    address: String!
    dateOfBirth: String!
    hireDate: String!
    status: DriverStatus!
    experience: Int!
    rating: Float!
    totalTrips: Int!
    emergencyName: String!
    emergencyPhone: String!
    emergencyRelation: String!
    createdAt: String!
    updatedAt: String!
  }

  type Route {
    id: ID!
    routeNumber: String!
    routeName: String!
    startLocation: String!
    endLocation: String!
    distance: Float!
    estimatedDuration: Int!
    farePrice: Int!
    isActive: Boolean!
    operatingStart: String!
    operatingEnd: String!
    frequency: Int!
    createdAt: String!
    updatedAt: String!
    stops: [Stop!]!
  }

  type Stop {
    id: ID!
    stopName: String!
    latitude: Float!
    longitude: Float!
    stopOrder: Int!
    routeId: String!
  }

  type Schedule {
    id: ID!
    routeId: String!
    busId: String!
    driverId: String!
    departureTime: String!
    arrivalTime: String!
    date: String!
    status: ScheduleStatus!
    actualDepartureTime: String
    actualArrivalTime: String
    passengerCount: Int
    delay: Int
    createdAt: String!
    updatedAt: String!
    route: Route!
    bus: Bus!
    driver: Driver!
  }

  type Feedback {
    id: ID!
    routeId: String!
    busId: String
    driverId: String
    rating: Int!
    category: FeedbackCategory!
    message: String!
    status: FeedbackStatus!
    priority: Priority!
    adminResponse: String
    createdAt: String!
    updatedAt: String!
    route: Route!
    bus: Bus
    driver: Driver
  }

  type Incident {
    id: ID!
    busId: String!
    driverId: String!
    routeId: String
    type: IncidentType!
    severity: Severity!
    description: String!
    location: String!
    latitude: Float
    longitude: Float
    status: IncidentStatus!
    reportedAt: String!
    resolvedAt: String
    assignedTo: String
    estimatedResolutionTime: String
    createdAt: String!
    updatedAt: String!
    bus: Bus!
    driver: Driver!
    route: Route
  }

  enum BusType {
    ANBESSA
    SHEGER
    VELOCITY
    PRIVATE
  }

  enum BusStatus {
    ACTIVE
    MAINTENANCE
    INACTIVE
    OUT_OF_SERVICE
  }

  enum DriverStatus {
    ACTIVE
    INACTIVE
    SUSPENDED
    ON_LEAVE
  }

  enum ScheduleStatus {
    SCHEDULED
    IN_PROGRESS
    COMPLETED
    CANCELLED
    DELAYED
  }

  enum FeedbackCategory {
    SERVICE
    CLEANLINESS
    PUNCTUALITY
    SAFETY
    DRIVER_BEHAVIOR
    OTHER
  }

  enum FeedbackStatus {
    PENDING
    REVIEWED
    RESOLVED
    DISMISSED
  }

  enum Priority {
    LOW
    MEDIUM
    HIGH
    URGENT
  }

  enum IncidentType {
    BREAKDOWN
    ACCIDENT
    DELAY
    PASSENGER_ISSUE
    TRAFFIC
    WEATHER
    OTHER
  }

  enum Severity {
    LOW
    MEDIUM
    HIGH
    CRITICAL
  }

  enum IncidentStatus {
    REPORTED
    IN_PROGRESS
    RESOLVED
    ESCALATED
  }

  input BusInput {
    plateNumber: String!
    busNumber: String!
    busType: BusType!
    capacity: Int!
    lastMaintenance: String!
    nextMaintenance: String!
    mileage: Int!
    fuelLevel: Int!
  }

  input DriverInput {
    firstName: String!
    lastName: String!
    licenseNumber: String!
    phoneNumber: String!
    email: String
    address: String!
    dateOfBirth: String!
    hireDate: String!
    experience: Int!
    emergencyName: String!
    emergencyPhone: String!
    emergencyRelation: String!
  }

  input RouteInput {
    routeNumber: String!
    routeName: String!
    startLocation: String!
    endLocation: String!
    distance: Float!
    estimatedDuration: Int!
    farePrice: Int!
    operatingStart: String!
    operatingEnd: String!
    frequency: Int!
  }

  input StopInput {
    stopName: String!
    latitude: Float!
    longitude: Float!
    stopOrder: Int!
  }

  type Query {
    buses: [Bus!]!
    bus(id: ID!): Bus
    drivers: [Driver!]!
    driver(id: ID!): Driver
    routes: [Route!]!
    route(id: ID!): Route
    schedules: [Schedule!]!
    feedback: [Feedback!]!
    incidents: [Incident!]!
  }

  type Mutation {
    createBus(input: BusInput!): Bus!
    updateBus(id: ID!, input: BusInput!): Bus!
    deleteBus(id: ID!): Boolean!
    
    createDriver(input: DriverInput!): Driver!
    updateDriver(id: ID!, input: DriverInput!): Driver!
    deleteDriver(id: ID!): Boolean!
    
    createRoute(input: RouteInput!, stops: [StopInput!]!): Route!
    updateRoute(id: ID!, input: RouteInput!): Route!
    deleteRoute(id: ID!): Boolean!
    
    updateFeedback(id: ID!, status: FeedbackStatus!, adminResponse: String): Feedback!
    updateIncident(id: ID!, status: IncidentStatus!): Incident!
  }
`