import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Mail, LocateFixed, Phone } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-column">
          <div className="footer-branding">
            <div className="footer-logo-circle">
              <Link to="/" className="logo-link">
                    <img src="/Project-hope-logo.jpg" alt="Logo" className="logo-img" />
                </Link>
            </div>
            <h2 className="footer-brand-name">Project Hope</h2>
          </div>
          <p className="footer-brand-desc">
            Join hands with us to create a world where hope is shared and communities thrive together.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3 className="footer-column-title">Quick Links</h3>
          <ul className="footer-link-list">
            {['Home', 'Posts', 'Features', 'About Us'].map((item) => (
              <li key={item}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  className="footer-link"
                  onMouseEnter={() => setHoveredLink(item)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h3 className="footer-column-title">Resources</h3>
          <ul className="footer-link-list">
            {['Blog Posts', 'Success Stories', 'Volunteer'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="footer-link"
                  onMouseEnter={() => setHoveredLink(item)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li key="Donate">
              <Link
                to="/pool-donation"
                className="footer-link"
                onMouseEnter={() => setHoveredLink('Donate')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Donate
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h3 className="footer-column-title">Get in Touch</h3>
          <div className="footer-contact-item">
            <span className="footer-icon"><LocateFixed /></span>
            <span>University of Sri Jayewardenepura</span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-icon"><Phone /></span>
            <span>+94 718639759</span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-icon"><Mail /></span>
            <span>heshansandeepanajayasinghe@gmail.com</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <p className="footer-copyright">&copy; 2025 Project Hope. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}
