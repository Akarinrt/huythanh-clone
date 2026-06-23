import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } })
  if (!product) return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, price, category, imageUrl, description } = body

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title,
        price: parseFloat(price),
        category: category || null,
        imageUrl: imageUrl || null,
        description: description || null,
      }
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.product.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
