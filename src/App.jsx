import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  const auth = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={auth.isAuthenticated ? <Navigate to="/dashboard" /> : <Login auth={auth} />}
        />
        <Route
          path="/register"
          element={auth.isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={auth.isAuthenticated ? <Dashboard auth={auth} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
