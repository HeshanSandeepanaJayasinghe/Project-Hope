import React, { useEffect, useState, useContext } from 'react';
import './Statistics.css';
import Sidebar from '../components/Sidebar.jsx';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Statistics = () => {
  const { authAxios } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalSuperAdmins: 0,
    totalRecipients: 0,
    totalDonors: 0,
    totalVerifiers: 0,
    totalFinanciers: 0,
    totalVerifiedRecipients: 0,
    totalUnverifiedRecipients: 0,
    totalFraudRecipients: 0,
    totalPoolAmount: 0,
    totalDonationsReceived: 0,
    totalDonationAmountReceived: 0,
    totalDonationsMade: 0,
    totalDonationAmountMade: 0,
    totalPosts: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, [authAxios]);

  const setData = (data) => {
    setStatistics({
      totalUsers: data.totalUsers || 0,
      totalAdmins: data.totalAdmins || 0,
      totalSuperAdmins: data.totalSuperAdmins || 0,
      totalRecipients: data.totalRecipients || 0,
      totalDonors: data.totalDonors || 0,
      totalVerifiers: data.totalVerifiers || 0,
      totalFinanciers: data.totalFinanciers || 0,
      totalVerifiedRecipients: data.totalVerifiedRecipients || 0,
      totalUnverifiedRecipients: data.totalUnverifiedRecipients || 0,
      totalFraudRecipients: data.totalFraudRecipients || 0,
      totalPoolAmount: data.totalPoolAmount || 0,
      totalDonationsReceived: data.totalDonationsReceived || 0,
      totalDonationAmountReceived: data.totalDonationAmountReceived || 0,
      totalDonationsMade: data.totalDonationsMade || 0,
      totalDonationAmountMade: data.totalDonationAmountMade || 0,
      totalPosts: data.totalPosts || 0,
    });
  };

  const fetchStatistics = async () => {
    try {
      const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:8080';
      const response = await authAxios.get(`${BACKEND_URL}/statistics`);
      setData(response.data);
    } catch (error) {
      toast.error('Unable to load statistics.');
    }
  };

  return (
  <div className="statistics-layout">
    <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
    <div className="statistics-content">
      <h1 className='title'>Statistics</h1>
      <div className="statistics-grid">
        {Object.entries(statistics).map(([key, value]) => (
          <div key={key} className="stat-card">
            <h3 className="stat-title">
              {key.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, char => char.toUpperCase())}
            </h3>
            <p className="stat-value">{value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Statistics;