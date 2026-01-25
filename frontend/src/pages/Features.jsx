import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, TrendingUp } from 'lucide-react';
import './Features.css';

const Features = () => {
    const navigate = useNavigate();

    return (
        <div className="features-container">
            {/* Hero Section */}
            <section className="features-hero">

                {/* Decorative Elements - Watercolor Patches (SVG) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Gold/Yellow Patch */}
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[500px] text-yellow-400/50 animate-blob mix-blend-multiply filter blur-3xl opacity-70">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
                            <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-18,88.5,-3.3C86.9,11.4,81,25.3,71.8,37.6C62.6,49.9,50.1,60.6,36.5,68.6C22.9,76.6,8.2,81.9,-5.3,80.9C-18.8,79.9,-31.1,72.6,-43.3,64.2C-55.5,55.8,-67.6,46.3,-75.6,33.9C-83.6,21.5,-87.5,6.2,-84.9,-7.7C-82.3,-21.6,-73.2,-34.1,-62.4,-44.5C-51.6,-54.9,-39.1,-63.2,-26.3,-71.2C-13.5,-79.2,-0.4,-86.9,13.8,-83.8C28,-80.7,56.7,-66.8,44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                    {/* Green Patch */}
                    <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[400px] text-green-500/50 animate-blob animation-delay-2000 mix-blend-multiply filter blur-3xl opacity-70">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
                            <path d="M41.7,-71.1C55.2,-64.5,68.2,-56.9,77.9,-46.1C87.6,-35.3,94,-21.3,93.2,-7.5C92.4,6.3,84.4,19.9,74.8,31.7C65.2,43.5,54,53.5,41.9,64.3C29.8,75.1,16.8,86.7,2.8,81.9C-11.2,77,-26.2,55.8,-39.8,43.4C-53.4,31,-65.6,27.4,-75.8,17.2C-86,7,-94.2,-9.8,-88.4,-23.1C-82.6,-36.4,-62.7,-46.2,-47.4,-51.9C-32.1,-57.6,-21.4,-59.2,-10.3,-76.1C0.8,-93,28.2,-77.7,41.7,-71.1Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                    {/* Orange Patch */}
                    <div className="absolute top-[20%] left-[40%] w-[500px] h-[500px] text-orange-300/40 animate-blob animation-delay-4000 mix-blend-multiply filter blur-3xl opacity-60">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
                            <path d="M47.7,-68.8C61.4,-63.3,71.8,-51.8,77.7,-38.7C83.6,-25.6,85,-10.9,79.5,0.7C74,12.3,61.6,20.8,51.8,31.5C42,42.2,34.8,55.1,23.4,65.3C12,75.5,-3.6,83,-16.9,80.1C-30.2,77.2,-41.2,63.9,-54.6,52.4C-68,40.9,-83.8,31.2,-87.3,18.4C-90.8,5.6,-82,-10.3,-72.1,-22.8C-62.2,-35.3,-51.2,-44.4,-39.5,-50.8C-27.8,-57.2,-15.4,-60.9,-1.4,-58.7C12.6,-56.5,26.6,-48.4,47.7,-68.8Z" transform="translate(100 100)" />
                        </svg>
                    </div>

                    {/* Sharp Dots */}
                    <div className="absolute top-[15%] left-[8%] w-4 h-4 bg-orange-500 rounded-full animate-bounce delay-100 shadow-sm"></div>
                    <div className="absolute top-[40%] left-[45%] w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                    <div className="absolute bottom-[20%] left-[30%] w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                    <div className="absolute top-[50%] right-[10%] w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
                    <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100 shadow-sm"></div>
                    <div className="absolute top-[70%] left-[20%] w-3 h-3 bg-yellow-500 rounded-full animate-bounce delay-100 shadow-sm"></div>
                </div>

                {/* Main Content Container */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10 lg:gap-20">

                    {/* Left Content - Typography */}
                    <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start z-30">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8 tracking-tight text-gray-900">
                            Justice begins where <br />
                            <span className="italic relative inline-block text-gray-800">
                                inequality
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-400/80 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span> ends
                        </h1>
                        <p className="text-lg text-gray-600 mb-10 max-w-md leading-relaxed font-medium">
                            We're building a world where everyone has the power to shape their lives.
                        </p>

                        <button className="px-10 py-4 bg-black hover:bg-gray-800 text-white rounded-full font-bold transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                            DONATE NOW
                        </button>
                    </div>

                    {/* Right Visual - Broken Capsules (Unified Image) */}
                    <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                        {/* 
                           Container for the "Puzzle" 
                           - Rotated
                           - 4 Columns now
                           - Larger Spacing (8rem / 128px grid)
                        */}
                        <div className="relative w-full h-full p-4 rotate-[45deg] scale-90 md:scale-100 transition-transform duration-700 hover:scale-105 hover:rotate-[43deg] md:translate-x-65 md:-translate-y-50">

                            {/* Inner Image Source - Define once to reuse URL */}
                            {/* https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070 */}

                            {/* Column 1 (Left) */}
                            <div className="absolute top-20 left-0 w-30 h-64 rounded-full overflow-hidden border-0">
                                <img
                                    src="https://images.unsplash.com/photo-1754086986699-498f52e85ae5?w=2000&auto=format&fit=crop&q=80"
                                    className="absolute max-w-none w-[550px] h-[700px] object-cover object-top"
                                    style={{ top: '-80px', left: '0px' }}
                                    alt="Children"
                                />
                            </div>

                            {/* Column 2 (Middle Left - Split) */}
                            {/* Top Segment */}
                            <div className="absolute top-0 left-32 w-30 h-70 rounded-full overflow-hidden border-0 ">
                                <img
                                    src="https://images.unsplash.com/photo-1754086986699-498f52e85ae5?w=2000&auto=format&fit=crop&q=80"
                                    className="absolute max-w-none w-[550px] h-[700px] object-cover object-top"
                                    style={{ top: '0px', left: '-128px' }}
                                    alt="Children"
                                />
                            </div>
                            {/* Bottom Segment */}
                            <div className="absolute top-72 left-32 w-30 h-64 rounded-full overflow-hidden border-0 ">
                                <img
                                    src="https://images.unsplash.com/photo-1754086986699-498f52e85ae5?w=2000&auto=format&fit=crop&q=80"
                                    className="absolute max-w-none w-[550px] h-[700px] object-cover object-top"
                                    style={{ top: '-288px', left: '-128px' }} // top: - (top pos 72 * 4 = 288) -> Wait, 72 is tailwind spacing? No, top-72 is 18rem=288px. Correct.
                                    alt="Children"
                                />
                            </div>

                            {/* Column 3 (Middle Right) */}
                            <div className="absolute top-10 left-64 w-30 h-100 rounded-full overflow-hidden border-0">
                                <img
                                    src="https://images.unsplash.com/photo-1754086986699-498f52e85ae5?w=2000&auto=format&fit=crop&q=80"
                                    className="absolute max-w-none w-[550px] h-[700px] object-cover object-top"
                                    style={{ top: '-40px', left: '-256px' }} // top-10 is 40px. left-64 is 256px.
                                    alt="Children"
                                />
                            </div>

                            {/* Column 4 (Right - New) */}
                            <div className="absolute top-32 left-96 w-30 h-60 rounded-full overflow-hidden border-0">
                                <img
                                    src="https://images.unsplash.com/photo-1754086986699-498f52e85ae5?w=2000&auto=format&fit=crop&q=80"
                                    className="absolute max-w-none w-[550px] h-[700px] object-cover object-top"
                                    style={{ top: '-128px', left: '-384px' }} // top-32 is 128px. left-96 is 384px.
                                    alt="Children"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid Section */}
            <section className="features-grid-section">
                <h2 className="section-title">Our Key Features</h2>
                <div className="features-grid">
                    {/* Feature 1 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <Heart size={40} />
                        </div>
                        <h3>Direct Support</h3>
                        <p>Donate directly to individuals and verified families in need with complete transparency. Your contribution creates immediate, measurable impact.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <Shield size={40} />
                        </div>
                        <h3>Verified Profiles</h3>
                        <p>Every recipient and campaign is rigorously verified through our detailed background checks. Trust and authenticity are at our core.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <TrendingUp size={40} />
                        </div>
                        <h3>Impact Tracking</h3>
                        <p>Follow every donation with real stories and updates. See exactly how your generosity is changing lives and making communities stronger.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="how-it-works-content">
                    <h2>How It Works</h2>
                    <div className="steps-container">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h4>Join</h4>
                            <p>Sign up as a donor, volunteer, or recipient</p>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h4>Connect</h4>
                            <p>Find verified campaigns or submit your request</p>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h4>Impact</h4>
                            <p>Make a difference and see real results</p>
                        </div>
                    </div>
                    <button className="join-us-btn" onClick={() => navigate('/login')}>
                        Get Started
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Features;
