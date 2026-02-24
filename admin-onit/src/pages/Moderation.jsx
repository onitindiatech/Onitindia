import React, { useState } from 'react';
import {
    Flag,
    MessageSquare,
    Shield,
    Trash2,
    CheckCircle,
    XCircle,
    UserX,
    Search,
    Filter,
    Eye,
    EyeOff,
    MoreHorizontal,
    AlertCircle,
    Info
} from 'lucide-react';
import DataTable from '../components/common/DataTable.jsx';
import Toast from '../components/common/Toast.jsx';

const ModerationPage = () => {
    const [activeTab, setActiveTab] = useState('reviews');
    const [toast, setToast] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Mock Data for Reviews
    const reviewColumns = [
        {
            header: 'Reviewer',
            key: 'user',
            render: (val, row) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                        {val.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 leading-tight">{val}</span>
                        <span className="text-[10px] text-slate-400 font-medium">To: {row.target}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Content',
            key: 'comment',
            render: (val) => (
                <p className="text-sm text-slate-600 max-w-[300px] truncate italic">"{val}"</p>
            )
        },
        {
            header: 'Flags',
            key: 'flags',
            render: (val) => (
                <div className="flex items-center gap-1">
                    <Flag size={14} className="text-red-500" />
                    <span className="text-xs font-black text-red-600">{val}</span>
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            render: (val) => (
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${val === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'
                    }`}>
                    {val}
                </span>
            )
        },
        {
            header: 'Actions',
            key: 'id',
            render: (id) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleAction(id, 'approve')}
                        className="p-1.5 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                        title="Approve Review"
                    >
                        <CheckCircle size={18} />
                    </button>
                    <button
                        onClick={() => handleAction(id, 'hide')}
                        className="p-1.5 hover:bg-slate-50 text-slate-400 rounded-lg transition-colors"
                        title="Hide Review"
                    >
                        <EyeOff size={18} />
                    </button>
                    <button
                        onClick={() => handleAction(id, 'delete')}
                        className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                        title="Delete Review"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )
        }
    ];

    const mockReviews = [
        { id: 1, user: 'Amit Sharma', target: 'Urban Company', comment: 'The service was unprofessional and late.', flags: 3, status: 'Pending' },
        { id: 2, user: 'Priya Patel', target: 'Quick Clean', comment: 'Fake reviews! Don\'t trust them.', flags: 5, status: 'Pending' },
        { id: 3, user: 'Rahul V.', target: 'Home Fix', comment: 'Charged extra without asking.', flags: 2, status: 'Pending' },
    ];

    // Mock Data for Chat
    const chatColumns = [
        {
            header: 'Time',
            key: 'time',
            render: (val) => <span className="text-[10px] font-bold text-slate-400">{val}</span>
        },
        {
            header: 'Participants',
            key: 'users',
            render: (val) => (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">{val[0]}</span>
                    <span className="text-slate-300">→</span>
                    <span className="text-xs font-bold text-slate-700">{val[1]}</span>
                </div>
            )
        },
        {
            header: 'Last Message',
            key: 'lastMsg',
            render: (val) => (
                <div className="flex items-center gap-3">
                    <p className="text-sm text-slate-500 truncate max-w-[250px]">{val}</p>
                    {val.includes('scam') && (
                        <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter">Flagged Keyword</span>
                    )}
                </div>
            )
        },
        {
            header: 'Risk',
            key: 'risk',
            render: (val) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${val === 'High' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                    {val}
                </span>
            )
        },
        {
            header: 'Actions',
            key: 'id',
            render: (id) => (
                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors">
                        <Eye size={18} />
                    </button>
                    <button className="p-1.5 hover:bg-slate-50 text-slate-400 rounded-lg transition-colors">
                        <UserX size={18} />
                    </button>
                </div>
            )
        }
    ];

    const mockChats = [
        { id: 'c1', time: '12:45 PM', users: ['Rahul', 'Provider X'], lastMsg: 'I think this is a scam, why so much price?', risk: 'High' },
        { id: 'c2', time: '12:30 PM', users: ['Suresh', 'Provider Y'], lastMsg: 'Okay, I will reach by 5 PM.', risk: 'Low' },
        { id: 'c3', time: '11:15 AM', users: ['Anita', 'Provider Z'], lastMsg: 'Can you share your payment link?', risk: 'Medium' },
    ];

    const handleAction = async (id, type) => {
        setIsProcessing(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setToast({ message: `Review ${type}ed successfully.`, type: 'success' });
        } catch (error) {
            setToast({ message: `Failed to ${type} review.`, type: 'error' });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Content Moderation</h1>
                    <p className="text-slate-500 mt-1 font-medium">Monitor user interactions and enforce platform safety policies.</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'reviews' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Flag size={16} /> Reviews
                    </button>
                    <button
                        onClick={() => setActiveTab('chats')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'chats' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <MessageSquare size={16} /> Chat Logs
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card p-5 bg-white space-y-3">
                    <div className="h-10 w-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                        <Flag size={20} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900">42</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Flagged Reviews</p>
                    </div>
                </div>
                <div className="card p-5 bg-white space-y-3">
                    <div className="h-10 w-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900">12</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Suspicious Chats</p>
                    </div>
                </div>
                <div className="card p-5 bg-white space-y-3">
                    <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <Shield size={20} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900">1,240</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Safe Interactions</p>
                    </div>
                </div>
                <div className="card p-5 bg-slate-900 text-white space-y-3">
                    <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                        <CheckCircle size={20} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black">98%</h3>
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Safety Score</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="card overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-900">
                            {activeTab === 'reviews' ? 'Review Moderation Queue' : 'Global Chat Monitor'}
                        </h2>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg uppercase">
                            {activeTab === 'reviews' ? '3 reported' : '8 live'}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search by content..."
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                            />
                        </div>
                        <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-all">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={activeTab === 'reviews' ? reviewColumns : chatColumns}
                    data={activeTab === 'reviews' ? mockReviews : mockChats}
                />
            </div>

            {/* System Info */}
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex gap-4">
                <div className="h-10 w-10 flex-shrink-0 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Info size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-black text-emerald-900 leading-tight">Automated Shield Enabled</h4>
                    <p className="text-xs font-medium text-emerald-700/80 mt-1">
                        Our AI is currently screening 100% of messages for contact information sharing and harassment.
                        Flagged items are sent here for manual review if confidence is below 95%.
                    </p>
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

export default ModerationPage;
