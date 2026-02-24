import React, { useState } from 'react';
import {
    MessageCircle,
    Filter,
    Search,
    MoreHorizontal,
    Clock,
    CheckCircle2,
    AlertCircle,
    User,
    Tag,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';
import DataTable from '../../components/common/DataTable.jsx';

const TicketsPage = () => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        {
            header: 'Ticket ID',
            key: 'id',
            render: (val) => (
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    #{val}
                </span>
            )
        },
        {
            header: 'Customer',
            key: 'customer',
            render: (val, row) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">
                        {val[0]}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{val}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{row.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Category',
            key: 'category',
            render: (val) => (
                <div className="flex items-center gap-2">
                    <Tag size={14} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">{val}</span>
                </div>
            )
        },
        {
            header: 'Priority',
            key: 'priority',
            render: (val) => (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${val === 'High' ? 'bg-red-100 text-red-600' :
                        val === 'Medium' ? 'bg-orange-100 text-orange-600' :
                            'bg-blue-100 text-blue-600'
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
                    {val === 'Open' ? <AlertCircle size={14} className="text-warning" /> :
                        val === 'Resolved' ? <CheckCircle2 size={14} className="text-success" /> :
                            <Clock size={14} className="text-slate-400" />}
                    <span className={`text-sm font-bold ${val === 'Open' ? 'text-warning' :
                            val === 'Resolved' ? 'text-success' :
                                'text-slate-500'
                        }`}>{val}</span>
                </div>
            )
        },
        {
            header: 'Last Update',
            key: 'updatedAt',
            render: (val) => <span className="text-sm text-slate-500">{val}</span>
        }
    ];

    const mockTickets = [
        { id: 'TIC-001', customer: 'Arjun Mehta', email: 'arjun@example.com', category: 'Payment', priority: 'High', status: 'Open', updatedAt: '2h ago', description: 'Double deduction on the last transaction.' },
        { id: 'TIC-002', customer: 'Sanya Malhotra', email: 'sanya@example.com', category: 'Service', priority: 'Medium', status: 'Pending', updatedAt: '5h ago', description: 'Task performer not responsive.' },
        { id: 'TIC-003', customer: 'Rohan Deshmukh', email: 'rohan@example.com', category: 'Technical', priority: 'Low', status: 'Resolved', updatedAt: '1d ago', description: 'Profile picture not uploading.' },
        { id: 'TIC-004', customer: 'Kavita Singh', email: 'kavita@example.com', category: 'Payment', priority: 'High', status: 'Open', updatedAt: '30m ago', description: 'Payout showing as completed but not received.' },
        { id: 'TIC-005', customer: 'Ishaan Verma', email: 'ishaan@example.com', category: 'Account', priority: 'Medium', status: 'Open', updatedAt: '4h ago', description: 'Change registered mobile number.' },
    ];

    const filteredTickets = mockTickets.filter(ticket => {
        const matchesTab = activeTab === 'all' || ticket.status.toLowerCase() === activeTab.toLowerCase();
        const matchesSearch = ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Support Tickets</h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage and resolve customer complaints efficiently.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-primary flex items-center gap-2 px-6 py-3 shadow-lg shadow-blue-500/20">
                        <MessageCircle size={18} />
                        <span>Create New Ticket</span>
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Tickets', value: mockTickets.length, icon: MoreHorizontal, color: 'bg-slate-500' },
                    { label: 'Open', value: mockTickets.filter(t => t.status === 'Open').length, icon: AlertCircle, color: 'bg-warning' },
                    { label: 'Pending', value: mockTickets.filter(t => t.status === 'Pending').length, icon: Clock, color: 'bg-slate-400' },
                    { label: 'ResolvedToday', value: mockTickets.filter(t => t.status === 'Resolved').length, icon: CheckCircle2, color: 'bg-success' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`h-10 w-10 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                                <stat.icon size={20} className={stat.color.replace('bg-', 'text-')} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-4 border-b border-slate-100 pb-px">
                    {[
                        { id: 'all', label: 'All Tickets' },
                        { id: 'open', label: 'Open' },
                        { id: 'pending', label: 'Pending' },
                        { id: 'resolved', label: 'Resolved' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative pb-4 px-2 text-sm font-black transition-all ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full shadow-lg shadow-blue-500/40" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 flex-1 max-w-xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search ticket ID or customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent/20 transition-all font-black"
                        />
                    </div>
                    <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <DataTable
                    columns={columns}
                    data={filteredTickets}
                    actions={true}
                    hideToolbar={true}
                    onRowClick={(row) => setSelectedTicket(row)}
                />
            </div>

            {/* Ticket Detail Sidebar */}
            {selectedTicket && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end animate-in fade-in duration-300">
                    <div className="w-full max-w-2xl bg-white h-screen shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500">
                        {/* Detail Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <span className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-slate-400">
                                    <MessageCircle size={20} />
                                </span>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Ticket Details</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedTicket.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"
                            >
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        {/* Detail Body */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {/* Status Card */}
                            <div className="flex items-center justify-between bg-accent/5 border border-accent/10 p-6 rounded-2xl">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-accent uppercase tracking-widest">Current Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-2.5 w-2.5 rounded-full ${selectedTicket.status === 'Open' ? 'bg-warning' :
                                                selectedTicket.status === 'Resolved' ? 'bg-success' : 'bg-slate-400'
                                            }`} />
                                        <span className="text-lg font-black text-slate-900">{selectedTicket.status}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                                        Assign Tech
                                    </button>
                                    <button className="px-4 py-2 bg-success text-white rounded-lg text-xs font-bold hover:bg-success/90">
                                        Resolve Now
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <section>
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Customer Info</h4>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-slate-200 text-slate-400">
                                                    <User size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900">{selectedTicket.customer}</p>
                                                    <p className="text-xs font-medium text-slate-500">{selectedTicket.email}</p>
                                                </div>
                                            </div>
                                            <button className="w-full mt-2 flex items-center justify-center gap-2 py-2 text-xs font-bold text-accent hover:bg-accent/5 rounded-lg border border-accent/10">
                                                View Profile <ArrowUpRight size={14} />
                                            </button>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Classification</h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-sm font-medium">
                                                <span className="text-slate-500 flex items-center gap-2"><Tag size={16} /> Category</span>
                                                <span className="text-slate-900 font-bold">{selectedTicket.category}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm font-medium">
                                                <span className="text-slate-500 flex items-center gap-2"><Clock size={16} /> Created</span>
                                                <span className="text-slate-900 font-bold">{selectedTicket.updatedAt}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm font-medium">
                                                <span className="text-slate-500 flex items-center gap-2"><AlertCircle size={16} /> Priority</span>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${selectedTicket.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    {selectedTicket.priority}
                                                </span>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-6">
                                    <section>
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Complaint Description</h4>
                                        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl text-sm leading-relaxed font-medium shadow-xl shadow-slate-900/10">
                                            "{selectedTicket.description}"
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Resolution History</h4>
                                        <div className="space-y-4">
                                            <div className="border-l-2 border-slate-100 pl-4 py-1 relative">
                                                <div className="absolute left-[-5px] top-2 h-2 w-2 rounded-full bg-slate-300" />
                                                <p className="text-xs font-bold text-slate-900">System generated</p>
                                                <p className="text-[10px] text-slate-400 mt-1">Ticket created successfully</p>
                                            </div>
                                            <div className="border-l-2 border-slate-100 pl-4 py-1 relative">
                                                <div className="absolute left-[-5px] top-2 h-2 w-2 rounded-full bg-blue-400" />
                                                <p className="text-xs font-bold text-slate-900">Support AI</p>
                                                <p className="text-[10px] text-slate-400 mt-1">Sentiment: Negative (Payment Issue)</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>

                        {/* Quick Reply Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50">
                            <div className="relative">
                                <textarea
                                    placeholder="Write a response to the customer..."
                                    className="w-full bg-white border border-slate-200 rounded-2xl p-4 pr-16 text-sm font-black focus:outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent/20 transition-all resize-none"
                                    rows="1"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-accent text-white rounded-xl flex items-center justify-center hover:bg-accent-hover transition-all shadow-lg shadow-blue-500/20">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketsPage;
