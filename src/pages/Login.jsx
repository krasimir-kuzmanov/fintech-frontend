import { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { api } from '../api/client.js'
import { useAuth } from '../hooks/useAuth.js'

const Login = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isRegistered = searchParams.get('registered') === '1'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const result = await api.login({ username, password })

    if (!result.ok) {
      setError(result.error || 'Login failed')
      setIsSubmitting(false)
      return
    }

    login({ userId: result.data.userId, token: result.data.token })
    setIsSubmitting(false)
    navigate('/dashboard')
  }

  return (
    <div className="page" data-testid="login-page">
      <div className="page-header">
        <h1>Login</h1>
        <p>Access your account dashboard.</p>
      </div>

      {isRegistered && (
        <div className="banner banner-success" data-testid="login-registered">
          Registration successful. Please log in.
        </div>
      )}

      {error && (
        <div className="banner banner-error" data-testid="login-error">
          {error}
        </div>
      )}

      <form className="form" onSubmit={handleSubmit} data-testid="login-form">
        <label className="form-field">
          Username
          <input
            data-testid="login-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="form-field">
          Password
          <input
            data-testid="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button
          data-testid="login-submit"
          className="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <div className="page-footer">
        <span>Need an account?</span>
        <Link data-testid="login-register-link" to="/register">
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login
