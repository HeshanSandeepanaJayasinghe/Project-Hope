import React, { useState } from "react";

export default function Footer() {
  // State to handle button hover effects
  const [hoveredButton, setHoveredButton] = useState(null);

  // Button click handler
  const handleClick = (section) => {
    console.log(`Navigate to: ${section}`);
    // Replace with actual navigation if needed
  };

  return (
    <footer style={styles.footer}>
      {/* Main Footer Area */}
      <div style={styles.container}>

        {/* LEFT : Logo + Text */}
        <div style={styles.left}>
          <div style={styles.logoCircle}>🌱</div>
          <h2 style={styles.brandText}>
            Join Hands <br /> Share Hope
          </h2>
        </div>

        {/* CENTER : Buttons */}
        <div style={styles.middle}>
          {["Posts", "Features", "About Us"].map((btn, index) => (
            <button
              key={index}
              style={{
                ...styles.button,
                backgroundColor:
                  hoveredButton === btn
                    ? "rgba(255,255,255,0.45)"
                    : "rgba(255,255,255,0.25)"
              }}
              onMouseEnter={() => setHoveredButton(btn)}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* RIGHT : Contact */}
        <div style={styles.right}>
          <h2 style={styles.contactTitle}>Contact Us</h2>
          <div style={styles.contactItem}>
            <span style={styles.icon}>📞</span>
            <span>071 7534345</span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.icon}>✉️</span>
            <span>heshan@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        &copy; 2025 All rights reserved
      </div>
    </footer>
  );
}

/* ================= STYLES ================= */

const styles = {
  footer: {
    width: "100%",
    backgroundColor: "#1B4D3E",
    color: "#ffffff",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "50px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "40px",
  },

  /* LEFT */
  left: {
    textAlign: "center",
    minWidth: "220px",
    flex: "1",
  },

  logoCircle: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "#2E8B57", // SeaGreen
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    margin: "0 auto 16px",
  },

  brandText: {
    fontWeight: "400",
    fontSize: "24px",
    lineHeight: "1.3",
  },

  /* MIDDLE */
  middle: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    alignItems: "center",
    minWidth: "220px",
    flex: "1",
  },

  button: {
    width: "170px",
    padding: "12px 0",
    borderRadius: "28px",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },

  /* RIGHT */
  right: {
    minWidth: "260px",
    flex: "1",
  },

  contactTitle: {
    fontWeight: "400",
    fontSize: "24px",
    marginBottom: "20px",
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "18px",
    marginBottom: "16px",
  },

  icon: {
    fontSize: "20px",
  },

  /* BOTTOM BAR */
  bottomBar: {
    backgroundColor: "#11352A",
    textAlign: "center",
    padding: "16px",
    fontSize: "16px",
  },

  /* Responsive adjustments via media queries (inline not possible, handled by React inline wrapper) */
};
