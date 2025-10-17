import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

export default function ChartComponent({ data = {} }) {
  const entries = Object.entries(data).map(([k, v]) => ({ name: k, total: v.total, count: v.count }))
  const colors = ['#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card h-80">
        <div className="font-semibold mb-2">Spending by Category (Pie)</div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={entries} dataKey="total" nameKey="name" outerRadius={100} label>
              {entries.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="card h-80">
        <div className="font-semibold mb-2">Spending by Category (Bar)</div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={entries}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


