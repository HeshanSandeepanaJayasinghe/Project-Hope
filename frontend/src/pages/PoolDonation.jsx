import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { submitPayHereForm } from '../utils/payhere';
import { getErrorMessage } from '../utils/apiError';
import './PoolDonation.css';

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
                amount: parseFloat(amount)
            }, {
                headers: { Accept: 'text/html' },
                responseType: 'text'
            });

            submitPayHereForm(response.data);
        } catch (error) {
            console.error('Payment error:', error);
            toast.error(getErrorMessage(error, 'Payment initiation failed'));
            setLoading(false);
        }
    };

    return (
        <div className="pool-donation-page">
            <button 
                onClick={() => navigate(-1)}
                className="pool-donation-back-button"
            >
                <ArrowLeft size={20} />
                Back
            </button>

            <div className="pool-donation-card">
                <h1 className="pool-donation-heading">Donate to the Pool</h1>
                <p className="pool-donation-description">
                    This page will allow donors to contribute funds to the general donation pool, where funds can be allocated to various causes as needed.
                </p>

                <form onSubmit={handleDonate} className="pool-donation-form">
                    <div className="pool-donation-field">
                        <label htmlFor="amount" className="pool-donation-label">Donation Amount (LKR)</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            min="1"
                            step="0.01"
                            required
                            className="pool-donation-input"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="pool-donation-submit"
                    >
                        {loading ? 'Processing...' : 'Proceed to Pay'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PoolDonation;
