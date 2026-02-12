import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function incrementRouteSearch(routeId: string) {
    try {
        // Upsert: Create if not exists, otherwise increment count
        await prisma.routeAnalytics.upsert({
            where: { routeId },
            update: {
                searchCount: {
                    increment: 1
                },
                lastSearched: new Date()
            },
            create: {
                routeId,
                searchCount: 1,
                lastSearched: new Date()
            }
        });
    } catch (error) {
        console.error('Failed to track route search:', error);
        // Don't throw, tracking failure shouldn't break the app
    }
}

export async function getPopularRouteIds(limit: number = 4): Promise<string[]> {
    try {
        const popularRoutes = await prisma.routeAnalytics.findMany({
            orderBy: {
                searchCount: 'desc'
            },
            take: limit,
            select: {
                routeId: true
            }
        });

        return popularRoutes.map(r => r.routeId);
    } catch (error) {
        console.error('Failed to get popular routes:', error);
        return [];
    }
}
