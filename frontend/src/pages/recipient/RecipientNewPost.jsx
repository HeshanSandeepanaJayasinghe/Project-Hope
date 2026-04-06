import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext.jsx';
import './RecipientPages.css';

const RecipientNewPost = () => {
  const { authAxios } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const isEditing = Boolean(postId);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'financial',
    description: '',
    donationTarget: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [isEditing]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get(`/posts/${postId}`);
      const post = response.data;
      setFormData({
        title: post.title || '',
        category: post.category || 'financial',
        description: post.description || '',
        donationTarget: post.donationTarget || '',
        imageUrl: post.imageUrl || post.photo || post.image || '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Unable to load post details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    if (!formData.title || !formData.category || !formData.description || !formData.donationTarget || !formData.imageUrl) {
      toast.error('Please fill in all required fields.');
      setSaving(false);
      return;
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      donationTarget: Number(formData.donationTarget),
      imageUrl: formData.imageUrl,
      photo: formData.imageUrl,
    };

    try {
      if (isEditing) {
        await authAxios.put(`/posts/${postId}`, payload);
        toast.success('Post updated successfully.');
      } else {
        await authAxios.post('/posts', payload);
        toast.success('Post created successfully.');
      }
      navigate('/recipient/my-posts');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="recipient-dashboard-wrapper">
      <div className="dashboard-layout">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="dashboard-content">
          <main className="dashboard-main">
            <div className="recipient-new-post-page">
              <div className="page-header">
                <div>
                  <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
                  <p>{isEditing ? 'Update your existing request.' : 'Create a new support request with image, category and donation target.'}</p>
                </div>
                <button type="button" className="button secondary" onClick={() => navigate('/recipient/my-posts')}>
                  Back to My Posts
                </button>
              </div>

              <form className="new-post-form" onSubmit={handleSubmit}>
                {loading ? (
                  <div className="loading-state">Loading post details…</div>
                ) : (
                  <>
                    <div className="form-row">
                      <label htmlFor="title">Title *</label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter your post title"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <label htmlFor="category">Category *</label>
                      <select id="category" name="category" value={formData.category} onChange={handleChange}>
                        <option value="financial">Financial</option>
                        <option value="health">Health</option>
                        <option value="educational">Educational</option>
                        <option value="food">Food and Nutrition</option>
                        <option value="housing">Housing</option>
                      </select>
                    </div>

                    <div className="form-row full-width">
                      <label htmlFor="description">Description *</label>
                      <textarea
                        id="description"
                        name="description"
                        rows="5"
                        placeholder="Describe your need in detail"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <label htmlFor="donationTarget">Donation Target (Rs.) *</label>
                      <input
                        id="donationTarget"
                        name="donationTarget"
                        type="number"
                        min="0"
                        placeholder="Enter target amount"
                        value={formData.donationTarget}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <label htmlFor="imageUrl">Image URL *</label>
                      <input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        value={formData.imageUrl}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-footer">
                      <button type="button" className="button tertiary" onClick={() => navigate('/recipient/my-posts')}>
                        Cancel
                      </button>
                      <button type="submit" className="button primary" disabled={saving}>
                        {saving ? (isEditing ? 'Saving...' : 'Submitting...') : isEditing ? 'Update Post' : 'Submit Post'}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RecipientNewPost;
