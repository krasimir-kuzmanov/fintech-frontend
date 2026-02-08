import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api/client.js'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const result = await api.register({ username, password })

    if (!result.ok) {
      setError(result.error || 'Registration failed')
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    navigate('/login?registered=1')
  }

  return (
    <div className="page" data-testid="register-page">
      <div className="page-header">
        <h1>Register</h1>
        <p>Create an account to get started.</p>
      </div>

      {error && (
        <div className="banner banner-error" data-testid="register-error">
          {error}
        </div>
      )}

      <form className="form" onSubmit={handleSubmit} data-testid="register-form">
        <label className="form-field">
          Username
          <input
            data-testid="register-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="form-field">
          Password
          <input
            data-testid="register-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button
          data-testid="register-submit"
          className="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Register'}
        </button>
      </form>

      <div className="page-footer">
        <span>Already registered?</span>
        <Link data-testid="register-login-link" to="/login">
          Login
        </Link>
      </div>
    </div>
  )
}

export default Register
