import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PoolDonation = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', padding: '2rem', background: 'linear-gradient(135deg, #f6f9f6, #ffffff)' }}>
            <button 
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    background: 'white',
                    color: '#16a34a',
                    border: '2px solid #16a34a',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginBottom: '2rem'
                }}
            >
                <ArrowLeft size={20} />
                Back
            </button>

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
                <h1 style={{ color: '#15803d', marginBottom: '1rem' }}>Donate to the Pool</h1>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    This page will allow donors to contribute funds to the general donation pool, where funds can be allocated to various causes as needed.
                </p>
                <p style={{ color: '#9ca3af', marginTop: '2rem' }}>Backend integration coming soon...</p>
            </div>
        </div>
    );
};

export default PoolDonation;
