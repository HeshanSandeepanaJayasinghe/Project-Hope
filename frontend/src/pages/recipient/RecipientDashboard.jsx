import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext.jsx';
import './RecipientDashboard.css';

const RecipientDashboard = () => {
    const navigate = useNavigate();
    const { authAxios } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('posts');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    const sidebarItems = [
        { id: 'view-profile', label: 'View Profile' },
        { id: 'posts', label: 'Posts' },
        { id: 'verification', label: 'Verification' }
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            setLoadingPosts(true);
            try {
                const response = await authAxios.get('/recipient/get/posts');
                setPosts(response.data || []);
            } catch (error) {
                console.error('Failed to load recipient posts:', error);
                setPosts([]);
            } finally {
                setLoadingPosts(false);
            }
        };

        fetchPosts();
    }, [authAxios]);

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
                        {activeTab === 'view-profile' && <RecipientViewProfile />}
                        {activeTab === 'posts' && <PostsTab posts={posts} loading={loadingPosts} />}
                        {activeTab === 'verification' && <VerificationForm />}
                    </main>
                </div>
            </div>
        </div>
    );
};

const PostsTab = ({ posts, loading }) => {
    const navigate = useNavigate();

    const handleViewPost = (postId) => {
        navigate(`/post-view/${postId}`);
    };

    const renderPosts = () => {
        if (loading) {
            return <div className="loading-state">Loading posts...</div>;
        }

        if (!posts.length) {
            return <div className="empty-state">No posts found. Create a new post to get started.</div>;
        }

        return (
            <div className="posts-grid">
                {posts.map((post) => {
                    const postId = post.postId ?? post.id;
                    return (
                        <div key={postId} className="post-card-dashboard">
                            <div className="post-tag">{post.verificationStatus || post.tag || 'unverified'}</div>
                            <img src={post.imageUrl || post.image || 'https://via.placeholder.com/320x220'} alt={post.title || 'Post image'} className="post-image" />
                            <div className="post-info">
                                <h5>{post.title || 'Untitled post'}</h5>
                                <p><strong>Category:</strong> {post.postCategory || post.category || 'Uncategorized'}</p>
                                <p><strong>Description:</strong> {post.description || 'No description provided.'}</p>
                            </div>
                            <div className="post-actions">
                                <button className="view-btn" onClick={() => handleViewPost(postId)}>View</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="posts-tab">
            <div className="posts-header">
                <h3>My Posts</h3>
                <button 
                    className="create-button"
                    onClick={() => navigate('/recipient/new-post')}
                >
                    + Create a New Post
                </button>
            </div>
            {renderPosts()}
        </div>
    );
};

export default RecipientDashboard;
