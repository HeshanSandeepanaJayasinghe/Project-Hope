import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Signup from './Signup';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-root">
      <div className="login-container">
        {/* Card */}
        <div className="auth-card login-card">
          {/* Header */}
          <div className="auth-card__header">
            <h2 className="auth-title">Welcome back!</h2>
          </div>

          {/* Form */}
          <div className="auth-card__body">
            {error && (
              <div className="alert alert--danger">
                {error}
              </div>
            )}

            <div className="form">
              <p className="form-section-title">Sign in</p>

              {/* Email Input */}
              <div>
                <label className="form-label">Email</label>
                <div className="input-wrapper">
                  <Mail className="icon" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
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

              {/* Remember Me Checkbox */}
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn--primary"
              >
                {loading ? 'Processing...' : 'Login'}
              </button>
            </div>

            {/* Toggle to Signup */}
            <div className="auth-toggle">
              <p>Don't have an account? <button 
                onClick={() => {
                  setIsSignup(true);
                  setError('');
                  setFormData({ email: '', password: '' });
                }}
                className="toggle-button"
              >Sign Up</button></p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="muted-link">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Signup Modal */}
      {isSignup && (
        <Signup 
          onClose={() => setIsSignup(false)} 
          onSignupSuccess={() => {
            setIsSignup(false);
            setFormData({ email: '', password: '' });
          }}
        />
      )}
    </div>
  );
};

export default Login;