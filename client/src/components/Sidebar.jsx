import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout, getUser } from '../utils/auth'
import { motion, AnimatePresence } from 'framer-motion'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const user = getUser()
  const navigate = useNavigate()
  const linkCls = ({ isActive }) => `block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'bg-gray-100 dark:bg-gray-800 font-semibold' : ''}`
  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="h-screen sticky top-0 border-r border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/30 backdrop-blur">
      <div className="p-4 flex items-center justify-between">
        <span className="font-bold tracking-tight">FinBank</span>
        <button className="text-sm underline" onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Expand' : 'Collapse'}</button>
      </div>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-3 space-y-2 w-60">
            <NavLink to="/" className={linkCls}>Dashboard</NavLink>
            <NavLink to="/transactions" className={linkCls}>Transactions</NavLink>
            <NavLink to="/transfer" className={linkCls}>Transfer</NavLink>
            <NavLink to="/apply" className={linkCls}>Apply</NavLink>
            <NavLink to="/spending" className={linkCls}>Spending</NavLink>
            {user && ['admin', 'manager'].includes(user.role) && (
              <NavLink to="/admin" className={linkCls}>Admin</NavLink>
            )}
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 transition-colors">Logout</button>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}


