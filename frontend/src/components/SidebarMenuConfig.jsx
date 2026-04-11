import { LayoutDashboard, Users, Heart, ClipboardCheck, Wallet } from 'lucide-react';

export const MENU_CONFIG = {
    superadmin: [
        { id: 'dashboard', label: 'Dashboard', path: '/superadmin-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'users', label: 'Manage Users', path: '/admin/users', icon: <Users size={20} /> },
        { id: 'logs', label: 'System Logs', path: '/admin/logs', icon: <ClipboardCheck size={20} /> },
    ],
    admin: [
        { id: 'dashboard', label: 'Dashboard', path: '/admin-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'donations', label: 'My Donations', path: '/donor/donations', icon: <Heart size={20} /> },
        { id: 'wallet', label: 'Wallet', path: '/donor/wallet', icon: <Wallet size={20} /> },
    ],
    verifier: [
        { id: 'dashboard', label: 'Dashboard', path: '/verifier-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'donations', label: 'My Donations', path: '/donor-dsshaboard', icon: <Heart size={20} /> },
        { id: 'wallet', label: 'Wallet', path: '/', icon: <Wallet size={20} /> },
    ],
    financier: [
        { id: 'dashboard', label: 'Dashboard', path: '/financier-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'users', label: 'Manage Users', path: '/admin/users', icon: <Users size={20} /> },
        { id: 'logs', label: 'System Logs', path: '/admin/logs', icon: <ClipboardCheck size={20} /> },
    ],
    recipient: [
        { id: 'dashboard', label: 'Dashboard', path: '/recipient-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'viewProfile', label: 'View Profile', path: '/recipient/view-profile', icon: <Heart size={20} /> },
        { id: 'myPosts', label: 'My Posts', path: '/recipient/my-posts', icon: <Wallet size={20} /> },
        { id: 'verification', label: 'Verification', path: '/recipient/verification', icon: <Wallet size={20} /> },
    ],
    donor: [
        { id: 'dashboard', label: 'Dashboard', path: '/donor-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'donations', label: 'My Donations', path: '/donor-dsshaboard', icon: <Heart size={20} /> },
        { id: 'wallet', label: 'Wallet', path: '/', icon: <Wallet size={20} /> },
    ],
};