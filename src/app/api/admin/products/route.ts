import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/jwt'

export async function GET() {
  const unauth = await requireAdmin()
  if (unauth) return unauth

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const unauth = await requireAdmin()
  if (unauth) return unauth

  try {
    const body = await request.json()
    const { title, price, category, imageUrl, description } = body

    if (!title || price === undefined || price === null) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    }

    const parsedPrice = parseFloat(price)
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json({ error: 'Giá không hợp lệ' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        title,
        price: parsedPrice,
        category: category || null,
        imageUrl: imageUrl || null,
        description: description || null,
      }
    })
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
