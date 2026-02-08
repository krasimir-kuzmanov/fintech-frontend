const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const contentType = response.headers.get('content-type')
  const hasJson = contentType && contentType.includes('application/json')
  const body = hasJson ? await response.json() : null

  if (!response.ok) {
    const error =
      body && typeof body === 'object'
        ? { status: response.status, ...body }
        : { status: response.status, message: body }
    throw error
  }

  return body
}

export const apiClient = {
  register(data) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  login(data) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  logout(token) {
    return request('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  getBalance(accountId, token) {
    return request(`/account/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  fundAccount(accountId, amount, token) {
    return request(`/account/${accountId}/fund`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    })
  },

  makePayment(data, token) {
    return request('/transaction/payment', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  },

  getTransactions(accountId, token) {
    return request(`/transaction/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}
