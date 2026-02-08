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
  const [transactions, setTransactions] = useState([])

  async function loadBalance() {
    try {
      const response = await apiClient.getBalance(accountId, token)
      setBalance(response.balance)
    } catch {
      setError('Failed to load balance')
    }
  }

  async function loadTransactions() {
    try {
      const response = await apiClient.getTransactions(accountId, token)
      setTransactions(response)
    } catch (err) {
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

    try {
      await apiClient.fundAccount(accountId, fundAmount, token)
      setFundAmount('')
      loadBalance()
    } catch (err) {
      setFundError(err?.error || err?.message || 'Fund failed')
    }
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <button data-testid="logout-button" onClick={handleLogout}>
        Logout
      </button>

      {error && <div data-testid="dashboard-error">{error}</div>}

      <div data-testid="balance-section">
        <h3>Balance</h3>
        {balance === null ? (
          <span>Loading...</span>
        ) : (
          <span data-testid="balance-value">{balance}</span>
        )}
      </div>

      <form onSubmit={handleFund}>
        <h3>Fund Account</h3>

        <input
          data-testid="fund-amount"
          placeholder="Amount"
          value={fundAmount}
          onChange={(e) => setFundAmount(e.target.value)}
        />

        <button data-testid="fund-submit">Fund</button>

        {fundError && <div data-testid="fund-error">{fundError}</div>}
      </form>

      <div data-testid="transactions-section">
        <h3>Transactions</h3>

        {transactions.length === 0 ? (
          <div>No transactions</div>
        ) : (
          <ul>
            {transactions.map((tx) => {
              const type = tx.fromAccountId === accountId ? 'Debit' : 'Credit'
              return (
                <li key={tx.transactionId} data-testid="transaction-item">
                  {type} - {tx.amount}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard
