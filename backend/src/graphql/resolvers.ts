import { Resolvers } from './types';
import { compare } from 'bcryptjs';

export const resolvers: Resolvers = {
  Query: {
    health: () => 'ok',
    me: async (_parent, _args, ctx) => {
      if (!ctx.user) return null;
      return ctx.prisma.user.findUnique({ where: { id: ctx.user.id } });
    },

    // Admin / Passenger
    buses: async () => {
      return ctx.prisma.bus.findMany();
    },
    bus: async (_parent, { id }, ctx) => {
      return ctx.prisma.bus.findUnique({ where: { id } });
    },

    routes: async (_parent, _args, ctx) => {
      return ctx.prisma.route.findMany({ include: { stops: { include: { stop: true } } } });
    },
    route: async (_parent, { id }, ctx) => {
      return ctx.prisma.route.findUnique({ where: { id }, include: { stops: { include: { stop: true } } } });
    },

    stops: async (_p, _a, ctx) => ctx.prisma.stop.findMany(),
    stop: async (_p, { id }, ctx) => ctx.prisma.stop.findUnique({ where: { id } }),

    schedulesByRoute: async (_p, { routeId }, ctx) =>
      ctx.prisma.schedule.findMany({ where: { routeId } }),

    incidents: async (_p, _a, ctx) => ctx.prisma.incidentReport.findMany(),
    feedbacks: async (_p, _a, ctx) => ctx.prisma.feedback.findMany(),

    // Driver
    myTrips: async (_p, _a, ctx) => {
      if (!ctx.user || ctx.user.role !== 'DRIVER') {
        throw new Error('Not authorized');
      }
      const driver = await ctx.prisma.driver.findUnique({ where: { userId: ctx.user.id } });
      if (!driver) return [];
      return ctx.prisma.tripRecord.findMany({ where: { driverId: driver.id } });
    },
  },
  Mutation: {
    login: async (_parent, { email, password }, ctx) => {
      const user = await ctx.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const valid = await compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid credentials');
      }
      const token = ctx.createToken({ id: user.id, role: user.role });
      return { token, user };
    },

    // Admin
    createBus: async (_p, { data }, ctx) => {
      if (!ctx.user || ctx.user.role !== 'ADMIN') throw new Error('Not authorized');
      return ctx.prisma.bus.create({ data });
    },
    updateBus: async (_p, { id, data }, ctx) => {
      if (!ctx.user || ctx.user.role !== 'ADMIN') throw new Error('Not authorized');
      return ctx.prisma.bus.update({ where: { id }, data });
    },
    deleteBus: async (_p, { id }, ctx) => {
      if (!ctx.user || ctx.user.role !== 'ADMIN') throw new Error('Not authorized');
      await ctx.prisma.bus.delete({ where: { id } });
      return true;
    },

    createRoute: async (_p, { data }, ctx) => {
      if (!ctx.user || ctx.user.role !== 'ADMIN') throw new Error('Not authorized');
      return ctx.prisma.route.create({ data });
    },
    updateRoute: async (_p, { id, data }, ctx) => {
      if (!ctx.user || ctx.user.role !== 'ADMIN') throw new Error('Not authorized');
      return ctx.prisma.route.update({ where: { id }, data });
    },

    createStop: async (_p, { data }, ctx) => {
      if (!ctx.user || ctx.user.role !== 'ADMIN') throw new Error('Not authorized');
      return ctx.prisma.stop.create({ data });
    },
    updateStop: async (_p, { id, data }, ctx) => {
      if (!ctx.user || ctx.user.role !== 'ADMIN') throw new Error('Not authorized');
      return ctx.prisma.stop.update({ where: { id }, data });
    },

    createSchedule: async (_p, { data }, ctx) => {
      if (!ctx.user || ctx.user.role !== 'ADMIN') throw new Error('Not authorized');
      return ctx.prisma.schedule.create({ data });
    },

    // Driver
    updateTripStatus: async (_p, { tripId, status }, ctx) => {
      if (!ctx.user || ctx.user.role !== 'DRIVER') throw new Error('Not authorized');
      const driver = await ctx.prisma.driver.findUnique({ where: { userId: ctx.user.id } });
      if (!driver) throw new Error('Driver not found');
      return ctx.prisma.tripRecord.update({
        where: { id: tripId, driverId: driver.id },
        data: { status },
      });
    },
    reportIncident: async (_p, args, ctx) => {
      if (!ctx.user || ctx.user.role !== 'DRIVER') throw new Error('Not authorized');
      const driver = await ctx.prisma.driver.findUnique({ where: { userId: ctx.user.id } });
      if (!driver) throw new Error('Driver not found');
      return ctx.prisma.incidentReport.create({
        data: {
          ...args,
          driverId: driver.id,
        },
      });
    },

    // Passenger
    submitFeedback: async (_p, { data }, ctx) => {
      return ctx.prisma.feedback.create({ data });
    },
  },
};
