import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        {/* Brand Section */}
        <div style={styles.column}>
          <div style={styles.branding}>
            <div style={styles.logoCircle}>
              <Link to="/" className="logo-link">
                    <img src="/Project-hope-logo.jpg" alt="Logo" className="logo-img" />
                </Link>
            </div>
            <h2 style={styles.brandName}>Project Hope</h2>
          </div>
          <p style={styles.brandDesc}>
            Join hands with us to create a world where hope is shared and communities thrive together.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.column}>
          <h3 style={styles.columnTitle}>Quick Links</h3>
          <ul style={styles.linkList}>
            {['Home', 'Posts', 'Features', 'About Us'].map((item) => (
              <li key={item}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  style={{
                    ...styles.link,
                    color: hoveredLink === item ? '#10b981' : '#9ca3af',
                    paddingLeft: hoveredLink === item ? '8px' : '0',
                  }}
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
        <div style={styles.column}>
          <h3 style={styles.columnTitle}>Resources</h3>
          <ul style={styles.linkList}>
            {['Blog Posts', 'Success Stories', 'Volunteer'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  style={{
                    ...styles.link,
                    color: hoveredLink === item ? '#10b981' : '#9ca3af',
                    paddingLeft: hoveredLink === item ? '8px' : '0',
                  }}
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
                style={{
                  ...styles.link,
                  color: hoveredLink === 'Donate' ? '#10b981' : '#9ca3af',
                  paddingLeft: hoveredLink === 'Donate' ? '8px' : '0',
                }}
                onMouseEnter={() => setHoveredLink('Donate')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Donate
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={styles.column}>
          <h3 style={styles.columnTitle}>Get in Touch</h3>
          <div style={styles.contactItem}>
            <span style={styles.icon}>📍</span>
            <span>University of Sri Jayewardenepura</span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.icon}>📞</span>
            <span>+94 718639759</span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.icon}>✉️</span>
            <span>heshansandeepanajayasinghe@gmail.com</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomContent}>
          <p style={styles.copyright}>&copy; 2025 Project Hope. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#111827", // Very dark slate (almost black)
    color: "#e5e7eb", // Light grey text
    fontFamily: "'Inter', sans-serif",
    borderTop: "1px solid #1f2937",
    width: "100%",
  },

  container: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: "60px 40px", // Increased side padding but removed max-width constraint to fill screen more
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", // Slightly smaller minmax to fit better
    gap: "40px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  branding: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  logoCircle: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.2)",
  },
  brandName: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#f9fafb",
    letterSpacing: "-0.02em",
  },
  brandDesc: {
    lineHeight: "1.6",
    color: "#9ca3af",
    fontSize: "0.95rem",
    maxWidth: "300px",
  },
  columnTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: "5px",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "all 0.2s ease",
    display: "inline-block",
  },

  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    color: "#9ca3af",
    fontSize: "0.95rem",
    lineHeight: "1.5",
  },

  icon: {
    fontSize: "1.1rem",
    opacity: 0.8,
  },

  bottomBar: {
    backgroundColor: "#030712", // Even darker for bottom bar
    borderTop: "1px solid #1f2937",

  },
  bottomContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",

  },
  copyright: {
    color: "#6b7280",
    fontSize: "0.9rem",
  },

};
