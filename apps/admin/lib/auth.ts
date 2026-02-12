import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Operator' | 'Viewer';
}

interface AuthState {
  user: User | null; 
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const mockAdmin: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@pbts.local',
  role: 'Administrator',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  async login(email: string, password: string) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (data.success) {
        set({
          user: {
            id: data.admin.id,
            name: data.admin.name,
            email: data.admin.email,
            role: 'Administrator'
          },
          isAuthenticated: true
        })
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  },
  logout() {
    set({ user: null, isAuthenticated: false });
    window.location.href = '/auth/login';
  },
}));
