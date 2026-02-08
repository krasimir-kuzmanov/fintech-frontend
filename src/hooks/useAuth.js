import { useState } from 'react'

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [accountId, setAccountId] = useState(() => localStorage.getItem('accountId'))

  function login(authResponse) {
    setToken(authResponse.token)
    setAccountId(authResponse.accountId)

    localStorage.setItem('token', authResponse.token)
    localStorage.setItem('accountId', authResponse.accountId)
  }

  function logout() {
    setToken(null)
    setAccountId(null)

    localStorage.removeItem('token')
    localStorage.removeItem('accountId')
  }

  return {
    token,
    accountId,
    isAuthenticated: Boolean(token),
    login,
    logout,
  }
}
