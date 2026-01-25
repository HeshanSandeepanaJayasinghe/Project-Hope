import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo-link">
                    <img src="/Project-hope-logo.jpg" alt="Logo" className="logo-img" />
                </Link>
            </div>
            <div className="header-right">
                <nav className="nav-links">
                    <Link to="/posts" className="nav-item">Posts</Link>
                    <Link to="/features" className="nav-item">Features</Link>
                    <Link to="/about" className="nav-item">About Us</Link>
                    <Link to="/pool-donation" className="nav-item">Donate</Link>
                </nav>
                <Link to="/login">
                    <button className="get-started-btn">Get Started</button>
                </Link>
                
            </div>
        </header>
    );
};

export default Header;
