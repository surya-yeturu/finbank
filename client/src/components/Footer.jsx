import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center">
        <span>© {year} y.surya</span>
      </div>
    </footer>
  )
}


