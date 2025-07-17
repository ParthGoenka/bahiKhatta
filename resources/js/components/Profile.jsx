import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar1 from './Navbar1';

const Profile = () => {
    const [form, setForm] = useState({
        name: '',
        email: ''
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('/api/user')
            .then(res => {
                setForm({
                    name: res.data.name,
                    email: res.data.email
                });
            })
            .catch(() => setMessage('Failed to load user data.'));
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('');
        setErrors({});

        try {
            await axios.put('/api/user', form);
            setMessage('Profile updated successfully.');
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setMessage('An error occurred while updating profile.');
            }
        }
    };

    return (
        <>
            <Navbar1 />
            <div className="container mt-3">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="mb-4">Edit Profile</h2>
                    {message && <div className="alert alert-info">{message}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;