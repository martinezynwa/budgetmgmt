import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { PrivateRoute, PublicRoute } from './util/Routes'
import Login from './pages/Login'
import Navigation from './pages/Navigation'
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import AllItems from './pages/AllItems'
import Options from './pages/Options'
import ImportExport from './pages/ImportExport'
import Notification from './components/Notification/Notification'
import './style.css'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NotificationProvider>
          <div className='flex flex-col h-full relative'>
            <Navigation />
            <div className="sm:ml-80 my-24 sm:my-0">
              <Notification />
              <Routes>
                <Route path="/" element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/allitems" element={<AllItems />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/options" element={<Options />} />
                  <Route path="/data" element={<ImportExport />} />
                </Route>
                <Route path="/" element={<PublicRoute />}>
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>
            </div>
          </div>
        </NotificationProvider>
      </Router>
    </AuthProvider>
  )
}

export default App
