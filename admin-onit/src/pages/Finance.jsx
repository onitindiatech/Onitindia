import React, { useState } from 'react';
import { CheckCircle2, Download, Wallet } from 'lucide-react';
import DataTable from '../components/common/DataTable.jsx';

/* =======================
   TRANSACTION DETAIL DRAWER
======================= */
const TransactionDetailDrawer = ({ isOpen, onClose, transaction, onMarkAsPaid }) => {
    if (!transaction) return null;

    return (
        <div className={`fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-[60] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-black">{transaction.id}</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    <div className="bg-slate-900 text-white rounded-2xl p-6">
                        <p className="text-xs opacity-60">Amount</p>
                        <h3 className="text-3xl font-black">{transaction.amount}</h3>
                    </div>

                    <div className="space-y-2">
                        <p><b>Task:</b> {transaction.taskTitle}</p>
                        <p><b>Provider:</b> {transaction.provider}</p>
                        <p><b>Performer:</b> {transaction.user}</p>
                        <p><b>Provider Status:</b> ✅ Completed</p>
                        <p>
                            <b>Performer Status:</b>{' '}
                            {transaction.performerStatus === 'Pending' ? '⏳ Pending' : '✅ Paid'}
                        </p>
                    </div>
                </div>

                <div className="p-6 border-t">
                    {transaction.type === 'Payout' && transaction.performerStatus === 'Pending' ? (
                        <button
                            onClick={() => onMarkAsPaid(transaction.id)}
                            className="w-full bg-green-600 text-white py-4 rounded-xl font-black uppercase"
                        >
                            MARK PERFORMER AS PAID
                        </button>
                    ) : (
                        <div className="w-full bg-green-50 text-green-600 py-4 rounded-xl font-black text-center uppercase">
                            PAYOUT COMPLETED
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* =======================
   MAIN FINANCE PAGE
======================= */
const FinancePage = () => {
    const [transactions, setTransactions] = useState([
        {
            id: 'TXN-1001',
            amount: '₹12,400',
            type: 'Payout',
            providerStatus: 'Completed',
            performerStatus: 'Pending',
            user: 'Rahul Sharma',
            provider: 'Sunil Gupta',
            taskTitle: 'AC Repair',
            date: '02/01/2026'
        },
        {
            id: 'TXN-1002',
            amount: '₹3,440',
            type: 'Payout',
            providerStatus: 'Completed',
            performerStatus: 'Pending',
            user: 'Priya Verma',
            provider: 'Marketing Lab',
            taskTitle: 'Content Writing',
            date: '05/01/2026'
        }
    ]);

    const [selectedTxn, setSelectedTxn] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMarkAsPaid = (id) => {
        setTransactions(prev =>
            prev.map(txn =>
                txn.id === id ? { ...txn, performerStatus: 'Completed' } : txn
            )
        );

        setSelectedTxn(prev =>
            prev && prev.id === id ? { ...prev, performerStatus: 'Completed' } : prev
        );
    };

    const columns = [
        {
            header: 'TXN ID',
            key: 'id'
        },
        {
            header: 'AMOUNT',
            key: 'amount',
            render: (v) => <span className="font-black text-red-600">{v}</span>
        },
        {
            header: 'PROVIDER STATUS',
            render: () => (
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-xs font-black">
                    COMPLETED
                </span>
            )
        },
        {
            header: 'PERFORMER STATUS',
            render: (_, row) =>
                row.performerStatus === 'Pending' ? (
                    <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-xs font-black">
                        PENDING
                    </span>
                ) : (
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-xs font-black">
                        PAID
                    </span>
                )
        },
        {
            header: 'ACTIONS',
            render: (_, row) => (
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setSelectedTxn(row);
                            setDrawerOpen(true);
                        }}
                        className="text-emerald-600 font-black text-xs hover:text-emerald-700 transition-colors"
                    >
                        VIEW
                    </button>

                    {row.performerStatus === 'Pending' && (
                        <button
                            onClick={() => handleMarkAsPaid(row.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-black"
                        >
                            MARK AS PAID
                        </button>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-black">Finance – Payout Control</h1>

            <div className="bg-white rounded-2xl shadow">
                <DataTable columns={columns} data={transactions} />
            </div>

            <TransactionDetailDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                transaction={selectedTxn}
                onMarkAsPaid={handleMarkAsPaid}
            />
        </div>
    );
};

export default FinancePage;
