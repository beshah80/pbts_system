// Search tracking for popular destinations and routes
const STORAGE_KEY = 'pbts_search_history';

interface SearchHistory {
  destinations: { [key: string]: number };
  routes: { [key: string]: number };
}

export function trackDestinationSearch(destination: string) {
  if (!destination) return;
  
  const history = getSearchHistory();
  history.destinations[destination] = (history.destinations[destination] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function trackRouteSearch(routeId: string) {
  if (!routeId) return;
  
  const history = getSearchHistory();
  history.routes[routeId] = (history.routes[routeId] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getPopularDestinations(limit: number = 10): string[] {
  const history = getSearchHistory();
  return Object.entries(history.destinations)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([destination]) => destination);
}

export function getPopularRouteIds(limit: number = 10): string[] {
  const history = getSearchHistory();
  return Object.entries(history.routes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([routeId]) => routeId);
}

function getSearchHistory(): SearchHistory {
  if (typeof window === 'undefined') {
    return { destinations: {}, routes: {} };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { destinations: {}, routes: {} };
  } catch {
    return { destinations: {}, routes: {} };
  }
}