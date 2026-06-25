'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

export default function HeroBanner() {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      // Chỉ tính toán khi section còn nằm trong viewport
      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.bottom > 0) {
        setScrollY(window.scrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
      
      {/* Background Image with Parallax & Tilt */}
      <div style={{ 
        position: 'absolute', 
        top: '-10%', left: '-10%', right: '-10%', bottom: '-10%', // Phóng to ra một chút để có không gian di chuyển
        backgroundImage: "url('https://cdn.huythanhjewelry.vn/storage/photos/shares/article/Banner%20website%202026/body%20homepage%20-%20ndino.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundColor: '#F5F3EF',
        transform: `translateY(${scrollY * 0.3}px) rotateX(${scrollY * 0.03}deg)`,
        transformOrigin: 'top center',
        willChange: 'transform'
      }} />

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,24,0.7) 0%, rgba(26,26,24,0.3) 50%, rgba(26,26,24,0.8) 100%)' }} />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '840px', transform: `translateY(${scrollY * -0.1}px)` }}>
        <div style={{ font: "600 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '7px', textTransform: 'uppercase', color: '#D4A84B', marginBottom: '30px', animation: 'fadeUp 0.8s 0.2s both' }}>── Tinh Hoa Trang Sức ──</div>
        <div style={{ font: "300 italic 84px/1.05 'Playfair Display',serif", color: '#FFFFFF', animation: 'fadeUp 0.9s 0.4s both' }}>Vẻ Đẹp</div>
        <span className="shimmer-gold" style={{ font: "400 92px/1.05 'Playfair Display',serif", marginBottom: '30px', animation: 'fadeUp 0.9s 0.55s both', display: 'inline-block' }}>Vĩnh Cửu</span>
        <p style={{ font: "400 15px/1.9 'Be Vietnam Pro',sans-serif", color: 'rgba(255,255,255,0.85)', maxWidth: '460px', margin: '0 auto 52px', letterSpacing: '0.4px', animation: 'fadeUp 0.8s 0.7s both' }}>
          Mỗi trang sức là một câu chuyện về tình yêu và nghệ thuật, được chế tác bởi những nghệ nhân tài hoa nhất.
        </p>
        <Link href="/collections/all" className="btn-o" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', color: '#FFFFFF', font: "600 12px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4.5px', textTransform: 'uppercase', padding: '20px 62px', animation: 'fadeUp 0.8s 0.85s both', display: 'inline-block' }}>
          Khám Phá Bộ Sưu Tập
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: `translateX(-50%) translateY(${scrollY * -0.2}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', animation: 'fadeIn 2s 1.3s both' }}>
        <div style={{ font: "500 10px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Scroll</div>
        <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} />
      </div>
    </section>
  )
}
