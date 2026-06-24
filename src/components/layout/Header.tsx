'use client'

import Link from 'next/link'
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { items, openCart } = useCartStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="top-bar">
        Miễn phí giao hàng toàn quốc cho đơn hàng từ 1.000.000đ
      </div>

      {/* Main Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100, background: 'white',
        transition: 'box-shadow 0.3s',
        boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : '0 1px 0 var(--border-color)',
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '0.6rem 1rem',
          gap: '1rem',
        }}>

          {/* LEFT — Mobile toggle / Logo text spacer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="mobile-toggle"
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Desktop nav - left side */}
            <nav className="desktop-nav" style={{ display: 'flex', gap: '1.8rem', fontSize: '0.82rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Link href="/" style={{ color: pathname === '/' ? 'var(--primary-gold)' : 'inherit' }}>Trang chủ</Link>
              <Link href="/collections/all" style={{ color: pathname.includes('/collections') ? 'var(--primary-gold)' : 'inherit' }}>Sản phẩm</Link>
              <Link href="/collections/nhan-cau-hon">Nhẫn Cầu Hôn</Link>
            </nav>
          </div>

          {/* CENTER — Logo */}
          <Link href="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/logo.png"
              alt="Bảo Nhiên Jewelry"
              style={{ height: '64px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* RIGHT — More nav + Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1.8rem' }}>
            {/* Desktop nav - right side */}
            <nav className="desktop-nav" style={{ display: 'flex', gap: '1.8rem', fontSize: '0.82rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Link href="/collections/trang-suc-cuoi">Trang Sức Cưới</Link>
              <Link href="/collections/vang-24k">Vàng 24K</Link>
            </nav>

            {/* Icons */}
            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }} aria-label="Tìm kiếm">
                <Search size={20} />
              </button>
              <Link href="/admin" aria-label="Tài khoản" style={{ display: 'flex' }}>
                <User size={20} />
              </Link>
              <button
                onClick={openCart}
                style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex' }}
                aria-label="Giỏ hàng"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span style={{
                    position: 'absolute', top: '-7px', right: '-7px',
                    background: 'var(--primary-gold)', color: 'white',
                    fontSize: '0.65rem', width: '17px', height: '17px',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setIsMobileMenuOpen(false)} />
          <div style={{ position: 'relative', width: '80%', maxWidth: '300px', height: '100%', backgroundColor: 'white', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <Link href="/" style={{ display: 'flex', marginBottom: '2rem' }}>
              <img src="/logo.png" alt="Bảo Nhiên" style={{ height: '60px', width: 'auto' }} />
            </Link>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem' }}>
              <Link href="/">Trang chủ</Link>
              <Link href="/collections/all">Tất cả Sản phẩm</Link>
              <Link href="/collections/nhan-cau-hon">Nhẫn Cầu Hôn</Link>
              <Link href="/collections/trang-suc-cuoi">Trang Sức Cưới</Link>
              <Link href="/collections/vang-24k">Vàng 24K</Link>
              <hr style={{ border: 'none', borderTop: '1px solid #eaeaea' }} />
              <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} /> Admin
              </Link>
            </nav>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}} />
    </>
  )
}
