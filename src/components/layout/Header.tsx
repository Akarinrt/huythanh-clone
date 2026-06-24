'use client'

import Link from 'next/link'
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react'
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
    font: "500 12px/1 'Be Vietnam Pro',sans-serif",
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    color: 'var(--text)',
  }

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        Miễn phí giao hàng toàn quốc cho đơn hàng từ 1.000.000đ
      </div>

      {/* Main Header */}
      <header
        data-scrolled={scrolled ? 'true' : 'false'}
        style={{
          position: 'sticky', top: 0, left: 0, right: 0, zIndex: 200,
          transition: 'background 0.5s, border-color 0.5s',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'var(--bg-nav)',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: '80px' }}>

          {/* LEFT NAV */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {/* Mobile hamburger */}
            <button className="mob-btn icnb" onClick={() => setIsMobileMenuOpen(true)} style={{ display: 'none', color: 'var(--text)', padding: '0', alignItems: 'center' }}>
              <Menu size={24} />
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
              style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* RIGHT NAV + ICONS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '32px' }}>
            <nav className="dsk-nav" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
              <Link href="/collections/trang-suc-cuoi" className="nav-lnk" style={navStyle}>Trang Sức Cưới</Link>
              <Link href="/collections/vang-24k" className="nav-lnk" style={navStyle}>Vàng 24K</Link>
            </nav>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <button className="icnb" style={{ color: 'var(--text)', padding: '0', display: 'flex', alignItems: 'center' }} aria-label="Tìm kiếm">
                <Search size={20} />
              </button>
              <Link href="/admin" className="icnb" aria-label="Admin" style={{ color: 'var(--text)', display: 'flex', alignItems: 'center' }}>
                <User size={20} />
              </Link>
              <button className="icnb" onClick={openCart} style={{ color: 'var(--text)', padding: '0', display: 'flex', alignItems: 'center', position: 'relative' }} aria-label="Giỏ hàng">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: 'var(--gold)', color: '#fff', font: "700 10px/1 'Be Vietnam Pro',sans-serif", width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <div onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 300, animation: 'fadeIn 0.3s both' }} />
          <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '85%', maxWidth: '340px', background: 'var(--bg-nav)', zIndex: 400, display: 'flex', flexDirection: 'column', animation: 'menuSlide 0.35s cubic-bezier(0.25,0.1,0.25,1) both', borderRight: '1px solid var(--border)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <img src="/logo.jpg" alt="Bảo Nhiên" style={{ height: '48px', width: 'auto' }} />
              <button className="icnb" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text)', padding: '4px', display: 'flex' }}>
                <X size={24} />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              {[
                { href: '/', label: 'Trang Chủ' },
                { href: '/collections/all', label: 'Tất Cả Sản Phẩm' },
                { href: '/collections/nhan-cau-hon', label: 'Nhẫn Cầu Hôn' },
                { href: '/collections/trang-suc-cuoi', label: 'Trang Sức Cưới' },
                { href: '/collections/vang-24k', label: 'Vàng 24K' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="mmenu-link" style={{ font: "500 13px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text)', transition: 'color 0.2s, transform 0.2s' }}>
                  {link.label}
                </Link>
              ))}
              <div style={{ height: '1px', background: 'var(--border)', margin: '1rem 0' }} />
              <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px', font: "500 13px/1 'Be Vietnam Pro',sans-serif", letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                <User size={18} /> Đăng nhập Admin
              </Link>
            </nav>
          </div>
        </>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .dsk-nav { display: none !important; }
          .mob-btn { display: flex !important; }
          header > div { padding: 0 20px !important; grid-template-columns: 1fr auto 1fr !important; }
        }
      `}} />
    </>
  )
}
