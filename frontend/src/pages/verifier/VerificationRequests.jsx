import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './VerificationRequests.css';

const VerificationRequests = () => {
    const navigate = useNavigate();
    const { authAxios } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVerificationRequests();
    }, []);

    const fetchVerificationRequests = async () => {
        try {
            const response = await authAxios.get('/api/get/verificationrequests');
            setRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching verification requests:', error);
            toast.error('Failed to load verification requests');
            setLoading(false);
        }
    };

    const handleRequestClick = (requestId) => {
        navigate('/verifier/verification-view', { state: { requestId } });
    };

    return (
        <div className="verification-requests-wrapper">
            <div className="dashboard-layout">
                <Sidebar
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <div className="verification-requests-content">
                    <h1>Verification Requests</h1>
                    {loading ? (
                        <p>Loading verification requests...</p>
                    ) : (
                        <div className="requests-list">
                            {requests.length === 0 ? (
                                <p>No verification requests found.</p>
                            ) : (
                                requests.map((request, index) => (
                                    <div
                                        key={request.id || index}
                                        className="request-row"
                                        onClick={() => handleRequestClick(request.id)}
                                    >
                                        <div className="request-info">
                                            <h3>Request #{request.id}</h3>
                                            <p>Status: {request.status || 'Pending'}</p>
                                            <p>Submitted: {request.submittedDate || 'N/A'}</p>
                                        </div>
                                        <div className="request-actions">
                                            <button className="view-btn">View Details</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerificationRequests;