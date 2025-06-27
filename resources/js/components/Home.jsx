import React from 'react';
import Navbar from './Navbar';

const Home = () => (
    <div className="bg-light min-vh-100 d-flex flex-column">
        <Navbar />
        <div className="container flex-grow-1 d-flex align-items-center py-5">
            <div className="row justify-content-center w-100">
                <div className="col-lg-10 col-xl-8">
                    <div className="bg-white rounded-4 shadow-sm p-5 border border-2 border-primary-subtle">
                        <h1 className="display-4 fw-bold mb-4 text-center text-primary">Welcome to <span className="text-dark">bahiKhatta</span></h1>
                        <p className="lead text-center text-secondary mb-4">
                            Your modern digital ledger for tracking personal and business finances.
                            Easily record transactions, categorize expenses, and get insights with AI-powered analytics.
                        </p>
                        <hr className="my-4" />
                        <section className="mt-4">
                            <h2 className="h4 fw-semibold mb-3 text-primary">About This Project</h2>
                            <p>
                                This app is built with <strong>Laravel</strong> (backend) and <strong>React</strong> (frontend),
                                styled with <strong>Bootstrap</strong> for a responsive and clean interface. You can:
                            </p>
                            <ul className="list-group list-group-flush mb-3">
                                <li className="list-group-item">✅ Register and securely log in to your account</li>
                                <li className="list-group-item">✅ Add, view, and categorize transactions</li>
                                <li className="list-group-item">✅ Visualize income and expenses with charts</li>
                                <li className="list-group-item">✅ Get AI-generated insights on spending</li>
                            </ul>
                            <p>
                                Whether managing personal or business finances, <strong>bahiKhatta</strong> helps you stay organized and make better decisions.
                            </p>
                        </section>
                        <div className="text-center mt-5">
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <a href="/register" className="btn btn-primary btn-lg px-4 me-sm-3">Get Started</a>
                                <a href="/login" className="btn btn-outline-primary btn-lg px-4">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Home;
