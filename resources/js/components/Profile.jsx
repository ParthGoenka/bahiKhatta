import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar1 from './Navbar1';

const Profile = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        gender: ''
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios.get('/api/user')
            .then(res => {
                setForm({
                    name: res.data.name || '',
                    email: res.data.email || '',
                    phone: res.data.phone || '',
                    address: res.data.address || '',
                    dob: res.data.dob || '',
                    gender: res.data.gender || ''
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
            setIsEditing(false);
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
            <div className="container mt-4">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">My Profile</h4>
                        {!isEditing && (
                            <button className="btn btn-light btn-sm" onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </button>
                        )}
                    </div>
                    <div className="card-body">
                        {message && (
                            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-warning'}`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                {['name', 'email', 'phone', 'address', 'dob'].map((field, index) => (
                                    <div className="col-md-6 mb-3" key={index}>
                                        <label className="form-label">
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </label>
                                        <input
                                            type={field === 'dob' ? 'date' : field === 'email' ? 'email' : 'text'}
                                            className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                                            name={field}
                                            value={form[field]}
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                        />
                                        {errors[field] && (
                                            <div className="invalid-feedback">{errors[field][0]}</div>
                                        )}
                                    </div>
                                ))}

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Gender</label>
                                    <select
                                        className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.gender && (
                                        <div className="invalid-feedback">{errors.gender[0]}</div>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="text-end">
                                    <button type="submit" className="btn btn-success">
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;