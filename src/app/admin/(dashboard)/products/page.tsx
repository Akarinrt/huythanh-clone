import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Quản lý Sản phẩm</h1>
        <Link href="/admin/products/new" style={{ padding: '0.5rem 1rem', background: '#d5b364', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
          + Thêm sản phẩm
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>Tên sản phẩm</th>
            <th style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>Giá</th>
            <th style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>Danh mục</th>
            <th style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ padding: '1rem', textAlign: 'center' }}>Chưa có sản phẩm nào.</td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id}>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>{product.id}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>{product.title}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>{product.price.toLocaleString('vi-VN')} đ</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>{product.category || '-'}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
                  <button style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
