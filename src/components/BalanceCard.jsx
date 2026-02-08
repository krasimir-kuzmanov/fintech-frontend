const BalanceCard = ({ accountId, balance }) => {
  return (
    <section className="card" data-testid="balance-card">
      <div className="card-header">
        <h2 className="card-title">Balance</h2>
      </div>
      <div className="balance-row">
        <div className="balance-label">Account</div>
        <div className="balance-value" data-testid="balance-account">
          {accountId || '—'}
        </div>
      </div>
      <div className="balance-row">
        <div className="balance-label">Available</div>
        <div className="balance-amount" data-testid="balance-value">
          {balance ?? '0.00'}
        </div>
      </div>
    </section>
  )
}

export default BalanceCard
