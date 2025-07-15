import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar1 = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
            <Link className="navbar-brand fw-bold" to="/dashboard">bahiKhatta</Link>
            <div className="d-flex">
                <Link to="/" className="btn btn-outline-secondary me-2">Home</Link>
                <Link to="/chat" className="btn btn-outline-primary me-2">Chat</Link>
                <Link to="/profile" className="btn btn-outline-success me-2">Profile</Link>
                <LogoutButton />
            </div>
        </div>
    </nav>
);

export default Navbar1;