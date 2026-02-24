import React, { useState } from 'react';
import {
    Settings as SettingsIcon,
    ShieldCheck,
    Percent,
    Banknote,
    Clock,
    Lock,
    Save,
    AlertTriangle,
    RefreshCw,
    ToggleRight,
    Search
} from 'lucide-react';
import Toast from '../components/common/Toast.jsx';

const SettingsPage = () => {
    const [toast, setToast] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [config, setConfig] = useState({
        serviceFee: 15,
        minPayout: 500,
        maintenanceMode: false,
        lockTransfers: false,
        kycRequired: true
    });

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setToast({ message: 'System configuration updated.', type: 'success' });
        } catch (error) {
            setToast({ message: 'Failed to update settings.', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
                    <p className="text-slate-500 mt-1 font-medium">Global platform configuration and administrative controls.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                    {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation */}
                <div className="space-y-1">
                    {['General', 'Security', 'Financial', 'Team', 'API'].map((tab) => (
                        <button
                            key={tab}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'General'
                                ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                                : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Financial Config */}
                    <div className="card p-6 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <Banknote size={18} />
                            </div>
                            <h3 className="font-black text-slate-900">Financial Rules</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Platform Fee (%)</label>
                                <div className="relative">
                                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="number"
                                        value={config.serviceFee}
                                        onChange={(e) => setConfig({ ...config, serviceFee: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Min. Payout (₹)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-bold">₹</span>
                                    <input
                                        type="number"
                                        value={config.minPayout}
                                        onChange={(e) => setConfig({ ...config, minPayout: e.target.value })}
                                        className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Toggles */}
                    <div className="card p-6 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                            <div className="h-8 w-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                <ShieldCheck size={18} />
                            </div>
                            <h3 className="font-black text-slate-900">Operational Controls</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { id: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Prevents all user logins while active.', icon: <AlertTriangle size={18} />, color: 'text-orange-500' },
                                { id: 'lockTransfers', label: 'Lock Global Payouts', desc: 'Pause all wallet to bank transfers.', icon: <Lock size={18} />, color: 'text-red-500' },
                                { id: 'kycRequired', label: 'Enforce Global KYC', desc: 'Requires document approval for all Performers.', icon: <ShieldCheck size={18} />, color: 'text-emerald-500' },
                            ].map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 transition-hover hover:bg-slate-50">
                                    <div className="flex gap-4">
                                        <div className={`mt-1 ${item.color}`}>{item.icon}</div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{item.label}</p>
                                            <p className="text-[11px] text-slate-400 font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setConfig({ ...config, [item.id]: !config[item.id] })}
                                        className={`h-6 w-11 rounded-full transition-all relative ${config[item.id] ? 'bg-emerald-600' : 'bg-slate-200'}`}
                                    >
                                        <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${config[item.id] ? 'left-6' : 'left-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Info */}
                    <div className="card p-6 bg-slate-900 border-none">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-sm">Last Config Update</h4>
                                <p className="text-white/40 text-xs mt-0.5 font-medium">Modified by Admin (Avinash) at 09:42 PM today.</p>
                            </div>
                        </div>
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

export default SettingsPage;
