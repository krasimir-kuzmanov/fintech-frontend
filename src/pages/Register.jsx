import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../api/client.js'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSuccess(false)
    setIsSubmitting(true)

    try {
      await apiClient.register({ username, password })
      setSuccess(true)
    } catch (err) {
      setError(err?.error || err?.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page" data-testid="register-page">
      <div className="card">
        <div className="header">
          <h2>Register</h2>
        </div>

        {error && (
          <div className="alert error" data-testid="register-error">
            {error}
          </div>
        )}

        {success && (
          <div className="alert success" data-testid="register-success">
            Registration successful
          </div>
        )}

        <form onSubmit={handleSubmit} data-testid="register-form">
          <input
            data-testid="register-username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            data-testid="register-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            className="primary"
            data-testid="register-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Register'}
          </button>

          <button
            type="button"
            className="link"
            data-testid="go-to-login"
            onClick={() => navigate('/login')}
          >
            Back to login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
