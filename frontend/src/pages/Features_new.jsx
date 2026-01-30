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
                <div className="hero-content">
                    <h1 className="hero-title">Empowering Communities Through Connection and Care</h1>
                    <p className="hero-subtitle">Discover how our platform makes giving and receiving help simple, transparent, and impactful.</p>
                    <button className="join-us-btn" onClick={() => navigate('/login')}>
                        Join Us
                    </button>
                </div>
            </section>

            {/* Features Section */}
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
