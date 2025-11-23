// Temporary mock database for testing without MongoDB setup
export const mockData = {
  routes: [
    {
      id: '1',
      routeNumber: 'R001',
      routeName: 'Meskel Square - Bole Airport',
      startLocation: 'Meskel Square',
      endLocation: 'Bole Airport',
      distance: 12.5,
      estimatedDuration: 35,
      farePrice: 15,
      isActive: true,
      operatingStart: '06:00',
      operatingEnd: '22:00',
      frequency: 15,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stops: [
        {
          id: '1',
          stopName: 'Meskel Square',
          latitude: 9.0120,
          longitude: 38.7634,
          stopOrder: 1
        },
        {
          id: '2',
          stopName: 'Bole Airport',
          latitude: 8.9844,
          longitude: 38.7967,
          stopOrder: 2
        }
      ]
    },
    {
      id: '2',
      routeNumber: 'R002',
      routeName: 'Mercato - Piazza',
      startLocation: 'Mercato',
      endLocation: 'Piazza',
      distance: 8.2,
      estimatedDuration: 25,
      farePrice: 12,
      isActive: true,
      operatingStart: '06:00',
      operatingEnd: '21:00',
      frequency: 20,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stops: [
        {
          id: '3',
          stopName: 'Mercato',
          latitude: 9.0307,
          longitude: 38.7468,
          stopOrder: 1
        },
        {
          id: '4',
          stopName: 'Piazza',
          latitude: 9.0420,
          longitude: 38.7469,
          stopOrder: 2
        }
      ]
    }
  ],
  buses: [],
  drivers: [],
  schedules: [],
  feedback: [],
  incidents: []
}