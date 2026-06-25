import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Lấy giá trị setting
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      const settings = await prisma.setting.findMany()
      return NextResponse.json(settings)
    }

    const setting = await prisma.setting.findUnique({ where: { id } })
    return NextResponse.json(setting || { value: null })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

// Cập nhật giá trị setting
export async function POST(request: Request) {
  try {
    const { id, value } = await request.json()

    if (!id || value === undefined) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }

    const setting = await prisma.setting.upsert({
      where: { id },
      update: { value },
      create: { id, value }
    })

    return NextResponse.json(setting)
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
