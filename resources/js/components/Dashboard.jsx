import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from './TransactionForm';
import BarChart from './Charts/BarChart';
import PieChart from './Charts/PieChart';
import LineChart from './Charts/LineChart';
import Navbar1 from './Navbar1'; // <-- Import Navbar1
// import AIChat from './AIChat'; // Remove AIChat import

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ total_income: 0, total_expenses: 0, categories: {} });
    const [insights, setInsights] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const txRes = await axios.get('/api/transactions');
            setTransactions(txRes.data.data || []);
            const sumRes = await axios.get('/api/transactions/summary');
            setSummary(sumRes.data);
            // Example: fetch AI insights (stubbed for now)
            setInsights('This month you spent 20% more on groceries.');
        } catch (err) {
            setInsights('Error fetching data');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Prepare chart data
    const barData = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Amount',
                data: [summary.total_income, Math.abs(summary.total_expenses)],
                backgroundColor: ['#4ade80', '#f87171'],
            },
        ],
    };
    const pieData = {
        labels: Object.keys(summary.categories || {}),
        datasets: [
            {
                label: 'Categories',
                data: Object.values(summary.categories || {}),
                backgroundColor: ['#60a5fa', '#fbbf24', '#a78bfa', '#f87171', '#4ade80'],
            },
        ],
    };
    const lineData = {
        labels: transactions.map(t => t.date),
        datasets: [
            {
                label: 'Balance Over Time',
                data: transactions.reduce((acc, t, i) => {
                    const prev = acc[i - 1] || 0;
                    return [...acc, prev + Number(t.amount)];
                }, []),
                borderColor: '#6366f1',
                backgroundColor: '#a5b4fc',
            },
        ],
    };

    // Filter transactions for tables
    const expenses = transactions.filter(t => Number(t.amount) < 0);
    const incomes = transactions.filter(t => Number(t.amount) > 0);

    return (
        <div className="bg-light min-vh-100">
            <Navbar1 /> {/* Add Navbar1 at the top */}
            <div className="container py-4 position-relative">
                <div className="mb-4">
                    <TransactionForm onSuccess={fetchData} />
                </div>
                {loading ? (
                    <div className="mt-4 text-center text-secondary">Loading...</div>
                ) : (
                    <>
                        <div className="row g-4 mt-3">
                            <div className="col-md-6">
                                <div className="bg-white rounded shadow p-3 h-100 d-flex flex-column align-items-center">
                                    <BarChart data={barData} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="bg-white rounded shadow p-3 h-100 d-flex flex-column align-items-center">
                                    <PieChart data={pieData} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded shadow p-3 mt-4">
                            <LineChart data={lineData} />
                        </div>
                        {/* Expense and Income Tables */}
                        <div className="row mt-4">
                            <div className="col-md-6">
                                <h5>Expenses</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {expenses.map((t, idx) => (
                                                <tr key={idx}>
                                                    <td>{t.description}</td>
                                                    <td>{t.amount}</td>
                                                    <td>{t.date}</td>
                                                    <td>{t.category}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h5>Incomes</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {incomes.map((t, idx) => (
                                                <tr key={idx}>
                                                    <td>{t.description}</td>
                                                    <td>{t.amount}</td>
                                                    <td>{t.date}</td>
                                                    <td>{t.category}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;