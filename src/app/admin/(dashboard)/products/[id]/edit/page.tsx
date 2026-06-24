'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const PREDEFINED_CATEGORIES = ['Nhẫn', 'Dây Chuyền', 'Bông Tai', 'Vòng Tay', 'Trang Sức Cưới']

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [productId, setProductId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    params.then(({ id }) => {
      setProductId(id)
      fetch(`/api/admin/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title || '')
          setPrice(data.price?.toString() || '')
          setCategory(data.category || PREDEFINED_CATEGORIES[0])
          setImageUrl(data.imageUrl || '')
          setDescription(data.description || '')
          setIsLoading(false)
        })
    })
  }, [params])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setIsUploading(true)
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) setImageUrl(data.imageUrl)
      else alert(data.message || 'Lỗi tải ảnh lên')
    } catch {
      alert('Đã xảy ra lỗi khi tải ảnh')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/admin/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price: parseFloat(price), category, imageUrl, description })
    })
    if (res.ok) {
      router.push('/admin/products')
      router.refresh()
    } else {
      alert('Có lỗi xảy ra khi cập nhật sản phẩm')
    }
  }

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'clean']
    ]
  }

  if (isLoading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Đang tải...</div>

  return (
    <div style={{ maxWidth: '800px', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'Playfair Display' }}>Chỉnh sửa sản phẩm</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tên sản phẩm *</label>
          <input required type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Giá (VNĐ) *</label>
          <input required type="number" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Danh mục *</label>
          <select required value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            {PREDEFINED_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={{ padding: '1.5rem', border: '1px dashed #ccc', borderRadius: '4px', backgroundColor: '#fafafa' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Ảnh sản phẩm</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} style={{ marginBottom: '1rem', width: '100%' }} />
          {isUploading && <p style={{ color: '#666', fontSize: '0.9rem' }}>Đang tải ảnh lên Cloudinary...</p>}
          <div style={{ marginTop: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>Hoặc dán Link ảnh:</label>
            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          {imageUrl && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Ảnh hiện tại:</p>
              <img src={imageUrl} alt="Preview" style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px', border: '2px solid #d5b364' }} />
            </div>
          )}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Mô tả chi tiết</label>
          <div style={{ background: 'white' }}>
            <ReactQuill 
              theme="snow" 
              value={description} 
              onChange={setDescription} 
              modules={quillModules}
              style={{ height: '300px', marginBottom: '40px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={{ flex: 1, padding: '1rem', background: '#B8892A', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Lưu thay đổi
          </button>
          <button type="button" onClick={() => router.push('/admin/products')} style={{ padding: '1rem 1.5rem', background: '#eee', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  )
}
