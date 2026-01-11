import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login.jsx'
import Footer from './components/Footer.jsx'
<<<<<<< HEAD
import Header from './components/Header.jsx'
import Features from './pages/Features.jsx'
import Posts from './pages/Posts.jsx'
import { AuthProvider } from './context/AuthContext'

function App() {
=======
import { AuthProvider } from './context/AuthContext'

function App() {



>>>>>>> 56f7f35ea12115cb9135477ccbd079b56f6006cd
  return (
    <>
      <AuthProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
<<<<<<< HEAD
            <Header />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/features" element={<Features />} />
                <Route path="/posts" element={<Posts />} />
=======
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
>>>>>>> 56f7f35ea12115cb9135477ccbd079b56f6006cd
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
