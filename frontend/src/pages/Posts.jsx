import React from 'react';
import slide1 from '../assets/hero_slide_1.png'; // Reusing an existing asset as placeholder

const Posts = () => {
    // Mock data for the posts grid
    const posts = [
        {
            id: 1,
            title: "Need you",
            category: "financial",
            description: "We need support to rebuild our home after the flood.",
            status: "Verified",
            statusColor: "bg-gray-500", // Muted gray based on image
        },
        {
            id: 2,
            title: "Health issue",
            category: "health",
            description: "I want bandages and basic medical supplies for the community center.",
            status: "Verified",
            statusColor: "bg-gray-500",
        },
        {
            id: 3,
            title: "Educational Support",
            category: "educational",
            description: "We need books and stationery for the local school.",
            status: "Un-verified",
            statusColor: "bg-gray-400",
        },
        {
            id: 4,
            title: "Water need in Monaragala",
            category: "food and nutrition",
            description: "We want water purification tablets and clean water storage.",
            status: "Un-verified",
            statusColor: "bg-gray-400",
        },
        {
            id: 5,
            title: "Class fees",
            category: "financial",
            description: "I want money to pay for my daughter's tuition fees.",
            status: "Verified",
            statusColor: "bg-gray-500",
        },
        {
            id: 6,
            title: "Money",
            category: "financial",
            description: "I want money for personal expenses.",
            status: "Fraud",
            statusColor: "bg-red-900 text-white", // Darker for fraud
        },
    ];

    return (
        <div className="w-full font-sans bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-[#052e26] ml-4 md:ml-12 lg:ml-14 relative overflow-hidden min-h-[700px] flex items-center rounded-bl-[20rem] rounded-tl-[20rem]">
                <div className="w-full flex flex-col md:flex-row relative z-10 px-20 pl-4 md:pl-20 lg:pl-52">

                    {/* Left Content */}
                    <div className="flex-1 py-12 md:py-20 flex flex-col justify-center text-white z-20 max-w-2xl">
                        <p className="text-[#fbbf24] font-medium tracking-wide mb-4 text-sm md:text-base uppercase">
                            Join Our Mission
                        </p>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 font-serif">
                            Share Your <span className="text-[#f97316] underline decoration-2 underline-offset-4">Love</span>
                            <br />
                            To Make A
                            <br />
                            <span className="text-[#f97316]">Difference</span>
                        </h1>
                        <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
                            Every contribution brings light to the world. Together we can create lasting change.
                        </p>

                        <div className="flex flex-wrap gap-4 items-center">
                            <button className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg transform hover:scale-105 uppercase text-sm tracking-wider">
                                Donate Now
                            </button>

                            <button className="flex items-center gap-2 text-white font-semibold hover:text-[#fbbf24] transition-colors group">
                                <span className="p-2 border border-white/30 rounded-full group-hover:border-[#fbbf24]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </span>
                                Be a Volunteer
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Image Background with Gradient - Absolute Positioned */}
                <div className="absolute top-0 right-0 w-full h-full md:w-3/5 z-0 rounded-bl-[5rem] overflow-hidden">
                    <img
                        src={slide1}
                        alt="Happy children"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay: Left-to-Right darker green fade + overall green tint */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#052e26] via-[#052e26]/40 to-[#052e26]/20"></div>
                </div>
            </div>

            {/* Posts Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative">
                            {/* Badge */}
                            <span className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white ${post.statusColor}`}>
                                {post.status}
                            </span>

                            <div className="mt-8 mb-4">
                                <h3 className="text-xl font-bold text-gray-800">{`Post ${post.id}`}</h3>
                                <div className="text-gray-900 font-medium">Title : {post.title}</div>
                                <div className="text-gray-600 text-sm">category: {post.category}</div>
                            </div>

                            <p className="text-gray-700 text-sm mb-4">
                                Description: {post.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;
