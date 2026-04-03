import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import './Sidebar.css';
import { MENU_CONFIG } from './SidebarMenuConfig';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

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

    return (
        <>
            {/* Mobile Toggle & Overlay */}
            <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3 className="sidebar-title">{getRoleLabel(role)}</h3>
                    <p className="sidebar-user-name">{user?.name}</p>
                </div>

                <nav className="sidebar-nav">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            className="sidebar-item"
                            onClick={() => {
                                navigate(item.path); // Navigate to the path defined in config
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
