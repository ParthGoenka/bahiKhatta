import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
            <Link className="navbar-brand fw-bold px-2" to="/">bahiKhatta</Link>
            <div className="d-flex">
                <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
        </div>
    </nav>
);

export default Navbar;