import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from './TransactionForm';
import BarChart from './Charts/BarChart';
import PieChart from './Charts/PieChart';
import LineChart from './Charts/LineChart';
import Navbar1 from './Navbar1';
import { Link } from 'react-router-dom';

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
            setInsights('This month you spent 20% more on groceries.');
        } catch (err) {
            setInsights('Error fetching data');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const barData = {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label: 'Amount',
            data: [summary.total_income, Math.abs(summary.total_expenses)],
            backgroundColor: ['#4ade80', '#f87171'],
        }],
    };

    const pieData = {
        labels: Object.keys(summary.categories || {}),
        datasets: [{
            label: 'Categories',
            data: Object.values(summary.categories || {}),
            backgroundColor: ['#60a5fa', '#fbbf24', '#a78bfa', '#f87171', '#4ade80'],
        }],
    };

    const lineData = {
        labels: transactions.map(t => t.date),
        datasets: [{
            label: 'Balance Over Time',
            data: transactions.reduce((acc, t, i) => {
                const prev = acc[i - 1] || 0;
                return [...acc, prev + Number(t.amount)];
            }, []),
            borderColor: '#6366f1',
            backgroundColor: '#a5b4fc',
        }],
    };

    const expenses = transactions.filter(t => Number(t.amount) < 0);
    const incomes = transactions.filter(t => Number(t.amount) > 0);

    return (
        <div className="bg-light min-vh-100">
            <Navbar1 />
            <div className="container py-4">
                <h2 className="text-primary mb-3 text-center fw-bold">📊 Financial Dashboard</h2>

                <div className="mb-4">
                    <TransactionForm onSuccess={fetchData} />
                </div>

                {loading ? (
                    <div className="mt-4 text-center text-secondary">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2">Loading data...</p>
                    </div>
                ) : (
                    <>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="bg-white rounded-4 shadow-sm p-4 text-center">
                                    <h6 className="text-muted">Total Income</h6>
                                    <h4 className="text-success">₹ {summary.total_income}</h4>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="bg-white rounded-4 shadow-sm p-4 text-center">
                                    <h6 className="text-muted">Total Expenses</h6>
                                    <h4 className="text-danger">₹ {Math.abs(summary.total_expenses)}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row g-3 mt-3">
    <div className="col-md-4">
        <div className="bg-white rounded-4 shadow-sm p-3 h-100">
            <h6 className="text-center mb-2">Income vs Expenses</h6>
            <div style={{ height: '200px' }}>
                <BarChart data={barData} />
            </div>
        </div>
    </div>
    <div className="col-md-4">
        <div className="bg-white rounded-4 shadow-sm p-3 h-100">
            <h6 className="text-center mb-2">Spending by Category</h6>
            <div style={{ height: '200px' }}>
                <PieChart data={pieData} />
            </div>
        </div>
    </div>
    <div className="col-md-4">
        <div className="bg-white rounded-4 shadow-sm p-3 h-100">
            <h6 className="text-center mb-2">Balance Over Time</h6>
            <div style={{ height: '200px' }}>
                <LineChart data={lineData} />
            </div>
        </div>
    </div>
</div>


                        <div className="row mt-5 g-4">
                            <div className="col-md-6">
                                <h5 className="mb-3">🟥 Expenses</h5>
                                <div className="table-responsive bg-white rounded shadow-sm p-3">
                                    <table className="table table-sm table-hover align-middle mb-0">
                                        <thead className="table-light">
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
                                                    <td className="text-danger">₹ {t.amount}</td>
                                                    <td>{t.date}</td>
                                                    <td>{t.category}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h5 className="mb-3">🟩 Incomes</h5>
                                <div className="table-responsive bg-white rounded shadow-sm p-3">
                                    <table className="table table-sm table-hover align-middle mb-0">
                                        <thead className="table-light">
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
                                                    <td className="text-success">₹ {t.amount}</td>
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
