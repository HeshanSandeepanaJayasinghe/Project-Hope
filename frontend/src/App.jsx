import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import RecipientDashboard from './pages/dashboards/RecipientDashboard.jsx'
import DonorDashboard from './pages/dashboards/DonorDashboard.jsx'
import { VerifierDashboard, FinancierDashboard, AdminDashboard, SuperAdminDashboard } from './pages/dashboards/AdminDashboards.jsx'
import SuperAdminManageAdmins from './pages/dashboards/SuperAdminDashboard.jsx'

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
              <Route path="/recipient-dashboard" element={<RecipientDashboard />} />
              <Route path="/donor-dashboard" element={<DonorDashboard />} />
              <Route path="/verifier-dashboard" element={<VerifierDashboard />} />
              <Route path="/financier-dashboard" element={<FinancierDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
              <Route path="/superadmin/manage-admins" element={<SuperAdminManageAdmins />} />
              <Route path="/aboutus" element={<Aboutus />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
