import React, { useState, useEffect } from 'react';
import slide1 from '../assets/hero_slide_1.png';
import slide2 from '../assets/hero_slide_2.png';
import slide3 from '../assets/hero_slide_3.png';
import slide4 from '../assets/hero_slide_4.png';
import slide5 from '../assets/hero_slide_5.png';
// New realistic images
import supportImg from '../assets/feature_1_real.png';
import trustImg from '../assets/feature_2_real.png';
import impactImg from '../assets/feature_3_real.png';

const Features = () => {
    // State for hover effects
    const [hoveredFeature, setHoveredFeature] = useState(null);
    const [hoveredStep, setHoveredStep] = useState(null);

    // Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: slide1,
            title: "Empowering Future Generations",
            subtitle: "Your support builds classrooms and dreams for children in need.  Support to achive their dreams and make a difference in their lives."
        },
        {
            image: slide2,
            title: "Nurturing Growth & Hope",
            subtitle: "Planting seeds of change for a sustainable and thriving future. "
        },
        {
            image: slide3,
            title: "Caring for Our Elders",
            subtitle: "Providing dignity, companionship, and support to those who cared for us. "
        },
        {
            image: slide4,
            title: "Fighting Hunger, Together",
            subtitle: "Ensuring no one goes to bed hungry by sharing essential nutrition."
        },
        {
            image: slide5,
            title: "Protecting Every Life",
            subtitle: "Compassionate care for the voiceless animals who share our world."
        }
    ];

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div style={styles.page}>
            {/* Hero Carousel Section */}
            <div style={styles.heroWrapper}>
                <section style={{ ...styles.heroSection, backgroundImage: `url(${slides[currentSlide].image})` }}>
                    <div style={styles.heroOverlay}></div>
                    <div style={styles.heroContent}>
                        <div style={styles.heroTextContainer}>
                            <h1 style={styles.heroTitle}>
                                {slides[currentSlide].title}
                            </h1>
                            <p style={styles.heroSubtitle}>
                                {slides[currentSlide].subtitle}
                            </p>
                        </div>
                        <button style={styles.heroBtn}>Join Us</button>

                        {/* Carousel Indicators */}
                        <div style={styles.carouselIndicators}>
                            {slides.map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.indicatorDot,
                                        backgroundColor: index === currentSlide ? '#b98110ff' : 'rgba(255,255,255,0.4)',
                                        transform: index === currentSlide ? 'scale(1.2)' : 'scale(1)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Feature 1: Direct Support */}
            <section
                style={{ ...styles.featureSection, ...styles.sectionAlt }}
                onMouseEnter={() => setHoveredFeature(1)}
                onMouseLeave={() => setHoveredFeature(null)}
            >
                <div style={styles.featureContent}>
                    <div style={styles.featureText}>
                        <h2 style={styles.featureTitleAlt}>1. Direct Support</h2>
                        <p style={styles.featureDescriptionAlt}>
                            Donate directly to individuals or verified families in need with full transparency on how your help is used.
                        </p>
                    </div>
                    <div style={{
                        ...styles.featureImageContainer,
                        transform: hoveredFeature === 1 ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.4s ease'
                    }}>
                        <img src={supportImg} alt="Community Support" style={styles.featureImage} />
                    </div>
                </div>
            </section>

            {/* Feature 2: Verified Profiles */}
            <section
                style={{ ...styles.featureSection, ...styles.sectionWhite }}
                onMouseEnter={() => setHoveredFeature(2)}
                onMouseLeave={() => setHoveredFeature(null)}
            >
                <div style={{ ...styles.featureContent, flexDirection: 'row-reverse' }}>
                    <div style={styles.featureText}>
                        <h2 style={styles.featureTitle}>2. Verified Profiles</h2>
                        <p style={styles.featureDescription}>
                            We verify all recipients and projects to ensure every contribution makes a real difference.
                        </p>
                    </div>
                    <div style={{
                        ...styles.featureImageContainer,
                        transform: hoveredFeature === 2 ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.4s ease'
                    }}>
                        <img src={trustImg} alt="Verified Profiles" style={styles.featureImage} />
                    </div>
                </div>
            </section>

            {/* Feature 3: Impact Tracking */}
            <section
                style={{ ...styles.featureSection, ...styles.sectionAlt }}
                onMouseEnter={() => setHoveredFeature(3)}
                onMouseLeave={() => setHoveredFeature(null)}
            >
                <div style={styles.featureContent}>
                    <div style={styles.featureText}>
                        <h2 style={styles.featureTitleAlt}>3. Impact Tracking</h2>
                        <p style={styles.featureDescriptionAlt}>
                            Track every donation or action see real stories and updates <br />
                            from those you've helped.
                        </p>
                    </div>
                    <div style={{
                        ...styles.featureImageContainer,
                        transform: hoveredFeature === 3 ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.4s ease'
                    }}>
                        <img src={impactImg} alt="Impact Tracking" style={styles.featureImage} />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section style={styles.howItWorks}>
                <h2 style={styles.sectionTitle}>How this works</h2>

                <div style={styles.stepsContainer}>
                    {/* Step 1 */}
                    <div
                        style={styles.stepItem}
                        onMouseEnter={() => setHoveredStep(1)}
                        onMouseLeave={() => setHoveredStep(null)}
                    >
                        <div style={{
                            ...styles.stepCircle,
                            backgroundColor: hoveredStep === 1 ? '#10b981' : '#f3f4f6',
                            color: hoveredStep === 1 ? '#fff' : '#000000ff',
                            transform: hoveredStep === 1 ? 'translateY(-5px)' : 'none',
                            transition: 'all 0.3s ease'
                        }}>1</div>
                        <h3 style={styles.stepTitle}>Join</h3>
                        <p style={styles.stepDesc}>
                            Sign up as a <br />
                            donor, volunteer, <br />
                            or recipient
                        </p>
                    </div>

                    <div style={styles.stepArrow}>⟶</div>

                    {/* Step 2 */}
                    <div
                        style={styles.stepItem}
                        onMouseEnter={() => setHoveredStep(2)}
                        onMouseLeave={() => setHoveredStep(null)}
                    >
                        <div style={{
                            ...styles.stepCircle,
                            backgroundColor: hoveredStep === 2 ? '#10b981' : '#f3f4f6',
                            color: hoveredStep === 2 ? '#fff' : '#000000ff',
                            transform: hoveredStep === 2 ? 'translateY(-5px)' : 'none',
                            transition: 'all 0.3s ease'
                        }}>2</div>
                        <h3 style={styles.stepTitle}>Connect</h3>
                        <p style={styles.stepDesc}>
                            Find verified <br />
                            campaigns or <br />
                            submit your request
                        </p>
                    </div>

                    <div style={styles.stepArrow}>⟶</div>

                    {/* Step 3 */}
                    <div
                        style={styles.stepItem}
                        onMouseEnter={() => setHoveredStep(3)}
                        onMouseLeave={() => setHoveredStep(null)}
                    >
                        <div style={{
                            ...styles.stepCircle,
                            backgroundColor: hoveredStep === 3 ? '#10b981' : '#f3f4f6',
                            color: hoveredStep === 3 ? '#fff' : '#000000ff',
                            transform: hoveredStep === 3 ? 'translateY(-5px)' : 'none',
                            transition: 'all 0.3s ease'
                        }}> 3 </div>
                        <h3 style={styles.stepTitle}>Impact</h3>
                        <p style={styles.stepDesc}>
                            Make a <br />
                            difference and <br />
                            see real results
                        </p>
                    </div>
                </div>

                <button style={{
                    ...styles.signupBtn,
                    backgroundColor: '#10b981',
                    transform: 'scale(1)',
                }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 6px 15px rgba(16, 185, 129, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}
                >Sign up</button>
            </section>
        </div>
    );
};

