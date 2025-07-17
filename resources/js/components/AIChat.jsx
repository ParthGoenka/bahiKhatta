import React, { useState } from 'react';
import axios from 'axios';
import Navbar1 from './Navbar1';

/**
 * AIChat component for chatting with the local Qwen model via backend API.
 * Allows user to enter a prompt, sends it to /api/ai-chat, and displays the response.
 */
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

    return (
        <div className="card p-4 mb-4">
            <Navbar1 />
            <h5 className="mb-3">Munshi Ji</h5>
            <textarea
                className="form-control mb-2"
                rows={3}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Type your message..."
            />
            <button className="btn btn-primary mb-2" onClick={handleSend} disabled={loading || !prompt.trim()}>
                {loading ? 'Sending...' : 'Send'}
            </button>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {response && (
                <div className="alert alert-success mt-2">
                    <strong>AI:</strong> {response}
                </div>
            )}
        </div>
    );
};

export default AIChat; 