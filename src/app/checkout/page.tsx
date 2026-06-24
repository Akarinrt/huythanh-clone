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
      <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', backgroundColor: '#f9f9f9', padding: '3rem', borderRadius: '8px' }}>
          <CheckCircle size={64} color="#4caf50" style={{ margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontSize: '2rem', fontFamily: 'Playfair Display', marginBottom: '1rem' }}>Đặt hàng thành công!</h1>
          <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
            Cảm ơn bạn đã mua sắm tại Bảo Nhiên. Đơn hàng của bạn đang được xử lý và chúng tôi sẽ liên hệ trong thời gian sớm nhất.
          </p>
          <Link href="/" className="btn">Tiếp tục mua sắm</Link>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Giỏ hàng trống</h2>
          <Link href="/" className="btn btn-outline">Quay lại mua sắm</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '60vh', padding: '4rem 1rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
        
        {/* Form */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display', marginBottom: '2rem', fontSize: '1.8rem' }}>Thông tin giao hàng</h2>
          <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Họ và tên</label>
              <input required type="text" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Nhập họ và tên..." />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Số điện thoại</label>
              <input required type="tel" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Nhập số điện thoại..." />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Địa chỉ nhận hàng</label>
              <input required type="text" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Nhập địa chỉ chi tiết..." />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="btn" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Xác nhận đặt hàng</button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '8px', height: 'fit-content' }}>
          <h2 style={{ fontFamily: 'Playfair Display', marginBottom: '2rem', fontSize: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>Đơn hàng của bạn</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {items.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '60px', height: '60px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                      {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                    <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#666', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>{item.quantity}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.title}</div>
                    {item.size && <div style={{ fontSize: '0.8rem', color: '#666' }}>Size: {item.size}</div>}
                  </div>
                </div>
                <div style={{ fontWeight: 600 }}>
                  {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #ddd', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Tổng cộng</span>
            <span style={{ color: 'var(--primary-gold)' }}>{totalPrice.toLocaleString('vi-VN')} đ</span>
          </div>
        </div>

      </div>
    </main>
  )
}
