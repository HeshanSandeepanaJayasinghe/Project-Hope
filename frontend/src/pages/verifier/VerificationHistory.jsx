import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './VerificationHistory.css';

const VerificationHistory = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="verification-history-wrapper">
            <div className="dashboard-layout">
                <Sidebar
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <div className="verification-history-content">
                    <h1>Verification History</h1>
                    <div className="placeholder-content">
                        <h2>Verification History</h2>
                        <p>This section will be integrated later with the API to display the history of verification requests.</p>
                        <p>Expected features: List of past verifications, status updates, timestamps, etc.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationHistory;