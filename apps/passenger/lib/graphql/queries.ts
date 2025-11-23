import { gql } from '@apollo/client'

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

export const GET_ROUTE_BY_ID = gql`
  query GetRoute($id: ID!) {
    route(id: $id) {
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