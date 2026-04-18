import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import './UserManagement.css';

const UserManagement = () => {
  const navigate = useNavigate();
  const { authAxios } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [verifiers, setVerifiers] = useState([]);
  const [financiers, setFinanciers] = useState([]);
  const [loadingVerifiers, setLoadingVerifiers] = useState(true);
  const [loadingFinanciers, setLoadingFinanciers] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin-dashboard' },
    { id: 'user-management', label: 'User Management', href: '/admin/user-management' },
    { id: 'reports', label: 'Reports', href: '/admin/reports' },
  ];

  // Fetch Verifiers
  useEffect(() => {
    const fetchVerifiers = async () => {
      setLoadingVerifiers(true);
      try {
        const response = await authAxios.get('/admin/get/verifiers');
        setVerifiers(response.data || []);
      } catch (error) {
        console.error('Failed to fetch verifiers:', error);
        toast.error('Failed to load verifiers');
        setVerifiers([]);
      } finally {
        setLoadingVerifiers(false);
      }
    };
    fetchVerifiers();
  }, [authAxios]);

  // Fetch Financiers
  useEffect(() => {
    const fetchFinanciers = async () => {
      setLoadingFinanciers(true);
      try {
        const response = await authAxios.get('/admin/get/finance-managers');
        setFinanciers(response.data || []);
      } catch (error) {
        console.error('Failed to fetch financiers:', error);
        toast.error('Failed to load financiers');
        setFinanciers([]);
      } finally {
        setLoadingFinanciers(false);
      }
    };
    fetchFinanciers();
  }, [authAxios]);

  // Delete Verifier
  const handleDeleteVerifier = async (id) => {
    if (window.confirm('Are you sure you want to delete this verifier?')) {
      setDeleting(id);
      try {
        await authAxios.delete(`/admin/delete/verifier/${id}`);
        setVerifiers(verifiers.filter(v => v.id !== id));
        toast.success('Verifier deleted successfully');
      } catch (error) {
        console.error('Failed to delete verifier:', error);
        toast.error('Failed to delete verifier');
      } finally {
        setDeleting(null);
      }
    }
  };

  // Delete Financier
  const handleDeleteFinancier = async (id) => {
    if (window.confirm('Are you sure you want to delete this financier?')) {
      setDeleting(id);
      try {
        await authAxios.delete(`/admin/delete/finance-manager/${id}`);
        setFinanciers(financiers.filter(f => f.id !== id));
        toast.success('Financier deleted successfully');
      } catch (error) {
        console.error('Failed to delete financier:', error);
        toast.error('Failed to delete financier');
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar 
        role="admin"
        items={sidebarItems}
        onItemClick={() => setSidebarOpen(false)}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="user-management-container">
        {/* Verifiers Section */}
        <section className="management-section">
          <div className="section-header">
            <h2>Verifiers</h2>
            <button 
              className="btn-add"
              onClick={() => navigate('/admin/new-verifier')}
            >
              <Plus size={20} />
              Add Verifier
            </button>
          </div>

          {loadingVerifiers ? (
            <div className="loading-state">Loading verifiers...</div>
          ) : verifiers.length === 0 ? (
            <div className="empty-state">No verifiers found</div>
          ) : (
            <div className="users-table">
              <div className="table-header">
                <div className="col-email">Email</div>
                <div className="col-name">Name</div>
                <div className="col-phone">Phone</div>
                <div className="col-action">Action</div>
              </div>
              <div className="table-body">
                {verifiers.map(verifier => (
                  <div key={verifier.id} className="table-row">
                    <div className="col-email">{verifier.email}</div>
                    <div className="col-name">{verifier.firstName} {verifier.lastName}</div>
                    <div className="col-phone">{verifier.phoneNumber}</div>
                    <div className="col-action">
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeleteVerifier(verifier.id)}
                        disabled={deleting === verifier.id}
                        title="Delete verifier"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Financiers Section */}
        <section className="management-section">
          <div className="section-header">
            <h2>Financiers</h2>
            <button 
              className="btn-add"
              onClick={() => navigate('/admin/new-financier')}
            >
              <Plus size={20} />
              Add Financier
            </button>
          </div>

          {loadingFinanciers ? (
            <div className="loading-state">Loading financiers...</div>
          ) : financiers.length === 0 ? (
            <div className="empty-state">No financiers found</div>
          ) : (
            <div className="users-table">
              <div className="table-header">
                <div className="col-email">Email</div>
                <div className="col-name">Name</div>
                <div className="col-phone">Phone</div>
                <div className="col-action">Action</div>
              </div>
              <div className="table-body">
                {financiers.map(financier => (
                  <div key={financier.id} className="table-row">
                    <div className="col-email">{financier.email}</div>
                    <div className="col-name">{financier.firstName} {financier.lastName}</div>
                    <div className="col-phone">{financier.phoneNumber}</div>
                    <div className="col-action">
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeleteFinancier(financier.id)}
                        disabled={deleting === financier.id}
                        title="Delete financier"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserManagement;
