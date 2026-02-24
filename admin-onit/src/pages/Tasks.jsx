import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, Clock, CheckCircle2, AlertCircle, MapPin, Tag } from 'lucide-react';
import DataTable from '../components/common/DataTable.jsx';
import DisputeCenter from '../components/modules/tasks/DisputeCenter.jsx';

const TasksPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const mockTasks = [
        {
            id: '4500',
            title: 'Website Design',
            category: 'Design',
            location: 'Mumbai, MH',
            status: 'active',
            provider: 'Provider 6',
            performer: 'Performer 8',
            referee: 'Referee Alpha',
            price: '$407',
            postedAt: '2h ago',
            description: 'Redesigning the entire landing page with a focus on modern aesthetics and mobile responsiveness.'
        },
        {
            id: '4501',
            title: 'Logo Creation',
            category: 'Marketing',
            location: 'Remote',
            status: 'pending',
            provider: 'Provider 9',
            performer: 'Performer 20',
            referee: 'Referee Beta',
            price: '$336',
            postedAt: '1d ago',
            description: 'Creating a high-resolution vector logo for a new tech startup.'
        },
        {
            id: '4502',
            title: 'Content Writing',
            category: 'Writing',
            location: 'Delhi, NCR',
            status: 'completed',
            provider: 'Provider 16',
            performer: 'Performer 1',
            referee: 'Referee Gamma',
            price: '$352',
            postedAt: '45m ago',
            description: 'Write 5 SEO-optimized blog posts about workplace productivity.'
        },
        {
            id: '4503',
            title: 'App Debugging',
            category: 'Development',
            location: 'Remote',
            status: 'active',
            provider: 'Provider 4',
            performer: 'Performer 12',
            referee: 'Referee Delta',
            price: '$520',
            postedAt: '5h ago',
            description: 'Identifying and fixing memory leaks in a React Native application.'
        },
    ];

    const filteredTasks = mockTasks.filter(task => {
        const matchesTab = activeTab === 'all' || task.status === activeTab;
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.id.includes(searchTerm);
        return matchesTab && matchesSearch;
    });

    const TaskCard = ({ task }) => (
        <div
            onClick={() => setSelectedTask(task)}
            className="bg-white border border-slate-100 rounded-[24px] p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer group active:scale-[0.98]"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 font-bold text-xs">#{task.id}</span>
                <span className="text-success font-black text-lg">{task.price}</span>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-4 group-hover:text-accent transition-colors leading-tight">
                {task.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {task.category}
                </span>
            </div>

            <div className="space-y-2 mb-8 border-l-2 border-slate-50 pl-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="text-slate-400">Provider:</span>
                    <span className="text-slate-700 font-bold">{task.provider}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="text-slate-400">Performer:</span>
                    <span className="text-slate-700 font-bold">{task.performer}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${task.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                    task.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                        'bg-emerald-50 text-emerald-600'
                    }`}>
                    {task.status}
                </span>
                <button className="flex items-center gap-1.5 text-accent font-bold text-sm group-hover:gap-2 transition-all">
                    <span>Review</span>
                    <ArrowUpRight size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Task Monitoring</h1>
                    <p className="text-slate-500 mt-1 font-medium text-lg">Real-time oversight of all service lifecycles.</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 bg-white p-1.5 rounded-[20px] shadow-sm border border-slate-100 self-start md:self-center">
                    {['all', 'active', 'pending', 'completed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-xl text-sm font-black transition-all capitalize uppercase tracking-widest ${activeTab === tab
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Live Now', value: '142', color: 'green', sub: 'Ongoing tasks' },
                    { label: 'Completed', value: '48', color: 'green', sub: '65% target' },
                    { label: 'Disputes', value: '1.2%', color: 'red', sub: 'Healthy rate' },
                    { label: 'Avg Time', value: '4.2h', color: 'green', sub: 'Completion avg' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 block">{stat.label}</span>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-2">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={20} />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by ID or Task title..."
                    className="w-full bg-white border border-slate-100 rounded-[20px] py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent/20 transition-all shadow-sm"
                />
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
                {filteredTasks.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold">No tasks found matching your filters.</p>
                    </div>
                )}
            </div>

            {/* Task Detail Drawer */}
            {selectedTask && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setSelectedTask(null)}
                    />
                    <div className="relative w-full max-w-lg bg-white h-screen shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-500">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-black uppercase tracking-widest">Task Details</span>
                                    <span className="text-slate-400 text-xs font-bold">#{selectedTask.id}</span>
                                </div>
                                <button
                                    onClick={() => setSelectedTask(null)}
                                    className="h-10 w-10 flex items-center justify-center hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 leading-tight mb-4">
                                        {selectedTask.title}
                                    </h2>
                                    <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                        {selectedTask.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 bg-slate-50 p-6 rounded-[24px]">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Budget</p>
                                        <p className="text-2xl font-black text-success">{selectedTask.price}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                        <p className="text-lg font-black text-slate-900 capitalize">{selectedTask.status}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                        <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-black">
                                            {selectedTask.provider[0]}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Primary Provider</p>
                                            <p className="text-lg font-black text-slate-900">{selectedTask.provider}</p>
                                            <button className="text-accent text-xs font-bold mt-1">View profile →</button>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                        <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl font-black">
                                            {selectedTask.performer[0]}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Assigned Performer</p>
                                            <p className="text-lg font-black text-slate-900">{selectedTask.performer}</p>
                                            <button className="text-accent text-xs font-bold mt-1">View profile →</button>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                        <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xl font-black">
                                            {selectedTask.referee[0]}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Task Referee</p>
                                            <p className="text-lg font-black text-slate-900">{selectedTask.referee}</p>
                                            <button className="text-accent text-xs font-bold mt-1">Integrity check →</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 grid grid-cols-2 gap-4">
                                    <button className="w-full py-4 px-6 border border-slate-200 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">
                                        MODIFY TASK
                                    </button>
                                    <button className="w-full py-4 px-6 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                                        SEND MESSAGE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TasksPage;
