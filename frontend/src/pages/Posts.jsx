import React from 'react';
import slide1 from '../assets/hero_slide_1.png'; // Reusing an existing asset as placeholder
import { HeartHandshake, Stethoscope, Utensils, Droplets, GraduationCap, Coins, HandCoins, HelpingHand } from 'lucide-react';

const Posts = () => {
    // Mock data for the posts grid
    const posts = [
        {
            id: 1,
            title: "Treatment Support",
            category: "Health",
            description: "Providing essential medical treatment to those in need with compassion and support.",
            image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            icon: Stethoscope,
            iconColor: "bg-orange-500",
        },
        {
            id: 2,
            title: "Food Support",
            category: "Hunger",
            description: "Offering nutritious food to families and individuals, ensuring no one goes hungry.",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            icon: Utensils,
            iconColor: "bg-red-500",
        },
        {
            id: 3,
            title: "Education Support",
            category: "Education",
            description: "Empowering children with knowledge and resources for a brighter future.",
            image: "https://media.istockphoto.com/id/2161654565/photo/teacher-assisting-students-in-the-classroom-at-a-childrens-foundation.jpg?s=612x612&w=0&k=20&c=kbXDwMJEk2xTQrrMrCO4BjWGcPhC9gNs9T4ASGrQWdE=",
            icon: GraduationCap,
            iconColor: "bg-yellow-500",
        },
        {
            id: 4,
            title: "Water Support",
            category: "Water",
            description: "Providing access to clean and safe drinking water for remote communities.",
            image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            icon: Droplets,
            iconColor: "bg-blue-500",
        },
        {
            id: 5,
            title: "Disaster Relief",
            category: "Disaster",
            description: "Helping communities rebuild and recover after devastating natural disasters.",
            image: "https://media.istockphoto.com/id/1372606847/photo/volunteers-giving-donations-to-a-woman-at-a-community-center.jpg?s=612x612&w=0&k=20&c=wb-rwxrE_u1PkNFHeYK5WLW3Yphlu0cLsbCiMBYCIDM=",
            icon: HeartHandshake,
            iconColor: "bg-orange-600",
        },
        {
            id: 6,
            title: "Financial Aid",
            category: "Financial",
            description: "Offering financial assistance to support essential needs and personal growth.",
            image: "https://plus.unsplash.com/premium_photo-1723601206748-ed9bcfc5ab09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDg1fHx8ZW58MHx8fHx8",
            icon: Coins,
            iconColor: "bg-green-600",
        },
        
    ];

    return (
        <div className="w-full font-sans bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-[#052e26] ml-4 md:ml-12 lg:ml-20 relative overflow-hidden min-h-[600px] flex items-center rounded-bl-[20rem] rounded-tl-[20rem]">
                <div className="w-full flex flex-col md:flex-row relative z-10 px-20 pl-4 md:pl-10 lg:pl-52">

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
                    <div className="absolute inset-0 bg-gradient-to-r from-[#052e26] via-[#052e26]/70 to-[#052e26]/20"></div>
                </div>
            </div>

            {/* Posts Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="flex justify-between items-center mb-8"></div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {posts.map((post) => {
                        const Icon = post.icon;
                        return (
                            <div key={post.id} className="relative bg-white rounded-xl overflow-hidden shadow-lg h-[450px] group">
                                {/* 1. Full Height Background Image (Always visible, behind everything) */}
                                <div className="absolute inset-0">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* 2. Default View Layer (Fades out on hover) */}
                                <div className="absolute inset-0 flex flex-col transition-opacity duration-300 group-hover:opacity-0 z-10">
                                    {/* Top half transparent to show image */}
                                    <div className="h-1/2 w-full"></div>

                                    {/* Bottom half white content */}
                                    <div className="h-1/2 w-full bg-white flex flex-col items-center pt-16 px-6 text-center relative">
                                        {/* Floating Icon */}
                                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 p-2 bg-white rounded-full">
                                            <div className={`${post.iconColor} p-4 rounded-full text-white shadow-md`}>
                                                <Icon size={32} />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            {post.description}
                                        </p>
                                    </div>
                                </div>

                                {/* 3. Hover View Layer (Fades in on hover - Transparent Green Overlay) */}
                                <div className="absolute inset-0 bg-[#052e26]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center p-8 z-20 translate-y-4 group-hover:translate-y-0">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                                    <h3 className="text-white text-4xl font-bold mb-4 leading-tight relative z-10">
                                        Contribute Today To Make A Difference
                                    </h3>
                                    <p className="text-gray-300 text-sm mb-8 relative z-10">
                                        Your contribution makes change possible today.
                                    </p>

                                    {/* Curved Arrow */}
                                    <div className="mb-6 text-[#fbbf24] relative z-10">
                                        <svg width="100" height="100" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-90">
                                            <path d="M10 10 Q 30 50 45 30" stroke="currentColor" strokeWidth="2" fill="none" />
                                            <path d="M40 30 L45 30 L43 35" stroke="currentColor" strokeWidth="2" fill="none" />
                                        </svg>
                                    </div>

                                    <a href={`/posts/${post.id}`} className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 px-8 rounded-md uppercase text-xs tracking-wider transition-colors relative z-10 shadow-lg">
                                        View More!
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* "Our Best Services" Section */}
            <div className="w-full bg-[#EDF7F1] py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <p className="text-[#f97316] font-bold font-cursive tracking-widest text-sm uppercase mb-5">
                        Our Best Services
                    </p>
                    <h2 className="text-[#052e26] text-4xl md:text-5xl font-bold font-cursive">
                        Helping The Poor, <br/>
                        Your Support Matters
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Card 1: Funding */}
                    <div className="bg-white rounded-2xl p-8 group flex flex-col items-center text-center border border-gray-100">
                        <div className="mb-6 relative">
                            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center relative z-10">
                                <HandCoins className="text-red-500 w-10 h-10" />
                            </div>
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-200 group-hover:animate-spin-slow"></div>
                        </div>
                        <h3 className="text-[#052e26] text-xl font-bold mb-3">Funding</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Your donations fund vital programs, transforming lives and communities.
                        </p>
                    </div>

                    {/* Card 2: Medical */}
                    <div className="bg-white rounded-2xl p-8 group flex flex-col items-center text-center border border-gray-100">
                        <div className="mb-6 relative">
                            <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center relative z-10">
                                <Stethoscope className="text-orange-500 w-10 h-10" />
                            </div>
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-200 group-hover:animate-spin-slow"></div>
                        </div>
                        <h3 className="text-[#052e26] text-xl font-bold mb-3">Medical</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Delivering medical care to underserved populations for healthier lives.
                        </p>
                    </div>

                    {/* Card 3: Education */}
                    <div className="bg-white rounded-2xl p-8 group flex flex-col items-center text-center border border-gray-100">
                        <div className="mb-6 relative">
                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center relative z-10">
                                <GraduationCap className="text-gray-600 w-10 h-10" />
                            </div>
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300 group-hover:animate-spin-slow"></div>
                        </div>
                        <h3 className="text-[#052e26] text-xl font-bold mb-3">Education</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Providing an education and letting people build their own futures.
                        </p>
                    </div>

                    {/* Card 4: Support */}
                    <div className="bg-white rounded-2xl p-8 group flex flex-col items-center text-center border border-gray-100">
                        <div className="mb-6 relative">
                            <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center relative z-10">
                                <HelpingHand className="text-purple-500 w-10 h-10" />
                            </div>
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-200 group-hover:animate-spin-slow"></div>
                        </div>
                        <h3 className="text-[#052e26] text-xl font-bold mb-3">Support</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Offering complete support services to help people overcome obstacles.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
