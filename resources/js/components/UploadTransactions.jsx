import React, { useState } from 'react';
import axios from 'axios';

const UploadTransactions = ({ onSuccess }) => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');
    const [uploading, setUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setStatus('');
        setIsSuccess(false);
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('Please select a file.');
            setIsSuccess(false);
            return;
        }

        setUploading(true);
        setStatus('Uploading...');
        setIsSuccess(false);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/upload-transactions', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setStatus(res.data.message || 'Upload successful!');
            setIsSuccess(true);

            // Hide the form after a short delay
            setTimeout(() => {
                setFile(null);
                setStatus('');
                setIsSuccess(false);
                if (onSuccess) onSuccess();
            }, 1500);
        } catch (err) {
            setStatus('Upload failed. Please check your file and try again.');
            setIsSuccess(false);
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container py-2">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card shadow-sm border-0 rounded-4 p-3 mt-4">
                        <h4 className="text-center mb-3 text-primary">📁 Upload Transactions</h4>

                        <input
                            type="file"
                            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            className="form-control mb-3"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />

                        <div className="d-grid">
                            <button
                                className="btn btn-success"
                                onClick={handleUpload}
                                disabled={uploading || !file}
                            >
                                {uploading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                                        Uploading...
                                    </>
                                ) : (
                                    'Upload'
                                )}
                            </button>
                        </div>

                        {status && (
                            <div
                                className={`alert mt-3 ${
                                    isSuccess ? 'alert-success' : 'alert-danger'
                                }`}
                            >
                                {status}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadTransactions;
