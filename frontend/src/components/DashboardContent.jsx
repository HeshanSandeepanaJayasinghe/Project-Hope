import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './DashboardContent.css';

const DashboardContent = ({ roleLabel }) => {
    const { user, authAxios } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get role from context to determine the title
    const role = user?.toLowerCase() || 'guest';

    const getRoleLabel = (role) => {
        const labels = {
            recipient: 'Recipient',
            donor: 'Donor',
            verifier: 'Verifier',
            financier: 'Financier',
            admin: 'Admin',
            superadmin: 'Super Admin'
        };
        return labels[role] || role;
    };

    const displayRoleLabel = roleLabel || getRoleLabel(role);

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

    const renderPosts = () => {
        if (loading) {
            return <div className="loading-state">Loading posts...</div>;
        }

        if (!posts.length) {
            return <div className="empty-state">No posts available.</div>;
        }

        return (
            <div className="posts-grid-admin">
                {posts.map((post) => {
                    const postId = post.postId ?? post.id;
                    return (
                        <div key={postId} className="post-card-admin">
                            <img src={post.imageUrl || post.image || 'https://via.placeholder.com/320x220'} alt={post.title || 'Post image'} />
                            <div className="post-info-admin">
                                <h4>{post.title || 'Untitled post'}</h4>
                                <p><strong>Category:</strong> {post.postCategory || post.category || 'Uncategorized'}</p>
                                <p><strong>Description:</strong> {post.description || 'No description provided.'}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-content">
                <main className="dashboard-main">
                    <h1>{displayRoleLabel} Dashboard</h1>

                    {renderPosts()}
                </main>
            </div>
        </div>
    );
};

export default DashboardContent;
