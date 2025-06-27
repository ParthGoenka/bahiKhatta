import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await axios.post('/api/logout');
        localStorage.removeItem('access_token');
        navigate('/login');
    };
    return (
        <button onClick={handleLogout} className="btn btn-secondary position-absolute top-0 end-0 m-3">Logout</button>
    );
};

export default LogoutButton;
