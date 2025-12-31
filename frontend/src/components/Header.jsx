import React from 'react';
import './Header.css';
import logo from '../assets/react.svg'; // Temporary placeholder

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <a href="/" className="logo-link">
                    <img src={logo} alt="Logo" className="logo-img" />
                </a>
            </div>
            <div className="header-right">
                <nav className="nav-links">
                    <a href="#posts" className="nav-item">Posts</a>
                    <a href="#features" className="nav-item">Features</a>
                    <a href="#about" className="nav-item">About Us</a>
                </nav>
                <button className="get-started-btn">Get Started</button>
            </div>
        </header>
    );
};

export default Header;
