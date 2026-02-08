import { useState } from 'react'

const PaymentForm = ({ fromAccountId, onSubmit, isSubmitting }) => {
  const [toAccountId, setToAccountId] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ fromAccountId, toAccountId, amount })
  }

  return (
    <section className="card" data-testid="payment-card">
      <div className="card-header">
        <h2 className="card-title">Make Payment</h2>
      </div>
      <form onSubmit={handleSubmit} className="form" data-testid="payment-form">
        <label className="form-field">
          From Account
          <input
            data-testid="payment-from"
            type="text"
            value={fromAccountId || ''}
            readOnly
          />
        </label>
        <label className="form-field">
          To Account
          <input
            data-testid="payment-to"
            type="text"
            placeholder="acc-2"
            value={toAccountId}
            onChange={(event) => setToAccountId(event.target.value)}
          />
        </label>
        <label className="form-field">
          Amount
          <input
            data-testid="payment-amount"
            type="text"
            inputMode="decimal"
            placeholder="25.50"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <button
          data-testid="payment-submit"
          className="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Payment'}
        </button>
      </form>
    </section>
  )
}

export default PaymentForm
