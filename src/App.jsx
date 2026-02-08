import './App.css'
import { useAuth } from './hooks/useAuth.js'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    return (
      <div className="app-shell">
        <Login auth={auth} />
        <Register />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Dashboard auth={auth} />
    </div>
  )
}

export default App
