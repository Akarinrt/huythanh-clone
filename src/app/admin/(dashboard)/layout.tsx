import Link from 'next/link'
import { Package, ShoppingCart, Home } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#FFFFFF', borderRight: '1px solid var(--border)', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ font: "300 22px/1 'Playfair Display',serif", letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--text)' }}>BẢO NHIÊN</div>
          <div style={{ font: "600 8px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '8px' }}>Admin Portal</div>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text)', textDecoration: 'none', padding: '14px 16px', borderRadius: '6px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", transition: 'background 0.2s', border: '1px solid transparent' }} className="admin-nav-link">
            <Home size={18} /> Dashboard
          </Link>
          <Link href="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text)', textDecoration: 'none', padding: '14px 16px', borderRadius: '6px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", transition: 'background 0.2s', border: '1px solid transparent' }} className="admin-nav-link">
            <Package size={18} /> Quản lý Sản phẩm
          </Link>
          <Link href="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text)', textDecoration: 'none', padding: '14px 16px', borderRadius: '6px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", transition: 'background 0.2s', border: '1px solid transparent' }} className="admin-nav-link">
            <ShoppingCart size={18} /> Quản lý Đơn hàng
          </Link>
        </nav>

        <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', textDecoration: 'none', padding: '12px', font: "500 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '1px' }}>
            ← Quay lại Cửa hàng
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '48px 56px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .admin-nav-link:hover { background: var(--bg-section); border-color: var(--border) !important; color: var(--gold) !important; }
      `}} />
    </div>
  )
}
