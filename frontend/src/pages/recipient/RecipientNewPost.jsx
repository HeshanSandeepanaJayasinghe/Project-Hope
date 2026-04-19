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
    category: 'FINANCIAL',
    description: '',
    donationTarget: '',
    imageFile: null,
    existingImageUrl: '',
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
      const response = await authAxios.get(`/open/get/all/posts`);
      const posts = response.data || [];
      const foundPost = posts.find((p) => p.postId === postId);
      
      setFormData({
        title: foundPost.title || '',
        category: foundPost.category || 'FINANCIAL',
        description: foundPost.description || '',
        donationTarget: foundPost.donationTarget || '',
        imageFile: null,
        existingImageUrl: foundPost.imageUrl || foundPost.photo || foundPost.image || '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Unable to load post details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'imageFile') {
      setFormData((prev) => ({
        ...prev,
        imageFile: files?.[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    const imageRequired = !isEditing || !formData.existingImageUrl;
    if (!formData.title || !formData.category || !formData.description || !formData.donationTarget || (imageRequired && !formData.imageFile)) {
      toast.error('Please fill in all required fields and select an image.');
      setSaving(false);
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('postCategory', formData.category);
    payload.append('description', formData.description);
    payload.append('donationTarget', formData.donationTarget);
    if (formData.imageFile) {
      payload.append('imageFile', formData.imageFile);
    }

    try {
      if (isEditing) {
        const editPayload = new FormData();
        editPayload.append('postId', postId);
        editPayload.append('title', formData.title);
        editPayload.append('postCategory', formData.category);
        editPayload.append('description', formData.description);
        editPayload.append('totalAmount', formData.donationTarget);
        if (formData.imageFile) {
          editPayload.append('imageFile', formData.imageFile);
        }
        await authAxios.patch(`/recipient/edit/post`, editPayload);
        toast.success('Post updated successfully.');
      } else {
        await authAxios.post('/recipient/add/post', payload);
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
                        <option value="FINANCIAL">Financial</option>
                        <option value="HEALTH">Health</option>
                        <option value="EDUCATIONAL">Educational</option>
                        <option value="NUTRITIONAL">Food and Nutrition</option>
                        <option value="HOUSING">Housing</option>
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
                      <label htmlFor="imageFile">Upload Image *</label>
                      <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                      />
                      {formData.imageFile && <p className="file-note">Selected file: {formData.imageFile.name}</p>}
                      {!formData.imageFile && formData.existingImageUrl && (
                        <p className="file-note">Current image will be kept unless you choose a new file.</p>
                      )}
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
