import searchData from '../../../asset/search.json';

export interface RealLocationData {
  id: string;
  name: string;
  nameAmharic?: string;
  coordinates: [number, number];
  address?: string;
  type?: string;
}

// Parse the real search data
const parseSearchData = (): RealLocationData[] => {
  const locations: RealLocationData[] = [];
  
  if (searchData && searchData.pois) {
    searchData.pois.forEach((poi: any, index: number) => {
      if (Array.isArray(poi) && poi.length >= 3) {
        const [name, alternativeNames, localizedNames, coordinates, address, type] = poi;
        
        if (name && coordinates && Array.isArray(coordinates) && coordinates.length === 2) {
          locations.push({
            id: `poi_${index}`,
            name: name,
            nameAmharic: localizedNames?.am || localizedNames?.en || name,
            coordinates: [coordinates[0], coordinates[1]],
            address: address || undefined,
            type: type || undefined
          });
        }
      }
    });
  }
  
  return locations;
};

const realLocations = parseSearchData();

export const searchRealLocations = (query: string, limit: number = 10): RealLocationData[] => {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  
  const matches = realLocations.filter(location => {
    const nameMatch = location.name.toLowerCase().includes(searchTerm);
    const amharicMatch = location.nameAmharic?.toLowerCase().includes(searchTerm);
    const addressMatch = location.address?.toLowerCase().includes(searchTerm);
    
    return nameMatch || amharicMatch || addressMatch;
  });
  
  // Sort by relevance (exact matches first, then partial matches)
  return matches
    .sort((a, b) => {
      const aExact = a.name.toLowerCase().startsWith(searchTerm) ? 1 : 0;
      const bExact = b.name.toLowerCase().startsWith(searchTerm) ? 1 : 0;
      return bExact - aExact;
    })
    .slice(0, limit);
};

export const getPopularRealLocations = (): RealLocationData[] => {
  const popularNames = [
    'Meskel Square', 'Bole Airport', 'Mercato', 'Piazza', 'Kazanchis', 
    'Arat Kilo', 'Mexico', 'Stadium', 'Legehar', 'Bambis'
  ];
  
  return popularNames
    .map(name => realLocations.find(loc => 
      loc.name.toLowerCase().includes(name.toLowerCase())
    ))
    .filter(Boolean) as RealLocationData[];
};

export const calculateRealDistance = (coord1: [number, number], coord2: [number, number]): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (coord2[1] - coord1[1]) * Math.PI / 180;
  const dLon = (coord2[0] - coord1[0]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[1] * Math.PI / 180) * Math.cos(coord2[1] * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};