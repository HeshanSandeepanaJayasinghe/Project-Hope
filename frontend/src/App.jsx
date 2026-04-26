import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import PostDonation from './pages/PoolDonation.jsx'
import PoolDonation from './pages/PoolDonation.jsx'
import Home from './pages/Home.jsx'
import Aboutus from './pages/Aboutus.jsx'

import RecipientDashboard from './pages/recipient/RecipientDashboard.jsx'
import RecipientMyPosts from './pages/recipient/RecipientMyPosts.jsx'
import RecipientNewPost from './pages/recipient/RecipientNewPost.jsx'
import RecipientViewProfile from './pages/recipient/RecipientViewProfile.jsx'
import VerificationForm from './pages/recipient/VerificationForm.jsx';

import DonorDashboard from './pages/donor/DonorDashboard.jsx';
import DonorViewProfile from './pages/donor/DonorViewProfile.jsx';
import DonorWishlist from './pages/donor/DonorWishlist.jsx';
import MyDonations from './pages/donor/MyDonations.jsx';

import VerifierDashboard from './pages/verifier/VerifierDashboard.jsx';
import VerifierViewProfile from './pages/verifier/VerifierViewProfile.jsx';
import VerificationRequests from './pages/verifier/VerificationRequests.jsx';
import VerificationRequestView from './pages/verifier/VerificationRequestView.jsx';
import VerificationHistory from './pages/verifier/VerificationHistory.jsx';

import FinancierDashboard from './pages/financier/FinancierDashboard.jsx';
import FinancierViewProfile from './pages/financier/FinancierViewProfile.jsx';

import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminUserManagement from './pages/admin/UserManagement.jsx'
import AdminViewProfile from './pages/admin/AdminViewProfile.jsx'
import NewVerifier from './pages/admin/NewVerifier.jsx';
import NewFinancier from './pages/admin/NewFinancier.jsx';

import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard.jsx'
import SuperAdminManageAdmins from './pages/superadmin/AdminManagement.jsx'
import SuperAdminNewAdmin from './pages/superadmin/NewAdmin.jsx'

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
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
              <Route path="/post-donation" element={<PostDonation />} />
              <Route path="/pool-donation" element={<PoolDonation />} />
              <Route path="/aboutus" element={<Aboutus />} />

              <Route path="/recipient-dashboard" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><RecipientDashboard /></ProtectedRoute>} />
              <Route path="/recipient/my-posts" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><RecipientMyPosts /></ProtectedRoute>} />
              <Route path="/recipient/new-post" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><RecipientNewPost /></ProtectedRoute>} />
              <Route path="/recipient/view-profile" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><RecipientViewProfile /></ProtectedRoute>} />
              <Route path="/recipient/verification" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><VerificationForm /></ProtectedRoute>} />

              <Route path="/donor-dashboard" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorDashboard /></ProtectedRoute>} />
              <Route path="/donor/view-profile" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorViewProfile /></ProtectedRoute>} />
              <Route path="/donor/wishlist" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorWishlist /></ProtectedRoute>} />
              <Route path="/donor/donation-history" element={<ProtectedRoute allowedRoles={['DONOR']}><MyDonations /></ProtectedRoute>} />

              <Route path="/verifier-dashboard" element={<ProtectedRoute allowedRoles={['VERIFIER']}><VerifierDashboard /></ProtectedRoute>} />
              <Route path="/verifier/view-profile" element={<ProtectedRoute allowedRoles={['VERIFIER']}><VerifierViewProfile /></ProtectedRoute>} />
              <Route path="/verifier/verification-requests" element={<ProtectedRoute allowedRoles={['VERIFIER']}><VerificationRequests /></ProtectedRoute>} />
              <Route path="/verifier/verification-history" element={<ProtectedRoute allowedRoles={['VERIFIER']}><VerificationHistory /></ProtectedRoute>} />
              <Route path="/verifier/verification-view" element={<ProtectedRoute allowedRoles={['VERIFIER']}><VerificationRequestView /></ProtectedRoute>} />

              <Route path="/financier-dashboard" element={<ProtectedRoute allowedRoles={['FINANCE_MANAGER']}><FinancierDashboard /></ProtectedRoute>} />
              <Route path="/financier/view-profile" element={<ProtectedRoute allowedRoles={['FINANCE_MANAGER']}><FinancierViewProfile /></ProtectedRoute>} />

              <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/user-management" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminUserManagement /></ProtectedRoute>} />
              <Route path="/admin/new-verifier" element={<ProtectedRoute allowedRoles={['ADMIN']}><NewVerifier /></ProtectedRoute>} />
              <Route path="/admin/new-financier" element={<ProtectedRoute allowedRoles={['ADMIN']}><NewFinancier /></ProtectedRoute>} />
              <Route path="/admin/view-profile" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminViewProfile /></ProtectedRoute>} />

              <Route path="/superadmin-dashboard" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/superadmin/user-management" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><SuperAdminManageAdmins /></ProtectedRoute>} />
              <Route path="/superadmin/new-admin" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><SuperAdminNewAdmin /></ProtectedRoute>} />

            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
