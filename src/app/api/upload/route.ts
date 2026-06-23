import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, message: 'Không tìm thấy file' }, { status: 400 })
    }

    // Kiểm tra kích thước file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: 'File quá lớn, tối đa 5MB' }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`

    // Upload lên Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'huythanh-products',
      transformation: [
        { width: 800, height: 800, crop: 'limit' }, // Resize tối đa 800x800
        { quality: 'auto', fetch_format: 'auto' }   // Tự động tối ưu định dạng
      ]
    })

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi upload ảnh' },
      { status: 500 }
    )
  }
}
