import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { submitPayHereForm } from '../utils/payhere';
import { getErrorMessage } from '../utils/apiError';
import './PostDonation.css';

const PostDonation = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const { authAxios } = useContext(AuthContext);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDonate = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }
        
        if (!postId) {
            toast.error("Invalid Post ID");
            return;
        }

        setLoading(true);
        try {
            const response = await authAxios.post('/api/payment/pay', {
                type: 'POST',
                postId: postId,
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
        <div className="post-donation-page">
            <button 
                onClick={() => navigate(-1)}
                className="post-donation-back-button"
            >
                <ArrowLeft size={20} />
                Back
            </button>

            <div className="post-donation-card">
                <h1 className="post-donation-heading">Donate to This Post</h1>
                <p className="post-donation-description">
                    This page will allow donors to contribute funds directly to this specific cause.
                </p>
                
                <form onSubmit={handleDonate} className="post-donation-form">
                    <div className="post-donation-field">
                        <label htmlFor="amount" className="post-donation-label">Donation Amount (LKR)</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            min="1"
                            step="0.01"
                            required
                            className="post-donation-input"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="post-donation-submit"
                    >
                        {loading ? 'Processing...' : 'Proceed to Pay'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostDonation;
