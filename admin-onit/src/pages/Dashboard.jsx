import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    CreditCard,
    Activity,
    ArrowUpRight,
    UserCheck,
    CheckCircle2,
    XCircle,
    UserPlus,
    Filter,
    ChevronDown
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import RevenueChart from '../components/modules/dashboard/RevenueChart';

const Dashboard = () => {
    const navigate = useNavigate();
    const [performerLevel, setPerformerLevel] = useState('L1');

    const activityList = [
        { text: 'New task posted for "Web Development"', time: '2 mins ago', type: 'task' },
        { text: 'User "John Doe" completed KYC', time: '15 mins ago', type: 'kyc' },
        { text: 'Payout of ₹4,500 processed for "Alice"', time: '1 hour ago', type: 'finance' },
        { text: 'New service listing: "Plumbing"', time: '2 hours ago', type: 'service' },
        { text: '12 user flags resolved by Moderator', time: '5 hours ago', type: 'moderation' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 mt-1 font-medium">Overview of marketplace</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all">
                        Today: Feb 10, 2026
                    </button>
                    <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <Activity size={16} /> Live Monitor
                    </button>
                </div>
            </div>

            {/* Core Stats Section */}
            <div className="space-y-6">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Primary Operations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        label="Task Providers"
                        value="25"
                        trend="+12%"
                        icon={<UserPlus size={24} />}
                        color="green"
                        onClick={() => navigate('/users')}
                    />
                    <StatCard
                        label="Task Performers"
                        value="25"
                        trend="+8%"
                        icon={<Users size={24} />}
                        color="purple"
                        onClick={() => navigate('/users')}
                    />
                    <StatCard
                        label="Level of Task Performers"
                        value={performerLevel === 'L1' ? '18' : performerLevel === 'L2' ? '5' : '2'}
                        icon={<UserCheck size={24} />}
                        color="green"
                        onClick={() => navigate('/users')}
                    >
                        <div className="flex items-center gap-1 relative" onClick={(e) => e.stopPropagation()}>
                            <span className="text-[10px] font-black text-slate-400 uppercase mr-1">Level</span>
                            <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                                {['L1', 'L2', 'L3'].map(lvl => (
                                    <button
                                        key={lvl}
                                        onClick={() => setPerformerLevel(lvl)}
                                        className={`px-2 py-0.5 rounded-md text-[9px] font-black transition-all ${performerLevel === lvl ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                                            }`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </StatCard>
                    <StatCard
                        label="Daily Revenue"
                        value="₹45.2k"
                        trend="+18%"
                        icon={<CreditCard size={24} />}
                        color="orange"
                        onClick={() => navigate('/finance')}
                    />
                </div>
            </div>

            {/* Task Lifecycle Section */}
            <div className="space-y-6">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Task Lifecycle</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        label="Active Tasks"
                        value="156"
                        trend="+5.2%"
                        icon={<ShoppingBag size={24} />}
                        color="green"
                        onClick={() => navigate('/tasks')}
                    />
                    <StatCard
                        label="Completed Tasks"
                        value="10"
                        trend="+2%"
                        icon={<CheckCircle2 size={24} />}
                        color="green"
                        onClick={() => navigate('/tasks')}
                    />
                    <StatCard
                        label="Cancelled Tasks"
                        value="8"
                        trend="-1%"
                        icon={<XCircle size={24} />}
                        color="red"
                        onClick={() => navigate('/tasks')}
                    />
                </div>
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card p-8 shadow-xl shadow-slate-200/40 border-none">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-xl font-black text-slate-900">Revenue Trajectory</h3>
                            <p className="text-sm text-slate-500 font-medium">Daily transaction volume across all platform services.</p>
                        </div>
                        <div className="relative">
                            <select className="appearance-none bg-slate-50 border border-slate-100 text-xs font-black uppercase tracking-wider rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 cursor-pointer">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>This Year</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                    </div>
                    <RevenueChart />
                </div>

                {/* <div className="card p-8 flex flex-col shadow-xl shadow-slate-200/40 border-none bg-white">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-slate-900">Feed</h3>
                        <button className="text-emerald-600 text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-1">
                            Live Logs <ArrowUpRight size={14} />
                        </button>
                    </div>
                    <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {activityList.map((activity, i) => (
                            <div key={i} className="flex gap-4 group cursor-pointer">
                                <div className={`h-11 w-11 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all group-hover:rotate-12 ${i === 0 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
                                    }`}>
                                    {i === 0 ? <Activity size={18} /> : <div className="h-1.5 w-1.5 rounded-full bg-current" />}
                                </div>
                                <div className="space-y-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors leading-tight truncate">
                                        {activity.text}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Dashboard;
