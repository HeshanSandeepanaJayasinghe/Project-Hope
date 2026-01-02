import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./App.css";


import homesec1 from "./pictures/homesec1.mp4";
import img1 from "./pictures/img1.jpg";
import img2 from "./pictures/img2.jpg"; 
import img3 from "./pictures/img3.avif";




export default function App() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });
  

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  

  useEffect(() => {
    if (inView1) controls1.start({ opacity: 1, y: 0 });
    if (inView2) controls2.start({ opacity: 1, y: 0 });
    if (inView3) controls3.start({ opacity: 1, y: 0 });
   
  }, [inView1, inView2, inView3, controls1, controls2, controls3]);

  const animationProps = { initial: { opacity: 0, y: 50 }, transition: { duration: 0.8 } };

  return (
    <div className="container">

      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <video className="bg-video" src={homesec1} autoPlay loop muted playsInline />
        <h2>
          Join Hands<br />Give Hope
        </h2>
        <p>
          Together, we’re building a world where kindness creates lasting change.
          <br />Join our community of givers and help bring
          <br />hope, opportunity, and compassion to those who need it most.
        </p>
        <button>Get Started</button>
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
          <p>You’re not alone. Tell your story, reach out to a caring community, and get the help you need to move forward with hope and dignity.</p>
          <button>Sign up</button>
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
          <p>Every act of generosity brings someone closer to stability, healing, and hope. Give with compassion and see how your kindness creates real, human impact.</p>
          <button>Sign up</button>
        </div>
      </motion.section>

      {/* What We Do Section */}
      <motion.section
        ref={ref3}
        className="what-we-do"
        animate={controls3}
        {...animationProps}
       
      >
        <h2 className="section-title">Join with us.<br />Here is what we do.</h2>
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
              vital healthcare support and renewed hope.
            </p>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
