import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'fintech-auth'

const readStoredAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => readStoredAuth())

  const login = ({ userId, token }) => {
    const next = { userId, token }
    setAuth(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const logout = () => {
    setAuth(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      userId: auth?.userId || null,
      token: auth?.token || null,
      isAuthenticated: Boolean(auth?.token),
      login,
      logout,
    }),
    [auth]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}
