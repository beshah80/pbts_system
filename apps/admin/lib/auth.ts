import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'OPERATOR';
  permissions: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

// Mock users for demo
const mockUsers = [
  {
    id: '1',
    email: 'admin@pbts.et',
    password: 'admin123',
    name: 'System Administrator',
    role: 'ADMIN' as const,
    permissions: ['*'] // All permissions
  },
  {
    id: '2', 
    email: 'manager@pbts.et',
    password: 'manager123',
    name: 'Fleet Manager',
    role: 'MANAGER' as const,
    permissions: ['buses.read', 'buses.write', 'drivers.read', 'drivers.write', 'routes.read']
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          // Check admin credentials in database
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          
          if (response.ok) {
            const data = await response.json();
            const user = {
              id: data.admin.id,
              email: data.admin.email,
              name: data.admin.name,
              role: data.admin.role as 'ADMIN',
              permissions: ['*']
            };
            
            set({
              user,
              token: 'authenticated',
              isAuthenticated: true
            });
            
            return true;
          }
          
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      checkAuth: () => {
        const { user, isAuthenticated } = get();
        return isAuthenticated && user !== null;
      }
    }),
    {
      name: 'pbts-auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);

export const hasPermission = (permission: string, userPermissions: string[] = []): boolean => {
  if (userPermissions.includes('*')) return true;
  return userPermissions.includes(permission);
};