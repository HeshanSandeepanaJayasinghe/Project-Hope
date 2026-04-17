import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Eye, MapPin, Tag, Search, Filter, Menu } from 'lucide-react';
import './donor-shared.css';

const DonorDashboard = () => {
    const navigate = useNavigate();
    const { authAxios, user, email, userProfile } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await authAxios.get('/open/get/all/posts');
                setPosts(response.data || []);
            } catch (error) {
                console.error('Failed to load posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [authAxios]);

    const filteredPosts = posts.filter(post =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.postCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="donor-page-container">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="donor-main-content">
                <header className="donor-header">
                    <div>
                        <h1 className="donor-title" style={{ marginBottom: '0.5rem' }}>
                            {/* [UPDATED] Dynamic personalized greeting logic with fallbacks */}
                            Welcome, {userProfile?.name || email?.split('@')[0] || user || 'Donor'}!
                        </h1>
                        <p style={{ color: 'var(--donor-text-muted)', fontSize: '1.1rem' }}>Ready to make an impact today?</p>
                    </div>
                    
                    <div className="dashboard-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%', maxWidth: '500px' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--donor-text-muted)' }} size={18} />
                            <input 
                                type="text" 
                                placeholder="Search posts..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '50px', border: '1px solid var(--donor-glass-border)', background: 'white', width: '100%' }}
                            />
                        </div>
                        <button className="donor-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                            <Filter size={18} /> Filters
                        </button>
                    </div>
                </header>

                <div className="donor-section">
                    <h2 className="donor-section-title">Available Donation Requests</h2>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '5rem' }}>
                            <div className="loading-spinner"></div>
                            <p style={{ marginTop: '1rem', color: 'var(--donor-text-muted)' }}>Finding people in need...</p>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="donor-glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
                            <h3>No posts found matching "{searchTerm}"</h3>
                            <button className="donor-btn-secondary" style={{ marginTop: '1rem' }} onClick={() => setSearchTerm('')}>Clear Search</button>
                        </div>
                    ) : (
                        <div className="donor-grid">
                            {filteredPosts.map((post, index) => {
                                const postId = post.postId ?? post.id;
                                const isVerified = (post.verificationStatus || post.tag) === 'verified';
                                return (
                                    <div key={postId} className="donor-glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ position: 'relative', height: '180px' }}>
                                            <img
                                                src={post.imageUrl || post.image || 'https://via.placeholder.com/320x180'}
                                                alt={post.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                                                <span className={`donor-tag ${isVerified ? 'donor-tag-verified' : 'donor-tag-unverified'}`}>
                                                    {isVerified ? 'Verified' : 'Unverified'}
                                                </span>
                                            </div>
                                            <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem' }}>
                                                POST #{postId || (index + 100).toString().padStart(4, '0')}
                                            </div>
                                        </div>

                                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--donor-secondary)', fontWeight: '700' }}>{post.title}</h4>

                                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '0.75rem', background: 'var(--donor-primary-light)', color: 'var(--donor-primary-dark)', padding: '0.2rem 0.6rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    <Tag size={12} /> {post.postCategory || 'General'}
                                                </span>
                                                <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.6rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    <MapPin size={12} /> {post.location || post.district || 'Islandwide'}
                                                </span>
                                            </div>

                                            <p style={{ fontSize: '0.9rem', color: 'var(--donor-text-muted)', marginBottom: '1.5rem', lineHeight: '1.5', flex: 1 }}>
                                                {post.description?.substring(0, 80)}...
                                            </p>

                                            <button
                                                className="donor-btn-primary"
                                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                                onClick={() => navigate(`/donor/post/${postId}`)}
                                            >
                                                <Eye size={18} /> View Details
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DonorDashboard;
