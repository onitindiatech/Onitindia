import React from 'react';
import { Search, Bell, User, MessageCircle, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ isSidebarCollapsed }) => {
    const { user, logout } = useAuth();

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD';
    };

    return (
        <header className={`fixed top-0 right-0 transition-all duration-300 ${isSidebarCollapsed ? 'left-20' : 'left-64'} h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-40`}>
            <div className="flex-1 flex items-center gap-4">

            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 rounded-full transition-colors">
                    <MessageCircle size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
                </button>

                <button className="relative p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200"></div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name || 'Admin User'}</p>
                            <p className="text-xs text-slate-500 mt-1 capitalize">{user?.role?.replace('_', ' ') || 'Administrator'}</p>
                        </div>
                        <div className="h-10 w-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-emerald-100 shadow-sm shadow-emerald-500/20">
                            {getInitials(user?.name)}
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
