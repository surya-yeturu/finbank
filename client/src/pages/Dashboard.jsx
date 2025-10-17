import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import ChartComponent from '../components/ChartComponent'
import TransactionTable from '../components/TransactionTable'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [spending, setSpending] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [meRes, txRes, spRes] = await Promise.all([
          api.get('/user/me'),
          api.get('/transactions', { params: { limit: 5 } }),
          api.get('/spending'),
        ])
        setUser(meRes.data.user)
        setTransactions(txRes.data.transactions || [])
        setSpending(spRes.data.spending || {})
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="p-8">
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card h-24 animate-pulse" />
      <div className="card h-24 animate-pulse" />
      <div className="card h-24 animate-pulse" />
    </div>
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <div className="card h-80 animate-pulse" />
      <div className="card h-80 animate-pulse" />
    </div>
  </div>

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="text-sm opacity-60">Account Balance</div>
          <div className="text-3xl font-bold mt-2">₹{Number(user?.balance || 0).toLocaleString()}</div>
        </div>
        <div className="card">
          <div className="text-sm opacity-60">Name</div>
          <div className="text-xl font-semibold mt-2">{user?.name}</div>
        </div>
        <div className="card">
          <div className="text-sm opacity-60">Email</div>
          <div className="text-xl font-semibold mt-2">{user?.email}</div>
        </div>
      </div>

      <ChartComponent data={spending} />

      <div>
        <div className="font-semibold mb-2">Recent Transactions</div>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  )
}


