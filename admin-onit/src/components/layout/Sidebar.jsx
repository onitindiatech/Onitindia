import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    Wallet,
    ShieldCheck,
    MessageSquare,
    BarChart3,
    Bell,
    Settings,
    LogOut,
    ChevronDown,
    ChevronRight,
    Headset
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const { logout } = useAuth();
    const location = useLocation();
    const [openMenus, setOpenMenus] = useState(['Support']);

    const toggleMenu = (label) => {
        setOpenMenus(prev =>
            prev.includes(label)
                ? prev.filter(item => item !== label)
                : [...prev, label]
        );
    };

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
        { icon: <Users size={20} />, label: 'User Management', path: '/users' },
        { icon: <ClipboardList size={20} />, label: 'Tasks', path: '/tasks' },
        { icon: <Wallet size={20} />, label: 'Finance', path: '/finance' },
        { icon: <ShieldCheck size={20} />, label: 'KYC', path: '/kyc' },
        { icon: <MessageSquare size={20} />, label: 'Moderation', path: '/moderation' },
        {
            icon: <Headset size={20} />,
            label: 'Support',
            isDropdown: true,
            children: [
                { label: 'Tickets', path: '/support/tickets' },
                { label: 'Live Chat', path: '/support/live-chat' },
                { label: 'Help Center', path: '/support/help-center' }
            ]
        },
        { icon: <BarChart3 size={20} />, label: 'Reports', path: '/reports' },
        { icon: <Bell size={20} />, label: 'Notifications', path: '/notifications' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    ];

    // Effect to auto-expand menus if a child is active
    React.useEffect(() => {
        if (isCollapsed) return;
        menuItems.forEach(item => {
            if (item.children?.some(child => location.pathname === child.path)) {
                if (!openMenus.includes(item.label)) {
                    setOpenMenus(prev => [...prev, item.label]);
                }
            }
        });
    }, [location.pathname, isCollapsed]);

    return (
        <aside className={`fixed left-0 top-0 h-screen transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} bg-white text-slate-900 flex flex-col z-50 border-r border-slate-200 group/sidebar`}>
            {/* Premium Floating Border Toggle */}
            <button
                onClick={toggleSidebar}
                className={`absolute -right-3.5 top-12 h-7 w-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:border-emerald-400 hover:text-emerald-600 transition-all z-[60] group/toggle opacity-0 group-hover/sidebar:opacity-100`}
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
                <ChevronRight
                    size={14}
                    className={`transition-transform duration-500 ease-out ${isCollapsed ? '' : 'rotate-180'} group-hover/toggle:scale-110`}
                />
            </button>

            <div className={`transition-all duration-300 flex items-center ${isCollapsed ? 'p-6 justify-center' : 'p-8 gap-3'}`}>
                <div className={`h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center font-black text-lg text-white shadow-xl shadow-emerald-500/30 transform transition-transform duration-500 ${isCollapsed ? '' : 'hover:rotate-12'}`}>
                    O
                </div>
                {!isCollapsed && (
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">
                            ONIT
                        </h1>
                        <span className="text-[10px] font-bold text-emerald-600 tracking-widest mt-0.5">ADMIN</span>
                    </div>
                )}
            </div>

            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar overflow-x-hidden">
                {menuItems.map((item) => {
                    const isOpen = openMenus.includes(item.label);
                    const hasActiveChild = item.children?.some(child => location.pathname === child.path);

                    if (isCollapsed) {
                        const isActive = location.pathname === item.path || hasActiveChild;
                        return (
                            <NavLink
                                key={item.label}
                                to={item.path || (item.children ? item.children[0].path : '#')}
                                className={`flex items-center justify-center p-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-50'
                                    : 'text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                                    }`}
                                title={item.label}
                            >
                                <span className={`${isActive ? 'text-white' : 'group-hover:text-emerald-600'} transition-transform duration-300 group-hover:scale-110`}>
                                    {item.icon}
                                </span>
                            </NavLink>
                        );
                    }

                    return (
                        <div key={item.label} className="space-y-1">
                            {item.isDropdown ? (
                                <>
                                    <button
                                        onClick={() => toggleMenu(item.label)}
                                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isOpen || hasActiveChild ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`${isOpen || hasActiveChild ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-600'} transition-colors duration-300`}>
                                                {item.icon}
                                            </span>
                                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                        </div>
                                        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'
                                        }`}>
                                        <div className="pl-11 space-y-1 border-l ml-6 border-slate-200">
                                            {item.children.map((child) => (
                                                <NavLink
                                                    key={child.path}
                                                    to={child.path}
                                                    className={({ isActive }) =>
                                                        `block py-2 text-sm font-bold transition-all duration-200 ${isActive
                                                            ? 'text-emerald-600'
                                                            : 'text-slate-500 hover:text-emerald-600'
                                                        }`
                                                    }
                                                >
                                                    {child.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                            : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'} transition-transform duration-300 group-hover:scale-110`}>
                                                {item.icon}
                                            </span>
                                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                        </>
                                    )}
                                </NavLink>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <button
                    onClick={logout}
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 w-full text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all group font-bold text-sm`}
                    title={isCollapsed ? "Sign Out" : ""}
                >
                    <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                    {!isCollapsed && <span>Sign Out</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
