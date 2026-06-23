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
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}
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
          maxWidth: '400px',
          backgroundColor: 'white',
          zIndex: 1000,
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 15px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #eaeaea' }}>
          <h2 style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} /> Giỏ hàng ({items.length})
          </h2>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', marginTop: '3rem' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
              <p>Giỏ hàng của bạn đang trống</p>
              <button 
                onClick={closeCart} 
                className="btn" 
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #f5f5f5', paddingBottom: '1.5rem' }}>
                  <div style={{ width: '80px', height: '80px', backgroundColor: '#f9f9f9', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '0.8rem' }}>No img</div>
                    )}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', margin: '0 0 0.25rem 0', fontWeight: 500 }}>{item.title}</h4>
                        {item.size && <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>Size: {item.size}</p>}
                      </div>
                      <button 
                        onClick={() => removeItem(item.id, item.size)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0, height: 'fit-content' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eaeaea', borderRadius: '4px' }}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                          style={{ background: 'none', border: 'none', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontSize: '0.9rem', padding: '0 0.5rem', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--primary-gold)' }}>
                        {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid #eaeaea', backgroundColor: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
              <span>Tổng cộng:</span>
              <span style={{ color: 'var(--primary-gold)' }}>{totalPrice.toLocaleString('vi-VN')} đ</span>
            </div>
            <Link 
              href="/checkout" 
              className="btn" 
              style={{ width: '100%', textAlign: 'center' }}
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
