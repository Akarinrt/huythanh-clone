import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true }
  })

  const statusColors: Record<string, string> = {
    pending: '#f5a623',
    confirmed: '#4a90d9',
    shipped: '#7ed321',
    delivered: '#417505',
    cancelled: '#e55',
  }

  const statusLabels: Record<string, string> = {
    pending: 'Chờ xử lý',
    confirmed: 'Đã xác nhận',
    shipped: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Quản lý Đơn hàng</h1>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '8px', color: '#888' }}>
          <p style={{ fontSize: '1.1rem' }}>Chưa có đơn hàng nào.</p>
          <Link href="/" style={{ color: '#d5b364', marginTop: '1rem', display: 'inline-block' }}>Xem trang chủ</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map(order => (
            <div key={order.id} style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Đơn #{order.id}</span>
                  <span style={{ color: '#888', fontSize: '0.85rem', marginLeft: '1rem' }}>
                    {new Date(order.createdAt).toLocaleString('vi-VN')}
                  </span>
                </div>
                <span style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  color: 'white',
                  background: statusColors[order.status] || '#888'
                }}>
                  {statusLabels[order.status] || order.status}
                </span>
              </div>

              <div style={{ padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Thông tin khách hàng</p>
                  <p>👤 {order.customerName}</p>
                  <p>📞 {order.phone}</p>
                  <p>📍 {order.address}</p>
                </div>
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Sản phẩm ({order.items.length})</p>
                  {order.items.map(item => (
                    <p key={item.id} style={{ fontSize: '0.9rem', color: '#555' }}>
                      {item.title} {item.size ? `(Size ${item.size})` : ''} × {item.quantity} — {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                    </p>
                  ))}
                  <p style={{ fontWeight: 'bold', color: '#d5b364', marginTop: '0.5rem' }}>
                    Tổng: {order.totalPrice.toLocaleString('vi-VN')} đ
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
