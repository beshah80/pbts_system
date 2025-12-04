import { routeApi } from '../lib/api';
import { Route } from '../types';

export async function getRouteSuggestion(query: string): Promise<Route | null> {
    // Mock implementation - in a real app this would call an AI service
    // For now, we'll just search existing routes
    try {
        const routes = await routeApi.getAll();
        const lowerQuery = query.toLowerCase();

        return routes.find(r =>
            r.name.toLowerCase().includes(lowerQuery) ||
            r.start.toLowerCase().includes(lowerQuery) ||
            r.end.toLowerCase().includes(lowerQuery)
        ) || null;
    } catch (error) {
        console.error('Error getting route suggestion:', error);
        return null;
    }
}
