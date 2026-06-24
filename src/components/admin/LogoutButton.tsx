'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' })
      if (res.ok) {
        router.push('/admin/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className="admin-logout-btn"
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '8px', 
        color: '#CF1322', 
        background: '#FFF1F0',
        border: '1px solid #FFA39E',
        borderRadius: '6px',
        padding: '12px', 
        font: "500 12px/1 'Be Vietnam Pro',sans-serif", 
        letterSpacing: '1px',
        cursor: 'pointer',
        width: '100%',
        transition: 'background 0.2s'
      }}
    >
      <LogOut size={16} /> Đăng xuất
    </button>
  )
}
