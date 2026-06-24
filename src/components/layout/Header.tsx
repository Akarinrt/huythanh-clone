'use client'

import Link from 'next/link'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { items, openCart } = useCartStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => { setIsMobileMenuOpen(false) }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navStyle = {
    font: "400 11px/1 'Be Vietnam Pro',sans-serif",
    letterSpacing: '2.5px',
    textTransform: 'uppercase' as const,
    color: '#EDE8DF',
  }

  return (
    <>
      {/* Top Bar */}
      <div style={{ background: '#0F0E0B', borderBottom: '1px solid rgba(196,146,76,0.07)', padding: '10px 0', textAlign: 'center' }}>
        <span style={{ font: "500 10px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(196,146,76,0.7)' }}>
          Miễn phí giao hàng toàn quốc cho đơn hàng từ 1.000.000đ
        </span>
      </div>

      {/* Main Header */}
      <header
        data-scrolled={scrolled ? 'true' : 'false'}
        style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 200, transition: 'background 0.5s, border-color 0.5s', background: scrolled ? 'rgba(10,9,8,0.97)' : '#0F0E0B', borderBottom: '1px solid rgba(196,146,76,0.07)' }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: '76px' }}>

          {/* LEFT NAV */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {/* Mobile hamburger */}
            <button className="mob-btn icnb" onClick={() => setIsMobileMenuOpen(true)} style={{ display: 'none', color: '#EDE8DF', padding: '0', alignItems: 'center' }}>
              <Menu size={22} />
            </button>
            <nav className="dsk-nav" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
              <Link href="/" className="nav-lnk" data-active={pathname === '/' ? 'true' : 'false'} style={navStyle}>Trang Chủ</Link>
              <Link href="/collections/all" className="nav-lnk" data-active={pathname.includes('/collections') ? 'true' : 'false'} style={navStyle}>Sản Phẩm</Link>
              <Link href="/collections/nhan-cau-hon" className="nav-lnk" style={navStyle}>Nhẫn Cầu Hôn</Link>
            </nav>
          </div>

          {/* CENTER LOGO */}
          <Link href="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/logo.jpg"
              alt="Bảo Nhiên Jewelry"
              style={{ height: '56px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.92, transition: 'opacity 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '0.92')}
            />
          </Link>

          {/* RIGHT NAV + ICONS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '32px' }}>
            <nav className="dsk-nav" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
              <Link href="/collections/trang-suc-cuoi" className="nav-lnk" style={navStyle}>Trang Sức Cưới</Link>
              <Link href="/collections/vang-24k" className="nav-lnk" style={navStyle}>Vàng 24K</Link>
            </nav>

            <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
              <button className="icnb" style={{ color: '#EDE8DF', padding: '0', display: 'flex', alignItems: 'center' }} aria-label="Tìm kiếm">
                <Search size={18} />
              </button>
              <button className="icnb" onClick={openCart} style={{ color: '#EDE8DF', padding: '0', display: 'flex', alignItems: 'center', position: 'relative' }} aria-label="Giỏ hàng">
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span style={{ position: 'absolute', top: '-7px', right: '-7px', background: '#C4924C', color: '#0C0B09', font: "700 9px/1 'Be Vietnam Pro',sans-serif", width: '17px', height: '17px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        <>
          <div onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 300, animation: 'fadeIn 0.3s both' }} />
          <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '80%', maxWidth: '320px', background: '#0F0E0B', zIndex: 400, display: 'flex', flexDirection: 'column', animation: 'menuSlide 0.35s cubic-bezier(0.25,0.1,0.25,1) both', borderRight: '1px solid rgba(196,146,76,0.1)', padding: '2rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <img src="/logo.jpg" alt="Bảo Nhiên" style={{ height: '48px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              <button className="icnb" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#EDE8DF', padding: '4px', display: 'flex' }}>
                <X size={22} />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { href: '/', label: 'Trang Chủ' },
                { href: '/collections/all', label: 'Tất Cả Sản Phẩm' },
                { href: '/collections/nhan-cau-hon', label: 'Nhẫn Cầu Hôn' },
                { href: '/collections/trang-suc-cuoi', label: 'Trang Sức Cưới' },
                { href: '/collections/vang-24k', label: 'Vàng 24K' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="mmenu-link" style={{ font: "400 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2.5px', textTransform: 'uppercase', color: '#EDE8DF', paddingLeft: '0', transition: 'color 0.2s, padding-left 0.2s' }}>
                  {link.label}
                </Link>
              ))}
              <div style={{ height: '1px', background: 'rgba(196,146,76,0.1)', margin: '0.5rem 0' }} />
              <Link href="/admin" style={{ font: "400 11px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '2.5px', textTransform: 'uppercase', color: '#706B65' }}>Admin</Link>
            </nav>
          </div>
        </>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .dsk-nav { display: none !important; }
          .mob-btn { display: flex !important; }
          header > div { padding: 0 20px !important; }
        }
      `}} />
    </>
  )
}
