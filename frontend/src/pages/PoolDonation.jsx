import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PoolDonation = () => {
    const navigate = useNavigate();
    const { authAxios } = useContext(AuthContext);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDonate = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        setLoading(true);
        try {
            const response = await authAxios.post('/api/payment/pay', {
                type: 'POOL',
                amount: parseFloat(amount),
                returnUrl: window.location.origin + '/donor-dashboard'
            }, {
                headers: { Accept: 'text/html' },
                responseType: 'text'
            });

            // response.data contains the HTML form string
            const formHtml = response.data;

            const div = document.createElement('div');
            div.innerHTML = formHtml;
            document.body.appendChild(div);

            const form = div.querySelector('form');
            if (form) {
                // Force overwrite the return_url to point to our frontend dashboard
                // This bypasses any hardcoded URLs in the backend's generated HTML
                const returnUrlInput = form.querySelector('input[name="return_url"]');
                if (returnUrlInput) {
                    returnUrlInput.value = window.location.origin + '/donor-dashboard';
                }

                // Save orderId so the dashboard can confirm the payment on return
                const orderIdInput = form.querySelector('input[name="order_id"]');
                if (orderIdInput) {
                    localStorage.setItem('pendingOrderId', orderIdInput.value);
                }
                
                form.submit();
            } else {
                toast.error("Failed to parse payment form");
                setLoading(false);
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error("Payment initiation failed");
            setLoading(false);
        }
    };

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
                maxWidth: '600px',
                margin: '0 auto',
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
                <h1 style={{ color: '#15803d', marginBottom: '1rem' }}>Donate to the Pool</h1>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                    This page will allow donors to contribute funds to the general donation pool, where funds can be allocated to various causes as needed.
                </p>

                <form onSubmit={handleDonate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="amount" style={{ fontWeight: '600', color: '#374151' }}>Donation Amount (LKR)</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            min="1"
                            step="0.01"
                            required
                            style={{
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #d1d5db',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '0.75rem',
                            backgroundColor: '#16a34a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Processing...' : 'Proceed to Pay'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PoolDonation;
