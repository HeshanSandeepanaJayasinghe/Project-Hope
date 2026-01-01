import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Features from './pages/Features.jsx'
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
                <Route path="/login" element={<Login />} />
                <Route path="/features" element={<Features />} />
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
