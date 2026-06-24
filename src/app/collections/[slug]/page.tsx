export const dynamic = 'force-dynamic'

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let products: Array<{ id: number; title: string; price: number; imageUrl: string | null; category: string | null }> = []
  let dbError = false

  try {
    const { prisma } = await import('@/lib/prisma')
    let allProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
    if (slug !== 'all') {
      const searchSlug = slug.toLowerCase().replace(/-/g, ' ')
      allProducts = allProducts.filter(p =>
        p.category?.toLowerCase().includes(searchSlug) ||
        p.title.toLowerCase().includes(searchSlug)
      )
    }
    products = allProducts
  } catch (err) {
    console.error('Database error:', err)
    dbError = true
  }

  const title = slug === 'all' ? 'Tất cả sản phẩm' :
    slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <main style={{ minHeight: '60vh', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-title">
          <h2>{title}</h2>
        </div>

        {dbError ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
            <p>Hệ thống đang kết nối lại database, vui lòng thử lại sau ít phút.</p>
          </div>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
            Không tìm thấy sản phẩm nào trong danh mục này.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2.5rem' }}>
            {products.map(product => (
              <a href={`/products/${product.id}`} key={product.id} className="product-card" style={{ display: 'block' }}>
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
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
