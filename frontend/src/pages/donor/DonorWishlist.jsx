import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { Eye, Trash2, Heart } from 'lucide-react';
import './donor-shared.css';

const DonorWishlist = () => {
    const navigate = useNavigate();
    const { authAxios } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            setLoading(true);
            try {
                const response = await authAxios.get('/open/get/all/posts');
                const allPosts = response.data || [];

                //  LocalStorage-based wishlist filtering logic
                const wishlistedPosts = allPosts.filter(post => {
                    const postId = post.postId ?? post.id;
                    return localStorage.getItem(`wishlist_${postId}`) === 'true';
                });

                setWishlist(wishlistedPosts);
            } catch (error) {
                console.error('Failed to load wishlist:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, [authAxios]);

    const handleRemove = (id) => {
        localStorage.removeItem(`wishlist_${id}`);
        setWishlist((current) => current.filter(post => (post.postId ?? post.id) !== id));
    };

    return (
        <div className="donor-page-container">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <main className="donor-main-content">
                <header className="donor-header">
                    <h1 className="donor-title">My Wishlist <Heart style={{ color: '#ef4444', fill: '#ef4444', verticalAlign: 'middle' }} /></h1>
                </header>

                {loading ? (
                    <div className="loading">Loading your wishlist...</div>
                ) : wishlist.length === 0 ? (
                    <div className="donor-glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--donor-text-muted)' }}>Your wishlist is empty</h2>
                        <button className="donor-btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/donor-dashboard')}>Explore Posts</button>
                    </div>
                ) : (
                    <div className="donor-grid">
                        {wishlist.map((post) => {
                            const postId = post.postId ?? post.id;
                            const isVerified = (post.verificationStatus || post.tag) === 'verified';
                            return (
                                <div key={postId} className="donor-glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ position: 'relative', height: '240px' }}>
                                        <img
                                            src={post.imageUrl || post.image || 'https://via.placeholder.com/600x400'}
                                            alt={post.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                            <span className={`donor-tag ${isVerified ? 'donor-tag-verified' : 'donor-tag-unverified'}`}>
                                                {isVerified ? 'Verified' : 'Unverified'}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '2rem', flex: 1 }}>
                                        <h3 style={{ fontSize: '1.5rem', color: 'var(--donor-secondary)', marginBottom: '1rem' }}>{post.title}</h3>
                                        <p style={{ color: 'var(--donor-text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                                            {post.description?.substring(0, 120)}...
                                        </p>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                            <button
                                                className="donor-btn-primary"
                                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                                onClick={() => navigate(`/donor/post/${postId}`)}
                                            >
                                                <Eye size={18} /> View Entire Post
                                            </button>
                                            <button
                                                className="donor-btn-secondary"
                                                style={{ padding: '0.75rem', borderColor: '#ef4444', color: '#ef4444' }}
                                                onClick={() => handleRemove(postId)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DonorWishlist;
