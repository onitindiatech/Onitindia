import React, { useState } from 'react';
import {
    Send,
    Search,
    MoreVertical,
    Phone,
    Video,
    Image,
    Paperclip,
    Smile,
    Clock,
    User,
    CheckCheck,
    ArrowLeft,
    MessageCircle,
    Activity,
    Brain,
    ShieldCheck,
    BarChart3
} from 'lucide-react';

const LiveChatPage = () => {
    const [activeView, setActiveView] = useState('chats'); // 'chats' or 'ai-analytics'
    const [selectedChat, setSelectedChat] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');

    const mockChats = [
        {
            id: 1,
            name: 'Vikram Singh',
            lastMessage: 'I still haven\'t received the task payment.',
            time: '2m ago',
            unread: 2,
            status: 'online',
            role: 'Performer'
        },
        {
            id: 2,
            name: 'Ananya Iyer',
            lastMessage: 'How do I upgrade to the Premium Provider plan?',
            time: '15m ago',
            unread: 0,
            status: 'offline',
            role: 'Provider'
        },
        {
            id: 3,
            name: 'Manish Patel',
            lastMessage: 'The application crashes when I try to upload documents.',
            time: '1h ago',
            unread: 0,
            status: 'online',
            role: 'Performer'
        },
        {
            id: 4,
            name: 'Sakshi Sharma',
            lastMessage: 'Thank you for your help!',
            time: '3h ago',
            unread: 0,
            status: 'offline',
            role: 'Provider'
        },
        {
            id: 5,
            name: 'Arjun Reddy',
            lastMessage: 'My account is still showing as suspended.',
            time: '5h ago',
            unread: 1,
            status: 'online',
            role: 'Performer'
        },
    ];

    const aiMetrics = [
        { label: 'AI Resolution Rate', value: '84.2%', trend: '+4.5%', status: 'success', icon: <ShieldCheck size={16} /> },
        { label: 'Avg. Sentiment', value: 'Positive', trend: 'Stable', status: 'primary', icon: <Smile size={16} /> },
        { label: 'Agent Handoffs', value: '12%', trend: '-2.1%', status: 'warning', icon: <Activity size={16} /> },
        { label: 'Response Accuracy', value: '96.8%', trend: '+0.8%', status: 'success', icon: <Brain size={16} /> },
    ];

    const messages = [
        { id: 1, text: 'Hello, I need help with my payment.', sent: false, time: '10:30 AM' },
        { id: 2, text: 'Hi! I\'d be happy to help. Could you please provide your transaction ID?', sent: true, time: '10:31 AM' },
        { id: 3, text: 'Yes, it\'s TXN_987654321.', sent: false, time: '10:32 AM' },
        { id: 4, text: 'Checking it now. One moment please.', sent: true, time: '10:33 AM' },
        { id: 5, text: 'I still haven\'t received the task payment.', sent: false, time: '10:35 AM' },
    ];

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col animate-in fade-in duration-700">
            <div className="flex-1 flex overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-xl">

                {/* Sidebar */}
                <div className={`w-full md:w-80 flex flex-col border-r border-slate-100 bg-slate-50/30 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-slate-900">Live Support</h2>
                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        </div>

                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => { setActiveView('chats'); setSelectedChat(null); }}
                                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeView === 'chats' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                                    }`}
                            >
                                Chats
                            </button>
                            <button
                                onClick={() => { setActiveView('ai-analytics'); setSelectedChat(null); }}
                                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeView === 'ai-analytics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                                    }`}
                            >
                                AI Analytics
                            </button>
                        </div>

                        {activeView === 'chats' && (
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all font-black"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4 space-y-1">
                        {activeView === 'chats' ? (
                            mockChats.map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all group ${selectedChat?.id === chat.id
                                            ? 'bg-white shadow-lg shadow-blue-500/10 border border-slate-100'
                                            : 'hover:bg-white hover:shadow-md border border-transparent'
                                        }`}
                                >
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-black text-xs">
                                            {chat.name[0]}
                                        </div>
                                        <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${chat.status === 'online' ? 'bg-green-500' : 'bg-slate-300'
                                            }`} />
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm font-black text-slate-900 truncate">{chat.name}</p>
                                            <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{chat.time}</span>
                                        </div>
                                        <p className={`text-xs truncate transition-colors ${chat.unread > 0 ? 'text-slate-900 font-black' : 'text-slate-500 font-medium'
                                            }`}>
                                            {chat.lastMessage}
                                        </p>
                                    </div>
                                    {chat.unread > 0 && (
                                        <div className="h-5 w-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-lg shadow-blue-500/30">
                                            {chat.unread}
                                        </div>
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-2 space-y-4">
                                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">AI System Health</p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full w-[95%] bg-blue-600 rounded-full" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-900">95%</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Quick Stats</p>
                                    {aiMetrics.map((metric, i) => (
                                        <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-blue-500">{metric.icon}</span>
                                                <p className="text-[10px] font-bold text-slate-400">{metric.label}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-sm font-black text-slate-900">{metric.value}</span>
                                                <span className={`text-[10px] font-bold ${metric.status === 'success' ? 'text-green-600' :
                                                        metric.status === 'warning' ? 'text-orange-600' : 'text-blue-600'
                                                    }`}>{metric.trend}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                {selectedChat ? (
                    <div className="flex-1 flex flex-col bg-white relative">
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedChat(null)}
                                    className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-400"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-sm">
                                        {selectedChat.name[0]}
                                    </div>
                                    <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${selectedChat.status === 'online' ? 'bg-green-500' : 'bg-slate-300'
                                        }`} />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-slate-900 leading-tight">{selectedChat.name}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {selectedChat.role} • {selectedChat.status === 'online' ? 'Active now' : 'Seen recently'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all">
                                    <Phone size={18} />
                                </button>
                                <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all">
                                    <Video size={18} />
                                </button>
                                <div className="h-8 w-px bg-slate-100 mx-2" />
                                <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 custom-scrollbar">
                            <div className="flex justify-center">
                                <span className="px-4 py-1.5 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                                    Today, February 11
                                </span>
                            </div>

                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] group ${msg.sent ? 'items-end' : 'items-start'}`}>
                                        <div className={`p-4 rounded-2xl text-sm font-medium shadow-sm transition-all hover:shadow-md ${msg.sent
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <div className={`flex items-center gap-1.5 mt-2 ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                                            <span className="text-[10px] font-bold text-slate-400">{msg.time}</span>
                                            {msg.sent && <CheckCheck size={12} className="text-blue-600" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-slate-100">
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-2 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all">
                                <textarea
                                    className="w-full bg-transparent border-none focus:ring-0 p-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 resize-none"
                                    placeholder="Type your message here..."
                                    rows="2"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <div className="flex items-center justify-between py-2 px-3 border-t border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors"><Smile size={20} /></button>
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors"><Paperclip size={20} /></button>
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors"><Image size={20} /></button>
                                    </div>
                                    <button
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs transition-all shadow-lg ${message.trim()
                                                ? 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700 scale-105'
                                                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                            }`}
                                        disabled={!message.trim()}
                                    >
                                        <span>Send Message</span>
                                        <Send size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : activeView === 'ai-analytics' ? (
                    <div className="flex-1 flex flex-col bg-slate-50/50 p-8 overflow-y-auto custom-scrollbar">
                        <div className="max-w-4xl mx-auto w-full space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">AI Support Performance</h3>
                                    <p className="text-slate-500 font-medium">Tracking automated response quality and efficiency.</p>
                                </div>
                                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
                                    Export report
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {aiMetrics.map((metric, i) => (
                                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-blue-500 bg-blue-50 p-2 rounded-xl">{metric.icon}</span>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{metric.label}</p>
                                        </div>
                                        <div className="flex items-end justify-between mt-2">
                                            <p className="text-2xl font-black text-slate-900">{metric.value}</p>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${metric.status === 'success' ? 'bg-green-50 text-green-600' :
                                                    metric.status === 'warning' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                {metric.trend}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h4 className="font-black text-slate-900">Sentiment Analysis Trends</h4>
                                        <select className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-1 text-xs font-bold focus:outline-none">
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                        </select>
                                    </div>
                                    <div className="h-[250px] w-full bg-slate-900 rounded-3xl flex items-center justify-center text-slate-500 font-bold border-4 border-slate-800">
                                        <div className="text-center px-12">
                                            <div className="flex justify-center items-end gap-2 mb-4">
                                                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                                    <div key={i} className="w-6 bg-blue-500/40 rounded-t-lg" style={{ height: `${h}px` }} />
                                                ))}
                                            </div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">AI Performance Visualization</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                                        <div className="flex items-center gap-3 mb-4 text-blue-400">
                                            <div className="h-2 w-2 bg-blue-400 rounded-full animate-ping" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Active AI Instance</span>
                                        </div>
                                        <h4 className="text-xl font-black mb-2">Support-Bot v2.4</h4>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed">Currently processing 124 requests across 15 regions. Latency: 42ms.</p>
                                        <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                                            View Logs
                                        </button>
                                    </div>
                                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                        <h4 className="font-black text-slate-900 text-sm mb-4">Top AI Triggers</h4>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Payment Status', value: 85 },
                                                { label: 'KYC Progress', value: 72 },
                                                { label: 'Password Reset', value: 94 },
                                                { label: 'Task Dispute', value: 64 }
                                            ].map((trigger, i) => (
                                                <div key={i} className="space-y-1.5">
                                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                        <span>{trigger.label}</span>
                                                        <span className="text-slate-900">{trigger.value}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${trigger.value}%` }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-slate-50/30 p-12 text-center">
                        <div className="h-24 w-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 border border-slate-100 animate-bounce">
                            <MessageCircle className="text-blue-600" size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">Select a Conversation</h3>
                        <p className="text-slate-500 mt-2 max-w-sm font-medium">
                            Choose a user from the left to start a real-time support session. Check unread counts for priority.
                        </p>
                        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md w-full">
                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Response Time</p>
                                <p className="text-xl font-black text-slate-900">&lt; 2 mins</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Agents</p>
                                <p className="text-xl font-black text-slate-900">12 / 15</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveChatPage;
