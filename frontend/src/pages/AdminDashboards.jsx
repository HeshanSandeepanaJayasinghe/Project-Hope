import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './AdminDashboard.css';

const createAdminDashboard = (role, roleLabel, sidebarItems) => {
    const AdminDashboard = () => {
        const navigate = useNavigate();
        const [activeTab, setActiveTab] = useState(sidebarItems[0]?.id || 'dashboard');
        const [sidebarOpen, setSidebarOpen] = useState(false);

        // Mock data for posts
        const posts = [
            {
                id: 1,
                title: "Need Medical Support",
                category: "Financial",
                description: "I need funds for my surgery",
                image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 2,
                title: "Education Fees Support",
                category: "Educational",
                description: "Help me complete my studies",
                image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 3,
                title: "Food Aid Needed",
                category: "Health",
                description: "Family needs nutritious food",
                image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 4,
                title: "Water Supply Project",
                category: "Environmental",
                description: "Provide clean water to village",
                image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 5,
                title: "Housing Assistance",
                category: "Financial",
                description: "Help rebuild after disaster",
                image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 6,
                title: "Medical Equipment",
                category: "Health",
                description: "Purchase hospital equipment",
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
        ];

        const handleTabClick = (tabId) => {
            setActiveTab(tabId);
            setSidebarOpen(false);
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
                            
                            {/* Content based on active tab */}
                            {(activeTab === 'dashboard' || activeTab === sidebarItems[0]?.id) && (
                                <div className="posts-grid-admin">
                                    {posts.map((post) => (
                                        <div key={post.id} className="post-card-admin">
                                            <img src={post.image} alt={post.title} />
                                            <div className="post-info-admin">
                                                <h4>{post.title}</h4>
                                                <p><strong>Category:</strong> {post.category}</p>
                                                <p><strong>Description:</strong> {post.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab !== 'dashboard' && activeTab !== sidebarItems[0]?.id && (
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
