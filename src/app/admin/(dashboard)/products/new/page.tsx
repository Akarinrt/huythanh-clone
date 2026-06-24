'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TipTapEditor from '@/components/admin/TipTapEditor'

const PREDEFINED_CATEGORIES = ['Nhẫn', 'Dây Chuyền', 'Bông Tai', 'Vòng Tay', 'Trang Sức Cưới']

export default function NewProductPage() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(PREDEFINED_CATEGORIES[0])
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    setIsUploading(true)
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setImageUrl(data.imageUrl)
      } else {
        alert(data.message || 'Lỗi tải ảnh lên')
      }
    } catch (err) {
      console.error(err)
      alert('Đã xảy ra lỗi khi tải ảnh')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        price: parseFloat(price),
        category,
        imageUrl,
        description
      })
    })

    if (res.ok) {
      router.push('/admin/products')
      router.refresh()
    } else {
      alert('Có lỗi xảy ra khi thêm sản phẩm')
    }
  }

  return (
    <div style={{ maxWidth: '800px', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'Playfair Display' }}>Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tên sản phẩm *</label>
          <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Giá (VNĐ) *</label>
          <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        
        {/* Category Select */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Danh mục *</label>
          <select required value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            {PREDEFINED_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        {/* Upload Image Section */}
        <div style={{ padding: '1.5rem', border: '1px dashed #ccc', borderRadius: '4px', backgroundColor: '#fafafa' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Ảnh sản phẩm</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            disabled={isUploading}
            style={{ marginBottom: '1rem', width: '100%' }} 
          />
          {isUploading && <p style={{ color: '#666', fontSize: '0.9rem' }}>Đang tải ảnh lên...</p>}
          
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>Hoặc dán Link ảnh trực tiếp vào đây:</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          
          {imageUrl && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Ảnh xem trước:</p>
              <img src={imageUrl} alt="Preview" style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} />
            </div>
          )}
        </div>

        {/* Rich Text Editor */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Mô tả chi tiết</label>
          <div style={{ background: 'white' }}>
            <TipTapEditor value={description} onChange={setDescription} />
          </div>
        </div>
        
        <button type="submit" style={{ padding: '1rem', background: '#B8892A', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Lưu Sản Phẩm
        </button>
      </form>
    </div>
  )
}
