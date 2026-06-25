'use client'

import { useState } from 'react'

export default function GoldPriceEditor({ initialPrice }: { initialPrice: string }) {
  const [price, setPrice] = useState(initialPrice)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setIsSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'gold_price', value: price })
      })
      if (res.ok) {
        setMessage('Đã lưu thành công!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Có lỗi xảy ra!')
      }
    } catch (error) {
      setMessage('Lỗi kết nối!')
    }
    setIsSaving(false)
  }

  return (
    <div style={{ background: 'var(--admin-card-bg)', padding: '24px', borderRadius: '8px', border: '1px solid var(--admin-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ font: "600 16px/1 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text)', marginBottom: '8px' }}>Cập nhật Giá Vàng Hôm Nay</h3>
        <p style={{ font: "400 13px/1.5 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text-muted)' }}>Giá này sẽ được hiển thị nổi bật ngoài trang chủ để khách hàng dễ dàng theo dõi.</p>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input 
          type="text" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="VD: 8.500.000 VNĐ / Lượng"
          style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--admin-border)', background: 'transparent', color: 'var(--admin-text)', borderRadius: '4px', font: "400 14px/1 'Be Vietnam Pro',sans-serif", outline: 'none' }}
        />
        <button 
          onClick={handleSave}
          disabled={isSaving}
          style={{ padding: '12px 24px', background: 'var(--gold)', color: '#FFF', border: 'none', borderRadius: '4px', font: "600 13px/1 'Be Vietnam Pro',sans-serif", cursor: 'pointer', opacity: isSaving ? 0.7 : 1 }}
        >
          {isSaving ? 'Đang lưu...' : 'Lưu Giá'}
        </button>
      </div>
      {message && <div style={{ color: message.includes('lỗi') ? 'red' : 'green', font: "500 13px/1 'Be Vietnam Pro',sans-serif" }}>{message}</div>}
    </div>
  )
}
