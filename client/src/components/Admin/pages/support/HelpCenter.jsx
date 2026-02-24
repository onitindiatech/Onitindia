import React, { useState } from 'react';
import {
    HelpCircle,
    Search,
    BookOpen,
    ShieldCheck,
    CreditCard,
    UserPlus,
    AlertCircle,
    ChevronRight,
    Plus,
    FileText,
    ExternalLink,
    Star
} from 'lucide-react';

const HelpCenterPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        {
            title: 'Payment & Billing',
            icon: CreditCard,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            articles: ['Payment Methods', 'Payout Schedule', 'Refund Policy']
        },
        {
            title: 'Account & Security',
            icon: ShieldCheck,
            color: 'text-green-500',
            bg: 'bg-green-50',
            articles: ['Two-Factor Auth', 'Password Reset', 'Profile Privacy']
        },
        {
            title: 'Task Management',
            icon: BookOpen,
            color: 'text-purple-500',
            bg: 'bg-purple-50',
            articles: ['Creating Tasks', 'Quality Guidelines', 'Dispute Resolution']
        },
    ];

    const popularArticles = [
        { title: 'How to verify your ID', Category: 'Account', views: '12k' },
        { title: 'Transaction processing times', Category: 'Payment', views: '8.4k' },
        { title: 'Task priority levels', Category: 'Tasks', views: '5.2k' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-12 text-white">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        How can we <span className="text-blue-400 italic">help</span> you today?
                    </h1>
                    <p className="text-slate-400 mt-4 text-lg font-medium">
                        Search for help articles, troubleshooting guides, and platform policies.
                    </p>
                    <div className="mt-10 relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                        <input
                            type="text"
                            placeholder="Enter keywords (e.g., 'payment delay', 'kyc verification')"
                            className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-lg font-black focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:bg-white focus:text-slate-900 transition-all placeholder:text-slate-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                {/* Abstract Background Shapes */}
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
            </div>

            {/* CRITICAL: Payment Complaints Section */}
            <div className="bg-red-50/50 border border-red-100 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:border-red-200 transition-all">
                <div className="absolute right-0 top-0 p-8 text-red-100/30 group-hover:scale-110 transition-transform duration-500">
                    <AlertCircle size={120} />
                </div>
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Urgent Issue</span>
                            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 leading-tight">Payment Complaints <br />& Resolution Center</h2>
                        <p className="text-slate-600 font-medium text-lg leading-relaxed">
                            Encountering issues with your payouts, deposits, or double charges?
                            Our specialized financial resolution team is available 24/7.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-red-500/20 hover:scale-105 transition-all">
                                File Payment Dispute
                            </button>
                            <button className="px-8 py-4 bg-white text-red-600 border border-red-200 rounded-2xl font-black text-sm hover:bg-red-50 transition-all">
                                View Resolution Status
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Delayed Payout', desc: 'Money not received after 24h' },
                            { label: 'Verify Transaction', desc: 'ID/Hash issues' },
                            { label: 'Bank Transfer', desc: 'Country specific issues' },
                            { label: 'Tax/Fees', desc: 'Understand deductions' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/80 backdrop-blur pb-4 pt-6 px-6 rounded-2xl border border-red-100/50 hover:shadow-lg transition-all hover:-translate-y-1">
                                <p className="text-sm font-black text-slate-900 mb-1">{item.label}</p>
                                <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((cat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className={`h-14 w-14 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mb-6`}>
                            <cat.icon size={28} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4">{cat.title}</h3>
                        <div className="space-y-3">
                            {cat.articles.map((art, j) => (
                                <button key={j} className="w-full flex items-center justify-between group py-2">
                                    <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{art}</span>
                                    <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Popular Articles */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-50 rounded-[2rem] p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <Star className="text-warning fill-warning" size={24} /> Popular Articles
                        </h3>
                        <button className="text-xs font-black text-accent uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {popularArticles.map((art, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-accent/5 transition-colors">
                                        <FileText size={20} className="text-slate-400 group-hover:text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{art.title}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{art.Category} • {art.views} views</p>
                                    </div>
                                </div>
                                <ExternalLink size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Quick Links */}
                <div className="bg-accent/5 border border-accent/10 rounded-[2rem] p-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-8">Top FAQs</h3>
                    <div className="space-y-6">
                        {[
                            "How do I update my profile information?",
                            "What are the fees for task providers?",
                            "Is my KYC data encrypted and secure?",
                            "How to handle a dispute with a performer?"
                        ].map((faq, i) => (
                            <div key={i} className="flex gap-4 group cursor-pointer">
                                <div className="h-6 w-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-black shrink-0 shadow-lg shadow-blue-500/20">
                                    {i + 1}
                                </div>
                                <p className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">
                                    {faq}
                                </p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-sm border border-slate-200 shadow-sm hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        Contact Support Agent <HelpCircle size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpCenterPage;
