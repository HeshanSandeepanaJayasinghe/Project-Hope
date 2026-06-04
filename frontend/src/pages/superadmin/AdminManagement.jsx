import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { Trash2, Plus, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import './AdminManagement.css';

const AdminManagement = () => {
    const { authAxios } = useContext(AuthContext);
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarItems = [
        { id: 'admins-list', label: 'Admins List' },
        { id: 'add-admin', label: 'Add New Admin' }
    ];

    const [activeTab, setActiveTab] = useState('admins-list');

    const handleTabClick = (tabId) => {
        if (tabId === 'add-admin') {
            navigate('/superadmin/new-admin');
        } else {
            setActiveTab(tabId);
        }
        setSidebarOpen(false);
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const response = await authAxios.get('/superadmin/get/admins');
            setAdmins(response.data || []);
            if (response.data && response.data.length > 0) {
                toast.success(`Loaded ${response.data.length} admin(s)`);
            }
        } catch (error) {
            console.error('Failed to load admins:', error);
            toast.error('Failed to load admins. Please try again.');
            setAdmins([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAdmin = async (adminId) => {
        if (!window.confirm('Are you sure you want to delete this admin?')) {
            return;
        }

        setDeleting(adminId);
        try {
            await authAxios.delete(`/superadmin/delete/admin/${adminId}`);
            toast.success('Admin deleted successfully');
            await fetchAdmins();
        } catch (error) {
            console.error('Failed to delete admin:', error);
            toast.error(error.response?.data?.message || 'Failed to delete admin');
        } finally {
            setDeleting(null);
        }
    };

    const handleAdminAdded = (newAdmin) => {
        setAdmins([...admins, newAdmin]);
        toast.success('Admin added successfully');
    };

    return (
        <div className="admin-dashboard-wrapper">
            <div className="admin-layout">
                <Sidebar 
                    role="superadmin"
                    items={sidebarItems}
                    onItemClick={handleTabClick}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />

                <div className="admin-content">
                    <main className="admin-main">
                        {/* Header Section */}
                        <div className="admin-management-header">
                            <div className="header-content">
                                <h1 className="admin-management-title">Admins</h1>
                            </div>
                            <button
                                className="btn btn--primary btn--add-admin"
                                onClick={() => navigate('/superadmin/new-admin')}
                            >
                                <Plus size={20} />
                                Add New Admin
                            </button>
                        </div>

                        {/* Admins Table / List */}
                        <div className="admin-management-content">
                            {loading ? (
                                <div className="loading-state">
                                    <Loader className="spinner" size={40} />
                                    <p>Loading admins...</p>
                                </div>
                            ) : admins.length === 0 ? (
                                <div className="empty-state">
                                    <p>No admins found</p>
                                    <p className="empty-state-subtitle">Click "Add New Admin" to create your first admin</p>
                                </div>
                            ) : (
                                <div className="admins-table-wrapper">
                                    <table className="admins-table">
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admins.map((admin, index) => {
                                                // Use id, adminId, or index as fallback for key
                                                const adminId = admin.id || admin.adminId || admin.userId || index;
                                                return (
                                                    <tr key={adminId} className="admin-row">
                                                        <td className="cell-firstName">{admin.firstName}</td>
                                                        <td className="cell-lastName">{admin.lastName}</td>
                                                        <td className="cell-email">{admin.email}</td>
                                                        <td className="cell-phone">{admin.phoneNumber}</td>
                                                        <td className="cell-actions">
                                                            <button
                                                                className="btn btn--danger btn--small"
                                                                onClick={() => handleDeleteAdmin(adminId)}
                                                                disabled={deleting === adminId}
                                                                title="Delete admin"
                                                            >
                                                                {deleting === adminId ? (
                                                                    <Loader size={18} className="spinner-small" />
                                                                ) : (
                                                                    <Trash2 size={18} />
                                                                )}
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminManagement;
