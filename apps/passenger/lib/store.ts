import { create } from 'zustand';
import { Route, RouteSearchResult, SearchFilters } from '@/types';

interface PassengerStore {
  // Search state
  searchFilters: SearchFilters;
  searchResults: RouteSearchResult[];
  isSearching: boolean;
  
  // Selected route
  selectedRoute: Route | null;
  
  // Favorites
  favoriteRoutes: string[];
  
  // Actions
  setSearchFilters: (filters: SearchFilters) => void;
  setSearchResults: (results: RouteSearchResult[]) => void;
  setIsSearching: (loading: boolean) => void;
  setSelectedRoute: (route: Route | null) => void;
  addToFavorites: (routeId: string) => void;
  removeFromFavorites: (routeId: string) => void;
  clearSearch: () => void;
}

export const usePassengerStore = create<PassengerStore>((set, get) => ({
  // Initial state
  searchFilters: {},
  searchResults: [],
  isSearching: false,
  selectedRoute: null,
  favoriteRoutes: [],
  
  // Actions
  setSearchFilters: (filters) => set({ searchFilters: filters }),
  
  setSearchResults: (results) => set({ searchResults: results }),
  
  setIsSearching: (loading) => set({ isSearching: loading }),
  
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  
  addToFavorites: (routeId) => {
    const { favoriteRoutes } = get();
    if (!favoriteRoutes.includes(routeId)) {
      set({ favoriteRoutes: [...favoriteRoutes, routeId] });
    }
  },
  
  removeFromFavorites: (routeId) => {
    const { favoriteRoutes } = get();
    set({ favoriteRoutes: favoriteRoutes.filter(id => id !== routeId) });
  },
  
  clearSearch: () => set({ 
    searchFilters: {}, 
    searchResults: [], 
    selectedRoute: null 
  })
}));