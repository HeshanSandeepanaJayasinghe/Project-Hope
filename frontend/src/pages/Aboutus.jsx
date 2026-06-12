import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Aboutus.css';

// Import founder images
import heshanImage from '../assets/founders-images/Heshan-Jayasinghe.jpeg';
import savinaImage from '../assets/founders-images/Savina-Edirisinghe.png';
import isumiImage from '../assets/founders-images/Isumi-Livisarani.jpeg';
import isuruImage from '../assets/founders-images/Isuru-Akalanka.jpeg';
import nethmikаImage from '../assets/founders-images/Nethmika-Mendis.jpeg';
import nishanthanImage from '../assets/founders-images/V-Nishanthan.png';
import thinilImage from '../assets/founders-images/Thinil-Sandaru.jpeg';
import shehaniImage from '../assets/founders-images/Shehani-Yashoda.jpeg';

// Import background image
import grassImage from '../assets/about-us-images/grass.jpg';

const Aboutus = () => {
  const navigate = useNavigate();

  const founders = [
    { name: 'Heshan Jayasinghe', image: heshanImage },
    { name: 'Savina Hansindu', image: savinaImage },
    { name: 'Isumi Livisarani', image: isumiImage },
    { name: 'Isuru Akalanka', image: isuruImage },
    { name: 'Nethmika Mendis', image: nethmikаImage },
    { name: 'V. Nishanthan', image: nishanthanImage },
    { name: 'Thinil Sandaru', image: thinilImage },
    { name: 'Shehani Yashoda', image: shehaniImage },
  ];

  return (
    <div className="aboutus-container">
      {/* Section 1: Hero */}
      <section 
        className="hero-section"
        style={{
          backgroundImage: `url(${grassImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-heading">Hey There!</h1>
          <p className="hero-description">
            At Project Hope, we believe that no one should struggle alone. Every day, millions of people face financial hardships that could be eased with a little help from someone who cares. Our mission is to bridge that gap—connecting compassionate donors with individuals and communities in need.
          </p>
          <button 
            className="hero-button"
            onClick={() => navigate('/login')}
          >
            Join Us
          </button>
        </div>
      </section>

      {/* Section 2: Who We Are */}
      <section className="who-we-are-section">
        <h2 className="section-title">Who We Are</h2>
        <div className="founders-grid">
          {founders.map((founder, index) => (
            <div key={index} className="founder-card">
              <img src={founder.image} alt={founder.name} className="founder-image" />
              <h3 className="founder-name">{founder.name}</h3>
            </div>
          ))}
        </div>
        <p className="section-description">
          We are a dedicated team committed to building a transparent, trustworthy, and user-friendly platform where kindness meets opportunity. Whether someone is raising funds for emergency medical care, education, food, shelter, or community upliftment, our platform empowers them to share their story and receive support from generous donors worldwide.
        </p>
      </section>

      {/* Section 3: What We Do */}
      <section className="what-we-do-section">
        <h2 className="section-title">What We Do</h2>
        <div className="what-we-do-content">
          <div className="what-we-do-left">
            <p className="what-we-do-text">
              Our platform acts as a meeting point for recipients who need help and donors who want to make a real impact.
            </p>
            <p className="what-we-do-text">
              Whether you want to support a family in crisis or help a student achieve their dreams, we make the connection effortless.
            </p>
          </div>
          <div className="what-we-do-right">
            <h3 className="what-we-do-subtitle">We ensure:</h3>
            <ul className="ensure-list">
              <li>Simple and secure donation processes</li>
              <li>Transparent fundraising with clear descriptions and updates</li>
              <li>Real-time progress tracking</li>
              <li>Direct communication between donors and recipients</li>
              <li>Verified campaigns for safe giving</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Join Us */}
      <section className="join-us-section">
        <h2 className="section-title">Join Us</h2>
        <p className="join-us-description">
          Whether you're here to give or to seek support, you are part of something bigger. A movement of humanity. A community built on hope.
        </p>
        <p className="join-us-description">
          Together, we are proving that small acts of kindness can create big change.
        </p>
        <button 
          className="join-us-button"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </section>
    </div>
  );
};

export default Aboutus;
