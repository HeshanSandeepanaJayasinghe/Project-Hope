import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Features from './pages/Features.jsx'
import Posts from './pages/Posts.jsx'
import PostView from './pages/PostView.jsx'
import PostDonation from './pages/PostDonation.jsx'
import PoolDonation from './pages/PoolDonation.jsx'
import Home from './pages/Home.jsx'
import RecipientDashboard from './pages/RecipientDashboard.jsx'
import DonorDashboard from './pages/DonorDashboard.jsx'
import { VerifierDashboard, FinancierDashboard, AdminDashboard, SuperAdminDashboard } from './pages/AdminDashboards.jsx'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
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
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