const styles = {
    page: {
        width: '100%',
        overflowX: 'hidden',
        fontFamily: "'Inter', sans-serif",
    },
    heroWrapper: {
        backgroundColor: '#0c665d99',
        position: 'relative',
        width: '100%',
    },
    heroSection: {
        position: 'relative',
        backgroundColor: 'transparent',
        textAlign: 'center',
        padding: '0',
        height: '700px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginBottom: '0',
        zIndex: 1,
        transition: 'background-image 1s ease-in-out',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '550px',
    },
    waveContainer: {
        position: 'absolute',
        bottom: -1, // Overlap slightly to avoid gap
        left: 0,
        width: '100%',
        lineHeight: 0,
        zIndex: 2,

    },
    waveSvg: {
        position: 'relative',
        display: 'block',
        width: 'calc(100% + 1.3px)',
        height: '150px',
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        zIndex: 1,
    },
    heroContent: {
        position: 'relative',
        zIndex: 2,
        maxWidth: '900px',
        margin: '0 auto',
        paddingBottom: '60px', // Lift text up from wave
        width: '100%',
    },
    heroTextContainer: {
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', // Added alignment
        marginBottom: '40px',
    },
    heroTitle: {
        fontSize: '4.5rem',
        fontWeight: '700',
        marginBottom: '20px',
        color: '#ffffff',
        lineHeight: '1.1',
        letterSpacing: '-0.01em',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        fontFamily: '"Times New Roman", Times, serif',
        fontStyle: 'italic',
        transition: 'opacity 0.5s ease',
    },
    heroSubtitle: {
        fontSize: '1.5rem',
        color: '#f3f4f6',
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: '1.5',
        fontWeight: '400',
        textShadow: '0 1px 5px rgba(0,0,0,0.6)',
    },
    heroBtn: {
        padding: '14px 44px',
        fontSize: '1.2rem',
        borderRadius: '50px',
        border: 'none',
        backgroundColor: '#a26f08ff',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: '600',
        letterSpacing: '0.02em',
        transition: 'all 0.2s',
        boxShadow: '0 4px 15px rgba(185, 143, 16, 0.4)',
    },
    carouselIndicators: {
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '20px',
    },
    indicatorDot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    },
    featureSection: {
        padding: '30px 20px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
    },
    featureContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        width: '100%',
        gap: '40px',
        flexWrap: 'wrap',
    },
    featureText: {
        flex: 1,
        minWidth: '320px',
        textAlign: 'left',
        padding: '10px',
    },
    featureImageContainer: {
        flex: 1,
        minWidth: '320px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureImage: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        maxHeight: '300px',
        objectFit: 'cover',
    },
    sectionAlt: {
        backgroundColor: '#0c665d99',
        color: '#1f2937',
    },
    sectionWhite: {
        backgroundColor: '#ffffff',
        color: '#1f2937',
    },
    featureTitle: {
        fontSize: '2.2rem',
        fontWeight: '700',
        marginBottom: '10px',
        color: '#111827',
        letterSpacing: '-0.02em',
        fontFamily: '"Times New Roman", Times, serif',
        fontStyle: 'italic',
    },
    featureTitleAlt: {
        fontSize: '2.2rem',
        fontWeight: '700',
        marginBottom: '10px',
        color: '#ffffff',
        letterSpacing: '-0.02em',
        fontFamily: '"Times New Roman", Times, serif',
        fontStyle: 'italic',
    },
    featureDescription: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#4b5563',
    },
    featureDescriptionAlt: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#f3f4f6',
    },
    howItWorks: {
        padding: '40px 20px 60px',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        zIndex: 2,
        position: 'relative',
    },
    sectionTitle: {
        fontSize: '2.8rem',
        fontWeight: '800',
        marginBottom: '40px',
        color: '#111827',
        letterSpacing: '-0.02em',
        fontFamily: '"Times New Roman", Times, serif',
        fontStyle: 'italic',
    },
    stepsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        maxWidth: '1000px',
        margin: '0 auto 50px',
    },
    stepItem: {
        flex: 1,
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
    },
    stepCircle: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.8rem',
        fontWeight: '700',
        marginBottom: '12px',
        color: '#374151',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    },
    stepArrow: {
        fontSize: '1.8rem',
        color: '#8f9092ff',
        marginTop: '-30px',
        display: 'block',
    },
    stepTitle: {
        fontSize: '1.2rem',
        fontWeight: '700',
        marginBottom: '6px',
        color: '#111827',
    },
    stepDesc: {
        fontSize: '0.9rem',
        color: '#6b7280',
        lineHeight: '1.5',
    },
    signupBtn: {
        padding: '14px 44px',
        borderRadius: '50px',
        border: 'none',
        backgroundColor: '#0c665d99',
        color: '#fff',
        fontSize: '1.1rem',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(185, 29, 29, 0.06)',
        transition: 'background-color 0.2s, transform 0.2s',
    }
};

export default Features;
