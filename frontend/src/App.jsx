import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './context/ProtectedRoute.jsx';

import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Features from './pages/Features.jsx'
import Posts from './pages/Posts.jsx'
import PostView from './pages/PostView.jsx'
import PostDonation from './pages/PostDonation.jsx'
import PoolDonation from './pages/PoolDonation.jsx'
import PaymentReturn from './pages/PaymentReturn.jsx'
import Home from './pages/Home.jsx'
import Aboutus from './pages/Aboutus.jsx'
import Statistics from './pages/Statistics.jsx';
import NotFound from './pages/404NotFound.jsx'
import Transactions from './pages/Transactions.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

import RecipientDashboard from './pages/recipient/RecipientDashboard.jsx'
import RecipientMyPosts from './pages/recipient/RecipientMyPosts.jsx'
import RecipientNewPost from './pages/recipient/RecipientNewPost.jsx'
import VerificationForm from './pages/recipient/VerificationForm.jsx';

import DonorDashboard from './pages/donor/DonorDashboard.jsx';
import DonorWishlist from './pages/donor/DonorWishlist.jsx';
import MyDonations from './pages/donor/MyDonations.jsx';
import DonorPostDetail from './pages/donor/DonorPostDetail.jsx';

import VerifierDashboard from './pages/verifier/VerifierDashboard.jsx';
import VerificationRequests from './pages/verifier/VerificationRequests.jsx';
import VerificationRequestView from './pages/verifier/VerificationRequestView.jsx';
import VerificationHistory from './pages/verifier/VerificationHistory.jsx';

import FinancierDashboard from './pages/financier/FinancierDashboard.jsx';
import DonationManagement from './pages/financier/DonationManagement.jsx';

import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminUserManagement from './pages/admin/UserManagement.jsx'
import AdminStaffManagement from './pages/admin/StaffManagement.jsx'
import NewVerifier from './pages/admin/NewVerifier.jsx';
import NewFinancier from './pages/admin/NewFinancier.jsx';
import VerificationHistoryAdmin from './pages/admin/VerificationHistory.jsx';

import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard.jsx'
import SuperAdminManageAdmins from './pages/superadmin/AdminManagement.jsx'
import SuperAdminNewAdmin from './pages/superadmin/NewAdmin.jsx'

function App() {
  return (
    <>
      <ToastContainer />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/features" element={<Features />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post-view/:postId" element={<PostView />} />
            <Route path="/post-donation/:postId" element={<PostDonation />} />
            <Route path="/pool-donation" element={<PoolDonation />} />
            <Route path="/payment-return" element={<PaymentReturn />} />
            <Route path="/aboutus" element={<Aboutus />} />

            <Route path="/recipient-dashboard" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><RecipientDashboard /></ProtectedRoute>} />
            <Route path="/recipient/my-posts" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><RecipientMyPosts /></ProtectedRoute>} />
            <Route path="/recipient/new-post" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><RecipientNewPost /></ProtectedRoute>} />
            <Route path="/recipient/view-profile" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><ProfilePage role="RECIPIENT" /></ProtectedRoute>} />
            <Route path="/recipient/verification" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><VerificationForm /></ProtectedRoute>} />

            <Route path="/donor-dashboard" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorDashboard /></ProtectedRoute>} />
            <Route path="/donor/view-profile" element={<ProtectedRoute allowedRoles={['DONOR']}><ProfilePage role="DONOR" /></ProtectedRoute>} />
            <Route path="/donor/wishlist" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorWishlist /></ProtectedRoute>} />
            <Route path="/donor/post/:postId" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorPostDetail /></ProtectedRoute>} />
            <Route path="/donor/donation-history" element={<ProtectedRoute allowedRoles={['DONOR']}><MyDonations /></ProtectedRoute>} />

            <Route path="/verifier-dashboard" element={<ProtectedRoute allowedRoles={['VERIFIER']}><VerifierDashboard /></ProtectedRoute>} />
            <Route path="/verifier/view-profile" element={<ProtectedRoute allowedRoles={['VERIFIER']}><ProfilePage role="VERIFIER" /></ProtectedRoute>} />
            <Route path="/verifier/verification-requests" element={<ProtectedRoute allowedRoles={['VERIFIER']}><VerificationRequests /></ProtectedRoute>} />
            <Route path="/verifier/verification-history" element={<ProtectedRoute allowedRoles={['VERIFIER']}><VerificationHistory /></ProtectedRoute>} />
            <Route path="/verifier/verification-view" element={<ProtectedRoute allowedRoles={['VERIFIER']}><VerificationRequestView /></ProtectedRoute>} />

            <Route path="/financier-dashboard" element={<ProtectedRoute allowedRoles={['FINANCE_MANAGER']}><FinancierDashboard /></ProtectedRoute>} />
            <Route path="/financier/view-profile" element={<ProtectedRoute allowedRoles={['FINANCE_MANAGER']}><ProfilePage role="FINANCE_MANAGER" /></ProtectedRoute>} />
            <Route path="/financier/donation-management" element={<ProtectedRoute allowedRoles={['FINANCE_MANAGER']}><DonationManagement /></ProtectedRoute>} />
            <Route path="/financier/transactions" element={<ProtectedRoute allowedRoles={['FINANCE_MANAGER']}><Transactions /></ProtectedRoute>} />

            <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/user-management" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminUserManagement /></ProtectedRoute>} />
            <Route path="/admin/staff-management" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminStaffManagement /></ProtectedRoute>} />
            <Route path="/admin/new-verifier" element={<ProtectedRoute allowedRoles={['ADMIN']}><NewVerifier /></ProtectedRoute>} />
            <Route path="/admin/new-financier" element={<ProtectedRoute allowedRoles={['ADMIN']}><NewFinancier /></ProtectedRoute>} />
            <Route path="/admin/view-profile" element={<ProtectedRoute allowedRoles={['ADMIN']}><ProfilePage role="ADMIN" /></ProtectedRoute>} />
            <Route path="/admin/statistics" element={<ProtectedRoute allowedRoles={['ADMIN']}><Statistics /></ProtectedRoute>} />
            <Route path="/admin/transactions" element={<ProtectedRoute allowedRoles={['ADMIN']}><Transactions /></ProtectedRoute>} />
            <Route path="/admin/verification-history" element={<ProtectedRoute allowedRoles={['ADMIN']}><VerificationHistoryAdmin /></ProtectedRoute>} />


            <Route path="/superadmin-dashboard" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><SuperAdminDashboard /></ProtectedRoute>} />
            <Route path="/superadmin/user-management" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><SuperAdminManageAdmins /></ProtectedRoute>} />
            <Route path="/superadmin/new-admin" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><SuperAdminNewAdmin /></ProtectedRoute>} />
            <Route path="/superadmin/verification-history" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><VerificationHistoryAdmin /></ProtectedRoute>} />
            <Route path="/superadmin/donation-activity" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><Transactions /></ProtectedRoute>} />
            <Route path="/superadmin/statistics" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><Statistics /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
