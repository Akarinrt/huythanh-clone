'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem', marginBottom: '1rem' }}>
          Đã xảy ra lỗi
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
          Hệ thống đang gặp sự cố kết nối. Vui lòng thử lại sau.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} className="btn">
            Thử lại
          </button>
          <Link href="/" className="btn btn-outline">
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}
