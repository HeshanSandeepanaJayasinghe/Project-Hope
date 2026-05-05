import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import './Signup.css';

const Signup = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userType, setUserType] = useState('recipient');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        nic: '',
        birthday: '',
        telephone: '',
        address: '',
        postalCode: '',
        organization: '',
        occupation: '',
        agreeToTerms: false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const nicRegex = /^[0-9]{9,12}[vV]?$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const postalCodeRegex = /^[0-9]{4,10}$/;

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('All required fields must be filled');
            return false;
        }

        if (!nameRegex.test(formData.name)) {
        toast.error('Name must contain only letters and spaces');
        return false;
        }  

        if (!nicRegex.test(formData.nic)) {
        toast.error('Invalid NIC format. Must be 9-12 digits, optionally ending with v or V');
        return false;
        }

        if (!emailRegex.test(formData.email)) {
        toast.error('Invalid email format');
        return false;
        }

        if (userType === 'recipient' & !postalCodeRegex.test(formData.postalCode)) {
        toast.error('Invalid postal code format. Must be 4-10 digits');
        return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }

        if (formData.password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return false;
        }

        if (userType === 'recipient' & formData.address.length < 5 || formData.address.length > 255) {
            toast.error('Address must be between 5 and 255 characters');
            return false;
        }

        if (!agreeTerms) {
            toast.error('You must agree to the terms and conditions');
            return false;
        }

        if (userType === 'recipient') {
            if (!formData.nic || !formData.birthday || !formData.telephone || !formData.address || !formData.postalCode) {
                toast.error('All fields are required');
                return false;
            }
        } else {
            if (!formData.nic || !formData.occupation) {
                toast.error('All fields are required');
                return false;
            }
        }

        return true;
    };

    const validatePassword = (pw) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        return passwordRegex.test(pw);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (!validatePassword(formData.password)) {
            toast.error("Password must contain at least one digit, one lowercase, one uppercase, and one special character", {
            });
            return;
        }

        setLoading(true);
        setError('');

        try {
            await register({...formData, userType});
            toast.success("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-root">
            <div className="signup-container">
                {/* Card */}
                <div className="auth-card signup-card">
                    {/* Header */}
                    <div className="auth-card__header">
                        <h2 className="auth-title">Create Account</h2>
                    </div>

                    {/* User Type Switcher */}
                    <div className="user-type-switcher">
                        <button
                            className={`type-button ${userType === 'recipient' ? 'active' : ''}`}
                            onClick={() => setUserType('recipient')}
                        >
                            I'm a Recipient
                        </button>
                        <button
                            className={`type-button ${userType === 'donor' ? 'active' : ''}`}
                            onClick={() => setUserType('donor')}
                        >
                            I'm a Donor
                        </button>
                    </div>

                    {/* Form */}
                    <div className="auth-card__body">
                        {error && (
                            <div className="alert alert--danger">
                                {error}
                            </div>
                        )}

                        <div className="form">
                            <p className="form-section-title">Sign up</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Name *</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <div className="input-wrapper">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="form-group">
                                <label className="form-label">Password *</label>
                                <div className="input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Create Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="icon-signup icon--clickable"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="form-group">
                                <label className="form-label">Confirm Password *</label>
                                <div className="input-wrapper">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="icon-signup icon--clickable"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* NIC */}
                            <div className="form-group">
                                <label className="form-label">NIC *</label>
                                <input
                                    type="text"
                                    name="nic"
                                    placeholder="NIC Number"
                                    value={formData.nic}
                                    onChange={handleChange}
                                    className="input input-plain"
                                />
                            </div>

                            {userType === 'recipient' ? (
                                <>
                                    {/* Birthday */}
                                    <div className="form-group">
                                        <label className="form-label">Birthday *</label>
                                        <input
                                            type="date"
                                            name="birthday"
                                            value={formData.birthday}
                                            onChange={handleChange}
                                            className="input input-plain"
                                        />
                                    </div>

                                    {/* Telephone */}
                                    <div className="form-group">
                                        <label className="form-label">Telephone *</label>
                                        <input
                                            type="tel"
                                            name="telephone"
                                            placeholder="+94 (0)xx xxx xxxx"
                                            value={formData.telephone}
                                            onChange={handleChange}
                                            className="input input-plain"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="form-group full-width">
                                        <label className="form-label">Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Your Address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="input input-plain"
                                        />
                                    </div>

                                    {/* Postal Code */}
                                    <div className="form-group">
                                        <label className="form-label">Postal Code *</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            placeholder="Postal Code"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                            className="input input-plain"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Organization */}
                                    <div className="form-group full-width">
                                        <label className="form-label">Organization *</label>
                                        <input
                                            type="text"
                                            name="organization"
                                            placeholder="Organization Name"
                                            value={formData.organization}
                                            onChange={handleChange}
                                            className="input input-plain"
                                        />
                                    </div>

                                    {/* Occupation */}
                                    <div className="form-group full-width">
                                        <label className="form-label">Occupation *</label>
                                        <input
                                            type="text"
                                            name="occupation"
                                            placeholder="Your Occupation"
                                            value={formData.occupation}
                                            onChange={handleChange}
                                            className="input input-plain"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id="agree-terms"
                                checked={agreeTerms}
                                onChange={(e) => {
                                    setAgreeTerms(e.target.checked);
                                    setFormData({
                                        ...formData,
                                        agreeToTerms: e.target.checked,
                                    });
                                }}
                            />
                            <label htmlFor="agree-terms">I agree with terms and conditions</label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn--primary"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                            </form>
                        </div>

                        {/* Toggle to Login */}
                        <div className="auth-toggle">
                            <p>Already have an account? <button 
                                onClick={() => navigate('/login')}
                                className="toggle-button"
                            >Sign In</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
