import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import Transfer from './pages/Transfer.jsx'
import ApplyStudentAccount from './pages/ApplyStudentAccount.jsx'
import Spending from './pages/Spending.jsx'
import Admin from './pages/Admin.jsx'
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { isAuthenticated } from './utils/auth.js'

function ProtectedLayout({ children }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen flex flex-col">
          <Navbar />
          <main className="p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/transactions" element={<ProtectedLayout><Transactions /></ProtectedLayout>} />
        <Route path="/transfer" element={<ProtectedLayout><Transfer /></ProtectedLayout>} />
        <Route path="/apply" element={<ProtectedLayout><ApplyStudentAccount /></ProtectedLayout>} />
        <Route path="/spending" element={<ProtectedLayout><Spending /></ProtectedLayout>} />
        <Route path="/admin" element={<ProtectedLayout><Admin /></ProtectedLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}


