import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext';
import { getErrorMessage, PASSWORD_REGEX, PASSWORD_MESSAGE } from '../utils/apiError';
import './ProfilePage.css';

const STAFF_FIELDS = [
  { name: 'firstName', label: 'First Name', editable: true },
  { name: 'lastName', label: 'Last Name', editable: true },
  { name: 'email', label: 'Email' },
  { name: 'phoneNumber', label: 'Phone Number', editable: true, type: 'tel' },
];

/**
 * One profile page for every role. Each role differs only in its API prefix, its fields and
 * its accent colours; the loading, editing and password-change behaviour is shared.
 */
const PROFILE_CONFIG = {
  ADMIN: {
    title: 'Admin Profile', roleLabel: 'Administrator', apiBase: '/admin',
    theme: { accent: '#2563eb', accentHover: '#1d4ed8', background: '#f4f6fb', avatar: '#e2e8f0' },
    fields: STAFF_FIELDS,
  },
  VERIFIER: {
    title: 'Verifier Profile', roleLabel: 'Verifier', apiBase: '/verifier',
    theme: { accent: '#0f766e', accentHover: '#0d6f68', background: '#f7f8fc', avatar: '#e2e8f0' },
    fields: STAFF_FIELDS,
  },
  FINANCE_MANAGER: {
    title: 'Financier Profile', roleLabel: 'Financier', apiBase: '/finance-manager',
    theme: { accent: '#7c3aed', accentHover: '#6d28d9', background: '#eef2ff', avatar: '#e2e8f0' },
    fields: STAFF_FIELDS,
  },
  DONOR: {
    title: 'Donor Profile', roleLabel: 'Donor', apiBase: '/donor',
    theme: { accent: '#10b981', accentHover: '#059669', background: '#f0fdf4', avatar: '#d1fae5' },
    fields: [
      { name: 'name', label: 'Name', editable: true },
      { name: 'email', label: 'Email' },
      { name: 'nic', label: 'NIC Number' },
      { name: 'occupation', label: 'Occupation', editable: true },
      { name: 'organization', label: 'Organization', editable: true },
    ],
  },
  RECIPIENT: {
    title: 'Recipient Profile', roleLabel: 'Recipient', apiBase: '/recipient',
    theme: { accent: '#334155', accentHover: '#1e293b', background: '#f8fafc', avatar: '#e2e8f0' },
    fields: [
      { name: 'name', label: 'Name', editable: true },
      { name: 'email', label: 'Email' },
      { name: 'nic', label: 'NIC' },
      { name: 'birthday', label: 'Birthday' },
      { name: 'phoneNumber', label: 'Phone Number', editable: true, type: 'tel' },
      { name: 'address', label: 'Address', editable: true },
      { name: 'postalCode', label: 'Postal Code', editable: true },
      {
        name: 'accountNo',
        label: 'Payout Account No',
        hint: 'Set by your verification form and reviewed by a verifier, so it cannot be changed here.',
        visible: (profile) => profile.verificationSubmitted,
      },
    ],
  },
};

const EMPTY_PASSWORDS = { currentPassword: '', password: '', confirmPassword: '' };

const ProfilePage = ({ role }) => {
  const config = PROFILE_CONFIG[role];
  const { authAxios, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({});
  const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authAxios.get(`${config.apiBase}/me`);
      const data = response.data || {};
      setProfile(data);
      setForm(Object.fromEntries(config.fields.map((field) => [field.name, data[field.name] ?? ''])));
    } catch (error) {
      toast.error(getErrorMessage(error, 'Unable to load your profile.'));
    } finally {
      setLoading(false);
    }
  }, [authAxios, config]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswords((current) => ({ ...current, [name]: value }));
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setPasswords(EMPTY_PASSWORDS);
    setForm(Object.fromEntries(config.fields.map((field) => [field.name, profile[field.name] ?? ''])));
  };

  const handleSave = async () => {
    const changingPassword = Boolean(passwords.password || passwords.confirmPassword);
    if (changingPassword) {
      if (passwords.password !== passwords.confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }
      if (!PASSWORD_REGEX.test(passwords.password)) {
        toast.error(PASSWORD_MESSAGE);
        return;
      }
      if (!passwords.currentPassword) {
        toast.error('Enter your current password to set a new one.');
        return;
      }
    }

    // Only editable fields are sent; the server ignores blank values.
    const body = Object.fromEntries(
      config.fields.filter((field) => field.editable).map((field) => [field.name, form[field.name]])
    );
    if (changingPassword) {
      body.password = passwords.password;
      body.currentPassword = passwords.currentPassword;
    }

    setSaving(true);
    try {
      await authAxios.patch(`${config.apiBase}/update/profile`, body);
      if (changingPassword) {
        // The server revokes all existing sessions when the password changes.
        logout('Password changed. Please log in with your new password.');
        return;
      }
      toast.success('Profile updated successfully.');
      setIsEditing(false);
      setPasswords(EMPTY_PASSWORDS);
      fetchProfile();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not update profile.'));
    } finally {
      setSaving(false);
    }
  };

  const themeStyle = {
    '--profile-accent': config.theme.accent,
    '--profile-accent-hover': config.theme.accentHover,
    '--profile-background': config.theme.background,
    '--profile-avatar': config.theme.avatar,
  };

  const visibleFields = config.fields.filter((field) => !field.visible || field.visible(profile));

  return (
    <div className="view-profile-layout" style={themeStyle}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="view-profile">
        <h2>{config.title}</h2>
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image-placeholder">{config.roleLabel.charAt(0)}</div>
            <div>
              <p className="profile-role">{config.roleLabel}</p>
              <p className="profile-email">{profile.email || 'No email available'}</p>
            </div>
          </div>
          <div className="profile-buttons">
            {!isEditing ? (
              <button type="button" className="edit-button" onClick={() => setIsEditing(true)} disabled={loading}>
                Edit Profile
              </button>
            ) : (
              <>
                <button type="button" className="cancel-button" onClick={cancelEditing} disabled={saving}>
                  Cancel
                </button>
                <button type="button" className="save-button" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
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
              {visibleFields.map((field) => (
                <div className="form-group" key={field.name}>
                  <label htmlFor={`profile-${field.name}`}>{field.label}</label>
                  {field.hint && <small className="form-hint">{field.hint}</small>}
                  <input
                    id={`profile-${field.name}`}
                    name={field.name}
                    type={field.type || 'text'}
                    value={form[field.name] ?? ''}
                    onChange={handleFieldChange}
                    disabled={!isEditing || !field.editable}
                  />
                </div>
              ))}
            </div>

            <h3 className="profile-section-title">Change Password</h3>
            <div className="profile-form">
              {[
                { name: 'currentPassword', label: 'Current Password', autoComplete: 'current-password' },
                { name: 'password', label: 'New Password', autoComplete: 'new-password' },
                { name: 'confirmPassword', label: 'Confirm New Password', autoComplete: 'new-password' },
              ].map((field) => (
                <div className="form-group" key={field.name}>
                  <label htmlFor={`profile-${field.name}`}>{field.label}</label>
                  <input
                    id={`profile-${field.name}`}
                    name={field.name}
                    type="password"
                    autoComplete={field.autoComplete}
                    value={passwords[field.name]}
                    onChange={handlePasswordChange}
                    disabled={!isEditing}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
