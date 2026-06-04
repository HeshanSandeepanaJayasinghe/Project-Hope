import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Dashboard from '../../components/DashboardContent';
import './AdminDashboard.css';

const AdminDashboard = () => {
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

export default AdminDashboard;
