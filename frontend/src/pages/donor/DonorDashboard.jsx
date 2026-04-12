import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext.jsx';
import './DonorDashboard.css';

const DonorDashboard = () => {
    const [activeTab, setActiveTab] = useState('posts');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authAxios } = useContext(AuthContext);

    const sidebarItems = [
        { id: 'posts', label: 'View Posts' },
        { id: 'view-profile', label: 'View Profile' },
        { id: 'wishlist', label: 'Wishlist' },
        { id: 'donation-history', label: 'Donation History' }
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await authAxios.get('/open/get/all/posts');
                setPosts(response.data || []);
            } catch (error) {
                console.error('Failed to load posts:', error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [authAxios]);

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
                        {activeTab === 'posts' && <PostsList posts={posts} loading={loading} />}
                        {activeTab === 'view-profile' && <ViewProfile />}
                        {activeTab === 'wishlist' && <Wishlist posts={posts} />}
                        {activeTab === 'donation-history' && <DonationHistory />}
                    </main>
                </div>
            </div>
        </div>
    );
};

const PostsList = ({ posts, loading }) => {
    if (loading) {
        return <div className="loading-state">Loading posts...</div>;
    }

    if (!posts.length) {
        return <div className="empty-state">No posts available.</div>;
    }

    return (
        <div className="posts-list">
            <h2>Available Posts</h2>
            <div className="posts-grid-donor">
                {posts.map((post) => {
                    const postId = post.postId ?? post.id;
                    return (
                        <div key={postId} className="post-card-donor">
                            <div className="post-tag-donor" style={{
                                backgroundColor: (post.verificationStatus || post.tag) === 'verified' ? '#10b981' : '#f59e0b'
                            }}>
                                {post.verificationStatus || post.tag || 'unverified'}
                            </div>
                            <img src={post.imageUrl || post.image || 'https://via.placeholder.com/320x220'} alt={post.title || 'Post image'} className="post-image-donor" />
                            <div className="post-content-donor">
                                <h4>{post.title || 'Untitled post'}</h4>
                                <p><strong>Category:</strong> {post.postCategory || post.category || 'Uncategorized'}</p>
                                <p><strong>Description:</strong> {post.description || 'No description provided.'}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

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

const Wishlist = ({ posts }) => {
    const navigate = useNavigate();
    const [wishlistedPosts, setWishlistedPosts] = useState([]);

    useEffect(() => {
        setWishlistedPosts(posts.slice(0, 3));
    }, [posts]);

    const handleRemove = (id) => {
        setWishlistedPosts((current) => current.filter(post => post.postId !== id && post.id !== id));
    };

    const handleClearAll = () => {
        setWishlistedPosts([]);
    };

    const handleViewPost = (postId) => {
        navigate(`/post-view/${postId}`);
    };

    if (!wishlistedPosts.length) {
        return <div className="empty-state">No wishlisted posts yet.</div>;
    }

    return (
        <div className="wishlist">
            <div className="wishlist-header">
                <h2>My Wishlist</h2>
                <button className="clear-all-button" onClick={handleClearAll}>
                    Clear All
                </button>
            </div>

            <div className="wishlist-grid">
                {wishlistedPosts.map((post) => {
                    const postId = post.postId ?? post.id;
                    return (
                        <div key={postId} className="wishlist-card">
                            <img src={post.imageUrl || post.image || 'https://via.placeholder.com/300x200'} alt={post.title || 'Post image'} className="wishlist-image" />
                            <div className="wishlist-content">
                                <h4>{post.title || 'Untitled post'}</h4>
                                <p><strong>Category:</strong> {post.postCategory || post.category || 'Uncategorized'}</p>
                                <p><strong>Description:</strong> {post.description || 'No description provided.'}</p>
                            </div>
                            <div className="wishlist-actions">
                                <button 
                                    className="view-button-wish"
                                    onClick={() => handleViewPost(postId)}
                                >
                                    View
                                </button>
                                <button 
                                    className="remove-button-wish"
                                    onClick={() => handleRemove(postId)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const DonationHistory = () => {
    const handleCheckEmails = () => {
        const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
        const mailtoLink = `mailto:${userEmail}`;
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
