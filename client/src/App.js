import './styles/App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import Navigation from './pages/Navigation'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import AllRecords from './pages/AllRecords'
import Statistics from './pages/Statistics'
import Options from './pages/Options'
import { PrivateRoute, PublicRoute } from './util/Routes'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NotificationProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/allrecords" element={<AllRecords />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/options" element={<Options />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </NotificationProvider>
      </Router>
    </AuthProvider>
  )
}

export default App
