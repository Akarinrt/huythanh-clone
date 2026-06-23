import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ClientProductDetails from '@/components/product/ClientProductDetails'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  
  const productId = parseInt(id, 10)
  if (isNaN(productId)) {
    notFound()
  }
  
  const product = await prisma.product.findUnique({
    where: { id: productId }
  })

  if (!product) {
    notFound()
  }

  // Find related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id }
    },
    take: 4
  })

  // Format products for client
  const clientProduct = { ...product, id: product.id.toString() }

  return (
    <main style={{ minHeight: '60vh', padding: '2rem 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '2rem' }}>
          <Link href="/">Trang chủ</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link href={`/collections/${product.category?.toLowerCase() || 'all'}`}>{product.category || 'Trang Sức'}</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: '#000' }}>{product.title}</span>
        </div>

        {/* Product Details (Client Component) */}
        <ClientProductDetails product={clientProduct} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '5rem' }}>
            <div className="section-title">
              <h2>Sản phẩm liên quan</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {relatedProducts.map(rel => (
                <Link href={`/products/${rel.id}`} key={rel.id} className="product-card" style={{ display: 'block' }}>
                  <div className="product-image-container">
                    {rel.imageUrl ? (
                      <img src={rel.imageUrl} alt={rel.title} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', background: '#f5f5f5' }}>No Image</div>
                    )}
                  </div>
                  <div className="product-info">
                    <p className="product-category">{rel.category || 'Trang Sức'}</p>
                    <h3 className="product-title">{rel.title}</h3>
                    <p className="product-price">{rel.price.toLocaleString('vi-VN')} đ</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
