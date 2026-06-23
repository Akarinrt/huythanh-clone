import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, price, category, imageUrl, description } = body

    if (!title || !price) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        title,
        price: parseFloat(price),
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
