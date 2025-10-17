import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { getUser } from '../utils/auth'

export default function Admin() {
  const currentUser = getUser()
  const [apps, setApps] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await api.get('/student/applications', { params: filter ? { status: filter } : {} })
      setApps(res.data.applications)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [filter])

  async function updateStatus(id, status) {
    try {
      await api.patch(`/student/applications/${id}`, { status })
      toast.success(`Marked as ${status}`)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update')
    }
  }

  if (!currentUser || !['admin', 'manager'].includes(currentUser.role)) {
    return <div className="card">You do not have access to this page.</div>
  }

  return (
    <div className="space-y-4">
      <div className="card flex items-center justify-between">
        <div className="text-xl font-semibold">Student Applications</div>
        <select className="input w-48" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="card">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">University</th>
                  <th className="p-2">Course</th>
                  <th className="p-2">Year</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.map(a => (
                  <tr key={a._id} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="p-2">{a.name}</td>
                    <td className="p-2">{a.email}</td>
                    <td className="p-2">{a.university}</td>
                    <td className="p-2">{a.course}</td>
                    <td className="p-2">{a.graduationYear}</td>
                    <td className="p-2 capitalize">
                      <span className={
                        a.status === 'approved' ? 'badge-credit' : a.status === 'rejected' ? 'badge-debit' : 'badge'
                      }>{a.status}</span>
                    </td>
                    <td className="p-2 space-x-2">
                      <button className="btn" onClick={() => updateStatus(a._id, 'approved')}>Approve</button>
                      <button className="btn" onClick={() => updateStatus(a._id, 'rejected')}>Reject</button>
                      <button className="btn" onClick={() => updateStatus(a._id, 'pending')}>Reset</button>
                    </td>
                  </tr>
                ))}
                {apps.length === 0 && (
                  <tr><td className="p-4 text-center" colSpan={7}>No applications</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}


