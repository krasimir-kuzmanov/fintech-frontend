import { useState } from 'react'
import { apiClient } from '../api/client.js'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      await apiClient.register({ username, password })
      setIsSubmitting(false)
      setSuccess('Registration successful. You can log in above.')
    } catch (error) {
      setError(error?.error || 'Registration failed')
      setIsSubmitting(false)
      return
    }
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

      {success && (
        <div className="banner banner-success" data-testid="register-success">
          {success}
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
        <span>Already registered? Use the login form above.</span>
      </div>
    </div>
  )
}

export default Register
