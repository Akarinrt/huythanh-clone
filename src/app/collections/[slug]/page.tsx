export const dynamic = 'force-dynamic'

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let products: Array<{ id: number; title: string; price: number; imageUrl: string | null; category: string | null }> = []
  let dbError = false

  try {
    const { prisma } = await import('@/lib/prisma')
    let all = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
    if (slug !== 'all') {
      const q = slug.toLowerCase().replace(/-/g, ' ')
      all = all.filter(p => p.category?.toLowerCase().includes(q) || p.title.toLowerCase().includes(q))
    }
    products = all
  } catch {
    dbError = true
  }

  const title = slug === 'all' ? 'Tất Cả Sản Phẩm' :
    slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <main style={{ minHeight: '100vh', paddingTop: '116px', background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{ padding: '52px 0 44px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ font: "500 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '22px', display: 'flex', gap: '14px', alignItems: 'center', justifyContent: 'center' }}>
            <a href="/" style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Trang Chủ</a>
            <span style={{ color: 'var(--text-dim)' }}>→</span>
            <span style={{ color: 'var(--gold)' }}>{title}</span>
          </div>
          <h1 style={{ font: "300 62px/1.1 'Playfair Display',serif", color: 'var(--text)', marginBottom: '22px' }}>Bộ Sưu Tập</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', justifyContent: 'center' }}>
            <div style={{ width: '48px', height: '1px', background: 'var(--border)' }} />
            <div style={{ font: "400 10px/1 'Be Vietnam Pro',sans-serif", color: 'var(--gold)' }}>◆</div>
            <div style={{ width: '48px', height: '1px', background: 'var(--border)' }} />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 48px 0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {['Tất Cả', 'Nhẫn', 'Dây Chuyền', 'Bông Tai', 'Vòng Tay', 'Trang Sức Cưới'].map((f, i) => (
          <button key={f} className={i === 0 ? 'btn-g' : 'btn-o'} style={{
            background: i === 0 ? 'var(--gold)' : 'transparent',
            color: i === 0 ? '#FFF' : 'var(--text-muted)',
            border: i === 0 ? 'none' : '1px solid var(--border)',
            font: "600 10.5px/1 'Be Vietnam Pro',sans-serif",
            letterSpacing: '3px', textTransform: 'uppercase', padding: '12px 28px',
            borderRadius: '2px'
          }}>{f}</button>
        ))}
      </div>

      {/* Products grid */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 48px 100px' }}>
        {dbError ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
            <p style={{ font: "300 18px/1 'Playfair Display',serif" }}>Hệ thống đang kết nối lại database, vui lòng thử lại sau ít phút.</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
            <p style={{ font: "300 20px/1 'Playfair Display',serif" }}>Không tìm thấy sản phẩm nào.</p>
          </div>
        ) : (
          <div className="pgrid">
            {products.map(product => (
              <a href={`/products/${product.id}`} key={product.id} className="pcard" style={{ display: 'block', background: '#FFFFFF', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: 'var(--bg-section)', position: 'relative' }}>
                  {product.imageUrl
                    ? <img className="pimg" src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>Chưa có ảnh</div>
                  }
                  <div className="poverlay" style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ font: "600 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '14px 28px' }}>Xem Chi Tiết</span>
                  </div>
                </div>
                <div style={{ padding: '24px 20px 28px' }}>
                  <div style={{ font: "600 10px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>{product.category || 'Trang Sức'}</div>
                  <h3 className="clamp2" style={{ font: "400 20px/1.38 'Playfair Display',serif", color: 'var(--text)', marginBottom: '14px', height: '54px' }}>{product.title}</h3>
                  <div style={{ font: "600 16px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)' }}>{product.price.toLocaleString('vi-VN')} đ</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
