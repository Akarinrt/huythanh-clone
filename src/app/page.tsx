import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let products: Array<{ id: number; title: string; price: number; imageUrl: string | null; category: string | null }> = []
  let goldPrice = ''

  try {
    const { prisma } = await import('@/lib/prisma')
    products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }, take: 8 })
    const setting = await prisma.setting.findUnique({ where: { id: 'gold_price' } })
    if (setting) goldPrice = setting.value
  } catch {
    // DB not ready yet
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      
      {/* ── GOLD PRICE BANNER ── */}
      {goldPrice && (
        <div style={{ background: 'var(--gold)', color: '#FFF', textAlign: 'center', padding: '12px 24px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '1px', zIndex: 10, position: 'relative' }}>
          <span style={{ opacity: 0.9 }}>GIÁ VÀNG HÔM NAY:</span> <strong style={{ fontSize: '15px', marginLeft: '8px' }}>{goldPrice}</strong>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://cdn.huythanhjewelry.vn/storage/photos/shares/article/Banner%20website%202026/body%20homepage%20-%20ndino.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F5F3EF' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,24,0.7) 0%, rgba(26,26,24,0.3) 50%, rgba(26,26,24,0.8) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '840px' }}>
          <div style={{ font: "600 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '7px', textTransform: 'uppercase', color: '#D4A84B', marginBottom: '30px', animation: 'fadeUp 0.8s 0.2s both' }}>── Tinh Hoa Trang Sức ──</div>
          <div style={{ font: "300 italic 84px/1.05 'Playfair Display',serif", color: '#FFFFFF', animation: 'fadeUp 0.9s 0.4s both' }}>Vẻ Đẹp</div>
          <span className="shimmer-gold" style={{ font: "400 92px/1.05 'Playfair Display',serif", marginBottom: '30px', animation: 'fadeUp 0.9s 0.55s both' }}>Vĩnh Cửu</span>
          <p style={{ font: "400 15px/1.9 'Be Vietnam Pro',sans-serif", color: 'rgba(255,255,255,0.85)', maxWidth: '460px', margin: '0 auto 52px', letterSpacing: '0.4px', animation: 'fadeUp 0.8s 0.7s both' }}>
            Mỗi trang sức là một câu chuyện về tình yêu và nghệ thuật, được chế tác bởi những nghệ nhân tài hoa nhất.
          </p>
          <Link href="/collections/all" className="btn-o" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', color: '#FFFFFF', font: "600 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4.5px', textTransform: 'uppercase', padding: '20px 62px', animation: 'fadeUp 0.8s 0.85s both', display: 'inline-block' }}>
            Khám Phá Bộ Sưu Tập
          </Link>
        </div>
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', animation: 'fadeIn 2s 1.3s both' }}>
          <div style={{ font: "500 10px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Scroll</div>
          <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} />
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ background: 'var(--bg)', padding: '112px 0 104px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '68px' }}>
            <div style={{ font: "600 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '18px' }}>Bộ Sưu Tập</div>
            <h2 style={{ font: "300 56px/1.12 'Playfair Display',serif", color: 'var(--text)' }}>Sản Phẩm Nổi Bật</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', justifyContent: 'center', marginTop: '22px' }}>
              <div style={{ width: '56px', height: '1px', background: 'var(--border)' }} />
              <div style={{ font: "400 10px/1 'Be Vietnam Pro',sans-serif", color: 'var(--gold)' }}>◆</div>
              <div style={{ width: '56px', height: '1px', background: 'var(--border)' }} />
            </div>
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <p style={{ font: "300 18px/1 'Playfair Display',serif", marginBottom: '1.5rem' }}>Chưa có sản phẩm nào</p>
              <Link href="/admin" className="btn-o" style={{ display: 'inline-block', background: 'transparent', border: '1px solid var(--border)', color: 'var(--gold)', font: "600 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '3px', textTransform: 'uppercase', padding: '14px 32px' }}>Vào Admin</Link>
            </div>
          ) : (
            <div className="pgrid">
              {products.map(product => (
                <Link href={`/products/${product.id}`} key={product.id} className="pcard" style={{ display: 'block', background: '#FFFFFF', border: '1px solid var(--border)', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: 'var(--bg-section)', position: 'relative' }}>
                    {product.imageUrl
                      ? <img className="pimg" src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', font: "400 13px/1 'Be Vietnam Pro',sans-serif" }}>Chưa có ảnh</div>
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
                </Link>
              ))}
            </div>
          )}

          {products.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <Link href="/collections/all" className="btn-o" style={{ display: 'inline-block', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', font: "600 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4px', textTransform: 'uppercase', padding: '18px 56px' }}>Xem Tất Cả Sản Phẩm</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CATEGORY TILES ── */}
      <section style={{ background: '#FFFFFF' }}>
        <div className="catgrid">
          {[
            { href: '/collections/nhan-cau-hon', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80', label: 'Nhẫn & Nhẫn\nCầu Hôn' },
            { href: '/collections/trang-suc-cuoi', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80', label: 'Dây Chuyền\n& Vòng Cổ' },
            { href: '/collections/vang-24k', img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=80', label: 'Trang Sức\nCưới' },
          ].map((cat, i) => (
            <Link href={cat.href} key={i} className="cattile" style={{ height: '580px', borderRight: i < 2 ? '1px solid var(--border)' : 'none', display: 'block' }}>
              <div className="catimg" style={{ backgroundImage: `url('${cat.img}')`, backgroundColor: '#F5F3EF' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,24,0.8) 0%, rgba(26,26,24,0.1) 60%)' }} />
              <div style={{ position: 'absolute', bottom: '52px', left: 0, right: 0, textAlign: 'center', padding: '0 28px' }}>
                <div className="catlabel" style={{ font: "600 10px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4px', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '14px' }}>Khám Phá →</div>
                <div className="catline" style={{ height: '1px', background: '#FFFFFF', margin: '0 auto 18px', opacity: 0.8 }} />
                <div className="catname" style={{ font: "400 40px/1.22 'Playfair Display',serif", color: '#FFFFFF', whiteSpace: 'pre-line' }}>{cat.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BRAND PROMISE ── */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="promgrid" style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {[
            {
              icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" style={{ width: '100%', height: '100%' }}><polygon points="24,3 45,19 24,45 3,19"/><polyline points="3,19 13,3 35,3 45,19"/><line x1="13" y1="3" x2="24" y2="45"/><line x1="35" y1="3" x2="24" y2="45"/></svg>,
              title: 'Kim Cương Thật 100%',
              desc: 'Toàn bộ kim cương đều có giấy chứng nhận GIA chính hãng'
            },
            {
              icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" style={{ width: '100%', height: '100%' }}><path d="M24 4L6 14v14c0 10.5 7 18.5 18 22 11-3.5 18-11.5 18-22V14L24 4z"/><polyline points="16,26 22,32 34,20"/></svg>,
              title: 'Bảo Hành Trọn Đời',
              desc: 'Miễn phí làm mới, đánh bóng và kiểm tra định kỳ mãi mãi'
            },
            {
              icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" style={{ width: '100%', height: '100%' }}><rect x="2" y="20" width="44" height="26" rx="2"/><polyline points="2,20 24,6 46,20"/><line x1="24" y1="6" x2="24" y2="46"/><line x1="2" y1="33" x2="46" y2="33"/></svg>,
              title: 'Giao Hàng Miễn Phí',
              desc: 'Miễn phí vận chuyển toàn quốc, đóng gói sang trọng'
            }
          ].map((p, i) => (
            <div key={i} className="promise-wrap" style={{ textAlign: 'center', padding: '76px 52px', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div className="promise-icon" style={{ width: '48px', height: '48px', margin: '0 auto 28px', color: 'var(--gold)' }}>{p.icon}</div>
              <div style={{ font: "600 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '14px' }}>{p.title}</div>
              <div style={{ font: "400 14px/1.78 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', maxWidth: '210px', margin: '0 auto' }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
