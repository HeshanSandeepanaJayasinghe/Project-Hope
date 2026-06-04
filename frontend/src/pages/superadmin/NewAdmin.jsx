import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { Eye, EyeOff, Mail, Phone, User, Lock, Loader, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import './NewAdmin.css';

const NewAdmin = () => {
    const { authAxios } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        firstName: '',
        lastName: ''
    });

    const sidebarItems = [
        { id: 'admins-list', label: 'Admins List' },
        { id: 'add-admin', label: 'Add New Admin' }
    ];

    const handleTabClick = (tabId) => {
        if (tabId === 'admins-list') {
            navigate('/superadmin/user-management');
        }
        setSidebarOpen(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[0-9]{10}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!formData.email || !formData.password || !formData.phoneNumber || !formData.firstName || !formData.lastName) {
            toast.error('All fields are required');
            return false;
        }

        if (!emailRegex.test(formData.email)) {
            toast.error('Invalid email format');
            return false;
        }

        if (formData.password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return false;
        }

        if (!phoneRegex.test(formData.phoneNumber)) {
            toast.error('Phone number must be 10 digits');
            return false;
        }

        if (!nameRegex.test(formData.firstName)) {
            toast.error('First name must contain only letters and spaces');
            return false;
        }

        if (!nameRegex.test(formData.lastName)) {
            toast.error('Last name must contain only letters and spaces');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const test = await authAxios.post('/superadmin/register/admin', formData);
            toast.success('Admin created successfully');
            navigate('/superadmin/user-management');
        } catch (error) {
            console.error('Failed to create admin:', error);
            const message = error.response?.data?.message || 'Failed to create admin';
            toast.error(message);
        } finally {
            setLoading(false);
        }
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
                        {/* Header with Back Button */}
                        <div className="new-admin-header-section">
                            <button 
                                className="btn btn--back"
                                onClick={() => navigate('/superadmin/user-management')}
                            >
                                <ArrowLeft size={20} />
                                Back
                            </button>
                            <h1>Add New Admin</h1>
                        </div>

                        {/* Form Card */}
                        <div className="new-admin-form-card">
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    {/* First Name */}
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <div className="input-wrapper">
                                            <User className="icon" size={20} />
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="input"
                                            />
                                        </div>
                                    </div>

                                    {/* Last Name */}
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <div className="input-wrapper">
                                            <User className="icon" size={20} />
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="input"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="form-group full-width">
                                        <label className="form-label">Email</label>
                                        <div className="input-wrapper">
                                            <Mail className="icon" size={20} />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="john.doe@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="input"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="form-group full-width">
                                        <label className="form-label">Phone Number</label>
                                        <div className="input-wrapper">
                                            <Phone className="icon" size={20} />
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                placeholder="0723456789"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                className="input"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="form-group full-width">
                                        <label className="form-label">Password</label>
                                        <div className="input-wrapper">
                                            <Lock className="icon" size={20} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="input"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="icon icon--clickable"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn btn--secondary"
                                        onClick={() => navigate('/superadmin/user-management')}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn--primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader size={18} className="spinner-small" />
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Admin'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default NewAdmin;
