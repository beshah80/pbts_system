// NOTE: This file uses hardcoded search.json data
// TODO: Replace with database API calls for route planning

import routingData from '../../../asset/search.json';

interface RouteNode {
  id: string;
  coordinates: [number, number];
}

interface RouteGraph {
  [nodeId: string]: RouteNode[];
}

class RoutePlanner {
  private graph: RouteGraph;

  constructor() {
    console.warn('RoutePlanner uses hardcoded data. Consider migrating to database API.');
    this.graph = routingData as RouteGraph;
  }

  // Find shortest path between two coordinates using Dijkstra's algorithm
  findRoute(startCoords: [number, number], endCoords: [number, number]) {
    const startNode = this.findNearestNode(startCoords);
    const endNode = this.findNearestNode(endCoords);
    
    if (!startNode || !endNode) {
      return null;
    }

    return this.dijkstra(startNode, endNode);
  }

  // Find the nearest node to given coordinates
  private findNearestNode(coords: [number, number]): string | null {
    let minDistance = Infinity;
    let nearestNode: string | null = null;

    for (const [nodeId, connections] of Object.entries(this.graph)) {
      for (const [, nodeCoords] of connections) {
        const distance = this.calculateDistance(coords, nodeCoords);
        if (distance < minDistance) {
          minDistance = distance;
          nearestNode = nodeId;
        }
      }
    }

    return nearestNode;
  }

  // Calculate distance between two coordinates (Haversine formula)
  private calculateDistance(coord1: [number, number], coord2: [number, number]): number {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Dijkstra's shortest path algorithm
  private dijkstra(startNode: string, endNode: string) {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const unvisited = new Set<string>();

    // Initialize distances
    for (const nodeId of Object.keys(this.graph)) {
      distances[nodeId] = Infinity;
      previous[nodeId] = null;
      unvisited.add(nodeId);
    }
    distances[startNode] = 0;

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let currentNode: string | null = null;
      let minDistance = Infinity;
      
      for (const node of unvisited) {
        if (distances[node] < minDistance) {
          minDistance = distances[node];
          currentNode = node;
        }
      }

      if (!currentNode || distances[currentNode] === Infinity) break;
      if (currentNode === endNode) break;

      unvisited.delete(currentNode);

      // Check neighbors
      const neighbors = this.graph[currentNode] || [];
      for (const [neighborId, neighborCoords] of neighbors) {
        if (!unvisited.has(neighborId)) continue;

        const currentCoords = this.getNodeCoordinates(currentNode);
        if (!currentCoords) continue;

        const edgeWeight = this.calculateDistance(currentCoords, neighborCoords);
        const newDistance = distances[currentNode] + edgeWeight;

        if (newDistance < distances[neighborId]) {
          distances[neighborId] = newDistance;
          previous[neighborId] = currentNode;
        }
      }
    }

    // Reconstruct path
    const path: string[] = [];
    let current: string | null = endNode;
    
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    if (path[0] !== startNode) {
      return null; // No path found
    }

    return {
      path,
      distance: distances[endNode],
      coordinates: path.map(nodeId => this.getNodeCoordinates(nodeId)).filter(Boolean)
    };
  }

  // Get coordinates for a node
  private getNodeCoordinates(nodeId: string): [number, number] | null {
    const connections = this.graph[nodeId];
    if (!connections || connections.length === 0) return null;
    return connections[0][1]; // Return first connection's coordinates
  }

  // Get all nodes within a radius of given coordinates
  getNodesInRadius(coords: [number, number], radiusKm: number = 1): RouteNode[] {
    const nodes: RouteNode[] = [];
    
    for (const [nodeId, connections] of Object.entries(this.graph)) {
      for (const [, nodeCoords] of connections) {
        const distance = this.calculateDistance(coords, nodeCoords);
        if (distance <= radiusKm) {
          nodes.push({ id: nodeId, coordinates: nodeCoords });
          break; // Only add once per node
        }
      }
    }
    
    return nodes;
  }
}

export const routePlanner = new RoutePlanner();