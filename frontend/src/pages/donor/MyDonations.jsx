import React, { useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { History, Receipt, Calendar, Clock, Tag } from 'lucide-react';
import './donor-shared.css';

const MyDonations = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const donations = [
        { id: 1, title: 'Medical Support for Kandy', category: 'Health', paymentId: 'PH-00023', amount: 'Rs. 2,000.00', date: '2025-11-22', time: '21:23' },
        { id: 2, title: 'Stationary for Kids', category: 'Education', paymentId: 'PH-00024', amount: 'Rs. 5,000.00', date: '2025-11-20', time: '14:15' },
        { id: 3, title: 'Flood Relief Galle', category: 'Disaster Relief', paymentId: 'PH-00025', amount: 'Rs. 1,500.00', date: '2025-11-18', time: '09:45' },
        { id: 4, title: 'School Building Fund', category: 'Education', paymentId: 'PH-00026', amount: 'Rs. 3,000.00', date: '2025-11-15', time: '18:30' },
        { id: 5, title: 'Animal Rescue Center', category: 'Animal Welfare', paymentId: 'PH-00027', amount: 'Rs. 2,500.00', date: '2025-11-12', time: '11:20' },
        { id: 6, title: 'Clean Water Project', category: 'Environment', paymentId: 'PH-00028', amount: 'Rs. 4,000.00', date: '2025-11-10', time: '16:00' }
    ];

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
                        <button className="donor-btn-secondary">Export to PDF</button>
                    </div>

                    <div style={{ padding: '2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                            {donations.map((donation) => (
                                <div key={donation.id} className="donor-glass-card" style={{ padding: '1.5rem', background: 'white', border: '1px solid #e2e8f0' }}>
                                    <h3 style={{ color: 'var(--donor-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>{donation.title}</h3>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--donor-text-muted)' }}>
                                            <Tag size={16} /> <span>{donation.category}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--donor-text-muted)' }}>
                                            <Receipt size={16} /> <span>{donation.paymentId}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--donor-text-muted)' }}>
                                            <Calendar size={16} /> <span>{donation.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--donor-text-muted)' }}>
                                            <Clock size={16} /> <span>{donation.time}</span>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: '600', color: 'var(--donor-text-main)' }}>Amount Paid</span>
                                        <span style={{ fontWeight: '800', color: 'var(--donor-primary)', fontSize: '1.2rem' }}>{donation.amount}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--donor-primary-light)' }}>
                        <button className="donor-btn-primary" style={{ padding: '1rem 3rem' }}>See All Donations</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyDonations;
