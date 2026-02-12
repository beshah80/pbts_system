import type { Request, Response } from 'express';
import { getPopularRouteIds, incrementRouteSearch } from '../services/analyticsService';
import { formatRoutesForApi, getRouteData, getUniqueStopsFromRoutes } from '../services/routeData';

export function listRoutes(_req: Request, res: Response) {
  res.json(formatRoutesForApi(getRouteData()));
}

export function getRouteById(req: Request, res: Response) {
  const route = getRouteData().find((r) => r.id === req.params.id);
  if (!route) {
    res.status(404).json({ error: 'Route not found' });
    return;
  }
  res.json(formatRoutesForApi([route])[0]);
}

export function listStops(_req: Request, res: Response) {
  res.json(getUniqueStopsFromRoutes(getRouteData()));
}

export function listTerminals(_req: Request, res: Response) {
  const stops = getUniqueStopsFromRoutes(getRouteData());
  res.json(stops.filter((s) => s.isTerminal));
}

export function searchRoutes(req: Request, res: Response) {
  const from = String(req.query.from ?? '').trim();
  const to = String(req.query.to ?? '').trim();

  if (!from || !to) {
    res.status(400).json({ error: 'From and to parameters required' });
    return;
  }

  // Use enhanced search service
  const { searchRoutesBetweenLocations, formatSearchResults } = require('../services/routeSearchService');
  const searchResults = searchRoutesBetweenLocations(from, to);
  const formattedResults = formatSearchResults(searchResults);

  res.json(formattedResults);
}

export async function getPopularRoutes(_req: Request, res: Response) {
  const popularIds = await getPopularRouteIds();
  const allRoutes = getRouteData();
  const popularRoutes = allRoutes.filter((r) => popularIds.includes(r.id));

  // Sort by popularity rank
  popularRoutes.sort((a, b) => popularIds.indexOf(a.id) - popularIds.indexOf(b.id));

  res.json(formatRoutesForApi(popularRoutes));
}

export async function trackRouteSearch(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'Route ID required' });
    return;
  }
  await incrementRouteSearch(id);
  res.json({ success: true });
}
