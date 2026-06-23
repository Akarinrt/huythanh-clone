import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await request.json()
    const product = await prisma.product.create({
      data: {
        title: data.title,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl,
        description: data.description
      }
    })

    return NextResponse.json({ product })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
