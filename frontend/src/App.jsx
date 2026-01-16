import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Features from './pages/Features.jsx'
import Posts from './pages/Posts.jsx'
import Home from './pages/Home.jsx'
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
