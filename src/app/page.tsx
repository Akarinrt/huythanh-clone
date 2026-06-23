import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8
  })

  return (
    <main>
      {/* Hero Banner */}
      <section style={{ height: '70vh', background: 'url("https://cdn.huythanhjewelry.vn/storage/photos/shares/article/Banner%20website%202026/body%20homepage%20-%20ndino.jpg") center/cover no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '4rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', marginBottom: '1rem', letterSpacing: '2px' }}>Tinh Hoa Trang Sức</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '3px' }}>Tôn vinh vẻ đẹp thuần khiết</p>
          <Link href="/collections/trang-suc-cuoi" className="btn">Khám phá ngay</Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: '5rem 1rem' }}>
        <div className="section-title">
          <h2>Sản Phẩm Mới Nhất</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
          {products.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: '#888' }}>
              Chưa có sản phẩm nào. Đăng nhập Admin để bắt đầu thêm sản phẩm nhé!
            </p>
          ) : (
            products.map(product => (
              <Link href={`/products/${product.id}`} key={product.id} className="product-card" style={{ display: 'block' }}>
                <div className="product-image-container">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>No Image</div>
                  )}
                </div>
                <div className="product-info">
                  <p className="product-category">{product.category || 'Trang Sức'}</p>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">{product.price.toLocaleString('vi-VN')} đ</p>
                </div>
              </Link>
            ))
          )}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/collections/all" className="btn btn-outline">Xem tất cả sản phẩm</Link>
        </div>
      </section>
    </main>
  )
}
