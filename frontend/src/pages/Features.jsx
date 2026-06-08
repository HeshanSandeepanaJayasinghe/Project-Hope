import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Features.css';
import greenBg from '../assets/features-images/green.webp';
import kiteImg from '../assets/features-images/flying-kite.png';
import profileImg from '../assets/features-images/profile.png';
import mapImg from '../assets/features-images/map.png';

const featureSections = [
  {
    title: '1. Direct Support',
    description: 'Donate directly to individuals or verified families in need — with full transparency on how your help is used.',
    imageSrc: kiteImg,
    imageAlt: 'Flying kite',
    imagePosition: 'left',
    bgClass: 'feature-section--bg-soft'
  },
  {
    title: '2. Verified Profiles',
    description: 'We verify all recipients and projects to ensure every contribution makes a real difference.',
    imageSrc: profileImg,
    imageAlt: 'Verified profile',
    imagePosition: 'right',
    bgClass: 'feature-section--bg-cream'
  },
  {
    title: '3. Impact Tracking',
    description: 'Track every donation or action — see real stories and updates from those you’ve helped.',
    imageSrc: mapImg,
    imageAlt: 'Impact map',
    imagePosition: 'left',
    bgClass: 'feature-section--bg-soft'
  }
];

const roadmapSteps = [
  { step: 'Join', label: 'Sign up as a donor or a recipient' },
  { step: 'Connect', label: 'Find verified posts or submit your request' },
  { step: 'Impact', label: 'Make a difference and see real results' }
];

function Features() {
  const navigate = useNavigate();

  return (
    <div className="features-page">
      <section className="features-hero" style={{ backgroundImage: `url(${greenBg})` }}>
        <div className="hero-overlay" />
        <div className="hero-copy">
          <h1>Empowering Communities Through Connection and Care</h1>
          <p>Discover how our platform makes giving and receiving help simple, transparent, and impactful.</p>
          <button className="hero-button" onClick={() => navigate('/login')}>Join Us</button>
        </div>
      </section>

      <section className="features-list">
        {featureSections.map((item) => (
          <div
            key={item.title}
            className={`feature-section ${item.imagePosition === 'right' ? 'feature-section--reverse' : ''} ${item.bgClass}`}
          >
            <img src={item.imageSrc} alt={item.imageAlt} className="feature-image" />
            <div className="feature-text">
              <h2 className={`${item.imagePosition === 'right' ? 'left-align' : 'right-align'}`}>{item.title}</h2>
              <p className={`${item.imagePosition === 'right' ? 'left-align' : 'right-align'}`}>{item.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="how-it-works">
        <div className="how-it-works-content">
          <h2>How this works</h2>
          <div className="roadmap">
            {roadmapSteps.map((item, index) => (
              <div key={item.step} className="roadmap-step">
                <div className="roadmap-number">{index + 1}</div>
                <div>
                  <h3>{item.step}</h3>
                  <p>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="roadmap-button" onClick={() => navigate('/login')}>Sign up</button>
        </div>
      </section>
    </div>
  );
}

export default Features;
