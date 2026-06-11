import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './DonationManagement.css';

const Transactions = () => {
  const { authAxios } = useContext(AuthContext);
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [selectedView, setSelectedView] = useState('incoming');
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

  const transactions = selectedView === 'incoming' ? incoming : outgoing;
  const isIncoming = selectedView === 'incoming';

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
                <div className="transactions-toolbar">
                  <div className="transactions-tabs">
                    <button
                      type="button"
                      className={`transactions-tab ${selectedView === 'incoming' ? 'active' : ''}`}
                      onClick={() => setSelectedView('incoming')}
                    >
                      Incoming
                    </button>
                    <button
                      type="button"
                      className={`transactions-tab ${selectedView === 'outgoing' ? 'active' : ''}`}
                      onClick={() => setSelectedView('outgoing')}
                    >
                      Outgoing
                    </button>
                  </div>
                  <div className="transactions-summary">
                    Showing {transactions.length} {selectedView} transaction{transactions.length === 1 ? '' : 's'}
                  </div>
                </div>

                <section className="transaction-sheet-card">
                  {transactions.length === 0 ? (
                    <p className="empty-state">No {selectedView} transactions found.</p>
                  ) : (
                    <div className="table-scroll">
                      <table className="transactions-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>{isIncoming ? 'Donor ID' : 'Finance Manager ID'}</th>
                            <th>Post ID</th>
                            <th>Recipient ID</th>
                            <th>Date / Time</th>
                            <th>Amount (LKR)</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map(tx => (
                            <tr key={tx.orderId}>
                              <td>{tx.orderId}</td>
                              <td>{tx.actorId}</td>
                              <td>{tx.postId || '—'}</td>
                              <td>{tx.recipientId || '—'}</td>
                              <td>{tx.transactionTime ? new Date(tx.transactionTime).toLocaleString() : '—'}</td>
                              <td>{tx.amount}</td>
                              <td>{tx.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
