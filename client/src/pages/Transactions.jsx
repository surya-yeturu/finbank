import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import TransactionTable from '../components/TransactionTable'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get('/transactions')
        setTransactions(data.transactions || [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const download = (format = 'pdf') => {
    const url = `${import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'}/statements/download?format=${format}`
    window.open(url, '_blank')
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className="btn" onClick={() => download('pdf')}>Download PDF</button>
        <button className="btn" onClick={() => download('csv')}>Download CSV</button>
      </div>
      <TransactionTable transactions={transactions} />
    </div>
  )
}


