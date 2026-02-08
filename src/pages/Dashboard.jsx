import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../api/client'

function Dashboard({ auth }) {
  const { token, accountId, logout } = auth
  const navigate = useNavigate()

  const [balance, setBalance] = useState(null)
  const [error, setError] = useState(null)
  const [fundAmount, setFundAmount] = useState('')
  const [fundError, setFundError] = useState(null)
  const [toAccountId, setToAccountId] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentError, setPaymentError] = useState(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [transactions, setTransactions] = useState([])

  function handleUnauthorized(err) {
    if (err?.status === 401 || err?.error === 'UNAUTHORIZED') {
      logout()
      navigate('/login')
      return true
    }

    return false
  }

  async function loadBalance() {
    try {
      const response = await apiClient.getBalance(accountId, token)
      setBalance(response.balance)
    } catch (err) {
      if (handleUnauthorized(err)) {
        return
      }

      setError('Failed to load balance')
    }
  }

  async function loadTransactions() {
    try {
      const response = await apiClient.getTransactions(accountId, token)
      setTransactions(response)
    } catch (err) {
      if (handleUnauthorized(err)) {
        return
      }

      console.error(err)
    }
  }

  useEffect(() => {
    loadBalance()
    loadTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleFund(e) {
    e.preventDefault()
    setFundError(null)

    const trimmedAmount = fundAmount.trim()
    const numericAmount = Number(trimmedAmount)
    if (trimmedAmount === '' || !Number.isFinite(numericAmount)) {
      setFundError('Enter a valid numeric amount')
      return
    }

    try {
      await apiClient.fundAccount(accountId, numericAmount, token)
      setFundAmount('')
      loadBalance()
    } catch (err) {
      if (handleUnauthorized(err)) {
        return
      }

      setFundError(err?.error || err?.message || 'Fund failed')
    }
  }

  async function handlePayment(e) {
    e.preventDefault()
    setPaymentError(null)
    setPaymentSuccess(false)

    try {
      await apiClient.makePayment(
        {
          fromAccountId: accountId,
          toAccountId,
          amount: paymentAmount,
        },
        token
      )

      setToAccountId('')
      setPaymentAmount('')
      setPaymentSuccess(true)

      loadBalance()
      loadTransactions()
    } catch (err) {
      if (handleUnauthorized(err)) {
        return
      }

      setPaymentError(err?.errorCode || err?.error || err?.message || 'Payment failed')
    }
  }

  async function handleLogout() {
    try {
      await apiClient.logout(token)
    } catch (err) {
      console.error('Logout request failed', err)
    } finally {
      logout()
      navigate('/login')
    }
  }

  return (
    <div className="page">
      <div className="header">
        <div>
          <h2>Dashboard</h2>
          <p className="subtitle">
            Account ID: <span className="muted">{accountId}</span>
          </p>
        </div>

        <button
          className="secondary"
          data-testid="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="stack">
        {error && (
          <div className="alert error" data-testid="dashboard-error">
            {error}
          </div>
        )}

        <div className="grid-2">
          <div className="card" data-testid="balance-section">
            <h3>Balance</h3>
            {balance === null ? (
              <span className="muted">Loading...</span>
            ) : (
              <span data-testid="balance-value">{balance}</span>
            )}
          </div>

          <div className="card">
            <form onSubmit={handleFund}>
              <h3>Fund Account</h3>

              <input
                data-testid="fund-amount"
                type="number"
                step="any"
                placeholder="Amount"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
              />

              <button className="primary" data-testid="fund-submit">
                Fund
              </button>

              {fundError && (
                <div className="alert error" data-testid="fund-error">
                  {fundError}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="card">
          <form onSubmit={handlePayment}>
            <h3>Make Payment</h3>

            <input
              data-testid="payment-to-account"
              placeholder="Recipient Account ID"
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
            />

            <input
              data-testid="payment-amount"
              placeholder="Amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />

            <button className="primary" data-testid="payment-submit">
              Send
            </button>

            {paymentError && (
              <div className="alert error" data-testid="payment-error">
                {paymentError}
              </div>
            )}

            {paymentSuccess && (
              <div className="alert success" data-testid="payment-success">
                Payment successful
              </div>
            )}
          </form>
        </div>

        <div className="card" data-testid="transactions-section">
          <h3>Transactions</h3>

          {transactions.length === 0 ? (
            <div className="muted">No transactions</div>
          ) : (
            <ul className="tx-list">
              {transactions.map((tx) => {
                const type = tx.fromAccountId === accountId ? 'Debit' : 'Credit'
                return (
                  <li
                    key={tx.transactionId}
                    className="tx-item"
                    data-testid="transaction-item"
                  >
                    <div className="tx-left">
                      <span className="tx-type">{type}</span>
                      <span className="tx-meta">
                        Tx: {tx.transactionId}
                      </span>
                    </div>
                    <div>{tx.amount}</div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
