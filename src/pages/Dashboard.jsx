import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'
import { useAuth } from '../hooks/useAuth.js'
import BalanceCard from '../components/BalanceCard.jsx'
import FundForm from '../components/FundForm.jsx'
import PaymentForm from '../components/PaymentForm.jsx'
import TransactionList from '../components/TransactionList.jsx'

const Dashboard = () => {
  const navigate = useNavigate()
  const { userId, token, logout } = useAuth()
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
    if (!userId || !token) return
    const result = await api.getAccount({ accountId: userId, token })
    if (!result.ok) {
      if (result.status === 401) {
        handleUnauthorized()
        return
      }
      setError(result.error || 'Failed to load account')
      return
    }
    setAccount(result.data)
  }

  const loadTransactions = async () => {
    if (!userId || !token) return
    const result = await api.getTransactions({ accountId: userId, token })
    if (!result.ok) {
      if (result.status === 401) {
        handleUnauthorized()
        return
      }
      setError(result.error || 'Failed to load transactions')
      return
    }
    setTransactions(result.data)
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

    const result = await api.fundAccount({ accountId: userId, amount, token })
    if (!result.ok) {
      if (result.status === 401) {
        handleUnauthorized()
        return
      }
      setError(result.error || 'Funding failed')
      setIsFunding(false)
      return
    }

    setAccount(result.data)
    await loadTransactions()
    setIsFunding(false)
  }

  const handlePayment = async ({ fromAccountId, toAccountId, amount }) => {
    setError('')
    setIsPaying(true)

    const result = await api.makePayment({ fromAccountId, toAccountId, amount, token })
    if (!result.ok) {
      if (result.status === 401) {
        handleUnauthorized()
        return
      }
      if (result.status === 403) {
        setError('FORBIDDEN')
      } else {
        setError(result.error || 'Payment failed')
      }
      setIsPaying(false)
      return
    }

    await refreshAll()
    setIsPaying(false)
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
        <BalanceCard accountId={userId} balance={account?.balance} />
        <FundForm onSubmit={handleFund} isSubmitting={isFunding} />
        <PaymentForm
          fromAccountId={userId}
          onSubmit={handlePayment}
          isSubmitting={isPaying}
        />
        <TransactionList transactions={transactions} />
      </div>
    </div>
  )
}

export default Dashboard
