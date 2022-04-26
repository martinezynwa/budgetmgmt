import './styles/App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import Navigation from './pages/Navigation'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Statistics from './pages/Statistics'
import { PrivateRoute, PublicRoute } from './util/Routes'

const App = () => {
  return (
    <div className="container">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/statistics" element={<Statistics />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
