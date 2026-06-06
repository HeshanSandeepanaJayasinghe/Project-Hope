import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './DonationManagement.css';

const Transactions = () => {
  const { authAxios } = useContext(AuthContext);
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await authAxios.get('/finance-manager/transactions');
        setIncoming(res.data.incoming || []);
        setOutgoing(res.data.outgoing || []);
      } catch (err) {
        console.error('Failed to load transactions', err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [authAxios]);

  return (
    <div className="finance-manager-wrapper">
      <div className="finance-manager-layout">
        <div className="finance-manager-content">
          <main className="finance-manager-main">
            <h1 style={{ color: '#15803d', marginBottom: '1rem' }}>Transactions</h1>

            {loading ? (
              <p>Loading transactions...</p>
            ) : (
              <>
                <section style={{ marginBottom: '2rem' }}>
                  <h2>Incoming (from donors)</h2>
                  {incoming.length === 0 ? (
                    <p className="empty-state">No incoming transactions found.</p>
                  ) : (
                    <table className="transactions-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Donor ID</th>
                          <th>Post ID</th>
                          <th>Recipient ID</th>
                          <th>Date / Time</th>
                          <th>Amount (LKR)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incoming.map(tx => (
                          <tr key={tx.orderId}>
                            <td>{tx.orderId}</td>
                            <td>{tx.actorId}</td>
                            <td>{tx.postId}</td>
                            <td>{tx.recipientId}</td>
                            <td>{tx.transactionTime ? new Date(tx.transactionTime).toLocaleString() : ''}</td>
                            <td>{tx.amount}</td>
                            <td>{tx.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </section>

                <section>
                  <h2>Outgoing (to recipients)</h2>
                  {outgoing.length === 0 ? (
                    <p className="empty-state">No outgoing transactions found.</p>
                  ) : (
                    <table className="transactions-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Finance Manager ID</th>
                          <th>Post ID</th>
                          <th>Recipient ID</th>
                          <th>Date / Time</th>
                          <th>Amount (LKR)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outgoing.map(tx => (
                          <tr key={tx.orderId}>
                            <td>{tx.orderId}</td>
                            <td>{tx.actorId}</td>
                            <td>{tx.postId}</td>
                            <td>{tx.recipientId}</td>
                            <td>{tx.transactionTime ? new Date(tx.transactionTime).toLocaleString() : ''}</td>
                            <td>{tx.amount}</td>
                            <td>{tx.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
