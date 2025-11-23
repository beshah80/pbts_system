import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create drivers first
  const driver1 = await prisma.driver.create({
    data: {
      firstName: 'Alemayehu',
      lastName: 'Tadesse',
      licenseNumber: 'DL-001-2020',
      phoneNumber: '+251911234567',
      email: 'alemayehu.tadesse@pbts.et',
      address: 'Addis Ababa, Bole Sub City',
      dateOfBirth: new Date('1985-03-15'),
      hireDate: new Date('2020-01-15'),
      status: 'ACTIVE',
      experience: 8,
      rating: 4.5,
      totalTrips: 1250,
      emergencyName: 'Meron Tadesse',
      emergencyPhone: '+251911234568',
      emergencyRelation: 'Spouse'
    }
  })

  const driver2 = await prisma.driver.create({
    data: {
      firstName: 'Biruk',
      lastName: 'Mekonnen',
      licenseNumber: 'DL-002-2019',
      phoneNumber: '+251922345678',
      address: 'Addis Ababa, Kirkos Sub City',
      dateOfBirth: new Date('1982-07-22'),
      hireDate: new Date('2019-06-10'),
      status: 'ACTIVE',
      experience: 12,
      rating: 4.2,
      totalTrips: 1890,
      emergencyName: 'Tigist Mekonnen',
      emergencyPhone: '+251922345679',
      emergencyRelation: 'Sister'
    }
  })

  // Create routes with stops
  const route1 = await prisma.route.create({
    data: {
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
      stops: {
        create: [
          {
            stopName: 'Meskel Square',
            latitude: 9.0120,
            longitude: 38.7634,
            stopOrder: 1
          },
          {
            stopName: 'Bole Airport',
            latitude: 8.9844,
            longitude: 38.7967,
            stopOrder: 2
          }
        ]
      }
    }
  })

  const route2 = await prisma.route.create({
    data: {
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
      stops: {
        create: [
          {
            stopName: 'Mercato',
            latitude: 9.0307,
            longitude: 38.7468,
            stopOrder: 1
          },
          {
            stopName: 'Piazza',
            latitude: 9.0420,
            longitude: 38.7469,
            stopOrder: 2
          }
        ]
      }
    }
  })

  // Create buses
  const bus1 = await prisma.bus.create({
    data: {
      plateNumber: 'AA-001-001',
      busNumber: 'ANB-001',
      busType: 'ANBESSA',
      status: 'ACTIVE',
      capacity: 45,
      currentPassengers: 32,
      driverId: driver1.id,
      currentRouteId: route1.id,
      lastMaintenance: new Date('2024-11-15'),
      nextMaintenance: new Date('2024-12-15'),
      mileage: 45000,
      fuelLevel: 75,
      gpsEnabled: true
    }
  })

  const bus2 = await prisma.bus.create({
    data: {
      plateNumber: 'AA-002-002',
      busNumber: 'SHG-001',
      busType: 'SHEGER',
      status: 'MAINTENANCE',
      capacity: 40,
      currentPassengers: 0,
      driverId: driver2.id,
      lastMaintenance: new Date('2024-11-18'),
      nextMaintenance: new Date('2024-12-18'),
      mileage: 38000,
      fuelLevel: 0,
      gpsEnabled: true
    }
  })

  // Create feedback
  await prisma.feedback.create({
    data: {
      routeId: route1.id,
      busId: bus1.id,
      driverId: driver1.id,
      rating: 4,
      category: 'SERVICE',
      message: 'Good service but bus was 10 minutes late',
      status: 'PENDING',
      priority: 'MEDIUM'
    }
  })

  await prisma.feedback.create({
    data: {
      routeId: route2.id,
      rating: 2,
      category: 'CLEANLINESS',
      message: 'Bus was very dirty and smelled bad',
      status: 'REVIEWED',
      priority: 'HIGH',
      adminResponse: 'We have scheduled immediate cleaning and will improve our maintenance schedule.'
    }
  })

  // Create incident
  await prisma.incident.create({
    data: {
      busId: bus2.id,
      driverId: driver2.id,
      routeId: route2.id,
      type: 'BREAKDOWN',
      severity: 'HIGH',
      description: 'Engine overheating, bus stopped near Mercato',
      location: 'Mercato Market Area',
      latitude: 9.0307,
      longitude: 38.7468,
      status: 'IN_PROGRESS',
      reportedAt: new Date('2024-11-20T10:15:00Z'),
      estimatedResolutionTime: new Date('2024-11-20T14:00:00Z')
    }
  })

  // Create admin user
  await prisma.admin.create({
    data: {
      email: 'atlasAdmin@admin.com',
      password: 'my_password', // In production, hash this password
      name: 'Atlas Admin',
      role: 'SUPER_ADMIN',
      isActive: true
    }
  })

  console.log('Database seeded successfully!')
  console.log('Admin created: atlasAdmin@admin.com / my_password')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })