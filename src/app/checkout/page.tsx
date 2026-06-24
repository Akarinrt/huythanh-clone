'use client'

import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const [isSuccess, setIsSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const customerName = (form.querySelector('input[type="text"]') as HTMLInputElement)?.value || ''
    const phone = (form.querySelector('input[type="tel"]') as HTMLInputElement)?.value || ''
    const address = (form.querySelectorAll('input[type="text"]')[1] as HTMLInputElement)?.value || ''

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          address,
          totalPrice,
          items
        })
      })

      if (res.ok) {
        setIsSuccess(true)
        clearCart()
      } else {
        alert('Có lỗi khi đặt hàng, vui lòng thử lại.')
      }
    } catch {
      alert('Lỗi kết nối, vui lòng thử lại.')
    }
  }

  if (!mounted) return null

  if (isSuccess) {
    return (
      <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center', maxWidth: '560px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', padding: '48px', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
          <CheckCircle size={72} color="var(--gold)" style={{ margin: '0 auto 24px' }} />
          <h1 style={{ font: "300 36px/1.2 'Playfair Display',serif", color: 'var(--text)', marginBottom: '16px' }}>Đặt hàng thành công!</h1>
          <p style={{ font: "400 15px/1.8 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', marginBottom: '36px' }}>
            Cảm ơn bạn đã mua sắm tại Bảo Nhiên. Đơn hàng của bạn đang được xử lý và chúng tôi sẽ liên hệ trong thời gian sớm nhất.
          </p>
          <Link href="/" className="btn-g" style={{ display: 'inline-block', padding: '16px 40px', background: 'var(--gold)', color: '#FFF', font: "600 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2px', textTransform: 'uppercase' }}>Tiếp tục mua sắm</Link>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ font: "300 32px/1.2 'Playfair Display',serif", color: 'var(--text)', marginBottom: '24px' }}>Giỏ hàng trống</h2>
          <Link href="/" className="btn-o" style={{ display: 'inline-block', padding: '16px 40px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', font: "600 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2px', textTransform: 'uppercase' }}>Quay lại mua sắm</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '80vh', padding: '80px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '64px' }}>
        
        {/* Form */}
        <div>
          <h2 style={{ font: "300 32px/1.2 'Playfair Display',serif", color: 'var(--text)', marginBottom: '32px' }}>Thông tin giao hàng</h2>
          <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)' }}>Họ và tên</label>
              <input required type="text" style={{ width: '100%', padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)', font: "400 14px/1 'Be Vietnam Pro',sans-serif", outline: 'none' }} placeholder="Nhập họ và tên..." />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)' }}>Số điện thoại</label>
              <input required type="tel" style={{ width: '100%', padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)', font: "400 14px/1 'Be Vietnam Pro',sans-serif", outline: 'none' }} placeholder="Nhập số điện thoại..." />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)' }}>Địa chỉ nhận hàng</label>
              <input required type="text" style={{ width: '100%', padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)', font: "400 14px/1 'Be Vietnam Pro',sans-serif", outline: 'none' }} placeholder="Nhập địa chỉ chi tiết..." />
            </div>
            <div style={{ marginTop: '16px' }}>
              <button type="submit" className="btn-g" style={{ width: '100%', padding: '20px', background: 'var(--gold)', color: '#FFF', font: "600 13px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2px', textTransform: 'uppercase', border: 'none' }}>
                Xác nhận đặt hàng
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ backgroundColor: 'var(--bg-section)', padding: '40px', border: '1px solid var(--border)', height: 'fit-content' }}>
          <h2 style={{ font: "300 24px/1.2 'Playfair Display',serif", color: 'var(--text)', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>Đơn hàng của bạn</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
            {items.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '72px', height: '72px', backgroundColor: 'var(--bg-card)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', font: "400 10px/1 'Be Vietnam Pro',sans-serif" }}>No Image</div>
                      )}
                    </div>
                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--text-muted)', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 11px/1 'Be Vietnam Pro',sans-serif", border: '2px solid var(--bg-section)' }}>
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <div style={{ font: "400 15px/1.4 'Playfair Display',serif", color: 'var(--text)', marginBottom: '4px' }}>{item.title}</div>
                    {item.size && <div style={{ font: "400 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)' }}>Size: {item.size}</div>}
                  </div>
                </div>
                <div style={{ font: "600 15px/1 'Be Vietnam Pro',sans-serif", color: 'var(--gold)' }}>
                  {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ font: "500 14px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '2px' }}>Tổng cộng</span>
            <span style={{ font: "600 20px/1 'Be Vietnam Pro',sans-serif", color: 'var(--gold)' }}>{totalPrice.toLocaleString('vi-VN')} đ</span>
          </div>
        </div>

      </div>
    </main>
  )
}
