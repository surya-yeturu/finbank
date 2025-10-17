import React, { useState } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function Transfer() {
  const [toEmail, setToEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/transfer', { toEmail, amount: Number(amount), description })
      toast.success('Transfer successful')
      setToEmail(''); setAmount(''); setDescription('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Transfer failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="card max-w-lg space-y-3">
      <div className="text-xl font-semibold">Transfer Funds</div>
      <input className="input" placeholder="Recipient Email" value={toEmail} onChange={e => setToEmail(e.target.value)} />
      <input className="input" placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <input className="input" placeholder="Description (e.g., [food] Dinner)" value={description} onChange={e => setDescription(e.target.value)} />
      <button className="btn" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
    </form>
  )
}


