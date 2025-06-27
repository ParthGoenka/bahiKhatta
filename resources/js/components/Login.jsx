import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/api/login', form);
            localStorage.setItem('access_token', res.data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-100" style={{maxWidth: 400}}>
                <h2 className="mb-4 text-center">Login to Your Account</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                {error && (
                    <div className="alert alert-danger mt-3 text-center">{error}</div>
                )}
                <p className="text-center mt-3">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary text-decoration-underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
