import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import ChartComponent from '../components/ChartComponent'

export default function Spending() {
  const [spending, setSpending] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get('/spending')
        setSpending(data.spending || {})
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div>
      <ChartComponent data={spending} />
    </div>
  )
}


