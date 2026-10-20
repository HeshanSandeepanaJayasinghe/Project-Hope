import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const DASHBOARD_BY_ROLE = {
    SUPERADMIN: '/superadmin-dashboard',
    ADMIN: '/admin-dashboard',
    FINANCE_MANAGER: '/financier-dashboard',
    VERIFIER: '/verifier-dashboard',
    RECIPIENT: '/recipient-dashboard',
    DONOR: '/donor-dashboard',
};

const Header = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const dashboardPath = isLoggedIn ? DASHBOARD_BY_ROLE[user] : null;

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
                    <Link to="/aboutus" className="nav-item">About Us</Link>
                    <Link to="/pool-donation" className="nav-item">Donate</Link>
                </nav>
                <Link to={dashboardPath || '/login'}>
                    <button className="get-started-btn">{dashboardPath ? 'Dashboard' : 'Get Started'}</button>
                </Link>

            </div>
        </header>
    );
};

export default Header;
