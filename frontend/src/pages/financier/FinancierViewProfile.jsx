import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './FinancierViewProfile.css';

const FinancierViewProfile = () => {
  const { authAxios } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const syncProfile = (data) => {
    setFormData({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phoneNumber: data.phoneNumber || '',
    });
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get('/finance-manager/me');
      syncProfile(response.data || {});
    } catch (error) {
      toast.error('Unable to load financier profile.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [authAxios]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {

    try {
      if (formData.password || formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match.');
          return;
        }
        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters long.');
          return;
        }
      }

      const patchBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };

      if (formData.password && formData.password === formData.confirmPassword) {
        patchBody.password = formData.password;
      }

      await authAxios.patch('/finance-manager/update/profile', patchBody);
      toast.success('Financier profile updated successfully.');
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      toast.error('Could not update profile.');
      console.error(error);
    }
  };

  return (
    <div className="view-profile-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="view-profile">
        <h2>Financier Profile</h2>
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image-placeholder">F</div>
            <div>
              <p className="profile-role">Financier</p>
              <p className="profile-email">{formData.email || 'No email available'}</p>
            </div>
          </div>
          <div className="profile-buttons">
            {!isEditing ? (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button className="cancel-button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button className="save-button" onClick={handleSave}>
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {loading ? (
          <div className="profile-loading">Loading profile...</div>
        ) : (
          <div className="profile-details">
            <h3>Account Details</h3>
            <div className="profile-form">
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  name="email" 
                  value={formData.email} 
                  disabled />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancierViewProfile;
