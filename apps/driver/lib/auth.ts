import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Driver {
  driverId: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  phoneNumber: string;
  emergencyContact: string;
  emergencyPhone: string;
  shift: 'MORNING' | 'AFTERNOON' | 'NIGHT';
  status: 'ACTIVE' | 'OFF_DUTY' | 'BREAK';
  totalTrips?: number;
  rating?: number;
  experience?: number;
}

interface AuthState {
  driver: Driver | null;
  isAuthenticated: boolean;
  login: (employeeNumber: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateStatus: (status: Driver['status']) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      driver: null,
      isAuthenticated: false,
      
      login: async (employeeNumber: string, password: string) => {
        try {
          console.log('Attempting login with:', employeeNumber);
          
          const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api';
          
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: employeeNumber, // Backend accepts 'username' or 'email'
              password,
            }),
          });

          const data = await response.json();

          if (response.ok && data.success && data.user.role === 'DRIVER') {
            const driver: Driver = {
              driverId: data.user.id,
              employeeNumber: employeeNumber,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              licenseNumber: data.user.licenseNumber,
              phoneNumber: data.user.phoneNumber || '',
              emergencyContact: '', // Would need another fetch or update backend to return this
              emergencyPhone: '', // Would need another fetch or update backend to return this
              shift: 'MORNING', // Default for now
              status: 'ACTIVE',
              totalTrips: 0, // Default
              rating: 0, // Default
              experience: 0 // Default
            };
            
            // Store token in localStorage if needed, or rely on cookie if backend sets it
            if (data.token) {
              localStorage.setItem('token', data.token);
            }
            
            set({ driver, isAuthenticated: true });
            return true;
          }
          
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },
      
      logout: () => {
        set({ driver: null, isAuthenticated: false });
      },
      
      updateStatus: (status: Driver['status']) => {
        const { driver } = get();
        if (driver) {
          set({ driver: { ...driver, status } });
        }
      }
    }),
    {
      name: 'driver-auth',
      partialize: (state) => ({ driver: state.driver, isAuthenticated: state.isAuthenticated })
    }
  )
);