import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerName, phone, address, deliveryDate, note, items, totalPrice } = body

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return NextResponse.json({ error: 'Thiếu thông tin đơn hàng' }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        address,
        deliveryDate,
        note,
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

    // Send email notification
    try {
      if (process.env.SMTP_PASSWORD) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'Daothanhthuy15@gmail.com',
            pass: process.env.SMTP_PASSWORD
          }
        })

        const mailOptions = {
          from: '"Bảo Nhiên Bot" <Daothanhthuy15@gmail.com>',
          to: 'Daothanhthuy15@gmail.com',
          subject: `[ĐƠN HÀNG MỚI] Từ khách hàng ${customerName}`,
          html: `
            <h2>CÓ ĐƠN ĐẶT HÀNG MỚI!</h2>
            <p><strong>Khách hàng:</strong> ${customerName}</p>
            <p><strong>Số điện thoại:</strong> ${phone}</p>
            <p><strong>Địa chỉ:</strong> ${address}</p>
            <p><strong>Ngày giờ nhận:</strong> ${deliveryDate ? new Date(deliveryDate).toLocaleString('vi-VN') : 'Không chọn'}</p>
            <p><strong>Ghi chú:</strong> ${note || 'Không có'}</p>
            <hr/>
            <h3>Sản phẩm:</h3>
            <ul>
              ${items.map((i: any) => `<li>${i.title} ${i.size ? `(Size: ${i.size})` : ''} x ${i.quantity} = ${(i.price * i.quantity).toLocaleString('vi-VN')} đ</li>`).join('')}
            </ul>
            <h3>Tổng tiền: ${parseFloat(totalPrice).toLocaleString('vi-VN')} đ</h3>
          `
        }

        await transporter.sendMail(mailOptions)
      } else {
        console.warn('SMTP_PASSWORD is not set. Email not sent.')
      }
    } catch (mailError) {
      console.error('Error sending email:', mailError)
    }

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Lỗi server khi tạo đơn hàng' }, { status: 500 })
  }
}
