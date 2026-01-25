import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ role, items, onItemClick, isOpen, setIsOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
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

    return (
        <>
            {/* Mobile Toggle Button */}
            <button 
                className="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Overlay (Mobile) */}
            {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3 className="sidebar-title">{getRoleLabel(role)}</h3>
                </div>

                <nav className="sidebar-nav">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            className="sidebar-item"
                            onClick={() => {
                                onItemClick(item.id);
                                setIsOpen(false);
                            }}
                        >
                            {item.icon && <span className="sidebar-icon">{item.icon}</span>}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button 
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
