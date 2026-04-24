import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './AdminViewProfile.css';

const AdminViewProfile = () => {
  const { authAxios } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    office: '',
    address: '',
  });

  const syncProfile = (data) => {
    setFormData({
      fullName: data.fullName || data.name || '',
      email: data.email || '',
      phone: data.phone || data.telephone || '',
      department: data.department || data.role || '',
      office: data.office || '',
      address: data.address || '',
    });
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get('/admin/profile');
      syncProfile(response.data || {});
    } catch (error) {
      toast.error('Unable to load admin profile.');
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
      await authAxios.patch('/admin/update/profile', formData);
      toast.success('Admin profile updated successfully.');
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
        <h2>Admin Profile</h2>
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image-placeholder">A</div>
            <div>
              <p className="profile-role">Administrator</p>
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
                <label>Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" value={formData.email} disabled />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Office</label>
                <input
                  name="office"
                  value={formData.office}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group full-width">
                <label>Office Address</label>
                <input
                  name="address"
                  value={formData.address}
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

export default AdminViewProfile;
