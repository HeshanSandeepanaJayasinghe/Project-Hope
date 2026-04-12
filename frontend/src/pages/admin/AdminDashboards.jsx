import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext.jsx';
import './AdminDashboard.css';

const createAdminDashboard = (role, roleLabel, sidebarItems) => {
    const AdminDashboard = () => {
        const navigate = useNavigate();
        const [activeTab, setActiveTab] = useState(sidebarItems[0]?.id || 'dashboard');
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        const { authAxios } = useContext(AuthContext);

        useEffect(() => {
            const fetchPosts = async () => {
                setLoading(true);
                try {
                    const response = await authAxios.get('/open/get/all/posts');
                    setPosts(response.data || []);
                } catch (error) {
                    console.error('Failed to load posts:', error);
                    setPosts([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchPosts();
        }, [authAxios]);

        const handleTabClick = (tabId) => {
            setActiveTab(tabId);
            setSidebarOpen(false);
        };

        const renderPosts = () => {
            if (loading) {
                return <div className="loading-state">Loading posts...</div>;
            }

            if (!posts.length) {
                return <div className="empty-state">No posts available.</div>;
            }

            return (
                <div className="posts-grid-admin">
                    {posts.map((post) => {
                        const postId = post.postId ?? post.id;
                        return (
                            <div key={postId} className="post-card-admin">
                                <img src={post.imageUrl || post.image || 'https://via.placeholder.com/320x220'} alt={post.title || 'Post image'} />
                                <div className="post-info-admin">
                                    <h4>{post.title || 'Untitled post'}</h4>
                                    <p><strong>Category:</strong> {post.postCategory || post.category || 'Uncategorized'}</p>
                                    <p><strong>Description:</strong> {post.description || 'No description provided.'}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        };

        return (
            <div className="admin-dashboard-wrapper">
                <div className="admin-layout">
                    <Sidebar 
                        role={role}
                        items={sidebarItems}
                        onItemClick={handleTabClick}
                        isOpen={sidebarOpen}
                        setIsOpen={setSidebarOpen}
                    />

                    <div className="admin-content">
                        <main className="admin-main">
                            <h1>{roleLabel} Dashboard</h1>
                            
                            {(activeTab === 'dashboard' || activeTab === sidebarItems[0]?.id) && renderPosts()}

                            {activeTab === 'staff-management' && role === 'superadmin' && (
                                <div className="content-placeholder">
                                    <p>Manage staff and administrators</p>
                                    <button 
                                        className="nav-btn"
                                        onClick={() => navigate('/superadmin/manage-admins')}
                                    >
                                        Manage Admins
                                    </button>
                                </div>
                            )}

                            {activeTab === 'staff-management' && role !== 'superadmin' && (
                                <div className="content-placeholder">
                                    <p>Content for {activeTab}</p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        );
    };

    return AdminDashboard;
};

export const VerifierDashboard = createAdminDashboard('verifier', 'Verifier', [
    { id: 'user-management', label: 'User Management' },
    { id: 'verification-requests', label: 'Verification Requests' },
    { id: 'donation-management', label: 'Donation Management' }
]);

export const FinancierDashboard = createAdminDashboard('financier', 'Financier', [
    { id: 'donation-activity', label: 'Donation Activity' },
    { id: 'verification-requests', label: 'Verification Requests' },
    { id: 'donation-management', label: 'Donation Management' }
]);

export const AdminDashboard = createAdminDashboard('admin', 'Admin', [
    { id: 'staff-management', label: 'Staff Management' },
    { id: 'user-management', label: 'User Management' },
    { id: 'verification-history', label: 'Verification History' },
    { id: 'donation-activity', label: 'Donation Activity' },
    { id: 'statistics', label: 'Statistics' }
]);

export const SuperAdminDashboard = createAdminDashboard('superadmin', 'Super Admin', [
    { id: 'system-settings', label: 'System Settings' },
    { id: 'staff-management', label: 'Staff Management' },
    { id: 'user-management', label: 'User Management' },
    { id: 'verification-history', label: 'Verification History' },
    { id: 'donation-activity', label: 'Donation Activity' },
    { id: 'statistics', label: 'Statistics' }
]);
