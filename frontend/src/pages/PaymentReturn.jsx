import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PaymentReturn.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL;

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Confirming your payment...');
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const orderIdParam = searchParams.get('orderId');
    setOrderId(orderIdParam);

    if (!orderIdParam) {
      setStatus('error');
      setMessage('Payment return did not include an order ID.');
      return;
    }

    const confirmPayment = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/payment/confirm/${orderIdParam}`);
        setStatus('success');
        setMessage(response?.data?.message || 'Your donation has been confirmed successfully. Thank you!');
      } catch (error) {
        console.error('Payment confirmation failed:', error);
        setStatus('error');
        setMessage('Unable to confirm the payment. Please try again later.');
        toast.error('Payment confirmation failed.');
      }
    };

    confirmPayment();
  }, [searchParams]);

  return (
    <div className="payment-return-page">
      <div className="payment-return-card">
        <h1 className="payment-return-card__title">
          {status === 'success' ? 'Donation Confirmed' : status === 'error' ? 'Payment Could Not Be Confirmed' : 'Processing Payment'}
        </h1>
        <p className="payment-return-card__text">
          {message}
        </p>

        {orderId && (
          <p className="payment-return-card__order-id">
            Order ID: <strong>{orderId}</strong>
          </p>
        )}

        <div className="payment-return-actions">
          <Link
            to="/"
            className="payment-return-button payment-return-button--primary"
          >
            Back to Home
          </Link>
          <Link
            to="/pool-donation"
            className="payment-return-button payment-return-button--secondary"
          >
            Donate Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;
