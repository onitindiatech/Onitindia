import React, { useState } from 'react';
import { UserPlus, UserCheck, UserX, Search, Mail, Phone, Calendar, Filter } from 'lucide-react';
import DataTable from '../components/common/DataTable.jsx';

const UsersPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [activeRole, setActiveRole] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        {
            header: 'User',
            key: 'name',
            render: (val, row) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold overflow-hidden">
                        {row.avatar ? <img src={row.avatar} alt="" className="h-full w-full object-cover" /> : val[0]}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{val}</p>
                        <p className="text-xs text-slate-400 mt-1">{row.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Role',
            key: 'role',
            render: (val) => (
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${val === 'Provider' ? 'bg-emerald-100 text-emerald-700' : 'bg-green-100 text-green-700'
                    }`}>
                    {val}
                </span>
            )
        },
        {
            header: 'Status',
            key: 'status',
            render: (val) => (
                <div className="flex items-center gap-1.5">
                    <div className={`h-2 w-2 rounded-full ${val === 'Active' ? 'bg-success' : val === 'Pending' ? 'bg-warning' : 'bg-red-500'
                        }`} />
                    <span className="text-sm font-medium text-slate-600">{val}</span>
                </div>
            )
        },
        { header: 'Work Done', key: 'tasks' },
        { header: 'Joined', key: 'joined' },
    ];

    const mockUsers = [
        { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Provider', status: 'Active', tasks: 42, joined: 'Jan 12, 2024' },
        { id: 2, name: 'Priya Verma', email: 'priya@example.com', role: 'Performer', status: 'Active', tasks: 128, joined: 'Feb 05, 2024' },
        { id: 3, name: 'Amit Patel', email: 'amit@example.com', role: 'Provider', status: 'Pending', tasks: 5, joined: 'Mar 01, 2024' },
        { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', role: 'Performer', status: 'Active', tasks: 89, joined: 'Dec 20, 2023' },
        { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', role: 'Provider', status: 'Suspended', tasks: 15, joined: 'Jan 28, 2024' },
        { id: 6, name: 'Anjali Desai', email: 'anjali@example.com', role: 'Performer', status: 'Pending', tasks: 0, joined: 'Feb 10, 2024' },
        { id: 7, name: 'Karan Mehra', email: 'karan@example.com', role: 'Provider', status: 'Active', tasks: 31, joined: 'Feb 02, 2024' },
        { id: 8, name: 'Meera Rai', email: 'meera@example.com', role: 'Performer', status: 'Suspended', tasks: 12, joined: 'Nov 15, 2023' },
    ];

    const filteredUsers = mockUsers.filter(user => {
        const matchesTab = activeTab === 'all' ||
            (activeTab === 'pending' && user.status === 'Pending') ||
            (activeTab === 'flagged' && user.status === 'Suspended');

        const matchesRole = activeRole === 'all' ||
            (activeRole === 'provider' && user.role === 'Provider') ||
            (activeRole === 'performer' && user.role === 'Performer');

        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toString().includes(searchTerm);

        return matchesTab && matchesRole && matchesSearch;
    });

    const counts = {
        all: mockUsers.length,
        pending: mockUsers.filter(u => u.status === 'Pending').length,
        flagged: mockUsers.filter(u => u.status === 'Suspended').length,
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center md:text-left">Identity Management</h1>
                    <p className="text-slate-500 mt-1 font-medium text-center md:text-left">System-wide control over platform participants and roles.</p>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-lg shadow-emerald-500/20 px-6 py-3 rounded-xl font-bold transition-all">
                        <UserPlus size={18} />
                        <span>Add New Staff</span>
                    </button>
                </div>
            </div>

            {/* Navigation & Filters */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-px gap-4">
                    <div className="flex gap-8 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'all', label: 'All Users', count: counts.all },
                            { id: 'pending', label: 'Pending Verification', count: counts.pending },
                            { id: 'flagged', label: 'Flagged/Suspended', count: counts.flagged }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative pb-4 px-1 flex items-center gap-2.5 transition-all group ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <span className={`text-sm font-black whitespace-nowrap ${activeTab === tab.id ? '' : 'text-slate-500'}`}>{tab.label}</span>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
                                    }`}>
                                    {tab.count}
                                </span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                        <button
                            onClick={() => setActiveRole('all')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeRole === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            All Roles
                        </button>
                        <button
                            onClick={() => setActiveRole('provider')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeRole === 'provider' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            Providers
                        </button>
                        <button
                            onClick={() => setActiveRole('performer')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeRole === 'performer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            Performers
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md focus-within:scale-[1.01] transition-transform duration-300">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search name, email or ID..."
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-accent/5 focus:bg-white focus:border-accent/20 transition-all placeholder:text-slate-400 shadow-sm font-black"
                        />
                    </div>
                    <button className="px-6 py-3.5 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 border border-slate-100 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all">
                        <Filter size={16} /> Advanced Filter
                    </button>
                </div>
            </div>

            <div className="min-h-[500px]">
                <DataTable
                    columns={columns}
                    data={filteredUsers}
                    actions={true}
                    hideToolbar={true}
                    onRowClick={(user) => setSelectedUser(user)}
                />
            </div>

            {/* User Detail View (Drawer placeholder) */}
            {selectedUser && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end animate-in fade-in duration-300">
                    <div className="w-full max-w-md bg-white h-screen shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-extrabold text-slate-900">User Details</h2>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center pb-8 border-b border-slate-100">
                            <div className="h-24 w-24 bg-accent/10 text-accent rounded-full flex items-center justify-center text-3xl font-black mb-4">
                                {selectedUser.name[0]}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">{selectedUser.name}</h3>
                            <p className="text-slate-500 font-medium">{selectedUser.role} • {selectedUser.status}</p>
                        </div>

                        <div className="py-8 space-y-6">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Contact Information</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail size={16} className="text-slate-400" />
                                        <span className="font-medium text-slate-700">{selectedUser.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone size={16} className="text-slate-400" />
                                        <span className="font-medium text-slate-700">+91 98765 43210</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar size={16} className="text-slate-400" />
                                        <span className="font-medium text-slate-700">Member since {selectedUser.joined}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 grid grid-cols-2 gap-4">
                                <button className="w-full p-2 border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50">
                                    Suspend Account
                                </button>
                                <button className="w-full p-2 bg-accent text-white rounded-lg font-bold text-sm hover:bg-accent-hover">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
