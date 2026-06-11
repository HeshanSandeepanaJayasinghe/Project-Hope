import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './VerificationHistory.css';

const VerificationHistory = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { authAxios } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVerificationHistory();
    }, []);

    const fetchVerificationHistory = async () => {
        try {
            setLoading(true);
            const response = await authAxios.get('/admin/history/all');
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching verification history:', error);
            toast.error('Failed to load verification history');
            setHistory([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'verified':
                return 'status-badge verified';
            case 'unverified':
                return 'status-badge unverified';
            case 'fraud':
                return 'status-badge fraud';
            default:
                return 'status-badge';
        }
    };

    return (
        <div className="verification-history-wrapper">
            <div className="dashboard-layout">
                <Sidebar
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <div className="verification-history-content">
                    <h1>Verification History</h1>
                    
                    {loading ? (
                        <div className="placeholder-content">
                            <p>Loading verification history...</p>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="placeholder-content">
                            <p>No verification history found.</p>
                        </div>
                    ) : (
                        <div className="history-table-container">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>History ID</th>
                                        <th>Verification ID</th>
                                        <th>Verifier ID</th>
                                        <th>Previous State</th>
                                        <th>New State</th>
                                        <th>Timestamp</th>
                                        <th>PDF Viewed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((record) => (
                                        <tr key={record.historyId}>
                                            <td>{record.historyId}</td>
                                            <td>{record.verificationId}</td>
                                            <td>{record.verifierUserId}</td>
                                            <td>
                                                <span className={getStatusBadgeClass(record.previousState)}>
                                                    {record.previousState}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={getStatusBadgeClass(record.newState)}>
                                                    {record.newState}
                                                </span>
                                            </td>
                                            <td>{formatDate(record.verificationTimeStamp)}</td>
                                            <td>
                                                <span className={`pdf-badge ${record.pdfViewed ? 'viewed' : 'not-viewed'}`}>
                                                    {record.pdfViewed ? '✓ Yes' : '✕ No'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerificationHistory;
