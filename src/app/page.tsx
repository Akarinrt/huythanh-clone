import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8
  })

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 5%', borderBottom: '1px solid #eaeaea', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>HUY THANH JEWELRY CLONE</div>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/">Trang chủ</Link>
          <Link href="/collections/nhan-cuoi">Nhẫn cưới</Link>
          <Link href="/admin">Admin Login</Link>
        </nav>
      </header>

      <main>
        {/* Hero Banner */}
        <section style={{ height: '500px', background: 'url("https://cdn.huythanhjewelry.vn/storage/photos/shares/article/Banner%20website%202026/body%20homepage%20-%20ndino.jpg") center/cover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Trang Sức Cưới & Cầu Hôn</h1>
        </section>

        {/* Product List */}
        <section style={{ padding: '4rem 5%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Sản Phẩm Mới</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {products.length === 0 ? (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Chưa có sản phẩm. Hãy vào Admin để thêm.</p>
            ) : (
              products.map(product => (
                <div key={product.id} style={{ border: '1px solid #eaeaea', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '1rem' }} />
                  ) : (
                    <div style={{ width: '100%', height: '250px', background: '#f5f5f5', marginBottom: '1rem' }} />
                  )}
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.title}</h3>
                  <p style={{ color: '#d5b364', fontWeight: 'bold' }}>{product.price.toLocaleString('vi-VN')} đ</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer style={{ background: '#222', color: 'white', padding: '2rem 5%', textAlign: 'center' }}>
        <p>© 2026 Huy Thanh Jewelry Clone. Bản quyền demo.</p>
      </footer>
    </div>
  )
}
