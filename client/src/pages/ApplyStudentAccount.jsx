import React, { useState } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function ApplyStudentAccount() {
  const [form, setForm] = useState({ name: '', email: '', university: '', course: '', graduationYear: '' })
  const [loading, setLoading] = useState(false)

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/student/apply', { ...form, graduationYear: Number(form.graduationYear) })
      toast.success('Application submitted')
      setForm({ name: '', email: '', university: '', course: '', graduationYear: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="card max-w-xl space-y-3">
      <div className="text-xl font-semibold">Apply for Student Account</div>
      <input className="input" placeholder="Name" value={form.name} onChange={e => update('name', e.target.value)} />
      <input className="input" placeholder="Email" value={form.email} onChange={e => update('email', e.target.value)} />
      <input className="input" placeholder="University" value={form.university} onChange={e => update('university', e.target.value)} />
      <input className="input" placeholder="Course" value={form.course} onChange={e => update('course', e.target.value)} />
      <input className="input" placeholder="Graduation Year" type="number" value={form.graduationYear} onChange={e => update('graduationYear', e.target.value)} />
      <button className="btn" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
    </form>
  )
}


