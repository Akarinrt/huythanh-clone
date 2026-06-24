'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import { Check, Info, Shield, Truck } from 'lucide-react'

type Product = {
  id: string
  title: string
  price: number
  imageUrl: string | null
  description: string | null
  category: string | null
}

export default function ClientProductDetails({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>('10')
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem, openCart } = useCartStore()

  const sizes = ['8', '9', '10', '11', '12', '13', '14', '15']

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      size: selectedSize
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
    openCart()
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      size: selectedSize
    })
    openCart()
  }

  return (
    <div className="product-details-container pdetgrid">
      
      {/* Left: Images */}
      <div className="product-images" style={{ width: '100%' }}>
        <div style={{ backgroundColor: 'var(--bg-section)', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>Chưa có ảnh</div>
          )}
        </div>
      </div>

      {/* Right: Info */}
      <div className="product-info-panel">
        <div style={{ font: "600 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '14px' }}>
          {product.category || 'Trang Sức'}
        </div>
        <h1 style={{ font: "300 42px/1.2 'Playfair Display',serif", color: 'var(--text)', marginBottom: '18px' }}>
          {product.title}
        </h1>
        <div style={{ font: "600 24px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)', marginBottom: '36px' }}>
          {product.price.toLocaleString('vi-VN')} đ
        </div>

        {/* Size Selection */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ font: "500 13px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)' }}>Kích thước:</span>
            <button style={{ background: 'none', border: 'none', color: 'var(--gold)', font: "400 12px/1 'Be Vietnam Pro',sans-serif", textDecoration: 'underline', cursor: 'pointer' }}>Hướng dẫn đo size</button>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {sizes.map(size => (
              <button
                key={size}
                className="szb"
                data-active={selectedSize === size ? 'true' : 'false'}
                onClick={() => setSelectedSize(size)}
                style={{
                  width: '44px', height: '44px',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  font: "500 13px/1 'Be Vietnam Pro',sans-serif"
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
          <button 
            onClick={handleAddToCart}
            className="btn-o" 
            style={{ flex: 1, padding: '18px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', font: "600 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            {isAdded ? <><Check size={18} /> Đã thêm</> : 'THÊM VÀO GIỎ'}
          </button>
          <button 
            onClick={handleBuyNow}
            className="btn-g" 
            style={{ flex: 1, padding: '18px', background: 'var(--gold)', color: '#FFF', font: "600 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2px', textTransform: 'uppercase' }}
          >
            MUA NGAY
          </button>
        </div>

        {/* Promises */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', padding: '24px', backgroundColor: 'var(--bg-section)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Truck size={20} color="var(--gold)" />
            <span style={{ font: "400 13px/1.5 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)' }}>Miễn phí giao hàng toàn quốc</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Shield size={20} color="var(--gold)" />
            <span style={{ font: "400 13px/1.5 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)' }}>Bảo hành trọn đời (làm mới, đánh bóng)</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Info size={20} color="var(--gold)" />
            <span style={{ font: "400 13px/1.5 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)' }}>Đổi trả trong vòng 7 ngày</span>
          </div>
        </div>
        
        {/* Description */}
        <div style={{ marginTop: '48px' }}>
          <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '24px', font: "600 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text)' }}>
            MÔ TẢ SẢN PHẨM
          </h3>
          <div style={{ font: "400 14px/1.8 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)' }} dangerouslySetInnerHTML={{ __html: product.description || 'Chưa có mô tả cho sản phẩm này.' }} />
        </div>

      </div>
    </div>
  )
}
