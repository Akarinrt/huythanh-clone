'use client'

import { useCartStore } from '@/lib/store'
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem } = useCartStore()

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="cart-overlay" 
          onClick={closeCart}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 999, backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* Drawer */}
      <div 
        className={`cart-drawer ${isCartOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--bg-card)',
          zIndex: 1000,
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.1)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <h2 style={{ font: "300 24px/1 'Playfair Display',serif", color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShoppingBag size={22} color="var(--gold)" /> Giỏ hàng ({items.length})
          </h2>
          <button onClick={closeCart} className="icnb" style={{ color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '48px' }}>
              <ShoppingBag size={64} style={{ margin: '0 auto 20px', color: 'var(--border)' }} />
              <p style={{ font: "400 15px/1.6 'Be Vietnam Pro',sans-serif", marginBottom: '32px' }}>Giỏ hàng của bạn đang trống</p>
              <button 
                onClick={closeCart} 
                className="btn-g" 
                style={{ width: '100%', padding: '16px', background: 'var(--gold)', color: '#FFF', font: "600 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2px', textTransform: 'uppercase' }}
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '28px' }}>
                  
                  {/* Image */}
                  <div style={{ width: '96px', height: '96px', backgroundColor: 'var(--bg-section)', overflow: 'hidden', flexShrink: 0 }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', font: "400 11px/1 'Be Vietnam Pro',sans-serif" }}>Chưa có ảnh</div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ paddingRight: '12px' }}>
                        <h4 style={{ font: "400 16px/1.4 'Playfair Display',serif", color: 'var(--text)', margin: '0 0 6px 0' }}>{item.title}</h4>
                        {item.size && <p style={{ font: "400 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', margin: 0 }}>Size: {item.size}</p>}
                      </div>
                      <button 
                        onClick={() => removeItem(item.id, item.size)}
                        className="icnb"
                        style={{ color: 'var(--text-dim)', padding: '2px', height: 'fit-content' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)' }}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                          className="icnb"
                          style={{ padding: '6px 10px', color: 'var(--text)' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ font: "500 13px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="icnb"
                          style={{ padding: '6px 10px', color: 'var(--text)' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span style={{ font: "600 15px/1 'Be Vietnam Pro',sans-serif", color: 'var(--gold)' }}>
                        {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div style={{ padding: '32px', borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
              <span style={{ font: "500 14px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '2px' }}>Tổng cộng:</span>
              <span style={{ font: "600 20px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)' }}>{totalPrice.toLocaleString('vi-VN')} đ</span>
            </div>
            <Link 
              href="/checkout" 
              className="btn-g" 
              style={{ display: 'block', width: '100%', padding: '18px', background: 'var(--gold)', color: '#FFF', font: "600 13px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center' }}
              onClick={closeCart}
            >
              Tiến hành thanh toán
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
