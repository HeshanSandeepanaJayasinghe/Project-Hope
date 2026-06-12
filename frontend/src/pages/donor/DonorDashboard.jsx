import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import '../Posts.css';

const DonorDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);
    const navigate = useNavigate();
    const { authAxios } = useContext(AuthContext);

    // Confirm any pending payment when returning from PayHere
    useEffect(() => {
        const confirmPendingPayment = async () => {
            const pendingOrderId = localStorage.getItem('pendingOrderId');
            if (pendingOrderId) {
                try {
                    await authAxios.post(`/api/payment/confirm/${pendingOrderId}`);
                    toast.success('Payment confirmed successfully!');
                } catch (error) {
                    console.error('Payment confirmation failed:', error);
                    toast.error('Payment confirmation failed.');
                } finally {
                    localStorage.removeItem('pendingOrderId');
                }
            }
        };
        confirmPendingPayment();
    }, [authAxios]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL;
                const response = await axios.get(`${BACKEND_URL}/open/get/all/posts`);
                setPosts(response.data || []);
            } catch (error) {
                console.error('Failed to load posts:', error);
                toast.error('Failed to load posts.');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

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
        return post.imageUrl || post.image || 'https://via.placeholder.com/640x420?text=No+Image';
    };

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-layout">
                <Sidebar
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                
                <div style={{ flex: 1, padding: '2rem', background: '#f6f9f6', overflowY: 'auto' }}>
                    <h1 style={{ color: '#15803d', marginBottom: '2rem', fontSize: '2rem' }}>Donor Dashboard</h1>
                    
                    {loading ? (
                        <div className="loading-state">Loading posts...</div>
                    ) : (
                        <div className="posts-grid">
                            {posts.map((post) => {
                                const postId = post.postId ?? post.id;
                                return (
                                    <div
                                        key={postId}
                                        className="post-card-post-page"
                                        onMouseEnter={() => setHoveredCard(postId)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <div 
                                            className="post-card-tag" 
                                            style={{ backgroundColor: getTagColor(post.verificationStatus) }}
                                        >
                                            {post.verificationStatus ? post.verificationStatus.charAt(0).toUpperCase() + post.verificationStatus.slice(1).toLowerCase() : 'Unverified'}
                                        </div>

                                        <div className="post-card-image">
                                            <img src={getImageSource(post)} alt={post.title || 'Post image'} />
                                        </div>

                                        <div className="post-card-content">
                                            <h3 className="post-title">{post.title || 'Untitled'}</h3>
                                            <div className="post-category">{post.postCategory || post.category || 'Uncategorized'}</div>
                                            <p className="post-description">{post.description || 'No description'}</p>
                                            {post.totalAmount && <p className="post-description" style={{marginTop: '0.5rem', fontWeight: 'bold'}}>Target Fund: Rs. {post.totalAmount}.00</p>}
                                        </div>

                                        {hoveredCard === postId && (
                                            <div className="post-overlay">
                                                <button 
                                                    className="view-button"
                                                    onClick={() => navigate(`/post-view/${postId}`)}
                                                >
                                                    <Eye size={18} />
                                                    View
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;