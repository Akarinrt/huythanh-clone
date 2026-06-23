import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  let title = 'Tất cả sản phẩm'
  
  if (slug !== 'all') {
    title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  let products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  if (slug !== 'all') {
    const searchSlug = slug.toLowerCase().replace(/-/g, ' ')
    products = products.filter(p => p.category?.toLowerCase().includes(searchSlug) || p.title.toLowerCase().includes(searchSlug))
  }

  return (
    <main style={{ minHeight: '60vh', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-title">
          <h2 style={{ textTransform: 'capitalize' }}>{slug === 'all' ? 'Tất cả sản phẩm' : title}</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
          {products.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: '#888' }}>
              Không tìm thấy sản phẩm nào trong danh mục này.
            </p>
          ) : (
            products.map(product => (
              <Link href={`/products/${product.id}`} key={product.id} className="product-card" style={{ display: 'block' }}>
                <div className="product-image-container">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', background: '#f5f5f5' }}>No Image</div>
                  )}
                </div>
                <div className="product-info">
                  <p className="product-category">{product.category || 'Trang Sức'}</p>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">{product.price.toLocaleString('vi-VN')} đ</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
