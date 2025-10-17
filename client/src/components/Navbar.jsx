import React, { useEffect, useState } from 'react'
import { getUser } from '../utils/auth'

export default function Navbar() {
  const [user, setUser] = useState(null)
  useEffect(() => { setUser(getUser()) }, [])
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">Welcome{user ? `, ${user.name}` : ''}</div>
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle dark mode"
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700"
            onClick={() => {
              const root = document.documentElement
              const isDark = root.classList.toggle('dark')
              localStorage.setItem('theme', isDark ? 'dark' : 'light')
            }}
          >
            Theme
          </button>
          
        </div>
      </div>
    </header>
  )
}


