import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      <aside style={{ width: '250px', background: '#222', color: 'white', padding: '2rem 1rem' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center', color: '#d5b364' }}>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/admin" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', background: '#333' }}>Dashboard</Link>
          <Link href="/admin/products" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', background: '#333' }}>Quản lý sản phẩm</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  )
}
