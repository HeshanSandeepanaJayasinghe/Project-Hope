import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PostView.css';

const PostView = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    // Mock post data - in reality this would come from backend
    const postsData = {
        1: {
            id: 1,
            title: "Need Medical Support",
            category: "Financial",
            description: "I need funds for my surgery",
            image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "verified",
            postDate: "2025-03-20",
            postTime: "14:20",
            district: "Kandy",
            donationsMade: "Rs. 10,250.00",
            fullDescription: "I am a patient requiring urgent surgical intervention. The medical team has recommended an operation, but I am facing financial difficulties in affording the treatment. Any support from the community would be greatly appreciated."
        },
        2: {
            id: 2,
            title: "Education Fees Support",
            category: "Educational",
            description: "Help me complete my studies",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "verified",
            postDate: "2025-03-19",
            postTime: "10:15",
            district: "Colombo",
            donationsMade: "Rs. 5,500.00",
            fullDescription: "I am a dedicated student working hard to complete my education. However, due to financial constraints, I am struggling to pay my tuition fees. With your support, I can continue my studies and build a better future."
        },
        3: {
            id: 3,
            title: "Food Aid Needed",
            category: "Health",
            description: "Family needs nutritious food",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tag: "unverified",
            postDate: "2025-03-18",
            postTime: "09:30",
            district: "Galle",
            donationsMade: "Rs. 2,100.00",
            fullDescription: "My family is going through difficult times and we need assistance with food. Any donation to help us get nutritious meals would be a blessing for us."
        },
    };

    const post = postsData[postId] || postsData[1];

    const getTagColor = (tag) => {
        switch (tag) {
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

    return (
        <div className="post-view-container">
            {/* Back Button */}
            <button 
                className="back-button"
                onClick={() => navigate('/posts')}
            >
                <ArrowLeft size={20} />
                Back to Posts
            </button>

            {/* Top Placeholder */}
            <div className="placeholder-top">
                We highly recommend to donate to posts with verified tag. Be careful with unverified and specially fraud tagged posts since the details presented may be incorrect.
            </div>

            {/* Main Content */}
            <div className="post-view-content">
                {/* Left Section - Info */}
                <div className="post-info-section">
                    {/* Post Card */}
                    <div className="post-view-card">
                        {/* Tag */}
                        <div 
                            className="post-view-tag" 
                            style={{ backgroundColor: getTagColor(post.tag) }}
                        >
                            {post.tag.charAt(0).toUpperCase() + post.tag.slice(1)}
                        </div>

                        {/* Image */}
                        <img src={post.image} alt={post.title} className="post-view-image" />

                        {/* Card Details */}
                        <div className="post-view-details">
                            <h2 className="post-view-title">{post.title}</h2>
                            <p className="post-view-description">{post.fullDescription}</p>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="info-box">
                        <h3 className="info-title">Post Details</h3>
                        <div className="info-item">
                            <span className="info-label">Post ID:</span>
                            <span className="info-value">Post {post.id}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Title:</span>
                            <span className="info-value">{post.title}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Category:</span>
                            <span className="info-value">{post.category}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Description:</span>
                            <span className="info-value">{post.description}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Posted Date:</span>
                            <span className="info-value">{post.postDate}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Posted Time:</span>
                            <span className="info-value">{post.postTime}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">District:</span>
                            <span className="info-value">{post.district}</span>
                        </div>
                        <div className="info-item highlight">
                            <span className="info-label">Donations Made:</span>
                            <span className="info-value">{post.donationsMade}</span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Buttons */}
                <div className="donation-buttons-section">
                    <button 
                        className="donation-button donate-this"
                        onClick={() => navigate('/post-donation')}
                    >
                        Donate This Post
                    </button>
                    <button 
                        className="donation-button donate-pool"
                        onClick={() => navigate('/pool-donation')}
                    >
                        Donate to the Pool
                    </button>
                </div>
            </div>

            {/* Bottom Placeholder */}
            <div className="placeholder-bottom">
                Note: You can donate any amount to this post and if credit amount exceed the required amount, the extra credits will be automatically forwarded to the donation pool. The credit in the pool will be forwarded to recipients according to a calculated emergency need value. Thank you.
            </div>
        </div>
    );
};

export default PostView;
