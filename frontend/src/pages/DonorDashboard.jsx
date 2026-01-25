import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './DonorDashboard.css';

const DonorDashboard = () => {
    const [activeTab, setActiveTab] = useState('posts');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarItems = [
        { id: 'posts', label: 'View Posts' },
        { id: 'view-profile', label: 'View Profile' },
        { id: 'wishlist', label: 'Wishlist' },
        { id: 'donation-history', label: 'Donation History' }
    ];

    const posts = [
        {
            id: 1,
            title: "Need Medical Support",
            category: "Financial",
            description: "I need funds for my surgery",
            image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "verified"
        },
        {
            id: 2,
            title: "Education Fees",
            category: "Educational",
            description: "Help with school fees",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "verified"
        },
        {
            id: 3,
            title: "Food Support",
            category: "Health",
            description: "Family needs nutritious food",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "unverified"
        },
        {
            id: 4,
            title: "Water Supply",
            category: "Environmental",
            description: "Provide clean water",
            image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "verified"
        },
        {
            id: 5,
            title: "Housing Support",
            category: "Financial",
            description: "Help rebuild after disaster",
            image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "verified"
        },
        {
            id: 6,
            title: "Healthcare",
            category: "Health",
            description: "Medical checkup needed",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "verified"
        }
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setSidebarOpen(false);
    };

    return (
        <div className="donor-dashboard-wrapper">
            <div className="dashboard-layout">
                <Sidebar 
                    role="donor"
                    items={sidebarItems}
                    onItemClick={handleTabClick}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />

                <div className="dashboard-content">
                    <main className="dashboard-main">
                        {activeTab === 'posts' && <PostsList posts={posts} />}
                        {activeTab === 'view-profile' && <ViewProfile />}
                        {activeTab === 'wishlist' && <Wishlist posts={posts} />}
                        {activeTab === 'donation-history' && <DonationHistory />}
                    </main>
                </div>
            </div>
        </div>
    );
};

// Posts List Component
const PostsList = ({ posts }) => {
    return (
        <div className="posts-list">
            <h2>Available Posts</h2>
            <div className="posts-grid-donor">
                {posts.map((post) => (
                    <div key={post.id} className="post-card-donor">
                        <div className="post-tag-donor" style={{
                            backgroundColor: post.tag === 'verified' ? '#10b981' : '#f59e0b'
                        }}>
                            {post.tag}
                        </div>
                        <img src={post.image} alt={post.title} className="post-image-donor" />
                        <div className="post-content-donor">
                            <h4>{post.title}</h4>
                            <p><strong>Category:</strong> {post.category}</p>
                            <p><strong>Description:</strong> {post.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// View Profile Component
const ViewProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Jane Smith',
        nic: '987654321V',
        organization: 'Tech Solutions Inc',
        occupation: 'Software Engineer'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="view-profile-donor">
            <h2>My Profile</h2>
            
            <div className="profile-header-donor">
                <div className="profile-image-section-donor">
                    <div className="profile-image-placeholder-donor">
                        <span>👤</span>
                    </div>
                    <button className="upload-button-donor">Upload Image</button>
                </div>

                <div className="profile-buttons-donor">
                    {!isEditing && (
                        <button 
                            className="edit-button-donor"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    )}
                    {isEditing && (
                        <button 
                            className="done-button-donor"
                            onClick={() => setIsEditing(false)}
                        >
                            Done
                        </button>
                    )}
                </div>
            </div>

            <div className="profile-details-donor">
                <h3>Registered Details</h3>
                <div className="profile-form-donor">
                    <div className="form-group-donor">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group-donor">
                        <label>NIC</label>
                        <input 
                            type="text" 
                            name="nic"
                            value={formData.nic}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group-donor">
                        <label>Organization</label>
                        <input 
                            type="text" 
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group-donor">
                        <label>Occupation</label>
                        <input 
                            type="text" 
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Wishlist Component
const Wishlist = ({ posts }) => {
    const navigate = useNavigate();
    const [wishlistedPosts, setWishlistedPosts] = useState(posts.slice(0, 3));

    const handleRemove = (id) => {
        setWishlistedPosts(wishlistedPosts.filter(post => post.id !== id));
    };

    const handleClearAll = () => {
        setWishlistedPosts([]);
    };

    const handleViewPost = (postId) => {
        navigate(`/post-view/${postId}`);
    };

    return (
        <div className="wishlist">
            <div className="wishlist-header">
                <h2>My Wishlist</h2>
                <button className="clear-all-button" onClick={handleClearAll}>
                    Clear All
                </button>
            </div>

            <div className="wishlist-grid">
                {wishlistedPosts.map((post) => (
                    <div key={post.id} className="wishlist-card">
                        <img src={post.image} alt={post.title} className="wishlist-image" />
                        <div className="wishlist-content">
                            <h4>{post.title}</h4>
                            <p><strong>Category:</strong> {post.category}</p>
                            <p><strong>Description:</strong> {post.description}</p>
                        </div>
                        <div className="wishlist-actions">
                            <button 
                                className="view-button-wish"
                                onClick={() => handleViewPost(post.id)}
                            >
                                View
                            </button>
                            <button 
                                className="remove-button-wish"
                                onClick={() => handleRemove(post.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Donation History Component
const DonationHistory = () => {
    const handleCheckEmails = () => {
        // Get user's email from localStorage or session
        const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
        
        // Construct mailto link
        const mailtoLink = `mailto:${userEmail}`;
        
        // Open email client
        window.location.href = mailtoLink;
    };

    const donations = [
        {
            id: 1,
            paymentId: '00023',
            amount: 'Rs. 2000.00',
            date: '2025-11-22',
            time: '21:23'
        },
        {
            id: 2,
            paymentId: '00024',
            amount: 'Rs. 5000.00',
            date: '2025-11-20',
            time: '14:15'
        },
        {
            id: 3,
            paymentId: '00025',
            amount: 'Rs. 1500.00',
            date: '2025-11-18',
            time: '09:45'
        },
        {
            id: 4,
            paymentId: '00026',
            amount: 'Rs. 3000.00',
            date: '2025-11-15',
            time: '18:30'
        },
        {
            id: 5,
            paymentId: '00027',
            amount: 'Rs. 2500.00',
            date: '2025-11-12',
            time: '11:20'
        },
        {
            id: 6,
            paymentId: '00028',
            amount: 'Rs. 4000.00',
            date: '2025-11-10',
            time: '16:00'
        }
    ];

    return (
        <div className="donation-history">
            <div className="placeholder-top">xxxxxxxxx</div>

            <div className="donation-header">
                <h2>My Donations</h2>
                <button className="check-emails-button" onClick={handleCheckEmails}>Check my Emails</button>
            </div>

            <div className="donations-grid">
                {donations.map((donation) => (
                    <div key={donation.id} className="donation-card">
                        <div className="donation-info">
                            <p><strong>Payment ID:</strong> {donation.paymentId}</p>
                            <p><strong>Amount:</strong> {donation.amount}</p>
                            <p><strong>Date:</strong> {donation.date}</p>
                            <p><strong>Time:</strong> {donation.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonorDashboard;
