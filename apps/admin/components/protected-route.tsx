'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/auth/login');
      return;
    }

    if (requiredPermission && user) {
      const hasAccess = user.permissions.includes('*') || user.permissions.includes(requiredPermission);
      if (!hasAccess) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, user, requiredPermission, router, checkAuth]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requiredPermission && user) {
    const hasAccess = user.permissions.includes('*') || user.permissions.includes(requiredPermission);
    if (!hasAccess) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}