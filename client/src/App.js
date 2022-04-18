import './style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { ItemProvider } from './context/ItemsContext'

import Navigation from './pages/Navigation'
import Notification from './components/Notification'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Statistics from './pages/Statistics'
import { PrivateRoute, PublicRoute } from './util/Routes'

const App = () => {
  return (
    <div className="container">
      <AuthProvider>
        <ItemProvider>
          <NotificationProvider>
            <Router>
              <Navigation />
              <Notification />
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
          </NotificationProvider>
        </ItemProvider>
      </AuthProvider>
    </div>
  )
}

export default App
