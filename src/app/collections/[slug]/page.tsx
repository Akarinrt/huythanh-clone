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
    <main style={{ minHeight: '100vh', paddingTop: '116px', background: '#0C0B09' }}>

      {/* Header */}
      <div style={{ padding: '52px 0 44px', textAlign: 'center', borderBottom: '1px solid rgba(196,146,76,0.08)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ font: "400 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2px', textTransform: 'uppercase', color: '#A8A49C', marginBottom: '22px', display: 'flex', gap: '14px', alignItems: 'center', justifyContent: 'center' }}>
            <a href="/" style={{ color: '#A8A49C', cursor: 'pointer' }}>Trang Chủ</a>
            <span style={{ color: '#7A7570' }}>→</span>
            <span style={{ color: '#C4924C' }}>{title}</span>
          </div>
          <h1 style={{ font: "300 62px/1.1 'Playfair Display',serif", color: '#EDE8DF', marginBottom: '22px' }}>Bộ Sưu Tập</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', justifyContent: 'center' }}>
            <div style={{ width: '48px', height: '1px', background: 'rgba(196,146,76,0.32)' }} />
            <div style={{ font: "400 10px/1 'Be Vietnam Pro',sans-serif", color: '#C4924C' }}>◆</div>
            <div style={{ width: '48px', height: '1px', background: 'rgba(196,146,76,0.32)' }} />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 48px 0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {['Tất Cả', 'Nhẫn', 'Dây Chuyền', 'Bông Tai', 'Vòng Tay', 'Trang Sức Cưới'].map((f, i) => (
          <button key={f} className={i === 0 ? 'btn-g' : 'btn-o'} style={{
            background: i === 0 ? '#C4924C' : 'transparent',
            color: i === 0 ? '#0C0B09' : '#C0BCB4',
            border: i === 0 ? 'none' : '1px solid rgba(196,146,76,0.18)',
            font: "400 9.5px/1 'Be Vietnam Pro',sans-serif",
            letterSpacing: '3px', textTransform: 'uppercase', padding: '11px 24px'
          }}>{f}</button>
        ))}
      </div>

      {/* Products grid */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 48px 100px' }}>
        {dbError ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#706B65' }}>
            <p style={{ font: "300 16px/1 'Playfair Display',serif" }}>Hệ thống đang kết nối lại database, vui lòng thử lại sau ít phút.</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#706B65' }}>
            <p style={{ font: "300 20px/1 'Playfair Display',serif" }}>Không tìm thấy sản phẩm nào.</p>
          </div>
        ) : (
          <div className="pgrid">
            {products.map(product => (
              <a href={`/products/${product.id}`} key={product.id} className="pcard" style={{ display: 'block', background: '#141311', border: '1px solid rgba(196,146,76,0.13)', overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#1A1916', position: 'relative' }}>
                  {product.imageUrl
                    ? <img className="pimg" src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3a3733' }}>Chưa có ảnh</div>
                  }
                  <div className="poverlay" style={{ position: 'absolute', inset: 0, background: 'rgba(10,9,8,0.62)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ font: "500 10px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '3px', textTransform: 'uppercase', color: '#E8D4A8', border: '1px solid rgba(232,212,168,0.42)', padding: '13px 26px' }}>Xem Chi Tiết</span>
                  </div>
                </div>
                <div style={{ padding: '22px 20px 26px' }}>
                  <div style={{ font: "500 9px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '3px', textTransform: 'uppercase', color: '#C4924C', marginBottom: '12px' }}>{product.category || 'Trang Sức'}</div>
                  <h3 className="clamp2" style={{ font: "400 20px/1.38 'Playfair Display',serif", color: '#EDE8DF', marginBottom: '13px', height: '54px' }}>{product.title}</h3>
                  <div style={{ font: "500 15px/1 'Be Vietnam Pro',sans-serif", color: '#C4924C' }}>{product.price.toLocaleString('vi-VN')} đ</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
