import { PrismaClient } from '@prisma/client'

interface Context {
  prisma: PrismaClient
}

export const resolvers = {
  Query: {
    buses: async (_: any, __: any, { prisma }: Context) => {
      return await prisma.bus.findMany({
        include: { driver: true, route: true }
      })
    },
    
    bus: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      return await prisma.bus.findUnique({
        where: { id },
        include: { driver: true, route: true }
      })
    },
    
    drivers: async (_: any, __: any, { prisma }: Context) => {
      return await prisma.driver.findMany()
    },
    
    driver: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      return await prisma.driver.findUnique({ where: { id } })
    },
    
    routes: async (_: any, __: any, { prisma }: Context) => {
      return await prisma.route.findMany({
        include: { stops: true }
      })
    },
    
    route: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      return await prisma.route.findUnique({
        where: { id },
        include: { stops: true }
      })
    },
    
    schedules: async (_: any, __: any, { prisma }: Context) => {
      return await prisma.schedule.findMany({
        include: { route: true, bus: true, driver: true }
      })
    },
    
    feedback: async (_: any, __: any, { prisma }: Context) => {
      return await prisma.feedback.findMany({
        include: { route: true, bus: true, driver: true }
      })
    },
    
    incidents: async (_: any, __: any, { prisma }: Context) => {
      return await prisma.incident.findMany({
        include: { bus: true, driver: true, route: true }
      })
    }
  },
  
  Mutation: {
    createBus: async (_: any, { input }: { input: any }) => {
      const newBus = {
        id: Date.now().toString(),
        ...input,
        status: 'ACTIVE',
        currentPassengers: 0,
        gpsEnabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      mockData.buses.push(newBus)
      return newBus
    },
    
    updateBus: async (_: any, { id, input }: { id: string, input: any }, { prisma }: Context) => {
      return await prisma.bus.update({
        where: { id },
        data: {
          ...input,
          lastMaintenance: new Date(input.lastMaintenance),
          nextMaintenance: new Date(input.nextMaintenance)
        },
        include: { driver: true, route: true }
      })
    },
    
    deleteBus: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      await prisma.bus.delete({ where: { id } })
      return true
    },
    
    createDriver: async (_: any, { input }: { input: any }, { prisma }: Context) => {
      return await prisma.driver.create({
        data: {
          ...input,
          dateOfBirth: new Date(input.dateOfBirth),
          hireDate: new Date(input.hireDate),
          status: 'ACTIVE'
        }
      })
    },
    
    updateDriver: async (_: any, { id, input }: { id: string, input: any }, { prisma }: Context) => {
      return await prisma.driver.update({
        where: { id },
        data: {
          ...input,
          dateOfBirth: new Date(input.dateOfBirth),
          hireDate: new Date(input.hireDate)
        }
      })
    },
    
    deleteDriver: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      await prisma.driver.delete({ where: { id } })
      return true
    },
    
    createRoute: async (_: any, { input, stops }: { input: any, stops: any[] }, { prisma }: Context) => {
      return await prisma.route.create({
        data: {
          ...input,
          stops: {
            create: stops
          }
        },
        include: { stops: true }
      })
    },
    
    updateRoute: async (_: any, { id, input }: { id: string, input: any }, { prisma }: Context) => {
      return await prisma.route.update({
        where: { id },
        data: input,
        include: { stops: true }
      })
    },
    
    deleteRoute: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      await prisma.route.delete({ where: { id } })
      return true
    },
    
    updateFeedback: async (_: any, { id, status, adminResponse }: { id: string, status: string, adminResponse?: string }, { prisma }: Context) => {
      return await prisma.feedback.update({
        where: { id },
        data: { status, adminResponse },
        include: { route: true, bus: true, driver: true }
      })
    },
    
    updateIncident: async (_: any, { id, status }: { id: string, status: string }, { prisma }: Context) => {
      return await prisma.incident.update({
        where: { id },
        data: { 
          status,
          resolvedAt: status === 'RESOLVED' ? new Date() : undefined
        },
        include: { bus: true, driver: true, route: true }
      })
    }
  }
}