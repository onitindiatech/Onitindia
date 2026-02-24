import React, { useState } from 'react';
import {
    Send,
    History,
    Bell,
    AlertTriangle,
    CheckCircle2,
    Smartphone,
    Mail,
    MessageSquare,
    Search,
    Filter,
    BarChart3,
    Clock,
    ShieldAlert
} from 'lucide-react';
import DataTable from '../components/common/DataTable.jsx';
import Toast from '../components/common/Toast.jsx';

const NotificationsPage = () => {
    const [activeTab, setActiveTab] = useState('composer');
    const [toast, setToast] = useState(null);
    const [isSending, setIsSending] = useState(false);

    // Composer State
    const [notification, setNotification] = useState({
        title: '',
        message: '',
        target: 'all',
        channels: { push: true, email: false, sms: false },
        priority: 'normal'
    });

    const handleSend = async (e) => {
        e.preventDefault();
        setIsSending(true);
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setToast({ message: 'Broadcast sent successfully!', type: 'success' });
            setNotification({ title: '', message: '', target: 'all', channels: { push: true, email: false, sms: false }, priority: 'normal' });
        } catch (error) {
            setToast({ message: 'Failed to send broadcast.', type: 'error' });
        } finally {
            setIsSending(false);
        }
    };

    const historyColumns = [
        {
            header: 'Notification',
            key: 'title',
            render: (val, row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 leading-tight">{val}</span>
                    <span className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]">{row.message}</span>
                </div>
            )
        },
        {
            header: 'Channels',
            key: 'channels',
            render: (val) => (
                <div className="flex items-center gap-1.5">
                    {val.includes('push') && <Smartphone size={14} className="text-slate-400" />}
                    {val.includes('email') && <Mail size={14} className="text-slate-400" />}
                    {val.includes('sms') && <MessageSquare size={14} className="text-slate-400" />}
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            render: (val) => (
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${val === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                    {val}
                </span>
            )
        },
        {
            header: 'Reach',
            key: 'reach',
            render: (val) => (
                <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${(val / 5000) * 100}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">{val}</span>
                </div>
            )
        },
        { header: 'Sent At', key: 'sentAt' }
    ];

    const mockHistory = [
        { id: 1, title: 'Platform Update 2.4', message: 'New features are now live in Mumbai area.', channels: ['push', 'email'], status: 'Delivered', reach: 4250, sentAt: '2h ago' },
        { id: 2, title: 'Weekend Promo', message: 'Get 20% off on all home cleanings.', channels: ['push', 'sms'], status: 'Processing', reach: 1200, sentAt: '45m ago' },
        { id: 3, title: 'Security Alert', message: 'Please update your verification documents.', channels: ['push'], status: 'Delivered', reach: 890, sentAt: '1d ago' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Area */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Communications</h1>
                    <p className="text-slate-500 mt-1 font-medium">Broadcast messages, manage automated alerts, and monitor system health.</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                    <button
                        onClick={() => setActiveTab('composer')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'composer' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Send size={16} /> Composer
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'history' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <History size={16} /> History
                    </button>
                </div>
            </div>

            {/* System Health Banner - Simplified implementation of Phase 8 requirement */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="card p-4 border-l-4 border-l-green-500 flex items-center gap-4">
                    <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                        <ShieldAlert size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">API Status</p>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">Operational</h3>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-green-600">Active</span>
                    </div>
                </div>
                <div className="card p-4 border-l-4 border-l-emerald-500 flex items-center gap-4">
                    <div className="h-10 w-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                        <BarChart3 size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Server Load</p>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">12% Under Capacity</h3>
                    </div>
                </div>
                <div className="card p-4 border-l-4 border-l-orange-500 flex items-center gap-4">
                    <div className="h-10 w-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Queue</p>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">Processing Normally</h3>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {activeTab === 'composer' ? (
                    <>
                        {/* Composer Form */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="card p-8 space-y-6">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold text-slate-900">Broadcast Composer</h2>
                                    <p className="text-sm text-slate-500 font-medium font-medium">Draft and schedule mass communications.</p>
                                </div>

                                <form onSubmit={handleSend} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Notification Title</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm"
                                            placeholder="e.g. Weekly Reward Program"
                                            value={notification.title}
                                            onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Message Content</label>
                                        <textarea
                                            required
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm h-32"
                                            placeholder="Enter your broadcast message here..."
                                            value={notification.message}
                                            onChange={(e) => setNotification({ ...notification, message: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Target Audience</label>
                                            <select
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                                                value={notification.target}
                                                onChange={(e) => setNotification({ ...notification, target: e.target.value })}
                                            >
                                                <option value="all">All Users</option>
                                                <option value="providers">Service Providers</option>
                                                <option value="performers">Skill Performers</option>
                                                <option value="mumbai">Mumbai Region</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Priority</label>
                                            <div className="flex items-center gap-2">
                                                {['normal', 'high', 'urgent'].map(p => (
                                                    <button
                                                        key={p}
                                                        type="button"
                                                        onClick={() => setNotification({ ...notification, priority: p })}
                                                        className={`flex-1 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${notification.priority === p
                                                            ? 'bg-slate-900 border-slate-900 text-white'
                                                            : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                                                            }`}
                                                    >
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Channels</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { id: 'push', label: 'Push', icon: <Smartphone size={16} /> },
                                                { id: 'email', label: 'Email', icon: <Mail size={16} /> },
                                                { id: 'sms', label: 'SMS', icon: <MessageSquare size={16} /> },
                                            ].map(ch => (
                                                <button
                                                    key={ch.id}
                                                    type="button"
                                                    onClick={() => setNotification({
                                                        ...notification,
                                                        channels: { ...notification.channels, [ch.id]: !notification.channels[ch.id] }
                                                    })}
                                                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${notification.channels[ch.id]
                                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                                                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                                        }`}
                                                >
                                                    {ch.icon}
                                                    <span className="text-[10px] font-bold">{ch.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSending || !notification.title || !notification.message}
                                        className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                                    >
                                        {isSending ? (
                                            <div className="h-6 w-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={20} /> Send Broadcast
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Preview / Stats */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="card p-6 bg-slate-900 text-white overflow-hidden relative">
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Live Preview</span>
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center gap-4">
                                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="h-5 w-5 bg-emerald-500 rounded flex items-center justify-center">
                                                    <Bell size={12} className="text-white" />
                                                </div>
                                                <span className="text-[10px] font-bold text-white/60">ONIT Admin &bull; Now</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-white truncate">{notification.title || 'Notification Title'}</h4>
                                            <p className="text-xs text-white/60 leading-relaxed line-clamp-2">{notification.message || 'Your message content will appear here once you start typing...'}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <p className="text-[10px] font-medium text-white/40 italic">Estimated Reach: <span className="text-white font-bold ml-1">~14,250 devices</span></p>
                                    </div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
                            </div>

                            <div className="card p-6 space-y-4">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Broadcast Rules</h4>
                                <ul className="space-y-3">
                                    {[
                                        { text: 'Keep titles under 50 characters', status: notification.title.length <= 50 },
                                        { text: 'Include a clear call to action', status: notification.message.length > 20 },
                                        { text: 'Select at least one high-reach channel', status: notification.channels.push || notification.channels.email },
                                    ].map((rule, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            {rule.status ? (
                                                <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                                            ) : (
                                                <AlertTriangle size={14} className="text-slate-300 shrink-0" />
                                            )}
                                            <span className={`text-[11px] font-medium ${rule.status ? 'text-slate-600' : 'text-slate-400'}`}>{rule.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="lg:col-span-12">
                        <div className="card">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-900">Broadcast History</h2>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search logs..."
                                            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                                        />
                                    </div>
                                    <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-all">
                                        <Filter size={18} />
                                    </button>
                                </div>
                            </div>
                            <DataTable
                                columns={historyColumns}
                                data={mockHistory}
                            />
                        </div>
                    </div>
                )}
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default NotificationsPage;
