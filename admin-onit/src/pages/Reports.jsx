import React, { useState } from 'react';
import {
    FileText,
    Download,
    Calendar,
    BarChart3,
    Users,
    Wallet,
    CheckCircle2,
    ArrowRight,
    Search,
    Clock,
    Mail,
    TrendingUp,
    PieChart as PieChartIcon,
    Filter
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    AreaChart,
    Area,
    PieChart,
    Pie
} from 'recharts';
import Toast from '../components/common/Toast.jsx';

const ReportsPage = () => {
    const [dateRange, setDateRange] = useState('7d');
    const [selectedModules, setSelectedModules] = useState(['Users', 'Finance']);
    const [isGenerating, setIsGenerating] = useState(false);
    const [toast, setToast] = useState(null);
    const [activeChart, setActiveChart] = useState('categories');

    // Mock Data for Categorical Distribution
    const categoryData = [
        { name: 'Cleaning', revenue: 45000, tasks: 120 },
        { name: 'Plumbing', revenue: 28000, tasks: 85 },
        { name: 'Electrical', revenue: 35000, tasks: 92 },
        { name: 'Painting', revenue: 52000, tasks: 45 },
        { name: 'Appliance', revenue: 18000, tasks: 60 },
    ];

    const growthData = [
        { month: 'Jan', revenue: 120000 },
        { month: 'Feb', revenue: 145000 },
        { month: 'Mar', revenue: 138000 },
        { month: 'Apr', revenue: 160000 },
        { month: 'May', revenue: 185000 },
        { month: 'Jun', revenue: 210000 },
    ];

    const userSegments = [
        { name: 'New Users', value: 400 },
        { name: 'Active', value: 800 },
        { name: 'Inactive', value: 150 },
    ];

    const COLORS = ['#059669', '#d11714ff', '#1377c9ff', '#6a187cff', '#200ec1ff'];

    const modules = [
        { id: 'Users', icon: <Users size={18} />, desc: 'User growth, activity, and retention.' },
        { id: 'Finance', icon: <Wallet size={18} />, desc: 'Revenue, payouts, and wallet logs.' },
        { id: 'Tasks', icon: <CheckCircle2 size={18} />, desc: 'Completion rates and service metrics.' },
        { id: 'Security', icon: <FileText size={18} />, desc: 'KYC trends and moderation logs.' },
    ];

    const handleGenerate = async (format) => {
        if (selectedModules.length === 0) {
            setToast({ message: 'Please select at least one module.', type: 'error' });
            return;
        }
        setIsGenerating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setToast({ message: `Report generated successfully in ${format} format.`, type: 'success' });
        } catch (error) {
            setToast({ message: 'Failed to generate report.', type: 'error' });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Analytics & Reports</h1>
                    <p className="text-slate-500 mt-1 font-medium">Detailed visual insights and customizable data exports.</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {['Today', '7d', '30d', 'All'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setDateRange(r)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${dateRange === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Visual Analytics Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Secondary Charts */}
                <div className="space-y-6">
                    <div className="card p-6 bg-white space-y-4 shadow-xl shadow-slate-200/40">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                                <TrendingUp size={16} className="text-emerald-500" /> Revenue Growth
                            </h3>
                            <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+12.5%</span>
                        </div>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={growthData}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px', fontWeight: 'bold' }}
                                        formatter={(val) => [`₹${val}`, 'Revenue']}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card p-6 bg-slate-900 text-white space-y-4">
                        <h3 className="text-sm font-black flex items-center gap-2 uppercase tracking-tight text-white/60">
                            <PieChartIcon size={16} className="text-emerald-400" /> User Distribution
                        </h3>
                        <div className="h-[180px] w-full flex items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={userSegments}
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {userSegments.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="space-y-2 pr-4">
                                {userSegments.map((seg, i) => (
                                    <div key={seg.name} className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-white/50">{seg.name}</span>
                                            <span className="text-xs font-black">{seg.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Categorical Analysis */}
                <div className="lg:col-span-2">
                    <div className="card p-8 bg-white h-full shadow-xl shadow-slate-200/40 relative">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-black text-slate-900">Performance Categories</h2>
                                <p className="text-sm font-medium text-slate-400 mt-0.5">Revenue and task volume distribution by service type.</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveChart('revenue')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeChart === 'revenue' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    By Revenue
                                </button>
                                <button
                                    onClick={() => setActiveChart('tasks')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeChart === 'tasks' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    By Tasks
                                </button>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                                        tickFormatter={(val) => activeChart === 'revenue' ? `₹${val / 1000}k` : val}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', padding: '12px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar
                                        dataKey={activeChart === 'revenue' ? 'revenue' : 'tasks'}
                                        radius={[8, 8, 0, 0]}
                                        barSize={40}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Configuration Panel - Enhanced */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="card p-8 bg-white space-y-8 shadow-xl shadow-slate-200/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                    <Search size={20} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900">Custom Export Engine</h3>
                            </div>
                            <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest">
                                <Filter size={14} /> Set Advanced Filters
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {modules.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => toggleModule(m.id)}
                                    className={`flex flex-col gap-3 p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${selectedModules.includes(m.id)
                                        ? 'bg-emerald-600 border-emerald-600 shadow-lg shadow-emerald-500/20'
                                        : 'bg-white border-slate-100 hover:border-slate-200'
                                        }`}
                                >
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${selectedModules.includes(m.id) ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {m.icon}
                                    </div>
                                    <p className={`text-sm font-black transition-colors ${selectedModules.includes(m.id) ? 'text-white' : 'text-slate-900'}`}>
                                        {m.id}
                                    </p>
                                    {selectedModules.includes(m.id) && (
                                        <div className="absolute top-2 right-2">
                                            <CheckCircle2 size={16} className="text-white/80" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <button
                                onClick={() => handleGenerate('CSV')}
                                disabled={isGenerating}
                                className="flex-1 bg-slate-900 text-white h-14 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <Download size={20} /> Export as CSV
                            </button>
                            <button
                                onClick={() => handleGenerate('PDF')}
                                disabled={isGenerating}
                                className="flex-1 border-2 border-slate-100 h-14 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <FileText size={20} /> Export as PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Automation & Insights */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="card p-8 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white space-y-6 overflow-hidden relative group">
                        <div className="absolute -right-8 -top-8 bg-white/10 h-32 w-32 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700" />
                        <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <Mail size={28} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black leading-tight">Insight Engine</h3>
                            <p className="text-white/70 text-sm font-medium leading-relaxed">
                                Get automated weekly reports and trend alerts delivered to your executive dashboard.
                            </p>
                        </div>
                        <button className="w-full bg-white text-emerald-800 h-12 rounded-xl font-black text-sm hover:translate-y-[-2px] hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            Schedule Delivery <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="card p-6 bg-slate-50 border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Status</h4>
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-slate-900">92.4k</span>
                            <span className="text-xs font-bold text-green-600 flex items-center gap-1">+4%</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium mt-1">Total platform engagements this period.</p>
                    </div>
                </div>
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

export default ReportsPage;
