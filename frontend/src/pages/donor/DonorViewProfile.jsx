import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './DonorViewProfile.css';

const DonorViewProfile = () => {
  const { authAxios } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    occupation: '',
    nic: '',
  });

  const syncProfile = (data) => {
    setFormData({
      fullName: data.fullName || data.name || '',
      email: data.email || '',
      phone: data.phone || data.telephone || '',
      organization: data.organization || data.company || '',
      occupation: data.occupation || data.role || '',
      nic: data.nic || data.identityNumber || '',
    });
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get('/donor/profile');
      syncProfile(response.data || {});
    } catch (error) {
      toast.error('Unable to load donor profile.');
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
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await authAxios.put('/donor/update/profile', formData);
      toast.success('Donor profile updated successfully.');
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      toast.error('Unable to save profile changes.');
      console.error(error);
    }
  };

  return (
    <div className="view-profile-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="view-profile">
        <h2>Donor Profile</h2>
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image-placeholder">D</div>
            <div>
              <p className="profile-role">Donor</p>
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
            <h3>Donor Details</h3>
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
                <label>NIC Number</label>
                <input
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Occupation</label>
                <input
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Organization</label>
                <input
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group full-width">
                <label>Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
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

export default DonorViewProfile;
