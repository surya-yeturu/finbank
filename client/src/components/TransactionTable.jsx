import React from 'react'

export default function TransactionTable({ transactions = [] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="p-2">Date</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">From</th>
            <th className="p-2">To</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, idx) => (
            <tr key={t._id || idx} className={`${idx % 2 ? 'bg-gray-50/60 dark:bg-gray-900/40' : ''} border-t border-gray-100 dark:border-gray-800`}>
              <td className="p-2 whitespace-nowrap">{new Date(t.createdAt).toLocaleString()}</td>
              <td className="p-2 capitalize">
                <span className={t.type === 'debit' ? 'badge-debit' : 'badge-credit'}>{t.type}</span>
              </td>
              <td className="p-2">₹{Number(t.amount).toLocaleString()}</td>
              <td className="p-2">{t.fromUser?.email}</td>
              <td className="p-2">{t.toUser?.email}</td>
              <td className="p-2">{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


