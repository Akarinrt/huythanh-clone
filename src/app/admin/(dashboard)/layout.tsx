import Link from 'next/link'
import { Package, ShoppingCart, Home, Users } from 'lucide-react'
import LogoutButton from '@/components/admin/LogoutButton'
import AdminThemeWrapper from '@/components/admin/AdminThemeWrapper'
import ThemeToggle from '@/components/admin/ThemeToggle'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeWrapper>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'var(--admin-sidebar-bg)', borderRight: '1px solid var(--admin-border)', padding: '32px 24px', display: 'flex', flexDirection: 'column', transition: 'background 0.3s, border-color 0.3s' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ font: "300 22px/1 'Playfair Display',serif", letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--admin-text)' }}>BẢO NHIÊN</div>
          <div style={{ font: "600 8px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '8px' }}>Admin Portal</div>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--admin-text)', textDecoration: 'none', padding: '14px 16px', borderRadius: '6px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", transition: 'background 0.2s', border: '1px solid transparent' }} className="admin-nav-link">
            <Home size={18} /> Dashboard
          </Link>
          <Link href="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--admin-text)', textDecoration: 'none', padding: '14px 16px', borderRadius: '6px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", transition: 'background 0.2s', border: '1px solid transparent' }} className="admin-nav-link">
            <Package size={18} /> Quản lý Sản phẩm
          </Link>
          <Link href="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--admin-text)', textDecoration: 'none', padding: '14px 16px', borderRadius: '6px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", transition: 'background 0.2s', border: '1px solid transparent' }} className="admin-nav-link">
            <ShoppingCart size={18} /> Quản lý Đơn hàng
          </Link>
          <Link href="/admin/customers" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--admin-text)', textDecoration: 'none', padding: '14px 16px', borderRadius: '6px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", transition: 'background 0.2s', border: '1px solid transparent' }} className="admin-nav-link">
            <Users size={18} /> Khách hàng
          </Link>
        </nav>

        <div style={{ paddingTop: '24px', borderTop: '1px solid var(--admin-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <ThemeToggle />
          <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', textDecoration: 'none', padding: '12px', font: "500 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '1px' }}>
            ← Quay lại Cửa hàng
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '48px 56px', background: 'var(--admin-bg)', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', color: 'var(--admin-text)' }}>
          {children}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .admin-nav-link:hover { background: var(--admin-hover); border-color: var(--admin-border) !important; color: var(--gold) !important; }
      `}} />
    </AdminThemeWrapper>
  )
}
