import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  // Xử lý tiêu đề và điều kiện query dựa trên slug
  let title = 'Tất cả sản phẩm'
  let whereClause = {}
  
  if (slug !== 'all') {
    // Chuyển slug (ví dụ: nhan-cuoi) thành Title case đơn giản hoặc tìm kiếm không phân biệt chữ hoa thường
    title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    whereClause = {
      category: {
        contains: title,
        // Prisma SQLite does not support case-insensitive contains natively, so we just do exact or partial match if possible
      }
    }
  }

  // Fetch sản phẩm
  let products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Fallback lọc category bằng JS cho SQLite (vì SQLite không hỗ trợ mode: 'insensitive' trong Prisma)
  if (slug !== 'all') {
    const searchSlug = slug.toLowerCase().replace(/-/g, ' ')
    products = products.filter(p => p.category?.toLowerCase().includes(searchSlug) || p.title.toLowerCase().includes(searchSlug))
  }

  return (
    <>
      <div className="top-bar">Miễn phí giao hàng toàn quốc cho đơn hàng từ 1.000.000đ</div>
      <header className="main-header">
        <div className="container header-content">
          <Link href="/" className="logo">Huy Thanh Clone</Link>
          <nav className="nav-links">
            <Link href="/">Trang chủ</Link>
            <Link href="/collections/trang-suc-cuoi">Trang Sức Cưới</Link>
            <Link href="/collections/nhan-cau-hon">Nhẫn Cầu Hôn</Link>
            <Link href="/collections/trang-suc-nu">Trang Sức Nữ</Link>
            <Link href="/admin">Đăng nhập Admin</Link>
          </nav>
        </div>
      </header>

      <main style={{ minHeight: '60vh', padding: '4rem 0' }}>
        <div className="container">
          <div className="section-title">
            <h2 style={{ textTransform: 'capitalize' }}>{slug === 'all' ? 'Tất cả sản phẩm' : title}</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {products.length === 0 ? (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: '#888' }}>
                Không tìm thấy sản phẩm nào trong danh mục này.
              </p>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.title} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', background: '#f5f5f5' }}>No Image</div>
                    )}
                  </div>
                  <div className="product-info">
                    <p className="product-category">{product.category || 'Trang Sức'}</p>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">{product.price.toLocaleString('vi-VN')} đ</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom" style={{ borderTop: 'none' }}>
            <p>© 2026 Huy Thanh Jewelry Clone.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
