import routingData from '../../../asset/search.json';

interface RouteGraph {
  [nodeId: string]: Array<[string, [number, number]]>;
}

// Calculate real distance between two coordinates using routing data
export function calculateRealDistance(startCoords: [number, number], endCoords: [number, number]): number {
  const graph = routingData as RouteGraph;
  
  // Find nearest nodes to start and end coordinates
  const startNode = findNearestNode(startCoords, graph);
  const endNode = findNearestNode(endCoords, graph);
  
  if (!startNode || !endNode) {
    // Fallback to straight-line distance
    return calculateStraightLineDistance(startCoords, endCoords);
  }
  
  // Use Dijkstra's algorithm to find shortest path
  const result = dijkstra(startNode, endNode, graph);
  
  return result || calculateStraightLineDistance(startCoords, endCoords);
}

// Calculate estimated travel time based on distance and average speed
export function calculateTravelTime(distance: number): number {
  const averageSpeedKmh = 25; // Average bus speed in Addis Ababa
  const timeHours = distance / averageSpeedKmh;
  return Math.round(timeHours * 60); // Convert to minutes
}

// Find the nearest node in the routing graph
function findNearestNode(coords: [number, number], graph: RouteGraph): string | null {
  let minDistance = Infinity;
  let nearestNode: string | null = null;
  
  for (const [nodeId, connections] of Object.entries(graph)) {
    for (const [, nodeCoords] of connections) {
      const distance = calculateStraightLineDistance(coords, nodeCoords);
      if (distance < minDistance) {
        minDistance = distance;
        nearestNode = nodeId;
      }
    }
  }
  
  return nearestNode;
}

// Dijkstra's algorithm for shortest path
function dijkstra(startNode: string, endNode: string, graph: RouteGraph): number | null {
  const distances: { [key: string]: number } = {};
  const visited = new Set<string>();
  const unvisited = new Set<string>();
  
  // Initialize distances
  for (const nodeId of Object.keys(graph)) {
    distances[nodeId] = Infinity;
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
    visited.add(currentNode);
    
    // Check neighbors
    const neighbors = graph[currentNode] || [];
    for (const [neighborId, neighborCoords] of neighbors) {
      if (visited.has(neighborId)) continue;
      
      const currentCoords = getNodeCoordinates(currentNode, graph);
      if (!currentCoords) continue;
      
      const edgeWeight = calculateStraightLineDistance(currentCoords, neighborCoords);
      const newDistance = distances[currentNode] + edgeWeight;
      
      if (newDistance < distances[neighborId]) {
        distances[neighborId] = newDistance;
      }
    }
  }
  
  return distances[endNode] !== Infinity ? distances[endNode] : null;
}

// Get coordinates for a node
function getNodeCoordinates(nodeId: string, graph: RouteGraph): [number, number] | null {
  const connections = graph[nodeId];
  if (!connections || connections.length === 0) return null;
  return connections[0][1];
}

// Calculate straight-line distance using Haversine formula
function calculateStraightLineDistance(coord1: [number, number], coord2: [number, number]): number {
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

// Get coordinates for known locations
export function getLocationCoordinates(location: string): [number, number] | null {
  const locationMap: { [key: string]: [number, number] } = {
    'meskel square': [38.7489895, 9.0448488],
    'bole airport': [38.7901014, 9.0077425],
    'mercato': [38.7622593, 8.9973568],
    'piazza': [38.7437676, 9.0468098],
    'kazanchis': [38.7669016, 9.0555153],
    'arat kilo': [38.7218441, 9.0582133],
    'addis ababa university': [38.7636, 9.0054],
    'stadium': [38.7578, 9.0054],
    'mexico': [38.7489, 9.0448],
    'legehar': [38.7901, 9.0077],
    'gotera': [38.7622, 8.9973],
    'sidist kilo': [38.7437, 9.0468],
    // Add more common locations
    'bole': [38.7901014, 9.0077425],
    'merkato': [38.7622593, 8.9973568],
    'meskel': [38.7489895, 9.0448488],
    'piasa': [38.7437676, 9.0468098],
    'arada': [38.7437676, 9.0468098],
    'kirkos': [38.7489895, 9.0448488],
    'nifas silk': [38.7622593, 8.9973568],
    'kolfe': [38.7218441, 9.0582133],
    'yeka': [38.7669016, 9.0555153],
    'gulele': [38.7901014, 9.0077425],
    'addis ketema': [38.7437676, 9.0468098],
    'lideta': [38.7489895, 9.0448488],
    'akaki': [38.7218441, 9.0582133],
    'bole subcity': [38.7901014, 9.0077425],
    'lafto': [38.7669016, 9.0555153]
  };
  
  const normalized = location.toLowerCase().trim();
  
  // Try exact match first
  if (locationMap[normalized]) {
    return locationMap[normalized];
  }
  
  // Try partial match
  for (const [key, coords] of Object.entries(locationMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return coords;
    }
  }
  
  return null;
}