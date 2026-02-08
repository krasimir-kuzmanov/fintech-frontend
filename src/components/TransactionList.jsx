const TransactionList = ({ transactions }) => {
  return (
    <section className="card" data-testid="transaction-card">
      <div className="card-header">
        <h2 className="card-title">Transactions</h2>
      </div>
      <div className="list" data-testid="transaction-list">
        {transactions.length === 0 ? (
          <div className="empty" data-testid="transaction-empty">
            No transactions yet.
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              className="list-item"
              data-testid="transaction-item"
              key={transaction.transactionId}
            >
              <div className="item-row">
                <span className="item-label">ID</span>
                <span data-testid="transaction-id">{transaction.transactionId}</span>
              </div>
              <div className="item-row">
                <span className="item-label">From</span>
                <span data-testid="transaction-from">{transaction.fromAccountId}</span>
              </div>
              <div className="item-row">
                <span className="item-label">To</span>
                <span data-testid="transaction-to">{transaction.toAccountId}</span>
              </div>
              <div className="item-row">
                <span className="item-label">Amount</span>
                <span data-testid="transaction-amount">{transaction.amount}</span>
              </div>
              <div className="item-row">
                <span className="item-label">Status</span>
                <span data-testid="transaction-status">{transaction.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default TransactionList
