import React, { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './SuperAdminDashboard.css';
import axios from 'axios';

const SuperAdminManageAdmins = () => {
    const { token } = useContext(AuthContext);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });

    // Fetch admins function
    const fetchAdmins = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/superadmin/get/admins', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch admins');
            }

            const data = await response.json();
            setAdmins(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Fetch admins on component mount
    useEffect(() => {
        fetchAdmins();
    }, [fetchAdmins]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/superadmin/register/admin', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to add admin');
            }

            // Refresh the list
            await fetchAdmins();
            setShowAddForm(false);
            setFormData({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditAdmin = (admin) => {
        setEditingAdmin(admin);
        setFormData({
            email: admin.email,
            password: '', // Don't pre-fill password for security
            firstName: admin.firstName,
            lastName: admin.lastName,
            phoneNumber: admin.phoneNumber
        });
    };

    const handleUpdateAdmin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/superadmin/update/admin/${editingAdmin.userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update admin');
            }

            // Refresh the list
            await fetchAdmins();
            setEditingAdmin(null);
            setFormData({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteAdmin = async (adminId) => {
        if (!window.confirm('Are you sure you want to delete this admin?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/superadmin/delete/admin/${adminId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete admin');
            }

            // Refresh the list
            await fetchAdmins();
        } catch (err) {
            setError(err.message);
        }
    };

    const resetForm = () => {
        setShowAddForm(false);
        setEditingAdmin(null);
        setFormData({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: ''
        });
    };

    if (loading) {
        return <div className="loading">Loading admins...</div>;
    }

    return (
        <div className="super-admin-manage-admins">
            <div className="header">
                <h1>Manage Admins</h1>
                <button
                    className="add-admin-btn"
                    onClick={() => setShowAddForm(true)}
                >
                    Add New Admin
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {(showAddForm || editingAdmin) && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{editingAdmin ? 'Edit Admin' : 'Add New Admin'}</h2>
                        <form onSubmit={editingAdmin ? handleUpdateAdmin : handleAddAdmin}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required={!editingAdmin}
                                    placeholder={editingAdmin ? 'Leave blank to keep current password' : ''}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">First Name:</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name:</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number:</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="submit-btn">
                                    {editingAdmin ? 'Update Admin' : 'Add Admin'}
                                </button>
                                <button type="button" className="cancel-btn" onClick={resetForm}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="admins-table">
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.userId}>
                                <td>{admin.email}</td>
                                <td>{admin.firstName}</td>
                                <td>{admin.lastName}</td>
                                <td>{admin.phoneNumber}</td>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEditAdmin(admin)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteAdmin(admin.userId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuperAdminManageAdmins;