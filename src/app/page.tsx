import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let products: Array<{ id: number; title: string; price: number; imageUrl: string | null; category: string | null }> = []

  try {
    const { prisma } = await import('@/lib/prisma')
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8
    })
  } catch (err) {
    console.error('Database not connected:', err)
    // Gracefully show empty state if DB is not ready
  }

  return (
    <main>
      {/* Hero Banner */}
      <section style={{ height: '70vh', background: 'url("https://cdn.huythanhjewelry.vn/storage/photos/shares/article/Banner%20website%202026/body%20homepage%20-%20ndino.jpg") center/cover no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', padding: '0 1rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', marginBottom: '1rem', letterSpacing: '2px' }}>Tinh Hoa Trang Sức</h1>
          <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '3px' }}>Tôn vinh vẻ đẹp thuần khiết</p>
          <Link href="/collections/all" className="btn">Khám phá ngay</Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: '5rem 1rem' }}>
        <div className="section-title">
          <h2>Sản Phẩm Mới Nhất</h2>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Chưa có sản phẩm nào.</p>
            <Link href="/admin" className="btn btn-outline">Vào Admin để thêm sản phẩm</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2.5rem' }}>
            {products.map(product => (
              <Link href={`/products/${product.id}`} key={product.id} className="product-card" style={{ display: 'block' }}>
                <div className="product-image-container">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', background: '#f5f5f5' }}>Chưa có ảnh</div>
                  )}
                </div>
                <div className="product-info">
                  <p className="product-category">{product.category || 'Trang Sức'}</p>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">{product.price.toLocaleString('vi-VN')} đ</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/collections/all" className="btn btn-outline">Xem tất cả sản phẩm</Link>
          </div>
        )}
      </section>
    </main>
  )
}
