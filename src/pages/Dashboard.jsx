import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../api/client.js'
import BalanceCard from '../components/BalanceCard.jsx'
import FundForm from '../components/FundForm.jsx'
import PaymentForm from '../components/PaymentForm.jsx'
import TransactionList from '../components/TransactionList.jsx'

const Dashboard = ({ auth }) => {
  const navigate = useNavigate()
  const { accountId, token, logout } = auth
  const [account, setAccount] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState('')
  const [isFunding, setIsFunding] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUnauthorized = () => {
    logout()
    navigate('/login')
  }

  const loadAccount = async () => {
    if (!accountId || !token) return
    try {
      const data = await apiClient.getBalance(accountId, token)
      setAccount(data)
    } catch (error) {
      if (error?.status === 401) {
        handleUnauthorized()
        return
      }
      setError(error?.error || 'Failed to load account')
    }
  }

  const loadTransactions = async () => {
    if (!accountId || !token) return
    try {
      const data = await apiClient.getTransactions(accountId, token)
      setTransactions(data)
    } catch (error) {
      if (error?.status === 401) {
        handleUnauthorized()
        return
      }
      setError(error?.error || 'Failed to load transactions')
    }
  }

  const refreshAll = async () => {
    setError('')
    setIsLoading(true)
    await Promise.all([loadAccount(), loadTransactions()])
    setIsLoading(false)
  }

  useEffect(() => {
    refreshAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFund = async ({ amount }) => {
    setError('')
    setIsFunding(true)

    try {
      const data = await apiClient.fundAccount(accountId, amount, token)
      setAccount(data)
      await loadTransactions()
      setIsFunding(false)
    } catch (error) {
      if (error?.status === 401) {
        handleUnauthorized()
        return
      }
      setError(error?.error || 'Funding failed')
      setIsFunding(false)
    }
  }

  const handlePayment = async ({ fromAccountId, toAccountId, amount }) => {
    setError('')
    setIsPaying(true)

    try {
      await apiClient.makePayment({ fromAccountId, toAccountId, amount }, token)
      await refreshAll()
      setIsPaying(false)
    } catch (error) {
      if (error?.status === 401) {
        handleUnauthorized()
        return
      }
      if (error?.status === 403) {
        setError('FORBIDDEN')
      } else {
        setError(error?.error || 'Payment failed')
      }
      setIsPaying(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="page" data-testid="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Manage your balance and recent activity.</p>
        </div>
        <div className="header-actions">
          <button
            data-testid="dashboard-refresh"
            className="secondary"
            type="button"
            onClick={refreshAll}
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            data-testid="logout-submit"
            className="ghost"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="banner banner-error" data-testid="dashboard-error">
          {error}
        </div>
      )}

      <div className="grid" data-testid="dashboard-grid">
        <BalanceCard accountId={accountId} balance={account?.balance} />
        <FundForm onSubmit={handleFund} isSubmitting={isFunding} />
        <PaymentForm
          fromAccountId={accountId}
          onSubmit={handlePayment}
          isSubmitting={isPaying}
        />
        <TransactionList transactions={transactions} />
      </div>
    </div>
  )
}

export default Dashboard
