import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import img1 from "../assets/hpictures/img1.jpg";
import img2 from "../assets/hpictures/img2.jpg";
import img3 from "../assets/hpictures//img3.avif";

// Placeholder image URLs for hero slideshow - replace with your splash image links
const heroSlides = [
  "https://images.unsplash.com/photo-1579208575657-c595a05383b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1726837345485-7a0a7d543290?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  useEffect(() => {
    // Slideshow autoplay every 5 seconds
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    // Set initial state first
    controls1.set({ opacity: 0, y: 50 });
    controls2.set({ opacity: 0, y: 50 });
    controls3.set({ opacity: 0, y: 50 });

    // Then animate when in view
    if (inView1) controls1.start({ opacity: 1, y: 0 });
    if (inView2) controls2.start({ opacity: 1, y: 0 });
    if (inView3) controls3.start({ opacity: 1, y: 0 });
  }, [inView1, inView2, inView3, controls1, controls2, controls3]);

  const animationProps = {
    initial: { opacity: 0, y: 50 },
    transition: { duration: 0.8 },
  };

  return (
    <div className="container">

      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Slideshow Background */}
        <div className="slideshow-container">
          {heroSlides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`hero slide ${index + 1}`}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            />
          ))}
        </div>
        
        <h2>Join Hands<br />Give Hope</h2>
        <p>
          Together, we’re building a world where kindness creates lasting change.
          <br />Join our community of givers and help bring
          <br />hope, opportunity, and compassion to those who need it most.
        </p>
        <button onClick={() => navigate('/login')}>Get Started</button>
      </motion.section>

      {/* Recipient Section */}
      <motion.section
        ref={ref1}
        className="section section-row recipient-section"
        animate={controls1}
        {...animationProps}
      >
        <div className="img">
          <img src={img1} alt="Recipient" />
        </div>
        <div className="rec">
          <h2>Become a Recipient<br />Share Your Story</h2>
          <p>You’re not alone. Tell your story, reach out to a caring community.</p>
          <button onClick={() => navigate('/login')}>Sign up</button>
        </div>
      </motion.section>

      {/* Donor Section */}
      <motion.section
        ref={ref2}
        className="section section-row-reverse"
        animate={controls2}
        {...animationProps}
      >
        <div className="img">
          <img src={img2} alt="donate" />
        </div>
        <div className="don">
          <h2>Become a Donor<br />Change Lives</h2>
          <p>Every act of generosity brings someone closer to hope.</p>
          <button onClick={() => navigate('/login')}>Sign up</button>
        </div>
      </motion.section>

      {/* What We Do */}
      <motion.section
        ref={ref3}
        className="what-we-do"
        animate={controls3}
        {...animationProps}
      >
        <h2>Join with us.<br />Here is what we do.</h2>
        <div className="con">
          <div className="column tags">
            <span className="tag">Financial</span>
            <span className="tag">Food & Nutrition</span>
            <span className="tag">Healthcare</span>
          </div>
          <div className="column img">
            <img src={img3} alt="support" />
          </div>
          <div className="column para">
            <p>
              Thanks to our generous community, over 100 people have received
              vital healthcare support.
            </p>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
