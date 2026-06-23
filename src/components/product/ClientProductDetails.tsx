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
    // Navigate to checkout in a real app, for now just open cart
    openCart()
  }

  return (
    <div className="product-details-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', padding: '2rem 0' }}>
      
      {/* Left: Images */}
      <div className="product-images">
        <div style={{ backgroundColor: '#f9f9f9', width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden' }}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>No Image</div>
          )}
        </div>
      </div>

      {/* Right: Info */}
      <div className="product-info-panel">
        <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
          {product.category || 'Trang Sức'}
        </div>
        <h1 style={{ fontSize: '2rem', fontFamily: 'Playfair Display', marginBottom: '1rem', color: 'var(--dark-bg)' }}>
          {product.title}
        </h1>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary-gold)', marginBottom: '2rem' }}>
          {product.price.toLocaleString('vi-VN')} đ
        </div>

        {/* Size Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontWeight: 600 }}>Kích thước:</span>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary-gold)', textDecoration: 'underline', cursor: 'pointer' }}>Hướng dẫn đo size</button>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  width: '40px', height: '40px',
                  border: selectedSize === size ? '2px solid var(--primary-gold)' : '1px solid #ddd',
                  background: selectedSize === size ? '#fffcf5' : 'white',
                  color: selectedSize === size ? 'var(--primary-gold)' : '#333',
                  borderRadius: '4px', cursor: 'pointer', fontWeight: selectedSize === size ? 'bold' : 'normal',
                  transition: 'all 0.2s'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
          <button 
            onClick={handleAddToCart}
            className="btn btn-outline" 
            style={{ flex: 1, padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
          >
            {isAdded ? <><Check size={18} /> Đã thêm</> : 'THÊM VÀO GIỎ'}
          </button>
          <button 
            onClick={handleBuyNow}
            className="btn" 
            style={{ flex: 1, padding: '1rem' }}
          >
            MUA NGAY
          </button>
        </div>

        {/* Promises */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Truck size={24} color="var(--primary-gold)" />
            <span style={{ fontSize: '0.9rem' }}>Miễn phí giao hàng toàn quốc</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Shield size={24} color="var(--primary-gold)" />
            <span style={{ fontSize: '0.9rem' }}>Bảo hành trọn đời (làm mới, đánh bóng)</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Info size={24} color="var(--primary-gold)" />
            <span style={{ fontSize: '0.9rem' }}>Đổi trả trong vòng 7 ngày</span>
          </div>
        </div>
        
        {/* Description */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '1rem', marginBottom: '1rem', fontFamily: 'Outfit', fontWeight: 600 }}>
            MÔ TẢ SẢN PHẨM
          </h3>
          <div style={{ color: '#555', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: product.description || 'Chưa có mô tả cho sản phẩm này.' }} />
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .product-details-container { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  )
}
