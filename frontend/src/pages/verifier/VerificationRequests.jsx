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
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVerificationRecipients();
    }, []);

    const fetchVerificationRecipients = async () => {
        try {
            const response = await authAxios.get('/verifier/get/all/recipients');
            const filteredRecipients = response.data.filter((recipient) => recipient.province);
            setRecipients(filteredRecipients);
        } catch (error) {
            console.error('Error fetching verification recipients:', error);
            toast.error('Failed to load verification recipients');
        } finally {
            setLoading(false);
        }
    };

    const handleRecipientClick = (userId) => {
        navigate('/verifier/verification-view', { state: { userId } });
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
                            {recipients.length === 0 ? (
                                <p>No verification requests found.</p>
                            ) : (
                                recipients.map((recipient) => (
                                    <div
                                        key={recipient.userId || recipient.recipientId}
                                        className="request-row"
                                        onClick={() => handleRecipientClick(recipient.userId)}
                                    >
                                        <div className="request-info">
                                            <h3>{recipient.name || 'Unnamed Recipient'}</h3>
                                            <p>{recipient.email || 'No email provided'}</p>
                                            <p>Verification ID: {recipient.verificationId}</p>
                                            <p>Status: {recipient.verificationStatus || 'Pending'}</p>
                                        </div>
                                        <div className="request-actions">
                                            <button className="view-btn" type="button">View Details</button>
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