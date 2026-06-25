'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'

type Product = {
  id: number
  title: string
  price: number
  category: string | null
  imageUrl: string | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProducts = async () => {
    const res = await fetch('/api/admin/products')
    if (res.ok) {
      const data = await res.json()
      setProducts(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Bạn có chắc muốn xóa sản phẩm "${title}" không?`)) return

    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProducts(prev => prev.filter(p => p.id !== id))
    } else {
      alert('Xóa thất bại, vui lòng thử lại.')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Quản lý Sản phẩm</h1>
        <Link href="/admin/products/new" style={{ padding: '0.6rem 1.2rem', background: '#d5b364', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
          + Thêm sản phẩm
        </Link>
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--admin-text-muted)' }}>Đang tải...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--admin-card-bg)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'var(--admin-card-header)', textAlign: 'left' }}>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--admin-border)', width: '60px' }}>Ảnh</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--admin-border)' }}>Tên sản phẩm</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--admin-border)' }}>Giá</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--admin-border)' }}>Danh mục</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--admin-border)', textAlign: 'center' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>Chưa có sản phẩm nào.</td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.title} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: '48px', height: '48px', background: 'var(--admin-card-header)', borderRadius: '4px' }} />
                    )}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>{product.title}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#b8962e' }}>{product.price.toLocaleString('vi-VN')} đ</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--admin-text-muted)' }}>{product.category || '-'}</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.4rem 0.8rem', background: '#4a90d9', color: 'white', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem' }}
                      >
                        <Pencil size={14} /> Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.title)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.4rem 0.8rem', background: '#e55', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        <Trash2 size={14} /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
