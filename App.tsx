import React, { useState, createContext, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserRole } from './types';
import { PassengerUI } from './components/PassengerUI';
import { AdminUI } from './components/AdminUI';
import { DriverUI } from './components/DriverUI';
import { driverApi, initializeDatabase } from './services/api';

interface User {
    id: string;
    role: UserRole;
    name: string;
}

export interface AuthContextType {
    user: User | null;
    login: (id: string, role: UserRole, name?: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (id: string, role: UserRole, name?: string) => {
        let userName = name;
        if (role === UserRole.DRIVER) {
            const drivers = await driverApi.getAll();
            const driver = drivers.find(d => d.id === id);
            userName = driver?.name || 'Driver';
        }
        setUser({ id, role, name: userName || 'User' });
    };

    const logout = () => {
        setUser(null);
    };

    const value = useMemo(() => ({
        user,
        login,
        logout
    }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user } = React.useContext(AuthContext) as AuthContextType;
    const location = useLocation();

    if (!user || !allowedRoles.includes(user.role)) {
        // Redirect them to the appropriate login page.
        const redirectTo = allowedRoles.includes(UserRole.ADMIN) ? '/admin' : '/driver';
        return <Navigate to={redirectTo.replace('#', '')} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PassengerUI />} />
            <Route path="/admin" element={<AdminUI />} />
            <Route path="/driver" element={<DriverUI />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

function App() {
    useEffect(() => {
        initializeDatabase();
    }, []);

    return (
        <AuthProvider>
            <HashRouter>
                <AppRoutes />
            </HashRouter>
        </AuthProvider>
    );
}

export default App;