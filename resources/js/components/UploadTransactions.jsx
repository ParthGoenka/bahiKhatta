import React, { useState } from 'react';
import axios from 'axios';

/**
 * UploadTransactions component allows users to upload CSV or Excel files
 * and sends them to the backend for parsing and insertion into the transactions table.
 */
const UploadTransactions = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setStatus('');
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('Please select a file.');
            return;
        }
        setUploading(true);
        setStatus('Uploading...');
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('/api/upload-transactions', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setStatus(res.data.message || 'Upload successful!');
        } catch (err) {
            setStatus('Upload failed. Please check your file and try again.');
            console.log(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="card p-4 mb-4 max-w-lg mx-auto">
            <h5 className="mb-3">Upload Transactions (CSV or Excel)</h5>
            <input
                type="file"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                className="form-control mb-2"
                onChange={handleFileChange}
                disabled={uploading}
            />
            <button
                className="btn btn-primary mb-2"
                onClick={handleUpload}
                disabled={uploading || !file}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {status && <div className="alert mt-2 alert-info">{status}</div>}
        </div>
    );
};

export default UploadTransactions; 