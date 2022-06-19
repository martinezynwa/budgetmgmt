import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { PrivateRoute, PublicRoute } from './util/Routes'
import Login from './pages/Login'
import Navigation from './pages/Navigation'
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import AllRecords from './pages/AllRecords'
import Options from './pages/Options'
import ImportExport from './pages/ImportExport'
import Notification from './components/Notification/Notification'
import './styles/App.css'
import './styles/components/Cards.css'
import './styles/components/ItemForm.css'
import './styles/components/Notification.css'
import './styles/components/Popup.css'
import './styles/components/SelectButton.css'
import './styles/components/Toggle.css'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NotificationProvider>
          <Navigation />
          <div className="app">
            <Notification />
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/allrecords" element={<AllRecords />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/options" element={<Options />} />
                <Route path="/data" element={<ImportExport />} />
              </Route>
              <Route path="/" element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </div>
        </NotificationProvider>
      </Router>
    </AuthProvider>
  )
}

export default App
