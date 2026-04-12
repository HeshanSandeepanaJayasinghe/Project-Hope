import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext.jsx';
import './RecipientPages.css';

const RecipientMyPosts = () => {
  const { authAxios } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get('/recipient/get/posts');
      setPosts(response.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Unable to load your posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigate('/recipient/new-post');
  };

  const handleEdit = (postId) => {
    navigate(`/recipient/new-post?postId=${postId}`);
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    setDeleting(postId);
    try {
      await authAxios.delete(`recipient/delete/post/${postId}`);
      setPosts((current) => current.filter((post) => post.postId !== postId));
      toast.success('Post deleted successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete the post.');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusClass = (verificationStatus) => {
    const normalized = (verificationStatus || 'UNVERIFIED').toString().toLowerCase();
    if (normalized === 'verified') return 'verified';
    if (normalized === 'fraud') return 'fraud';
    return 'unverified';
  };

  const getStatusLabel = (verificationStatus) => {
    const normalized = (verificationStatus || 'UNVERIFIED').toString().toLowerCase();
    if (normalized === 'verified') return 'Verified';
    if (normalized === 'fraud') return 'Fraud';
    return 'Unverified';
  };

  const getImageSource = (post) => {
    return post.imageUrl || 'https://via.placeholder.com/640x420?text=No+Image';
  };

  return (
    <div className="recipient-dashboard-wrapper">
      <div className="dashboard-layout">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="dashboard-content">
          <main className="dashboard-main">
            <div className="recipient-posts-page">
              <div className="posts-header">
                <div>
                  <h1>My Posts</h1>
                </div>
                <button type="button" className="button primary" onClick={handleCreate}>
                  + Create New Post
                </button>
              </div>

              {loading ? (
                <div className="loading-state">Loading your posts</div>
              ) : posts.length === 0 ? (
                <div className="empty-state">No posts found. Click Create New Post to add your first request.</div>
              ) : (
                <div className="posts-grid">
                  {posts.map((post) => (
                    <article key={post.postId} className="post-card">
                      <span className={`status-tag ${getStatusClass(post.verificationStatus)}`}>
                        {getStatusLabel(post.verificationStatus)}
                      </span>
                      <img src={getImageSource(post)} alt={post.title || 'Recipient post image'} />
                      <div className="post-body">
                        <div className="post-category">{post.postCategory || 'Uncategorized'}</div>
                        <h3 className="post-title">{post.title || 'Untitled post'}</h3>
                        <p className="post-description">{post.description || 'No description provided.'}</p>
                        <div className="post-meta">
                          <div>Target: Rs. {post.totalAmount || 0}</div>
                          <div>Current: Rs. {post.currentAmount || 0}</div>
                          <div>Remaining: Rs. {post.remainingAmount || 0}</div>
                        </div>
                        <div className="post-actions">
                          <button type="button" className="action-btn edit" onClick={() => handleEdit(post.postId)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="action-btn delete"
                            onClick={() => handleDelete(post.postId)}
                            disabled={deleting === post.postId}
                          >
                            {deleting === post.postId ? 'Deleting' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RecipientMyPosts;
