import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar1 = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path ? 'active' : '';

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/dashboard">bahiKhatta</Link>
                <div className="d-flex">
                    <Link
                        to="/dashboard"
                        className={`btn btn-outline-primary me-2 ${isActive('/dashboard')}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/chat"
                        className={`btn btn-outline-secondary me-2 ${isActive('/chat')}`}
                    >
                        Chat
                    </Link>
                    <Link
                        to="/profile"
                        className={`btn btn-outline-success me-2 ${isActive('/profile')}`}
                    >
                        Profile
                    </Link>
                    <LogoutButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar1;