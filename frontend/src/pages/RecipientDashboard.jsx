import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { provincesData, divisionalSecretarialsData } from '../data/sriLankanLocations';
import './RecipientDashboard.css';

const RecipientDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('posts');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarItems = [
        { id: 'view-profile', label: 'View Profile' },
        { id: 'posts', label: 'Posts' },
        { id: 'verification', label: 'Verification' }
    ];

    // Mock posts data
    const myPosts = [
        {
            id: 1,
            title: "We need water",
            category: "Food and Nutrition",
            description: "We want water",
            image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "unverified"
        },
        {
            id: 2,
            title: "Medical Support Needed",
            category: "Health",
            description: "Need funds for treatment",
            image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "unverified"
        },
        {
            id: 3,
            title: "Education Assistance",
            category: "Educational",
            description: "Help with school fees",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "unverified"
        },
        {
            id: 4,
            title: "Housing Support",
            category: "Financial",
            description: "Help with housing costs",
            image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "unverified"
        },
        {
            id: 5,
            title: "Food Supply",
            category: "Food and Nutrition",
            description: "Family needs food",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "unverified"
        },
        {
            id: 6,
            title: "Healthcare",
            category: "Health",
            description: "Medical checkup needed",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "unverified"
        }
    ];

    const handleLogout = () => {
        navigate('/');
    };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setSidebarOpen(false);
    };

    return (
        <div className="recipient-dashboard-wrapper">
            <div className="dashboard-layout">
                <Sidebar 
                    role="recipient"
                    items={sidebarItems}
                    onItemClick={handleTabClick}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />

                <div className="dashboard-content">
                    <main className="dashboard-main">
                        {/* View Profile Tab */}
                        {activeTab === 'view-profile' && <ViewProfile />}

                        {/* Posts Tab */}
                        {activeTab === 'posts' && <PostsTab posts={myPosts} />}

                        {/* Verification Tab */}
                        {activeTab === 'verification' && <VerificationForm />}
                    </main>
                </div>
            </div>
        </div>
    );
};

