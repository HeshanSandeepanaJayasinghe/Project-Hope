import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:8080';

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
    <div style={{ minHeight: '100vh', padding: '3rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f3f4f6' }}>
      <div style={{ width: '100%', maxWidth: '640px', background: '#ffffff', borderRadius: '1rem', padding: '2.5rem', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)' }}>
        <h1 style={{ color: '#15803d', marginBottom: '1rem' }}>
          {status === 'success' ? 'Donation Confirmed' : status === 'error' ? 'Payment Could Not Be Confirmed' : 'Processing Payment'}
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          {message}
        </p>

        {orderId && (
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Order ID: <strong>{orderId}</strong>
          </p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Link
            to="/"
            style={{
              padding: '0.9rem 1.25rem',
              background: '#16a34a',
              color: 'white',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Back to Home
          </Link>
          <Link
            to="/pool-donation"
            style={{
              padding: '0.9rem 1.25rem',
              background: '#f3f4f6',
              color: '#111827',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Donate Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;
