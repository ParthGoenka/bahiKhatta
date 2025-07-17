import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '', phone: '', address: '', dob: '', gender: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/api/register', form);
            localStorage.setItem('access_token', res.data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError('Registration failed. Please check your details.');
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: 400 }}>
                <h2 className="mb-4 text-center">Sign Up</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                    <input name="password_confirmation" value={form.password_confirmation} onChange={handleChange} placeholder="Confirm Password" type="password" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input name="address" value={form.address} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input
                        name="dob"
                        type="date"
                        value={form.dob}
                        onChange={handleChange}
                        className="form-control"
                        required
                        max={new Date().toISOString().split("T")[0]} // 👈 Prevent future DOBs
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange} className="form-control" required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
                {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}
                <div className="text-center mt-3">
                    Already have an account? <Link to="/login" className="text-primary text-decoration-underline">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
