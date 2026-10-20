import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { History, Receipt, Calendar, Clock, Tag } from 'lucide-react';
import './donor-shared.css';
import { formatLKR } from '../../utils/money';

const formatCategory = (category) => {
    if (!category) return 'Uncategorized';
    if (category === 'POOL') return 'General pool';
    return category.charAt(0) + category.slice(1).toLowerCase();
};

const MyDonations = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { authAxios } = useContext(AuthContext);
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            setLoading(true);
            try {
                const response = await authAxios.get('/donor/donations');
                setDonations(response.data || []);
            } catch (error) {
                console.error('Failed to load donations:', error);
                toast.error('Failed to load your donation history.');
            } finally {
                setLoading(false);
            }
        };
        fetchDonations();
    }, [authAxios]);

    return (
        <div className="donor-page-container">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <main className="donor-main-content">
                <header className="donor-header" style={{ marginBottom: '3rem' }}>
                    <h1 className="donor-title">Donation History <History style={{ verticalAlign: 'middle' }} /></h1>
                </header>

                <div className="donor-glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '2rem', borderBottom: '1px solid var(--donor-glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 className="donor-section-title" style={{ margin: 0 }}>Recent Contributions</h2>
                    </div>

                    <div style={{ padding: '2rem' }}>
                        {loading ? (
                            <div className="loading">Loading your donations...</div>
                        ) : donations.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <p style={{ color: 'var(--donor-text-muted)' }}>You have not made any donations yet.</p>
                                <button className="donor-btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/donor-dashboard')}>
                                    Explore Posts
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '1.5rem' }}>
                                {donations.map((donation) => {
                                    const time = donation.transactionTime ? new Date(donation.transactionTime) : null;
                                    return (
                                        <div key={donation.orderId} className="donor-glass-card" style={{ padding: '1.5rem', background: 'white', border: '1px solid #e2e8f0' }}>
                                            <h3 style={{ color: 'var(--donor-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>{donation.title}</h3>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--donor-text-muted)' }}>
                                                    <Tag size={16} /> <span>{formatCategory(donation.category)}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--donor-text-muted)', minWidth: 0 }}>
                                                    <Receipt size={16} style={{ flexShrink: 0 }} />
                                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={donation.orderId}>
                                                        {donation.orderId}
                                                    </span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--donor-text-muted)' }}>
                                                    <Calendar size={16} /> <span>{time ? time.toLocaleDateString() : 'N/A'}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--donor-text-muted)' }}>
                                                    <Clock size={16} /> <span>{time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
                                                </div>
                                            </div>

                                            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: '600', color: 'var(--donor-text-main)' }}>Amount Paid</span>
                                                <span style={{ fontWeight: '800', color: 'var(--donor-primary)', fontSize: '1.2rem' }}>{formatLKR(donation.amount)}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyDonations;
