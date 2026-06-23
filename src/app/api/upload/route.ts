import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, message: 'Không tìm thấy file' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Tạo tên file ngẫu nhiên để tránh trùng lặp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '')
    
    // Lưu vào thư mục public/uploads
    const filepath = path.join(process.cwd(), 'public/uploads', filename)
    await writeFile(filepath, buffer)
    
    // Trả về đường dẫn ảnh
    const imageUrl = `/uploads/${filename}`

    return NextResponse.json({ success: true, imageUrl })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ success: false, message: 'Lỗi server khi upload ảnh' }, { status: 500 })
  }
}
