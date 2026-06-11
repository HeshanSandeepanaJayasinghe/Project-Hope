import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './UserManagement.css';

function UserManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { authAxios } = useContext(AuthContext);
    const [recipients, setRecipients] = useState([]);
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('recipients');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const [recipientsRes, donorsRes] = await Promise.all([
                authAxios.get('/all/recipients/'),
                authAxios.get('/all/donors/')
            ]);
            setRecipients(recipientsRes.data || []);
            setDonors(donorsRes.data || []);
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to load user management data');
        } finally {
            setLoading(false);
        }
    };

    const RecipientTable = () => (
        <div className="table-container">
            {recipients.length === 0 ? (
                <div className="empty-state">
                    <p>No recipients found</p>
                </div>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Recipient ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>NIC</th>
                            <th>Address</th>
                            <th>Verification Status</th>
                            <th>District</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipients.map((recipient) => (
                            <tr key={recipient.recipientId}>
                                <td>{recipient.recipientId}</td>
                                <td>{recipient.name}</td>
                                <td>{recipient.email}</td>
                                <td>{recipient.phoneNumber}</td>
                                <td>{recipient.nic}</td>
                                <td>{recipient.address}</td>
                                <td>
                                    <span className={`status-badge ${recipient.verificationStatus?.toLowerCase()}`}>
                                        {recipient.verificationStatus || 'Pending'}
                                    </span>
                                </td>
                                <td>{recipient.district}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

    const DonorTable = () => (
        <div className="table-container">
            {donors.length === 0 ? (
                <div className="empty-state">
                    <p>No donors found</p>
                </div>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Donor ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Organization</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>District</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map((donor) => (
                            <tr key={donor.donorId}>
                                <td>{donor.donorId}</td>
                                <td>{donor.name}</td>
                                <td>{donor.email}</td>
                                <td>{donor.phoneNumber}</td>
                                <td>{donor.organization || 'N/A'}</td>
                                <td>{donor.address}</td>
                                <td>
                                    <span className="status-badge active">
                                        Active
                                    </span>
                                </td>
                                <td>{donor.district}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

    return (
        <div className="user-management-wrapper">
            <div className="dashboard-layout">
                <Sidebar
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <div className="user-management-content">
                    <h1>User Management</h1>
                    
                    <div className="tab-container">
                        <div className="tabs">
                            <button
                                className={`tab-btn ${activeTab === 'recipients' ? 'active' : ''}`}
                                onClick={() => setActiveTab('recipients')}
                            >
                                Recipients ({recipients.length})
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'donors' ? 'active' : ''}`}
                                onClick={() => setActiveTab('donors')}
                            >
                                Donors ({donors.length})
                            </button>
                        </div>

                        {loading ? (
                            <div className="loading-state">
                                <p>Loading user data...</p>
                            </div>
                        ) : (
                            <>
                                {activeTab === 'recipients' && <RecipientTable />}
                                {activeTab === 'donors' && <DonorTable />}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;