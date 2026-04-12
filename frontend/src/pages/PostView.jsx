import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import './PostView.css';

const PostView = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const fetchPost = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/open/get/all/posts');
            const posts = response.data || [];
            const foundPost = posts.find(p => p.postId === postId);
            setPost(foundPost || null);
        } catch (error) {
            console.error(error);
            setPost(null);
        } finally {
            setLoading(false);
        }
    };

    const getTagColor = (verificationStatus) => {
        const status = (verificationStatus || 'UNVERIFIED').toLowerCase();
        switch (status) {
            case 'verified':
                return '#10b981';
            case 'unverified':
                return '#f59e0b';
            case 'fraud':
                return '#ef4444';
            default:
                return '#6b7280';
        }
    };

    const getImageSource = (post) => {
        return post?.imageUrl || 'https://via.placeholder.com/640x420?text=No+Image';
    };

    const formatDate = (creationTime) => {
        if (!creationTime) return 'N/A';
        const date = new Date(creationTime);
        return date.toLocaleDateString();
    };

    const formatTime = (creationTime) => {
        if (!creationTime) return 'N/A';
        const date = new Date(creationTime);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return <div className="loading-state">Loading post...</div>;
    }

    if (!post) {
        return <div className="error-state">Post not found.</div>;
    }

    return (
        <div className="post-view-container">
            {/* Back Button */}
            <button 
                className="back-button"
                onClick={() => navigate('/posts')}
            >
                <ArrowLeft size={20} />
                Back to Posts
            </button>

            {/* Top Placeholder */}
            <div className="placeholder-top">
                We highly recommend to donate to posts with verified tag. Be careful with unverified and specially fraud tagged posts since the details presented may be incorrect.
            </div>

            {/* Main Content */}
            <div className="post-view-content">
                {/* Left Section - Info */}
                <div className="post-info-section">
                    {/* Post Card */}
                    <div className="post-view-card">
                        {/* Tag */}
                        <div 
                            className="post-view-tag" 
                            style={{ backgroundColor: getTagColor(post.verificationStatus) }}
                        >
                            {post.verificationStatus ? post.verificationStatus.charAt(0).toUpperCase() + post.verificationStatus.slice(1).toLowerCase() : 'Unverified'}
                        </div>

                        {/* Image */}
                        <img src={getImageSource(post)} alt={post.title} className="post-view-image" />

                        {/* Card Details */}
                        <div className="post-view-details">
                            <h2 className="post-view-title">{post.title || 'Untitled'}</h2>
                            <p className="post-view-description">{post.description || 'No description'}</p>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="info-box">
                        <h3 className="info-title">Post Details</h3>
                        <div className="info-item">
                            <span className="info-label">Post ID:</span>
                            <span className="info-value">Post {post.postId}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Title:</span>
                            <span className="info-value">{post.title || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Category:</span>
                            <span className="info-value">{post.postCategory || 'Uncategorized'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Description:</span>
                            <span className="info-value">{post.description || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Posted Date:</span>
                            <span className="info-value">{formatDate(post.creationTime)}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Posted Time:</span>
                            <span className="info-value">{formatTime(post.creationTime)}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">District:</span>
                            <span className="info-value">N/A</span>
                        </div>
                        <div className="info-item highlight">
                            <span className="info-label">Donations Made:</span>
                            <span className="info-value">Rs. {post.currentAmount || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Buttons */}
                <div className="donation-buttons-section">
                    <button 
                        className="donation-button donate-this"
                        onClick={() => navigate('/post-donation')}
                    >
                        Donate This Post
                    </button>
                    <button 
                        className="donation-button donate-pool"
                        onClick={() => navigate('/pool-donation')}
                    >
                        Donate to the Pool
                    </button>
                </div>
            </div>

            {/* Bottom Placeholder */}
            <div className="placeholder-bottom">
                Note: You can donate any amount to this post and if credit amount exceed the required amount, the extra credits will be automatically forwarded to the donation pool. The credit in the pool will be forwarded to recipients according to a calculated emergency need value. Thank you.
            </div>
        </div>
    );
};

export default PostView;
