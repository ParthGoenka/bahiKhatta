import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);
        try {
            await axios.post('/api/logout');
            localStorage.removeItem('access_token');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger me-2" disabled={loading}>
            {loading ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging out...
                </>
            ) : (
                'Logout'
            )}
        </button>
    );
};

export default LogoutButton;