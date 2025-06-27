import React, { useState } from 'react';
import axios from 'axios';

export default function AuthForm({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = isLogin ? '/api/login' : '/api/signup';
      const { data } = await axios.post(url, form);
      onAuth(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                )}
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <button type="submit" className="btn btn-primary w-100 mb-2">
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>
              </form>
              <div className="text-center mt-3">
                <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
