import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, User, Store } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { login, register } = useAuth();
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

    if (!isLogin) {
      if (!formData.name) {
        setError('Name is required');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
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
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate('/login');
      } else {
        await register(formData);
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-root">
      <div className="container">
        {/* Card */}
        <div className="auth-card">
          {/* Header */}
          <div className="auth-card__header">
            <h2 className="auth-title">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="auth-subtitle">
              {isLogin ? 'Login to continue shopping' : 'Join our fashion community'}
            </p>
          </div>

          {/* Form */}
          <div className="auth-card__body">
            {error && (
              <div className="alert alert--danger">
                {error}
              </div>
            )}

            <div className="form">
              {!isLogin && (
                <>
                  {/* Name Input */}
                  <div>
                    <label className="form-label">
                      Full Name
                    </label>
                    <div className="input-wrapper">
                      <User className="icon" size={20} />
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email Input */}
              <div>
                <label className="form-label">
                  Email Address
                </label>
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
                <label className="form-label">
                  Password
                </label>
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

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn--primary"
              >
                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
              </button>
            </div>

            {/* Toggle Login/Register */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({
                    email: '',
                    password: '',
                    name: '',
                    role: 'customer',
                    storeName: ''
                  });
                }}
                className="toggle-link"
              >
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <span className="text-highlight">Register</span>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <span className="text-highlight">Login</span>
                  </>
                )}
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 text-center">
                <a href="#" className="muted-link">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="muted-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;