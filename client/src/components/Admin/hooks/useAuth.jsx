import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('admin_user');
        const token = localStorage.getItem('admin_token');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('admin_user', JSON.stringify(userData));
        localStorage.setItem('admin_token', token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
    };

    const hasPermission = (requiredRole) => {
        if (!user) return false;
        // Super Admin has all permissions
        if (user.role === 'super_admin') return true;
        return user.role === requiredRole;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
