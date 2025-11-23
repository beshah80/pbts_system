import { gql } from '@apollo/client'

export const CREATE_BUS = gql`
  mutation CreateBus($input: BusInput!) {
    createBus(input: $input) {
      id
      plateNumber
      busNumber
      busType
      status
      capacity
      lastMaintenance
      nextMaintenance
      mileage
      fuelLevel
      gpsEnabled
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_BUS = gql`
  mutation UpdateBus($id: ID!, $input: BusInput!) {
    updateBus(id: $id, input: $input) {
      id
      plateNumber
      busNumber
      busType
      status
      capacity
      lastMaintenance
      nextMaintenance
      mileage
      fuelLevel
      gpsEnabled
      updatedAt
    }
  }
`

export const DELETE_BUS = gql`
  mutation DeleteBus($id: ID!) {
    deleteBus(id: $id)
  }
`

export const CREATE_DRIVER = gql`
  mutation CreateDriver($input: DriverInput!) {
    createDriver(input: $input) {
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
      emergencyName
      emergencyPhone
      emergencyRelation
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_DRIVER = gql`
  mutation UpdateDriver($id: ID!, $input: DriverInput!) {
    updateDriver(id: $id, input: $input) {
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
      emergencyName
      emergencyPhone
      emergencyRelation
      updatedAt
    }
  }
`

export const DELETE_DRIVER = gql`
  mutation DeleteDriver($id: ID!) {
    deleteDriver(id: $id)
  }
`

export const CREATE_ROUTE = gql`
  mutation CreateRoute($input: RouteInput!, $stops: [StopInput!]!) {
    createRoute(input: $input, stops: $stops) {
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

export const UPDATE_ROUTE = gql`
  mutation UpdateRoute($id: ID!, $input: RouteInput!) {
    updateRoute(id: $id, input: $input) {
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

export const DELETE_ROUTE = gql`
  mutation DeleteRoute($id: ID!) {
    deleteRoute(id: $id)
  }
`

export const UPDATE_FEEDBACK = gql`
  mutation UpdateFeedback($id: ID!, $status: FeedbackStatus!, $adminResponse: String) {
    updateFeedback(id: $id, status: $status, adminResponse: $adminResponse) {
      id
      status
      adminResponse
      updatedAt
    }
  }
`

export const UPDATE_INCIDENT = gql`
  mutation UpdateIncident($id: ID!, $status: IncidentStatus!) {
    updateIncident(id: $id, status: $status) {
      id
      status
      resolvedAt
      updatedAt
    }
  }
`