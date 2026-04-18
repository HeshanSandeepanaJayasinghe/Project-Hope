import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Dashboard from '../../components/DashboardContent';
import './VerifierDashboard.css';

const VerifierDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-layout">
                <Sidebar
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <Dashboard />
            </div>
        </div>
    );
};

export default VerifierDashboard;