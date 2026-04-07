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
      await authAxios.delete(`/posts/${postId}`);
      setPosts((current) => current.filter((post) => post.id !== postId));
      toast.success('Post deleted successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete the post.');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusClass = (tag) => {
    const normalized = (tag || 'unverified').toString().toLowerCase();
    if (normalized.includes('verified')) return 'verified';
    if (normalized.includes('fraud')) return 'fraud';
    return 'unverified';
  };

  const getStatusLabel = (tag) => {
    const normalized = (tag || 'unverified').toString().toLowerCase();
    if (normalized.includes('verified')) return 'Verified';
    if (normalized.includes('fraud')) return 'Fraud';
    return 'Unverified';
  };

  const getImageSource = (post) => {
    return post.imageUrl || post.photo || post.image || 'https://via.placeholder.com/640x420?text=No+Image';
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
                  <h2>My Posts</h2>
                  <p>These are the posts created by the logged-in recipient. You can edit or delete any existing request.</p>
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
                    <article key={post.id} className="post-card">
                      <span className={`status-tag ${getStatusClass(post.tag || post.status)}`}>
                        {getStatusLabel(post.tag || post.status)}
                      </span>
                      <img src={getImageSource(post)} alt={post.title || 'Recipient post image'} />
                      <div className="post-body">
                        <div className="post-category">{post.category || 'Uncategorized'}</div>
                        <h3 className="post-title">{post.title || 'Untitled post'}</h3>
                        <p className="post-description">{post.description || 'No description provided.'}</p>
                        {post.donationTarget !== undefined && post.donationTarget !== null && (
                          <div className="post-meta">Donation target: Rs. {post.donationTarget}</div>
                        )}
                        <div className="post-actions">
                          <button type="button" className="action-btn edit" onClick={() => handleEdit(post.id)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="action-btn delete"
                            onClick={() => handleDelete(post.id)}
                            disabled={deleting === post.id}
                          >
                            {deleting === post.id ? 'Deleting' : 'Delete'}
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
