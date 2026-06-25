import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'
import GoldPriceEditor from '@/components/admin/GoldPriceEditor'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // Fetch some basic stats
  const totalProducts = await prisma.product.count()
  const totalOrders = await prisma.order.count()
  
  // Fetch gold price
  const goldSetting = await prisma.setting.findUnique({ where: { id: 'gold_price' } })
  
  // Get total revenue from all orders
  const orders = await prisma.order.findMany({
    select: { totalPrice: true }
  })
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)

  // Get recent orders
  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { items: true }
  })

  return (
    <div>
      <h1 style={{ font: "300 32px/1.2 'Playfair Display',serif", color: 'var(--text)', marginBottom: '8px' }}>Tổng quan Dashboard</h1>
      <p style={{ font: "400 14px/1.6 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', marginBottom: '32px' }}>
        Chào mừng bạn đến với trang quản trị. Dưới đây là tóm tắt hoạt động của cửa hàng.
      </p>

      {/* Gold Price Editor */}
      <div style={{ marginBottom: '32px' }}>
        <GoldPriceEditor initialPrice={goldSetting?.value || ''} />
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        
        {/* Stat 1 */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
            <DollarSign size={28} />
          </div>
          <div>
            <div style={{ font: "500 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Tổng doanh thu</div>
            <div style={{ font: "600 24px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)' }}>{totalRevenue.toLocaleString('vi-VN')} đ</div>
          </div>
        </div>

        {/* Stat 2 */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
            <ShoppingCart size={28} />
          </div>
          <div>
            <div style={{ font: "500 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Đơn hàng</div>
            <div style={{ font: "600 24px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)' }}>{totalOrders}</div>
          </div>
        </div>

        {/* Stat 3 */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
            <Package size={28} />
          </div>
          <div>
            <div style={{ font: "500 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Sản phẩm</div>
            <div style={{ font: "600 24px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)' }}>{totalProducts}</div>
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <h2 style={{ font: "300 24px/1.2 'Playfair Display',serif", color: 'var(--text)', marginBottom: '20px' }}>Đơn hàng gần đây</h2>
      <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-section)' }}>
              <th style={{ padding: '16px 24px', font: "600 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Mã ĐH</th>
              <th style={{ padding: '16px 24px', font: "600 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Khách hàng</th>
              <th style={{ padding: '16px 24px', font: "600 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Ngày đặt</th>
              <th style={{ padding: '16px 24px', font: "600 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Tổng tiền</th>
              <th style={{ padding: '16px 24px', font: "600 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', font: "400 14px/1 'Be Vietnam Pro',sans-serif" }}>Chưa có đơn hàng nào</td>
              </tr>
            ) : (
              recentOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ padding: '16px 24px', font: "500 14px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>#{order.id}</td>
                  <td style={{ padding: '16px 24px', font: "400 14px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{order.customerName}</td>
                  <td style={{ padding: '16px 24px', font: "400 14px/1 'Be Vietnam Pro',sans-serif", color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td style={{ padding: '16px 24px', font: "600 14px/1 'Be Vietnam Pro',sans-serif", color: 'var(--gold)', borderBottom: '1px solid var(--border)' }}>{order.totalPrice.toLocaleString('vi-VN')} đ</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ padding: '6px 12px', background: order.status === 'pending' ? '#FFF9E6' : '#E6F4EA', color: order.status === 'pending' ? '#B8892A' : '#1E8E3E', borderRadius: '4px', font: "600 11px/1 'Be Vietnam Pro',sans-serif", textTransform: 'uppercase' }}>
                      {order.status === 'pending' ? 'Chờ xử lý' : 'Hoàn thành'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}
