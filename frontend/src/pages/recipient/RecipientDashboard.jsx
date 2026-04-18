import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext.jsx';
import './RecipientDashboard.css';
import DashboardContent from '../../components/DashboardContent.jsx';

const RecipientDashboard = () => {
    const navigate = useNavigate();
    const { authAxios } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('posts');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    const sidebarItems = [
        { id: 'view-profile', label: 'View Profile' },
        { id: 'posts', label: 'Posts' },
        { id: 'verification', label: 'Verification' }
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setSidebarOpen(false);
    };

    return (
        <div className="recipient-dashboard-wrapper">
            <div className="dashboard-layout">
                <Sidebar 
                    role="recipient"
                    items={sidebarItems}
                    onItemClick={handleTabClick}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />

                <DashboardContent/>
            </div>
        </div>
    );
};

export default RecipientDashboard;
