import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../api/client'

function Login({ auth }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    try {
      const response = await apiClient.login({ username, password })
      auth.login({ token: response.token, accountId: response.userId })
      navigate('/dashboard')
    } catch (err) {
      setError(err?.error || err?.message || 'Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        data-testid="login-username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        data-testid="login-password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button data-testid="login-submit">Login</button>

      {error && <div data-testid="login-error">{error}</div>}

      <button
        type="button"
        data-testid="go-to-register"
        onClick={() => navigate('/register')}
      >
        Create account
      </button>
    </form>
  )
}

export default Login
