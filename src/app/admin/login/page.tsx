'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Sai tài khoản hoặc mật khẩu!')
      setIsLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#FAFAFA' }}>
      <form onSubmit={handleSubmit} style={{ 
        background: '#FFFFFF', 
        padding: '3rem 2.5rem', 
        border: '1px solid #EAEAEA',
        width: '100%', 
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Brand Name */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ font: "400 32px/1.2 'Playfair Display',serif", color: '#111', marginBottom: '8px' }}>Bảo Thanh</h1>
          <div style={{ font: "500 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '3px', textTransform: 'uppercase', color: '#B8892A' }}>
            Admin Portal
          </div>
        </div>

        {error && (
          <div style={{ width: '100%', padding: '12px', marginBottom: '1.5rem', background: '#FFF1F0', border: '1px solid #FFA39E', color: '#CF1322', fontSize: '13px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div style={{ width: '100%', marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', font: "500 12px/1 'Be Vietnam Pro',sans-serif", color: '#555' }}>TÊN ĐĂNG NHẬP</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ 
              width: '100%', 
              padding: '14px', 
              border: '1px solid #DDD', 
              background: '#FAFAFA',
              boxSizing: 'border-box',
              font: "400 14px/1 'Be Vietnam Pro',sans-serif",
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            placeholder="Nhập tài khoản"
            required
            onFocus={(e) => e.target.style.borderColor = '#B8892A'}
            onBlur={(e) => e.target.style.borderColor = '#DDD'}
          />
        </div>

        <div style={{ width: '100%', marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', font: "500 12px/1 'Be Vietnam Pro',sans-serif", color: '#555' }}>MẬT KHẨU</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ 
              width: '100%', 
              padding: '14px', 
              border: '1px solid #DDD', 
              background: '#FAFAFA',
              boxSizing: 'border-box',
              font: "400 14px/1 'Be Vietnam Pro',sans-serif",
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            placeholder="Nhập mật khẩu"
            required
            onFocus={(e) => e.target.style.borderColor = '#B8892A'}
            onBlur={(e) => e.target.style.borderColor = '#DDD'}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            width: '100%', 
            padding: '14px', 
            background: '#111', 
            color: '#FFF', 
            border: 'none', 
            font: "600 12px/1 'Be Vietnam Pro',sans-serif", 
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: isLoading ? 'wait' : 'pointer',
            transition: 'background 0.2s, opacity 0.2s',
            opacity: isLoading ? 0.7 : 1
          }}
          onMouseOver={(e) => { if(!isLoading) e.currentTarget.style.background = '#B8892A' }}
          onMouseOut={(e) => { if(!isLoading) e.currentTarget.style.background = '#111' }}
        >
          {isLoading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP'}
        </button>
      </form>
    </div>
  )
}