// View Profile Component
const ViewProfile = () => {
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

// Posts Tab Component
const PostsTab = ({ posts }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        category: 'financial',
        description: '',
        donationTarget: '',
        imageUrl: '',
        urgency: 'medium'
    });

    const handleInputChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        });
    };

    const handleCreatePost = () => {
        // Handle post creation
        setIsCreating(false);
        setNewPost({
            title: '',
            category: 'financial',
            description: '',
            donationTarget: '',
            imageUrl: '',
            urgency: 'medium'
        });
    };

    const handleViewPost = (postId) => {
        navigate(`/post-view/${postId}`);
    };

    return (
        <div className="posts-tab">
            <div className="posts-header">
                <h3>My Posts</h3>
                <button 
                    className="create-button"
                    onClick={() => setIsCreating(!isCreating)}
                >
                    {isCreating ? 'Cancel' : '+ Create a New Post'}
                </button>
            </div>

            {isCreating && (
                <div className="create-post-form">
                    <h4>Create New Post</h4>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Title *</label>
                            <input 
                                type="text"
                                name="title"
                                placeholder="Post title"
                                value={newPost.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Category *</label>
                            <select 
                                name="category"
                                value={newPost.category}
                                onChange={handleInputChange}
                            >
                                <option value="financial">Financial</option>
                                <option value="health">Health</option>
                                <option value="educational">Educational</option>
                            </select>
                        </div>
                        <div className="form-group full-width">
                            <label>Description *</label>
                            <textarea 
                                name="description"
                                placeholder="Post description"
                                value={newPost.description}
                                onChange={handleInputChange}
                                rows={4}
                            />
                        </div>
                        <div className="form-group">
                            <label>Donation Target (Rs.) *</label>
                            <input 
                                type="number"
                                name="donationTarget"
                                placeholder="Amount needed"
                                value={newPost.donationTarget}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Image URL *</label>
                            <input 
                                type="url"
                                name="imageUrl"
                                placeholder="Image URL"
                                value={newPost.imageUrl}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Urgency *</label>
                            <select 
                                name="urgency"
                                value={newPost.urgency}
                                onChange={handleInputChange}
                            >
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>
                    <button className="submit-button" onClick={handleCreatePost}>
                        Submit
                    </button>
                </div>
            )}

            <div className="posts-grid">
                {posts.map((post) => (
                    <div key={post.id} className="post-card-dashboard">
                        <div className="post-tag">{post.tag}</div>
                        <img src={post.image} alt={post.title} className="post-image" />
                        <div className="post-info">
                            <h5>{post.title}</h5>
                            <p><strong>Category:</strong> {post.category}</p>
                            <p><strong>Description:</strong> {post.description}</p>
                        </div>
                        <div className="post-actions">
                            <button className="view-btn" onClick={() => handleViewPost(post.id)}>View</button>
                            <button className="edit-btn">Edit</button>
                            <button className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Verification Form Component
const VerificationForm = () => {
    const [formData, setFormData] = useState({
        province: '',
        district: '',
        divisionalSecretarial: '',
        gramaNiladhari: '',
        employmentCategory: '',
        occupation: '',
        annualSalary: '',
        assetStatus: '',
        familyMembers: '',
        healthIssues: ''
    });
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            // Reset dependent fields when parent changes
            ...(name === 'province' && { district: '', divisionalSecretarial: '' }),
            ...(name === 'district' && { divisionalSecretarial: '' })
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission
    };

    // Get available districts for selected province
    const availableDistricts = formData.province 
        ? provincesData[formData.province]?.districts || [] 
        : [];

    // Get available divisional secretarials for selected district
    const availableDivisionalSecretarials = formData.district 
        ? divisionalSecretarialsData[formData.district] || [] 
        : [];

    return (
        <div className="verification-form">
            <h2>Verification Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Province *</label>
                        <select name="province" value={formData.province} onChange={handleChange}>
                            <option value="">Select Province</option>
                            {Object.keys(provincesData).map((province) => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>District *</label>
                        <select name="district" value={formData.district} onChange={handleChange} disabled={!formData.province}>
                            <option value="">Select District</option>
                            {availableDistricts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Divisional Secretarial *</label>
                        <select name="divisionalSecretarial" value={formData.divisionalSecretarial} onChange={handleChange} disabled={!formData.district}>
                            <option value="">Select Divisional Secretarial</option>
                            {availableDivisionalSecretarials.map((division) => (
                                <option key={division} value={division}>
                                    {division}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Grama Niladhari Division *</label>
                        <input 
                            type="text"
                            name="gramaNiladhari"
                            placeholder="GN Division"
                            value={formData.gramaNiladhari}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Employment Category *</label>
                        <select name="employmentCategory" value={formData.employmentCategory} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="government">Government</option>
                            <option value="nongovernment">Non-Government</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Occupation *</label>
                        <input 
                            type="text"
                            name="occupation"
                            placeholder="Your occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Annual Salary (Rs.) *</label>
                        <input 
                            type="number"
                            name="annualSalary"
                            placeholder="Annual salary"
                            value={formData.annualSalary}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Asset Status *</label>
                        <input 
                            type="text"
                            name="assetStatus"
                            placeholder="Asset details"
                            value={formData.assetStatus}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>No. of Family Members *</label>
                        <input 
                            type="number"
                            name="familyMembers"
                            placeholder="Number of members"
                            value={formData.familyMembers}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Long Term Health Issues (Optional)</label>
                        <textarea 
                            name="healthIssues"
                            placeholder="Health issues if any"
                            value={formData.healthIssues}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                </div>

                <div className="checkbox-section">
                    <input 
                        type="checkbox"
                        id="agree-terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <label htmlFor="agree-terms">I agree with all terms and conditions</label>
                </div>

                <button type="submit" className="submit-button">Request</button>
            </form>
        </div>
    );
};

export default RecipientDashboard;
