// Removed unused useState import

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './context/AuthContext'

function App() {
  // Removed unused state


  return (
    <>
      <AuthProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
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
