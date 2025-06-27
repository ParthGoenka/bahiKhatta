import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ onSuccess }) => {
    const [form, setForm] = useState({ description: '', amount: '', date: '', category: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await axios.post('/api/transactions', form);
            setForm({ description: '', amount: '', date: '', category: '' });
            if (onSuccess) onSuccess();
        } catch (err) {
            setError('Error submitting transaction');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <div className="row g-3">
                <div className="col-md-3">
                    <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="form-control" required />
                </div>
                <div className="col-md-3">
                    <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" type="number" className="form-control" required />
                </div>
                <div className="col-md-3">
                    <input name="date" value={form.date} onChange={handleChange} placeholder="Date" type="date" className="form-control" required />
                </div>
                <div className="col-md-3">
                    <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="form-control" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4">Add Transaction</button>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
        </form>
    );
};

export default TransactionForm;
