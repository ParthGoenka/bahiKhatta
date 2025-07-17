import React, { useState } from 'react';
import axios from 'axios';
import Navbar1 from './Navbar1';

const AIChat = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSend = async () => {
        setLoading(true);
        setError(null);
        setResponse('');
        try {
            const res = await axios.post('/api/ai-chat', { prompt });
            setResponse(res.data.response);
        } catch (err) {
            setError('Error communicating with AI.');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setPrompt('');
        setResponse('');
        setError(null);
    };

    return (
        <div className="bg-light min-vh-100">
            <Navbar1 />

            <div className="container py-4 px-3">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-10 col-lg-8">
                        <div className="card shadow-sm border-0 rounded-4 p-4">
                            <h4 className="mb-3 text-primary text-center">💬 Ask Munshi Ji</h4>

                            <textarea
                                className="form-control mb-3"
                                rows={4}
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                placeholder="Type your question about your transactions..."
                            />

                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSend}
                                    disabled={loading || !prompt.trim()}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send'
                                    )}
                                </button>
                                <button className="btn btn-outline-secondary" onClick={handleClear}>
                                    Clear
                                </button>
                            </div>

                            {error && <div className="alert alert-danger mt-3">{error}</div>}

                            {response && (
                                <div
                                    className="alert alert-light mt-4 border rounded p-3"
                                    style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem' }}
                                >
                                    <strong className="text-success">AI Response:</strong>
                                    <div className="mt-2">{response}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
