import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Check environment variables first (as requested by user)
    const envUsername = process.env.ADMIN_USERNAME
    const envPassword = process.env.ADMIN_PASSWORD

    if (envUsername && envPassword) {
      if (username === envUsername && password === envPassword) {
        // Success
        const token = await signToken({ username, id: 1 }) // Dummy ID for env admin
        const response = NextResponse.json({ success: true })
        response.cookies.set({
          name: 'admin_token',
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24, // 24 hours
          path: '/'
        })
        return response
      }
    }

    // Fallback to database auto-setup if env vars are not used
    const userCount = await prisma.user.count()

    let admin

    if (userCount === 0) {
      // First time setup
      const hashedPassword = await bcrypt.hash(password, 10)
      admin = await prisma.user.create({
        data: {
          username,
          password: hashedPassword
        }
      })
    } else {
      admin = await prisma.user.findUnique({
        where: { username }
      })

      if (!admin) {
        return NextResponse.json({ error: 'Sai tài khoản hoặc mật khẩu' }, { status: 401 })
      }

      const isMatch = await bcrypt.compare(password, admin.password)

      if (!isMatch) {
        return NextResponse.json({ error: 'Sai tài khoản hoặc mật khẩu' }, { status: 401 })
      }
    }

    const token = await signToken({ username: admin.username, id: admin.id })

    const response = NextResponse.json({ success: true })
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
