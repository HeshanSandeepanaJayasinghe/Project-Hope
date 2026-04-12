import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Heart,
    ShieldCheck,
    TrendingUp,
    Globe,
    Zap,
    Sparkles,
    ArrowRight,
    Target,
    Users
} from 'lucide-react';
import Styles from './Features_new.module.css';

const FloatingDecoration = ({ children, x, y, delay = 0, duration = 10, scale = [1, 1.1, 1] }) => (
    <motion.div 
        className={Styles.FloatingDecoration}
        style={{ left: x, top: y }}
        animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, -5, 0],
            scale: scale
        }}
        transition={{ 
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
    >
        {children}
    </motion.div>
);

const Features = () => {
    const navigate = useNavigate();

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const featureItems = [
        {
            icon: <Heart size={32} />,
            title: "Direct Support",
            desc: "Donate directly to verified families in need with total transparency. Every cent you give goes straight to creating impact."
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Verified Trust",
            desc: "Every recipient and campaign is rigorously verified through detailed background checks. Safety and authenticity are our top priorities."
        },
        {
            icon: <Zap size={32} />,
            title: "Real-time Impact",
            desc: "Follow every donation with live updates and stories. See the immediate results of your generosity as they happen."
        },
        {
            icon: <Globe size={32} />,
            title: "Global Reach",
            desc: "Connect with compassionate communities worldwide. Hope knows no borders, and neither does our support network."
        },
        {
            icon: <Target size={32} />,
            title: "Precision Giving",
            desc: "Search and filter for causes that matter most to you, from medical emergencies to educational scholarships."
        },
        {
            icon: <Users size={32} />,
            title: "Community Growth",
            desc: "Join a movement focused on collective upliftment. We empower people to share their stories and receive the care they deserve."
        }
    ];

    const timelineSteps = [
        { num: 1, title: "Join", text: "Sign up as a donor, volunteer, or recipient in minutes." },
        { num: 2, title: "Connect", text: "Find verified campaigns or share your own journey for support." },
        { num: 3, title: "Impact", text: "Watch as small acts of kindness create life-changing results." }
    ];

    return (
        <div className={Styles.FeaturesContainer}>
            {/* Background Decorations */}
            <div className={Styles.BackgroundBlobs}>
                <div className={`${Styles.Blob} ${Styles.Blob1}`}></div>
                <div className={`${Styles.Blob} ${Styles.Blob2}`}></div>
                <div className={`${Styles.Blob} ${Styles.Blob3}`}></div>

                {/* Floating Icons & Emojis */}
                <FloatingDecoration x="5%" y="15%" delay={0} duration={8}>
                    <Sparkles className={Styles.DecorationIcon} size={40} />
                </FloatingDecoration>
                <FloatingDecoration x="85%" y="10%" delay={2} duration={12}>
                    <span className={Styles.DecorationEmoji}>🌟</span>
                </FloatingDecoration>
                <FloatingDecoration x="40%" y="25%" delay={1} duration={10}>
                    <Heart className={Styles.DecorationIcon} size={30} style={{ opacity: 0.3 }} />
                </FloatingDecoration>
                <FloatingDecoration x="15%" y="60%" delay={3} duration={15}>
                    <div className={Styles.MiniGlassCard}>
                        <ShieldCheck size={18} /> <span>100% Verified</span>
                    </div>
                </FloatingDecoration>
                <FloatingDecoration x="80%" y="55%" delay={0.5} duration={11}>
                    <span className={Styles.DecorationEmoji}>🙌</span>
                </FloatingDecoration>
                <FloatingDecoration x="10%" y="85%" delay={4} duration={14}>
                    <span className={Styles.DecorationEmoji}>🌿</span>
                </FloatingDecoration>
                <FloatingDecoration x="75%" y="80%" delay={2} duration={9}>
                    <div className={Styles.MiniGlassCard}>
                        <Zap size={18} /> <span>Live Updates</span>
                    </div>
                </FloatingDecoration>
                <FloatingDecoration x="50%" y="90%" delay={5} duration={16}>
                    <Globe className={Styles.DecorationIcon} size={45} style={{ opacity: 0.15 }} />
                </FloatingDecoration>
            </div>

            <main className={Styles.ContentWrapper}>
                {/* Hero Section */}
                <section className={Styles.Hero}>
                    <div className={Styles.HeroContent}>
                        <motion.div
                            className={Styles.HeroBadge}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Sparkles size={16} /> <span>Innovative Impact Tracking</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Features that <span className={Styles.Highlight}>Empower Hope</span>
                        </motion.h1>

                        <motion.p
                            className={Styles.HeroSubtitle}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            We're building more than a platform—we're creating a global network of kindness and transparency designed to change lives.
                        </motion.p>

                        <motion.div
                            className={Styles.HeroCTA}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <button className={Styles.BtnPrimary} onClick={() => navigate('/login')}>
                                Join Movement <ArrowRight size={20} style={{ marginLeft: '0.8rem', verticalAlign: 'middle' }} />
                            </button>
                            <button className={Styles.BtnSecondary} onClick={() => navigate('/aboutus')}>
                                Our Philosophy
                            </button>
                        </motion.div>
                    </div>

                    <motion.div 
                        className={Styles.HeroVisual}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className={Styles.MainImageWrapper}>
                            <img 
                                src="https://images.unsplash.com/photo-1754086986699-498f52e85ae5?w=2000&auto=format&fit=crop&q=80" 
                                alt="Empowering Communities" 
                                className={Styles.MainImage}
                            />
                            <div className={Styles.ImageDecoration}></div>
                        </div>
                    </motion.div>
                </section>

                {/* Features Grid */}
                <section className={Styles.GridSection}>
                    <motion.div
                        className={Styles.SectionTitle}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2>Core Capabilities</h2>
                    </motion.div>

                    <motion.div
                        className={Styles.Grid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {featureItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className={Styles.FeatureCard}
                                variants={fadeIn}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className={Styles.IconBox}>
                                    {item.icon}
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* How it Works Journey */}
                <section className={Styles.HowItWorks}>
                    <motion.div
                        className={Styles.SectionTitle}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 style={{ color: 'white' }}>The Journey to Change</h2>
                    </motion.div>

                    <motion.div
                        className={Styles.TimelineGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {timelineSteps.map((step, index) => (
                            <motion.div key={index} className={Styles.Step} variants={fadeIn}>
                                <div className={Styles.StepNumber}>{step.num}</div>
                                <h4>{step.title}</h4>
                                <p>{step.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* CTA section */}
                <motion.section
                    className={Styles.CTA}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2>Ready to Create an Impact?</h2>
                    <p>Whether you're here to offer support or seeking a helping hand, you're now part of a community built on the power of hope.</p>
                    <button className={Styles.BtnPrimary} onClick={() => navigate('/login')}>
                        Start Your Journey Today
                    </button>
                </motion.section>
            </main>
        </div>
    );
};

export default Features;
