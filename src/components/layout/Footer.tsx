import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#080807', borderTop: '1px solid rgba(196,146,76,0.08)', padding: '80px 0 36px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
        <div className="ftgrid" style={{ marginBottom: '56px' }}>

          {/* Brand col */}
          <div>
            <div style={{ marginBottom: '22px' }}>
              <div style={{ font: "300 19px/1 'Playfair Display',serif", letterSpacing: '8px', textTransform: 'uppercase', color: '#EDE8DF', textIndent: '8px' }}>BẢO NHIÊN</div>
              <div style={{ font: "600 7px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '5px', textTransform: 'uppercase', color: '#C4924C', marginTop: '5px', textIndent: '5px' }}>JEWELRY</div>
            </div>
            <p style={{ font: "300 13px/1.92 'Be Vietnam Pro',sans-serif", color: '#A8A49C', maxWidth: '230px', marginBottom: '30px' }}>
              Hơn 20 năm chế tác trang sức cao cấp, chúng tôi cam kết mang đến những sản phẩm tinh tế nhất.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {/* Facebook */}
              <a href="#" className="icnb" style={{ color: '#A8A49C', display: 'flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="icnb" style={{ color: '#A8A49C', display: 'flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="icnb" style={{ color: '#A8A49C', display: 'flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {/* Collections col */}
          <div>
            <div style={{ font: "500 9.5px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4px', textTransform: 'uppercase', color: '#C4924C', marginBottom: '26px' }}>Bộ Sưu Tập</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['Nhẫn Cầu Hôn', 'Trang Sức Cưới', 'Dây Chuyền & Vòng Cổ', 'Bông Tai', 'Vàng 24K'].map(item => (
                <li key={item}><Link href="/collections/all" className="fl" style={{ font: "300 13px/1 'Be Vietnam Pro',sans-serif", color: '#A8A49C' }}>{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support col */}
          <div>
            <div style={{ font: "500 9.5px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4px', textTransform: 'uppercase', color: '#C4924C', marginBottom: '26px' }}>Hỗ Trợ</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['Câu chuyện thương hiệu', 'Chính sách bảo hành', 'Chính sách đổi trả', 'Hướng dẫn đo size', 'Hệ thống cửa hàng'].map(item => (
                <li key={item}><span className="fl" style={{ font: "300 13px/1 'Be Vietnam Pro',sans-serif", color: '#A8A49C', cursor: 'pointer' }}>{item}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <div style={{ font: "500 9.5px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4px', textTransform: 'uppercase', color: '#C4924C', marginBottom: '26px' }}>Liên Hệ</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              <div style={{ font: "300 13px/1 'Be Vietnam Pro',sans-serif", color: '#A8A49C' }}>Hotline: 1900 xxxx</div>
              <div style={{ font: "300 13px/1 'Be Vietnam Pro',sans-serif", color: '#A8A49C' }}>hotro@baonhien.vn</div>
              <div style={{ font: "300 13px/1 'Be Vietnam Pro',sans-serif", color: '#A8A49C' }}>8:30 – 21:30 mỗi ngày</div>
            </div>
            <div style={{ font: "500 9.5px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4px', textTransform: 'uppercase', color: '#B0ACA4', marginBottom: '14px' }}>Nhận Ưu Đãi</div>
            <div style={{ display: 'flex' }}>
              <input type="email" placeholder="Email của bạn" style={{ flex: 1, background: '#141311', border: '1px solid rgba(196,146,76,0.14)', borderRight: 'none', padding: '13px 14px', font: "300 12px/1 'Be Vietnam Pro',sans-serif", color: '#EDE8DF', outline: 'none', minWidth: 0 }} />
              <button className="btn-g" style={{ background: '#C4924C', padding: '13px 18px', color: '#0C0B09', font: "700 13px/1 'Be Vietnam Pro',sans-serif", flexShrink: 0 }}>→</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(196,146,76,0.07)', paddingTop: '26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ font: "300 12px/1 'Be Vietnam Pro',sans-serif", color: '#9A9590' }}>© 2026 Bảo Thanh. Bản quyền được bảo lưu.</div>
          <div style={{ font: "300 12px/1 'Be Vietnam Pro',sans-serif", color: '#9A9590' }}>Thiết kế bởi Bảo Nhiên Studio</div>
        </div>
      </div>
    </footer>
  )
}
