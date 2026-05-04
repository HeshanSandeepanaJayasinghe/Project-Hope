import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './VerificationRequestView.css';

const VerificationRequestView = () => {
    const location = useLocation();
    const { authAxios } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [recipient, setRecipient] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = location.state?.userId;

    useEffect(() => {
        if (userId) {
            fetchRecipientDetails(userId);
        } else {
            setLoading(false);
        }
    }, [userId]);

    const fetchRecipientDetails = async (id) => {
        try {
            const response = await authAxios.get(`/verifier/get/recipient/${id}`);
            setRecipient(response.data);
        } catch (error) {
            console.error('Error fetching recipient details:', error);
            toast.error('Failed to load recipient details');
            setRecipient(null);
        } finally {
            setLoading(false);
        }
    };

    const openDocument = () => {
        if (recipient?.documentUrl) {
            window.open(recipient.documentUrl, '_blank');
        }
    };

    const renderField = (label, value) => (
        <div className="detail-row" key={label}>
            <span className="detail-label">{label}</span>
            <span className="detail-value">{value ?? 'N/A'}</span>
        </div>
    );

    return (
        <div className="verification-request-view-wrapper">
            <div className="dashboard-layout">
                <Sidebar
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <div className="verification-request-view-content">
                    <h1>Verification Request Details</h1>
                    {!userId ? (
                        <div className="placeholder-content">
                            <h2>No recipient selected</h2>
                            <p>Please select a recipient from the verification requests list to view details.</p>
                        </div>
                    ) : loading ? (
                        <p>Loading recipient details...</p>
                    ) : !recipient ? (
                        <div className="placeholder-content">
                            <h2>Recipient not found</h2>
                            <p>Unable to load recipient details for the selected user.</p>
                        </div>
                    ) : (
                        <div className="recipient-details-card">
                            <div className="details-header">
                                <div>
                                    <h2>{recipient.name || 'Recipient Details'}</h2>
                                    <p>Verification ID: {recipient.verificationId || 'N/A'}</p>
                                </div>
                                <button
                                    type="button"
                                    className="pdf-btn"
                                    onClick={openDocument}
                                    disabled={!recipient.documentUrl}
                                >
                                    {recipient.documentUrl ? 'View PDF' : 'No Document'}
                                </button>
                            </div>
                            <div className="details-grid">
                                {renderField('Email', recipient.email)}
                                {renderField('User ID', recipient.userId)}
                                {renderField('Recipient ID', recipient.recipientId)}
                                {renderField('NIC', recipient.nic)}
                                {renderField('Birthday', recipient.birthday)}
                                {renderField('Address', recipient.address)}
                                {renderField('Postal Code', recipient.postalCode)}
                                {renderField('Phone Number', recipient.phoneNumber)}
                                {renderField('Account No', recipient.accountNo)}
                                {renderField('Verification Status', recipient.verificationStatus)}
                                {renderField('Province', recipient.province)}
                                {renderField('District', recipient.district)}
                                {renderField('Divisional Secretariat', recipient.divisionalSecretarial)}
                                {renderField('GN Division', recipient.gramaNiladhariDivision)}
                                {renderField('Employment Category', recipient.employmentCategory)}
                                {renderField('Occupation', recipient.occupation)}
                                {renderField('Annual Salary', recipient.annualSalary)}
                                {renderField('Asset Status', recipient.assetStatus)}
                                {renderField('Family Members', recipient.numberOfFamilyMembers)}
                                {renderField('Long-term Health Issues', recipient.longTermHealthIssues)}
                                {renderField('Verified By', recipient.verifiedBy)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerificationRequestView;