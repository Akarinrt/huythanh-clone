import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

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
      const smtpUser = process.env.SMTP_USER
      const smtpPassword = process.env.SMTP_PASSWORD
      const notifyEmail = process.env.NOTIFY_EMAIL

      if (smtpPassword && smtpUser && notifyEmail) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPassword
          }
        })

        const mailOptions = {
          from: `"Bảo Nhiên Bot" <${smtpUser}>`,
          to: notifyEmail,
          subject: `[ĐƠN HÀNG MỚI] Từ khách hàng ${escHtml(customerName)}`,
          html: `
            <h2>CÓ ĐƠN ĐẶT HÀNG MỚI!</h2>
            <p><strong>Khách hàng:</strong> ${escHtml(customerName)}</p>
            <p><strong>Số điện thoại:</strong> ${escHtml(phone)}</p>
            <p><strong>Địa chỉ:</strong> ${escHtml(address)}</p>
            <p><strong>Ngày giờ nhận:</strong> ${deliveryDate ? new Date(deliveryDate).toLocaleString('vi-VN') : 'Không chọn'}</p>
            <p><strong>Ghi chú:</strong> ${note ? escHtml(note) : 'Không có'}</p>
            <hr/>
            <h3>Sản phẩm:</h3>
            <ul>
              ${items.map((i: any) => `<li>${escHtml(i.title)} ${i.size ? `(Size: ${escHtml(i.size)})` : ''} x ${i.quantity} = ${(i.price * i.quantity).toLocaleString('vi-VN')} đ</li>`).join('')}
            </ul>
            <h3>Tổng tiền: ${parseFloat(totalPrice).toLocaleString('vi-VN')} đ</h3>
          `
        }

        await transporter.sendMail(mailOptions)
      } else {
        console.warn('SMTP_USER, SMTP_PASSWORD hoặc NOTIFY_EMAIL chưa được cấu hình. Email không được gửi.')
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
