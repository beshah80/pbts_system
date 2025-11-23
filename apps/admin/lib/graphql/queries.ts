import { gql } from '@apollo/client'

export const GET_BUSES = gql`
  query GetBuses {
    buses {
      id
      plateNumber
      busNumber
      busType
      status
      capacity
      currentPassengers
      currentRouteId
      driverId
      lastMaintenance
      nextMaintenance
      mileage
      fuelLevel
      gpsEnabled
      createdAt
      updatedAt
      driver {
        id
        firstName
        lastName
      }
      route {
        id
        routeName
      }
    }
  }
`

export const GET_DRIVERS = gql`
  query GetDrivers {
    drivers {
      id
      firstName
      lastName
      licenseNumber
      phoneNumber
      email
      address
      dateOfBirth
      hireDate
      status
      experience
      rating
      totalTrips
      emergencyName
      emergencyPhone
      emergencyRelation
      createdAt
      updatedAt
    }
  }
`

export const GET_ROUTES = gql`
  query GetRoutes {
    routes {
      id
      routeNumber
      routeName
      startLocation
      endLocation
      distance
      estimatedDuration
      farePrice
      isActive
      operatingStart
      operatingEnd
      frequency
      createdAt
      updatedAt
      stops {
        id
        stopName
        latitude
        longitude
        stopOrder
      }
    }
  }
`

export const GET_SCHEDULES = gql`
  query GetSchedules {
    schedules {
      id
      routeId
      busId
      driverId
      departureTime
      arrivalTime
      date
      status
      actualDepartureTime
      actualArrivalTime
      passengerCount
      delay
      createdAt
      updatedAt
      route {
        id
        routeName
      }
      bus {
        id
        busNumber
      }
      driver {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_FEEDBACK = gql`
  query GetFeedback {
    feedback {
      id
      routeId
      busId
      driverId
      rating
      category
      message
      status
      priority
      adminResponse
      createdAt
      updatedAt
      route {
        id
        routeName
      }
      bus {
        id
        busNumber
      }
      driver {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_INCIDENTS = gql`
  query GetIncidents {
    incidents {
      id
      busId
      driverId
      routeId
      type
      severity
      description
      location
      latitude
      longitude
      status
      reportedAt
      resolvedAt
      assignedTo
      estimatedResolutionTime
      createdAt
      updatedAt
      bus {
        id
        busNumber
      }
      driver {
        id
        firstName
        lastName
      }
      route {
        id
        routeName
      }
    }
  }
`