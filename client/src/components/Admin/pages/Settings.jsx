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
    Globe,
    ChevronRight,
    Plus,
    Trash2,
    X,
    Search
} from 'lucide-react';
import Toast from '../components/common/Toast.jsx';

const SettingsPage = () => {
    const [toast, setToast] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('General');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newDomain, setNewDomain] = useState({ name: '', slug: '', minPayout: 500 });

    const [config, setConfig] = useState({
        serviceFee: 15,
        maintenanceMode: false,
        lockTransfers: false,
        kycRequired: true,
        domains: [
            { id: 1, name: 'web development', minPayout: 500, status: 'active', slug: 'web-development' },
            { id: 2, name: 'content creation', minPayout: 1000, status: 'active', slug: 'content-creation' },
            { id: 3, name: 'video editing', minPayout: 200, status: 'active', slug: 'video-editing' }
        ]
    });

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setToast({ message: 'System configuration saved successfully.', type: 'success' });
        } catch (error) {
            setToast({ message: 'Failed to update settings.', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddDomain = () => {
        if (!newDomain.name || !newDomain.slug) {
            setToast({ message: 'Please fill in all required fields.', type: 'error' });
            return;
        }
        const newEntry = {
            id: Date.now(),
            ...newDomain,
            status: 'active'
        };
        setConfig({ ...config, domains: [...config.domains, newEntry] });
        setShowAddModal(false);
        setNewDomain({ name: '', slug: '', minPayout: 500 });
        setToast({ message: 'New domain added to list.', type: 'success' });
    };

    const removeDomain = (id) => {
        setConfig({ ...config, domains: config.domains.filter(d => d.id !== id) });
        setToast({ message: 'Domain removed.', type: 'info' });
    };

    const handleDomainPayoutChange = (id, value) => {
        setConfig(prev => ({
            ...prev,
            domains: prev.domains.map(d => d.id === id ? { ...d, minPayout: value } : d)
        }));
    };

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
                    <p className="text-slate-500 mt-1 font-medium">Global platform configuration and administrative controls.</p>
                </div>
                <div className="flex gap-3">
                    {activeTab === 'Domain' && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-white text-slate-900 border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all"
                        >
                            <Plus size={18} className="text-emerald-500" />
                            Add Domain
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                        {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation */}
                <div className="space-y-1">
                    {['General', 'Domain'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                                ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                                : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                {tab}
                                {activeTab === tab && <ChevronRight size={14} className="text-emerald-500" />}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-6">
                    {activeTab === 'General' ? (
                        <>
                            {/* Financial Config */}
                            <div className="card p-6 space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                                    <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <Banknote size={18} />
                                    </div>
                                    <h3 className="font-black text-slate-900">Financial Rules</h3>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Platform Fee (%)</label>
                                        <p className="text-[10px] text-slate-400 font-medium mb-1">Commission taken from all provider earnings.</p>
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
                        </>
                    ) : (
                        <div className="card p-6 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                                <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Globe size={18} />
                                </div>
                                <h3 className="font-black text-slate-900">Domain Configuration</h3>
                            </div>

                            <div className="space-y-4">
                                {config.domains.map((domain) => (
                                    <div key={domain.id} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-5 relative group overflow-hidden">
                                        <button
                                            onClick={() => removeDomain(domain.id)}
                                            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm text-slate-900 font-black text-xs uppercase tracking-tighter">
                                                    {domain.slug.substring(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900">{domain.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{domain.slug}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Active</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 pt-5 border-t border-slate-100/60">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Min. Payout (₹)</label>
                                                    <span className="text-[10px] font-bold text-slate-400">Current: ₹{domain.minPayout}</span>
                                                </div>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-sm">₹</span>
                                                    <input
                                                        type="number"
                                                        value={domain.minPayout}
                                                        onChange={(e) => handleDomainPayoutChange(domain.id, e.target.value)}
                                                        className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-black text-sm focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 focus:outline-none transition-all shadow-sm"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer Info */}
                    <div className="card p-6 bg-slate-900 border-none shadow-xl shadow-slate-900/10">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-sm">Last Config Update</h4>
                                <p className="text-white/40 text-[11px] mt-0.5 font-medium">Modified by Admin (Avinash) at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} today.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Domain Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900">Add New Domain</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Domain Name</label>
                                <input
                                    type="text"
                                    value={newDomain.name}
                                    onChange={(e) => setNewDomain({ ...newDomain, name: e.target.value })}
                                    placeholder="e.g. OnIT Dubai"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subdomain Slug</label>
                                <div className="flex items-center gap-2 group">
                                    <input
                                        type="text"
                                        value={newDomain.slug}
                                        onChange={(e) => setNewDomain({ ...newDomain, slug: e.target.value })}
                                        placeholder="dubai"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 focus:outline-none"
                                    />
                                    <span className="text-slate-400 font-bold whitespace-nowrap">.onit.com</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Min. Payout (₹)</label>
                                <input
                                    type="number"
                                    value={newDomain.minPayout}
                                    onChange={(e) => setNewDomain({ ...newDomain, minPayout: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 flex gap-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddDomain}
                                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
                            >
                                Create Domain
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
