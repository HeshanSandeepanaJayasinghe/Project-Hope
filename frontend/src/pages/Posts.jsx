import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import './Posts.css';

const Posts = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);

    // Mock data for 9 posts in a 3x3 grid
    const posts = [
        {
            id: 1,
            title: "Need Medical Support",
            category: "Financial",
            description: "I need funds for my surgery",
            image: "https://images.unsplash.com/photo-1741769766414-188500c6d143?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tag: "verified",
            postDate: "2025-03-20",
            postTime: "14:20",
            district: "Kandy",
            donationsMade: "Rs. 10,250.00"
        },
        {
            id: 2,
            title: "Education Fees Support",
            category: "Educational",
            description: "Help me complete my studies",
            image: "https://images.unsplash.com/photo-1698993026848-f67c1eb7f989?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tag: "verified",
            postDate: "2025-03-19",
            postTime: "10:15",
            district: "Colombo",
            donationsMade: "Rs. 5,500.00"
        },
        {
            id: 3,
            title: "Food Aid Needed",
            category: "Health",
            description: "Family needs nutritious food",
            image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tag: "unverified",
            postDate: "2025-03-18",
            postTime: "09:30",
            district: "Galle",
            donationsMade: "Rs. 2,100.00"
        },
        {
            id: 4,
            title: "Water Supply Project",
            category: "Environmental",
            description: "Provide clean water to village",
            image: "https://images.unsplash.com/photo-1588815776517-c5a3f874bad9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tag: "verified",
            postDate: "2025-03-17",
            postTime: "15:45",
            district: "Matara",
            donationsMade: "Rs. 8,900.00"
        },
        {
            id: 5,
            title: "Housing Assistance",
            category: "Financial",
            description: "Help rebuild after disaster",
            image: "https://images.unsplash.com/photo-1764118810617-fd7eddc6d2f3?q=80&w=1229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tag: "fraud",
            postDate: "2025-03-16",
            postTime: "12:00",
            district: "Batticaloa",
            donationsMade: "Rs. 15,000.00"
        },
        {
            id: 6,
            title: "Medical Equipment Needed",
            category: "Health",
            description: "Purchase hospital equipment",
            image: "https://images.unsplash.com/photo-1690356107613-aac6326bcb6c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tag: "verified",
            postDate: "2025-03-15",
            postTime: "11:20",
            district: "Negombo",
            donationsMade: "Rs. 22,500.00"
        },
        {
            id: 7,
            title: "School Building Renovation",
            category: "Educational",
            description: "Improve school infrastructure",
            image: "https://images.unsplash.com/photo-1624903715293-afe920c6adad?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tag: "verified",
            postDate: "2025-03-14",
            postTime: "08:50",
            district: "Kandy",
            donationsMade: "Rs. 30,000.00"
        },
        {
            id: 8,
            title: "Elderly Care Support",
            category: "Health",
            description: "Support for elderly citizens",
            image: "https://images.unsplash.com/photo-1595243880357-bcf8de1be94f?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tag: "unverified",
            postDate: "2025-03-13",
            postTime: "13:30",
            district: "Jaffna",
            donationsMade: "Rs. 5,750.00"
        },
        {
            id: 9,
            title: "Scholarship Program",
            category: "Educational",
            description: "Support bright students",
            image: "https://images.unsplash.com/photo-1569173675610-42c361a86e37?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tag: "verified",
            postDate: "2025-03-12",
            postTime: "16:15",
            district: "Colombo",
            donationsMade: "Rs. 18,200.00"
        }
    ];

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
        <div className="posts-container">
            <div className="posts-grid">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="post-card"
                        onMouseEnter={() => setHoveredCard(post.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        {/* Tag */}
                        <div 
                            className="post-card-tag" 
                            style={{ backgroundColor: getTagColor(post.tag) }}
                        >
                            {post.tag.charAt(0).toUpperCase() + post.tag.slice(1)}
                        </div>

                        {/* Image */}
                        <div className="post-card-image">
                            <img src={post.image} alt={post.title} />
                        </div>

                        {/* Content */}
                        <div className="post-card-content">
                            <div className="post-number">Post {post.id}</div>
                            <h3 className="post-title">{post.title}</h3>
                            <div className="post-category">{post.category}</div>
                            <p className="post-description">{post.description}</p>
                        </div>

                        {/* Hover View Button */}
                        {hoveredCard === post.id && (
                            <div className="post-overlay">
                                <button 
                                    className="view-button"
                                    onClick={() => navigate(`/post-view/${post.id}`)}
                                >
                                    <Eye size={18} />
                                    View
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
