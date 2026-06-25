import { prisma } from '@/lib/prisma'
import { Users, Phone, MapPin, Search } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminCustomersPage() {
  // Fetch all orders
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // Group by phone number
  const customersMap = new Map<string, {
    name: string
    phone: string
    address: string
    totalSpent: number
    orderCount: number
    lastOrderDate: Date
  }>()

  orders.forEach(order => {
    const existing = customersMap.get(order.phone)
    if (existing) {
      existing.totalSpent += order.totalPrice
      existing.orderCount += 1
      if (order.createdAt > existing.lastOrderDate) {
        existing.lastOrderDate = order.createdAt
        existing.name = order.customerName // Update to latest name
        existing.address = order.address   // Update to latest address
      }
    } else {
      customersMap.set(order.phone, {
        name: order.customerName,
        phone: order.phone,
        address: order.address,
        totalSpent: order.totalPrice,
        orderCount: 1,
        lastOrderDate: order.createdAt
      })
    }
  })

  const customers = Array.from(customersMap.values())
    .sort((a, b) => b.totalSpent - a.totalSpent) // Sort by highest spending first

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ font: "400 28px/1.2 'Playfair Display',serif", color: 'var(--admin-text)', marginBottom: '8px' }}>Khách Hàng</h1>
          <p style={{ font: "400 13px/1 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text-muted)' }}>
            Tổng số: <span style={{ fontWeight: 'bold', color: '#B8892A' }}>{customers.length}</span> khách hàng đã mua sắm
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--admin-card-bg)', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--admin-card-header)', borderBottom: '1px solid var(--admin-border)' }}>
              <th style={{ padding: '16px 20px', font: "600 11px/1 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Khách hàng</th>
              <th style={{ padding: '16px 20px', font: "600 11px/1 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Liên hệ</th>
              <th style={{ padding: '16px 20px', font: "600 11px/1 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Số đơn</th>
              <th style={{ padding: '16px 20px', font: "600 11px/1 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Tổng chi tiêu</th>
              <th style={{ padding: '16px 20px', font: "600 11px/1 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Lần mua cuối</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.phone} style={{ borderBottom: '1px solid var(--admin-border)', transition: 'background 0.2s' }} className="table-row-hover">
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', background: 'var(--admin-card-header)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8892A', font: "600 14px/1 'Be Vietnam Pro',sans-serif" }}>
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ font: "600 14px/1.2 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text)', marginBottom: '4px' }}>
                        {customer.name}
                      </div>
                      <div style={{ font: "400 12px/1 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text-muted)' }}>
                        ID: #{index + 1001}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ font: "400 13px/1.5 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Phone size={12} color="#B8892A" /> {customer.phone}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', color: 'var(--admin-text-muted)', fontSize: '12px' }}>
                      <MapPin size={12} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                      <span style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {customer.address}
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ display: 'inline-block', padding: '4px 10px', background: '#F9F5EC', color: '#B8892A', borderRadius: '20px', font: "600 12px/1 'Be Vietnam Pro',sans-serif" }}>
                    {customer.orderCount} đơn
                  </span>
                </td>
                <td style={{ padding: '16px 20px', font: "600 14px/1 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text)' }}>
                  {customer.totalSpent.toLocaleString('vi-VN')} đ
                </td>
                <td style={{ padding: '16px 20px', font: "400 13px/1 'Be Vietnam Pro',sans-serif", color: 'var(--admin-text-muted)' }}>
                  {customer.lastOrderDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </td>
              </tr>
            ))}
            
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '48px', textAlign: 'center', color: 'var(--admin-text-muted)', font: "400 14px/1.5 'Be Vietnam Pro',sans-serif" }}>
                  Chưa có khách hàng nào đặt hàng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .table-row-hover:hover { background-color: var(--admin-hover); }
      `}} />
    </div>
  )
}
