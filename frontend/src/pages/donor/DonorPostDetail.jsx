import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { AlertTriangle, Calendar, Clock, MapPin, Tag, Heart, ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import './donor-shared.css';

const DonorPostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { authAxios } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    //  Local state for wishlist persistence logic
    const [wishlisted, setWishlisted] = useState(() => {
        const saved = localStorage.getItem(`wishlist_${postId}`);
        return saved === 'true';
    });

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                //  Integrating with backend endpoint: /open/get/all/posts
                const response = await authAxios.get('/open/get/all/posts');
                const found = response.data?.find(p => (p.postId ?? p.id).toString() === postId.toString());
                setPost(found);
            } catch (error) {
                console.error('Failed to load post detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId, authAxios]);

    //  Wishlist toggle logic with LocalStorage persistence and toast feedback
    const handleWishlist = () => {
        if (!wishlisted) {
            toast.success("Added to wishlist!");
            setWishlisted(true);
            localStorage.setItem(`wishlist_${postId}`, 'true');
        } else {
            setWishlisted(false);
            localStorage.removeItem(`wishlist_${postId}`);
            toast.info("Removed from wishlist");
        }
    };

    if (loading) return <div className="loading">Gathering post details...</div>;
    if (!post) return <div className="error">Post not found. <button onClick={() => navigate(-1)}>Go Back</button></div>;

    const isVerified = (post.verificationStatus || post.tag) === 'verified';
    //  Corrected field mapping: using totalAmount from backend as the donation target
    const target = parseFloat(post.totalAmount || 0);
    const current = parseFloat(post.currentAmount || 0);

    //  Percentage and remaining calculations for progress bar
    const percent = Math.min(100, Math.round((current / target) * 100) || 0);
    const remaining = Math.max(0, target - current);

    return (
        <div className="donor-page-container">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <main className="donor-main-content">
                <button
                    onClick={() => navigate(-1)}
                    style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--donor-primary)', fontWeight: '600', cursor: 'pointer' }}
                >
                    <ChevronLeft size={20} /> Back to explore
                </button>

                {!isVerified && (
                    <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '1.5rem', marginBottom: '2rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'start', gap: '1rem' }}>
                        <AlertTriangle style={{ color: '#f59e0b', flexShrink: 0 }} />
                        <div>
                            <h4 style={{ color: '#92400e', marginBottom: '0.25rem' }}>AWARENESS WARNING</h4>
                            <p style={{ color: '#b45309', fontSize: '0.9rem' }}>This post has not been fully verified by our team yet. Please review the details carefully before making a donation.</p>
                        </div>
                    </div>
                )}

                <div className="donor-glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: '400px' }}>
                        <img
                            src={post.imageUrl || post.image || 'https://via.placeholder.com/1200x400'}
                            alt={post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/*  Status Tag - Repositioned to top left to avoid title overlap */}
                        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10 }}>
                            <span className={`donor-tag ${isVerified ? 'donor-tag-verified' : 'donor-tag-unverified'}`} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                {isVerified ? 'Verified' : 'Unverified'}
                            </span>
                        </div>

                        {/* [UPDATED] Standardized Glassmorphism Overlay */}
                        <div className="post-title-overlay">
                            <h1 className="post-detail-title" style={{
                                color: 'var(--donor-secondary)',
                                fontWeight: '800',
                                margin: 0,
                                textShadow: '0 2px 4px rgba(255,255,255,0.5)'
                            }}>{post.title}</h1>
                        </div>
                    </div>

                    <div className="responsive-split-grid" style={{ padding: '3rem' }}>
                        <div>
                            <h2 className="donor-section-title">About this request</h2>
                            <p style={{ lineHeight: '1.8', color: 'var(--donor-text-main)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                                {post.description}
                            </p>

                            <h2 className="donor-section-title">Request Details</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Tag className="donor-icon" style={{ color: 'var(--donor-primary)' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--donor-text-muted)' }}>Category</div>
                                        <div style={{ fontWeight: '600' }}>{post.postCategory || post.category}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <MapPin className="donor-icon" style={{ color: 'var(--donor-primary)' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--donor-text-muted)' }}>Location / District</div>
                                        <div style={{ fontWeight: '600' }}>{post.location || post.district || 'Islandwide'}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Calendar className="donor-icon" style={{ color: 'var(--donor-primary)' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--donor-text-muted)' }}>Posted Date</div>
                                        <div style={{ fontWeight: '600' }}>{post.postedDate || '2023-10-15'}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Clock className="donor-icon" style={{ color: 'var(--donor-primary)' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--donor-text-muted)' }}>Posted Time</div>
                                        <div style={{ fontWeight: '600' }}>{post.postedTime || '10:30 AM'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="donor-glass-card" style={{ padding: '2rem', alignSelf: 'start', border: '2px solid var(--donor-primary-light)' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: 'var(--donor-secondary)' }}>Impact So Far</h3>

                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem' }}>
                                <div className="donor-progress-label">
                                    <span>Raised: Rs. {current.toLocaleString()}</span>
                                    <span>Target: Rs. {target.toLocaleString()}</span>
                                </div>
                                <div className="donor-progress-container">
                                    <div className="donor-progress-fill" style={{ width: `${percent}%` }}></div>
                                </div>
                                <div style={{ textAlign: 'right', fontSize: '0.9rem', color: 'var(--donor-primary-dark)', fontWeight: '700' }}>
                                    {percent}% Funded
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px dashed var(--donor-primary)', borderRadius: '0.5rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--donor-text-muted)' }}>Remaining Needed</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--donor-secondary)' }}>
                                    Rs. {remaining.toLocaleString()}
                                </div>
                            </div>

                            <button className="donor-btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                <Heart fill="white" /> Donate to this post
                            </button>

                            <button
                                className={`donor-btn-secondary ${wishlisted ? 'donor-btn-wishlisted' : ''}`}
                                style={{ width: '100%', marginTop: '1rem' }}
                                onClick={handleWishlist}
                            >
                                <Heart size={18} /> {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                            </button>
                        </div>
                    </div>

                    <footer style={{ padding: '2rem 3rem', background: '#f1f5f9', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--donor-text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                            <strong>Disclaimer:</strong> Project Hope facilitates donations but does not handle the transfer of physical goods directly. Always ensure your safety when interacting with recipients. Report any suspicious activity immediately.
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default DonorPostDetail;
