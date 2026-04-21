import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './VerificationRequestView.css';

const VerificationRequestView = () => {
    const location = useLocation();
    const { authAxios } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const requestId = location.state?.requestId;

    return (
        <div className="verification-request-view-wrapper">
            <div className="dashboard-layout">
                <Sidebar
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <div className="verification-request-view-content">
                    <h1>Verification Request Details</h1>
                    <p>Request ID: {requestId || 'N/A'}</p>
                    <div className="placeholder-content">
                        <h2>User Data</h2>
                        <p>This section will be integrated later with the API to fetch and display user data for verification.</p>
                        <p>Expected data includes: User profile information, documents, verification status, etc.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationRequestView;