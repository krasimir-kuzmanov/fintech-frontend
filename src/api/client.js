const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

if (!API_BASE) {
  // Avoid hardcoding base URL; this is a guardrail for local dev.
  // Set VITE_API_BASE_URL in .env or .env.local
  console.warn('VITE_API_BASE_URL is not set')
}

const safeJsonParse = (text) => {
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

const request = async ({ method, path, body, token }) => {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const rawText = await response.text()
  const data = safeJsonParse(rawText)

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: data?.error || response.statusText,
    }
  }

  return { ok: true, status: response.status, data }
}

export const api = {
  register: ({ username, password }) =>
    request({ method: 'POST', path: '/auth/register', body: { username, password } }),
  login: ({ username, password }) =>
    request({ method: 'POST', path: '/auth/login', body: { username, password } }),
  getAccount: ({ accountId, token }) =>
    request({ method: 'GET', path: `/account/${accountId}`, token }),
  fundAccount: ({ accountId, amount, token }) =>
    request({
      method: 'POST',
      path: `/account/${accountId}/fund`,
      body: { amount },
      token,
    }),
  makePayment: ({ fromAccountId, toAccountId, amount, token }) =>
    request({
      method: 'POST',
      path: '/transaction/payment',
      body: { fromAccountId, toAccountId, amount },
      token,
    }),
  getTransactions: ({ accountId, token }) =>
    request({ method: 'GET', path: `/transaction/${accountId}`, token }),
}

export { API_BASE }
