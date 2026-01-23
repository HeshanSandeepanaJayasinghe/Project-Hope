import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, User, X } from 'lucide-react';
import './Signup.css';

const Signup = ({ onClose, onSignupSuccess }) => {
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
        occupation: ''
    });

    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All required fields must be filled');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return false;
        }

        if (!agreeTerms) {
            setError('You must agree to the terms and conditions');
            return false;
        }

        if (userType === 'recipient') {
            if (!formData.nic || !formData.birthday || !formData.telephone || !formData.address || !formData.postalCode) {
                setError('All recipient fields are required');
                return false;
            }
        } else {
            if (!formData.nic || !formData.organization || !formData.occupation) {
                setError('All donor fields are required');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            await register({
                ...formData,
                type: userType
            });
            onSignupSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-overlay">
            <div className="signup-modal">
                {/* Header */}
                <div className="signup-header">
                    <h2>Create Account</h2>
                    <button onClick={onClose} className="close-button">
                        <X size={24} />
                    </button>
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
                <div className="signup-body">
                    {error && (
                        <div className="alert alert--danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            {/* Name */}
                            <div className="form-group">
                                <label className="form-label">Name *</label>
                                <div className="input-wrapper">
                                    <User className="icon" size={18} />
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
                                    <Mail className="icon" size={18} />
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
                                    <Lock className="icon" size={18} />
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
                                        className="icon icon--clickable"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="form-group">
                                <label className="form-label">Confirm Password *</label>
                                <div className="input-wrapper">
                                    <Lock className="icon" size={18} />
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
                                        className="icon icon--clickable"
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
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                            />
                            <label htmlFor="agree-terms">I agree with terms and conditions</label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn--primary btn--full"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
