import { useState } from 'react'

const FundForm = ({ onSubmit, isSubmitting }) => {
  const [amount, setAmount] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ amount })
  }

  return (
    <section className="card" data-testid="fund-card">
      <div className="card-header">
        <h2 className="card-title">Fund Account</h2>
      </div>
      <form onSubmit={handleSubmit} className="form" data-testid="fund-form">
        <label className="form-field">
          Amount
          <input
            data-testid="fund-amount"
            type="text"
            inputMode="decimal"
            placeholder="100.00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <button
          data-testid="fund-submit"
          className="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Funding...' : 'Fund'}
        </button>
      </form>
    </section>
  )
}

export default FundForm
