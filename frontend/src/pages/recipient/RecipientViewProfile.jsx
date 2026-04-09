import React, { useState } from 'react';
import './RecipientViewProfile.css';

const RecipientViewProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'John Doe',
        nic: '123456789V',
        birthday: '1990-05-15',
        telephone: '+94701234567',
        address: '123 Main Street, Colombo',
        postalCode: '00100'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="view-profile">
            <h2>My Profile</h2>
            
            <div className="profile-header">
                <div className="profile-image-section">
                    <div className="profile-image-placeholder">
                        <span>👤</span>
                    </div>
                    <button className="upload-button">Upload Image</button>
                </div>

                <div className="profile-buttons">
                    {!isEditing && (
                        <button 
                            className="edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    )}
                    {isEditing && (
                        <button 
                            className="done-button"
                            onClick={() => setIsEditing(false)}
                        >
                            Done
                        </button>
                    )}
                </div>
            </div>

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
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Birthday</label>
                        <input 
                            type="date" 
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Telephone</label>
                        <input 
                            type="tel" 
                            name="telephone"
                            value={formData.telephone}
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
                </div>
            </div>
        </div>
    );
};

export default RecipientViewProfile;
