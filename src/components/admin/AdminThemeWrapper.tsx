'use client'
import { useEffect, useState } from 'react'
import { useAdminThemeStore } from './AdminThemeStore'

export default function AdminThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useAdminThemeStore()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering theme-dependent attributes after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="admin-wrapper" data-theme="light" style={{ display: 'flex', minHeight: '100vh', background: 'var(--admin-bg)' }}>{children}</div>
  }

  return (
    <div className="admin-wrapper" data-theme={theme} style={{ display: 'flex', minHeight: '100vh', background: 'var(--admin-bg)', transition: 'background 0.3s' }}>
      {children}
    </div>
  )
}
