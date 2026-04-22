import { LayoutDashboard, Users, ShieldCheck, Heart, StickyNote, Star, ClipboardCheck, Wallet, History, FileText, Settings, UserCheck, UserRoundPen } from 'lucide-react';

export const MENU_CONFIG = {
    superadmin: [
        { id: 'dashboard', label: 'Dashboard', path: '/superadmin-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'users', label: 'Manage Users', path: '/superadmin/user-management', icon: <Users size={20} /> },
        { id: 'verification-history', label: 'Verification History', path: '/superadmin/verification-history', icon: <ClipboardCheck size={20} /> },
        { id: 'donation-activity', label: 'Donation Activity', path: '/superadmin/donation-activity', icon: <Heart size={20} /> },
        { id: 'statistics', label: 'Statistics', path: '/superadmin/statistics', icon: <FileText size={20} /> },
    ],
    admin: [
        { id: 'dashboard', label: 'Dashboard', path: '/admin-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'user-management', label: 'User Management', path: '/admin/user-management', icon: <Users size={20} /> },
        { id: 'verification-history', label: 'Verification History', path: '/admin/verification-history', icon: <ClipboardCheck size={20} /> },
        { id: 'donation-activity', label: 'Donation Activity', path: '/admin/donation-activity', icon: <Heart size={20} /> },
        { id: 'statistics', label: 'Statistics', path: '/admin/statistics', icon: <FileText size={20} /> },
    ],
    verifier: [
        { id: 'dashboard', label: 'Dashboard', path: '/verifier-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'verification-requests', label: 'Verification Requests', path: '/verifier/verification-requests', icon: <UserCheck size={20} /> },
        { id: 'verification-history', label: 'Verification History', path: '/verifier/verification-history', icon: <History size={20} /> },
    ],
    finance_manager: [
        { id: 'dashboard', label: 'Dashboard', path: '/financier-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'donation-activity', label: 'Donation Activity', path: '/financier/donation-activity', icon: <Heart size={20} /> },
        { id: 'verification-requests', label: 'Verification Requests', path: '/financier/verification-requests', icon: <UserCheck size={20} /> },
        { id: 'donation-management', label: 'Donation Management', path: '/financier/donation-management', icon: <Wallet size={20} /> },
        { id: 'reports', label: 'Reports', path: '/financier/reports', icon: <FileText size={20} /> },
    ],
    recipient: [
        { id: 'dashboard', label: 'Dashboard', path: '/recipient-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'viewProfile', label: 'View Profile', path: '/recipient/view-profile', icon: <UserRoundPen size={20} /> },
        { id: 'myPosts', label: 'My Posts', path: '/recipient/my-posts', icon: <StickyNote size={20} /> },
        { id: 'verification', label: 'Verification', path: '/recipient/verification', icon: <ShieldCheck size={20} /> },
    ],
    donor: [
        { id: 'dashboard', label: 'Dashboard', path: '/donor-dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'view-profile', label: 'View profile', path: '/donor/view-profile', icon: <UserRoundPen size={20} /> },
        { id: 'wishlist', label: 'Wishlist', path: '/donor/wishlist', icon: <Star size={20} /> },
        { id: 'DonationHistory', label: 'Donation History', path: '/donor/donation-history', icon: <History size={20} /> },
    ],
};