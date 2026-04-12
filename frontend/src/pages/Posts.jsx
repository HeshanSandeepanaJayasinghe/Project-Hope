import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import axios from 'axios';
import './Posts.css';

const Posts = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:8080';
            const response = await axios.get(`${BACKEND_URL}/open/get/all/posts`);
            setPosts(response.data || []);
        } catch (error) {
            console.error(error);
            // Fallback to empty array
            setPosts([]);
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
        return post.imageUrl || 'https://via.placeholder.com/640x420?text=No+Image';
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

    return (
        <div className="posts-container">
            {loading ? (
                <div className="loading-state">Loading posts...</div>
            ) : (
                <div className="posts-grid">
                    {posts.map((post) => (
                        <div
                            key={post.postId}
                            className="post-card-post-page"
                            onMouseEnter={() => setHoveredCard(post.postId)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Tag */}
                            <div 
                                className="post-card-tag" 
                                style={{ backgroundColor: getTagColor(post.verificationStatus) }}
                            >
                                {post.verificationStatus ? post.verificationStatus.charAt(0).toUpperCase() + post.verificationStatus.slice(1).toLowerCase() : 'Unverified'}
                            </div>

                            {/* Image */}
                            <div className="post-card-image">
                                <img src={getImageSource(post)} alt={post.title} />
                            </div>

                            {/* Content */}
                            <div className="post-card-content">
                                <div className="post-number">Post {post.postId}</div>
                                <h3 className="post-title">{post.title || 'Untitled'}</h3>
                                <div className="post-category">{post.postCategory || 'Uncategorized'}</div>
                                <p className="post-description">{post.description || 'No description'}</p>
                            </div>

                            {/* Hover View Button */}
                            {hoveredCard === post.postId && (
                                <div className="post-overlay">
                                    <button 
                                        className="view-button"
                                        onClick={() => navigate(`/post-view/${post.postId}`)}
                                    >
                                        <Eye size={18} />
                                        View
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Posts;
