import React, { useEffect, useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './DonationManagement.css';

const DonationManagement = () => {
    const { authAxios } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [poolBalance, setPoolBalance] = useState(0);
    const [readyPosts, setReadyPosts] = useState([]);
    const [pendingPosts, setPendingPosts] = useState([]);
    const [pendingAmounts, setPendingAmounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState({});

    useEffect(() => {
        fetchFinanceManagerPosts();
    }, [authAxios]);

    const fetchFinanceManagerPosts = async () => {
        setLoading(true);
        try {
            const response = await authAxios.get('/finance-manager/posts');
            setPoolBalance(response.data.poolBalance || 0);
            setReadyPosts(response.data.readyToRelease || []);
            setPendingPosts(response.data.pendingPosts || []);
        } catch (error) {
            console.error('Unable to load finance manager posts', error);
            toast.error('Unable to load finance manager data.');
        } finally {
            setLoading(false);
        }
    };

    const handleRelease = async (postId) => {
        setProcessing((state) => ({ ...state, [postId]: true }));
        try {
            const response = await authAxios.post(`/finance-manager/posts/${postId}/release`);
            toast.success(response.data.message || 'Funds released successfully');
            await fetchFinanceManagerPosts();
        } catch (error) {
            console.error('Release failed', error);
            toast.error(error.response?.data?.message || 'Failed to release funds');
        } finally {
            setProcessing((state) => ({ ...state, [postId]: false }));
        }
    };

    const handleAllocate = async (postId) => {
        const amountValue = parseFloat(pendingAmounts[postId]);
        if (!amountValue || amountValue <= 0) {
            toast.error('Enter a valid allocation amount');
            return;
        }

        setProcessing((state) => ({ ...state, [postId]: true }));
        try {
            const response = await authAxios.patch(`/finance-manager/posts/${postId}/allocate`, {
                amount: amountValue,
            });
            toast.success(response.data.message || 'Allocation successful');
            await fetchFinanceManagerPosts();
            setPendingAmounts((state) => ({ ...state, [postId]: '' }));
        } catch (error) {
            console.error('Allocation failed', error);
            toast.error(error.response?.data?.message || 'Failed to allocate pool funds');
        } finally {
            setProcessing((state) => ({ ...state, [postId]: false }));
        }
    };

    const updateAmount = (postId, value) => {
        setPendingAmounts((state) => ({ ...state, [postId]: value }));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'LKR',
            maximumFractionDigits: 2,
        }).format(value);
    };

    return (
        <div className="financier-page">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="financier-content">
                <div className="financier-header">
                    <h1>Donation Management</h1>
                    <div className="pool-balance-card">
                        <span>Available pool balance</span>
                        <strong>{formatCurrency(poolBalance)}</strong>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-state">Loading finance manager data...</div>
                ) : (
                    <>
                        <section className="section-card">
                            <h2>Ready to release</h2>
                            {readyPosts.length === 0 ? (
                                <p className="empty-state">No fully funded posts are waiting for release.</p>
                            ) : (
                                <div className="posts-grid-finance">
                                    {readyPosts.map((post) => (
                                        <div key={post.postId} className="finance-post-card">
                                            <img src={post.imageUrl || 'https://via.placeholder.com/320x220'} alt={post.title} />
                                            <div className="post-details">
                                                <h3>{post.title}</h3>
                                                <p>{post.description}</p>
                                                <p><strong>Recipient:</strong> {post.recipientName}</p>
                                                <p><strong>Recipient account:</strong> {post.recipientAccountNo || 'Not provided'}</p>
                                                <p><strong>Amount ready:</strong> {formatCurrency(post.totalAmount)}</p>
                                                <button
                                                    className="primary-button"
                                                    onClick={() => handleRelease(post.postId)}
                                                    disabled={processing[post.postId]}
                                                >
                                                    {processing[post.postId] ? 'Releasing...' : 'Release funds'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="section-card">
                            <h2>Pending posts</h2>
                            {pendingPosts.length === 0 ? (
                                <p className="empty-state">No pending posts are available for allocation.</p>
                            ) : (
                                <div className="posts-grid-finance">
                                    {pendingPosts.map((post) => (
                                        <div key={post.postId} className="finance-post-card">
                                            <img src={post.imageUrl || 'https://via.placeholder.com/320x220'} alt={post.title} />
                                            <div className="post-details">
                                                <h3>{post.title}</h3>
                                                <p>{post.description}</p>
                                                <p><strong>Urgency:</strong> {post.postUrgency}</p>
                                                <p><strong>Remaining:</strong> {formatCurrency(post.remainingAmount)}</p>
                                                <p><strong>Goal:</strong> {formatCurrency(post.totalAmount)}</p>
                                                <p><strong>Recipient account:</strong> {post.recipientAccountNo || 'Not provided'}</p>

                                                <div className="allocation-row">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        placeholder="Allocation amount"
                                                        value={pendingAmounts[post.postId] || ''}
                                                        onChange={(e) => updateAmount(post.postId, e.target.value)}
                                                    />
                                                    <button
                                                        className="secondary-button"
                                                        onClick={() => handleAllocate(post.postId)}
                                                        disabled={processing[post.postId]}
                                                    >
                                                        {processing[post.postId] ? 'Allocating...' : 'Allocate from pool'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default DonationManagement;
