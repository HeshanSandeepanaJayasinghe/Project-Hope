import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './RecipientViewProfile.css';
import { User } from 'lucide-react';

const RecipientViewProfile = () => {
  const { authAxios } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    birthday: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    password: '',
    confirmPassword: '',
    accountNo: '',
    verificationSubmitted: false,
  });

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get('/recipient/me');
      const userData = response.data || {};
      setFormData({
        name: userData.name || '',
        nic: userData.nic || '',
        birthday: userData.birthday || '',
        phoneNumber: userData.phoneNumber  || '',
        address: userData.address || '',
        postalCode: userData.postalCode || '',
        accountNo: userData.accountNo || '',
        password: '',
        confirmPassword: '',
        verificationSubmitted: userData.verificationSubmitted || false,
      });
    } catch (error) {
      toast.error('Unable to load recipient profile.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [authAxios]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        name: formData.name,
        nic: formData.nic,
        birthday: formData.birthday,
        address: formData.address,
        postalCode: formData.postalCode,
        accountNo: formData.accountNo,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };

      if (formData.password && formData.password === formData.confirmPassword) {
        patchBody.password = formData.password;
      }

      await authAxios.patch('/recipient/update/profile', patchBody);
      toast.success('Recipient profile updated successfully.');
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      toast.error('Failed to save recipient profile.');
      console.error(error);
    }
  };

  return (
    <div className="view-profile-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="view-profile">
        <h2>Recipient Profile</h2>
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image-placeholder"><User /></div>
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
            <h3>Registered Details</h3>
            <div className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>NIC</label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Birthday</label>
                <input
                  type="text"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              {formData.verificationSubmitted ? (
                <div className="form-group">
                  <label>Account No</label>
                  <input
                    type="text"
                    name="accountNo"
                    value={formData.accountNo}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              ) : null}
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
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

export default RecipientViewProfile;
