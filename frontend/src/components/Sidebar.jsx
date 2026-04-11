import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import './Sidebar.css';
import { MENU_CONFIG } from './SidebarMenuConfig';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const { user, userProfile, logout } = useContext(AuthContext);

    const role = user?.toLowerCase() || 'guest';
    const items = MENU_CONFIG[role] || [];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getRoleLabel = (role) => {
        const labels = {
            recipient: 'Recipient',
            donor: 'Donor',
            verifier: 'Verifier',
            financier: 'Financier',
            admin: 'Admin',
            superadmin: 'Super Admin'
        };
        return labels[role] || role;
    };

    //  Consolidated full-screen toggle logic
    return (
        <>
            {/* Sidebar Overlay */}
            {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header" style={{ position: 'relative' }}>
                    <h3 className="sidebar-title">{getRoleLabel(role)}</h3>
                    <p className="sidebar-user-name" style={{ textAlign: 'center', marginTop: '0.5rem', opacity: 0.9, fontSize: '0.9rem' }}>
                        {/*  Dynamic rendering of donor name with email fallback */}
                        {userProfile?.name || (userProfile?.email || '').split('@')[0] || user || 'Welcome'}
                    </p>
                    {/*  Dedicated Sidebar Close Button (X) */}
                    <button className="sidebar-close-btn" onClick={() => setIsOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            className="sidebar-item"
                            onClick={() => {
                                navigate(item.path);
                                setIsOpen(false);
                            }}
                        >
                            {item.icon && <span className="sidebar-icon">{item.icon}</span>}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-button" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};
export default Sidebar;
