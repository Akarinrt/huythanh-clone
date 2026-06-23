import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerName, phone, address, items, totalPrice } = body

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return NextResponse.json({ error: 'Thiếu thông tin đơn hàng' }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        address,
        totalPrice: parseFloat(totalPrice),
        items: {
          create: items.map((item: { id: string, title: string, price: number, quantity: number, size?: string }) => ({
            productId: parseInt(item.id),
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            size: item.size || null,
          }))
        }
      },
      include: { items: true }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Lỗi server khi tạo đơn hàng' }, { status: 500 })
  }
}
