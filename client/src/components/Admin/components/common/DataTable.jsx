import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MoreVertical, Filter, Search, Download } from 'lucide-react';

const DataTable = ({ columns, data, actions, onRowClick, hideToolbar = false }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="card h-full flex flex-col overflow-hidden">
            {/* Table Header / Toolbar */}
            {!hideToolbar && (
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search local records..."
                                className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                            <Filter size={14} />
                            <span>Filters</span>
                        </button>
                    </div>

                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                        <Download size={14} />
                        <span>Export</span>
                    </button>
                </div>
            )}

            {/* Table Content */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-slate-50/80 backdrop-blur-sm z-10">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {col.header}
                                </th>
                            ))}
                            {actions && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {currentData.map((row, i) => (
                            <tr
                                key={i}
                                onClick={() => onRowClick && onRowClick(row)}
                                className="hover:bg-slate-50 cursor-pointer transition-colors group"
                            >
                                {columns.map((col, j) => (
                                    <td key={j} className="px-6 py-4">
                                        {col.render ? col.render(row[col.key], row) : (
                                            <span className="text-sm text-slate-700 font-medium">{row[col.key]}</span>
                                        )}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white text-sm font-medium text-slate-500">
                <p>
                    Showing <span className="text-slate-900 font-bold">{startIndex + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(startIndex + itemsPerPage, data.length)}</span> of <span className="text-slate-900 font-bold">{data.length}</span> results
                </p>

                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 rounded-lg transition-all ${currentPage === i + 1
                                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                                    : 'hover:bg-slate-50 text-slate-600'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default DataTable;
