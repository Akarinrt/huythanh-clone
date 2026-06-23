import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8
  })

  return (
    <>
      <div className="top-bar">
        Miễn phí giao hàng toàn quốc cho đơn hàng từ 1.000.000đ
      </div>

      <header className="main-header">
        <div className="container header-content">
          <Link href="/" className="logo">
            Huy Thanh Clone
          </Link>
          <nav className="nav-links">
            <Link href="/">Trang chủ</Link>
            <Link href="/collections/trang-suc-cuoi">Trang Sức Cưới</Link>
            <Link href="/collections/nhan-cau-hon">Nhẫn Cầu Hôn</Link>
            <Link href="/collections/trang-suc-nu">Trang Sức Nữ</Link>
            <Link href="/admin">Đăng nhập Admin</Link>
          </nav>
        </div>
      </header>

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
                <div key={product.id} className="product-card">
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
                </div>
              ))
            )}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/collections/all" className="btn btn-outline">Xem tất cả sản phẩm</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Về Huy Thanh Clone</h3>
              <ul>
                <li><Link href="#">Câu chuyện thương hiệu</Link></li>
                <li><Link href="#">Hệ thống cửa hàng</Link></li>
                <li><Link href="#">Tuyển dụng</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Chính sách</h3>
              <ul>
                <li><Link href="#">Chính sách bảo hành</Link></li>
                <li><Link href="#">Chính sách đổi trả</Link></li>
                <li><Link href="#">Bảo mật thông tin</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Liên hệ</h3>
              <ul>
                <li>Hotline: 1900 xxxx</li>
                <li>Email: hotro@huythanhclone.vn</li>
                <li>Giờ mở cửa: 8:30 - 21:30</li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Đăng ký nhận tin</h3>
              <p style={{ color: '#ccc', fontSize: '0.95rem', marginBottom: '1rem' }}>Nhận thông tin ưu đãi mới nhất từ chúng tôi.</p>
              <div style={{ display: 'flex' }}>
                <input type="email" placeholder="Email của bạn" style={{ padding: '0.8rem', border: 'none', borderRadius: '4px 0 0 4px', width: '100%', outline: 'none' }} />
                <button style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-gold)', color: 'white', border: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer', fontWeight: 'bold' }}>Gửi</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Huy Thanh Jewelry Clone. Bản quyền thuộc về tác giả.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
