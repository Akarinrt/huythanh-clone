import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Về Bảo Nhiên</h3>
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
              <li>Email: hotro@baonhien.vn</li>
              <li>Giờ mở cửa: 8:30 - 21:30</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Đăng ký nhận tin</h3>
            <p style={{ color: '#ccc', fontSize: '0.95rem', marginBottom: '1rem' }}>Nhận thông tin ưu đãi mới nhất từ Bảo Nhiên.</p>
            <div style={{ display: 'flex' }}>
              <input type="email" placeholder="Email của bạn" style={{ padding: '0.8rem', border: 'none', borderRadius: '4px 0 0 4px', width: '100%', outline: 'none' }} />
              <button style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-gold)', color: 'white', border: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer', fontWeight: 'bold' }}>Gửi</button>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <img src="https://cdn.huythanhjewelry.vn/storage/photos/shares/Footer/logo_bocongthuong.png" alt="Bộ công thương" style={{ width: '150px' }} />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Bảo Nhiên - Luxury Jewelry & Platinum. Bản quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
