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
import DonorDashboard from './pages/donor/DonorDashboard.jsx'
import DonorViewProfile from './pages/donor/DonorViewProfile.jsx'
import DonorWishlist from './pages/donor/DonorWishlist.jsx'
import MyDonations from './pages/donor/MyDonations.jsx'
import DonorPostDetail from './pages/donor/DonorPostDetail.jsx'
import { VerifierDashboard, FinancierDashboard, AdminDashboard, SuperAdminDashboard } from './pages/admin/AdminDashboards.jsx'
import SuperAdminManageAdmins from './pages/superadmin/SuperAdminDashboard.jsx'

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

              <Route path="/donor-dashboard" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorDashboard /></ProtectedRoute>} />
              <Route path="/donor/profile" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorViewProfile /></ProtectedRoute>} />
              <Route path="/donor/wishlist" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorWishlist /></ProtectedRoute>} />
              <Route path="/donor/donations" element={<ProtectedRoute allowedRoles={['DONOR']}><MyDonations /></ProtectedRoute>} />
              <Route path="/donor/post/:postId" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorPostDetail /></ProtectedRoute>} />

              <Route path="/verifier-dashboard" element={<ProtectedRoute allowedRoles={['VERIFIER']}><VerifierDashboard /></ProtectedRoute>} />

              <Route path="/financier-dashboard" element={<ProtectedRoute allowedRoles={['FINANCIER']}><FinancierDashboard /></ProtectedRoute>} />

              <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />

              <Route path="/superadmin-dashboard" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/superadmin/manage-admins" element={<ProtectedRoute allowedRoles={['SUPERADMIN']}><SuperAdminManageAdmins /></ProtectedRoute>} />
              
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
