'use client'
import { Moon, Sun } from 'lucide-react'
import { useAdminThemeStore } from './AdminThemeStore'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAdminThemeStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div style={{ width: 18, height: 18 }}></div>

  return (
    <button 
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: 'var(--admin-text)',
        background: 'transparent',
        border: 'none',
        padding: '12px',
        font: "500 12px/1 'Be Vietnam Pro',sans-serif",
        cursor: 'pointer',
        transition: 'color 0.2s',
        width: '100%',
        justifyContent: 'center'
      }}
      className="admin-nav-link"
    >
      {theme === 'light' ? (
        <>
          <Moon size={16} /> Giao diện Tối
        </>
      ) : (
        <>
          <Sun size={16} /> Giao diện Sáng
        </>
      )}
    </button>
  )
}
