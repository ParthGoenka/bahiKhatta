import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ onSuccess, onShowUpload }) => {
    const [form, setForm] = useState({
        description: '',
        amount: '',
        date: '',
        category: '',
        type: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleTypeChange = (e) => {
        setForm({ ...form, type: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            let adjustedAmount = form.amount;
            adjustedAmount = form.type === 'expense'
                ? -Math.abs(Number(form.amount))
                : Math.abs(Number(form.amount));

            await axios.post('/api/transactions', { ...form, amount: adjustedAmount });

            setForm({
                description: '',
                amount: '',
                date: '',
                category: '',
                type: 'expense'
            });
            if (onSuccess) onSuccess();
        } catch (err) {
            setError('Error submitting transaction');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <div className="row g-3">

                <div className="col-md-2">
                    <label htmlFor="type" className="form-label">Transaction Type</label>
                    <select
                        id="type"
                        name="type"
                        value={form.type}
                        onChange={handleTypeChange}
                        className="form-select transaction-type-select"
                        required
                    >
                        <option value="" disabled hidden>Select Type</option>
                        <option value="expense">🛒 Expense</option>
                        <option value="income">💰 Income</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="e.g. Grocery shopping"
                        className="form-control"
                        required
                    />
                </div>

                <div className="col-md-2">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                        id="amount"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="e.g. 500"
                        type="number"
                        className="form-control"
                        required
                    />
                </div>

                <div className="col-md-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        id="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        className="form-control"
                        required
                    />
                </div>

                <div className="col-md-2">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="e.g. Food, Rent"
                        className="form-control"
                    />
                </div>
            </div>

            <div className="text-end">
                <button type="submit" className="btn btn-primary mt-4 mx-2">
                    ➕ Add Transaction
                </button>
                <button type="button" className="btn btn-outline-primary mt-4" onClick={onShowUpload}>
                    📁 Upload (CSV/Excel)
                </button>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
    );
};

export default TransactionForm;