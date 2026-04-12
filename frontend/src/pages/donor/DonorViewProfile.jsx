import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './donor-shared.css';

const DonorViewProfile = () => {
    const { user, email, userProfile, authAxios, fetchProfile } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        nic: '',
        organization: '',
        occupation: '',
        profilePhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Donor'
    });

    useEffect(() => {
        //  Automatically trigger profile fetch on component mount
        if (!userProfile && user && email) {
            fetchProfile(user, email);
        }
    }, [user, email, userProfile, fetchProfile]);

    useEffect(() => {
        //  Bind fetched profile data to local form state
        if (userProfile) {
            setFormData({
                name: userProfile.name || '',
                nic: userProfile.nic || '',
                organization: userProfile.organization || '',
                occupation: userProfile.occupation || '',
                profilePhoto: userProfile.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`
            });
        }
    }, [userProfile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            // Assuming update endpoint exists
            await authAxios.put(`/donor/update/profile/${email}`, formData);
            await fetchProfile(user, email);
            setIsEditing(false);
            console.log('Saved:', formData);
        } catch (err) {
            console.error('Failed to save profile:', err);
        }
    };

    return (
        <div className="donor-page-container">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <main className="donor-main-content">
                <header className="donor-header">
                    <h1 className="donor-title">My Profile</h1>
                </header>

                <div className="donor-glass-card profile-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
                        <div style={{ position: 'relative' }}>
                            <img
                                src={formData.profilePhoto}
                                alt="Profile"
                                style={{ width: '150px', height: '150px', borderRadius: '50%', border: '4px solid var(--donor-primary-light)', objectFit: 'cover' }}
                            />
                            {isEditing && (
                                <button className="donor-btn-primary" style={{ position: 'absolute', bottom: '0', right: '0', padding: '0.5rem', borderRadius: '50%' }}>
                                    📷
                                </button>
                            )}
                        </div>
                        <h2 style={{ marginTop: '1rem', color: 'var(--donor-secondary)' }}>{formData.name || email?.split('@')[0] || 'User'}</h2>
                        <p style={{ color: 'var(--donor-text-muted)' }}>Donor Account</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="form-group">
                            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--donor-glass-border)', background: isEditing ? 'white' : 'transparent' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>NIC Number</label>
                            <input
                                type="text"
                                name="nic"
                                value={formData.nic}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--donor-glass-border)', background: isEditing ? 'white' : 'transparent' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Occupation</label>
                            <input
                                type="text"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--donor-glass-border)', background: isEditing ? 'white' : 'transparent' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Organization</label>
                            <input
                                type="text"
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--donor-glass-border)', background: isEditing ? 'white' : 'transparent' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        {!isEditing ? (
                            <button className="donor-btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                        ) : (
                            <>
                                <button className="donor-btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button className="donor-btn-primary" onClick={handleSave}>Save Changes</button>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DonorViewProfile;
