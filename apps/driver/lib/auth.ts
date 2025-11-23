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
  shift: 'MORNING' | 'AFTERNOON' | 'NIGHT';
  status: 'ACTIVE' | 'OFF_DUTY' | 'BREAK';
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
          console.log('Attempting login with:', employeeNumber, password);
          
          // Temporary hardcoded authentication for testing
          if (employeeNumber === 'DL-001-2020' && password === 'my_password') {
            const driver: Driver = {
              driverId: '6922f4926223088654c6aaa2',
              employeeNumber: 'DL-001-2020',
              firstName: 'Alemayehu',
              lastName: 'Tadesse',
              licenseNumber: 'DL-001-2020',
              phoneNumber: '+251911234567',
              emergencyContact: '+251911234568',
              shift: 'MORNING',
              status: 'ACTIVE'
            };
            
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