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

  // Calculate total items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
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
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`} style={{ 
        position: 'sticky', top: 0, zIndex: 100, background: 'white', 
        transition: 'all 0.3s', boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container header-content" style={{ padding: '1rem' }}>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="logo">
            Huy Thanh Clone
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links desktop-nav">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>Trang chủ</Link>
            <div className="nav-item-has-children" style={{ position: 'relative', padding: '10px 0' }}>
              <Link href="/collections/all" className={pathname.includes('/collections') ? 'active' : ''}>Sản phẩm</Link>
              {/* Dropdown would go here in a full implementation */}
            </div>
            <Link href="/collections/nhan-cau-hon">Nhẫn Cầu Hôn</Link>
            <Link href="/collections/trang-suc-cuoi">Trang Sức Cưới</Link>
            <Link href="/collections/vang-24k">Vàng 24K</Link>
          </nav>

          {/* Actions */}
          <div className="header-actions" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Tìm kiếm">
              <Search size={22} />
            </button>
            <Link href="/admin" aria-label="Tài khoản">
              <User size={22} />
            </Link>
            <button 
              onClick={openCart}
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
              aria-label="Giỏ hàng"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-8px',
                  background: 'var(--primary-gold)', color: 'white',
                  fontSize: '0.7rem', width: '18px', height: '18px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex' }}>
          <div 
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div style={{ 
            position: 'relative', width: '80%', maxWidth: '300px', height: '100%', 
            backgroundColor: 'white', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' 
          }}>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none' }}
            >
              <X size={24} />
            </button>
            
            <Link href="/" className="logo" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
              HT Clone
            </Link>
            
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem' }}>
              <Link href="/">Trang chủ</Link>
              <Link href="/collections/all">Tất cả Sản phẩm</Link>
              <Link href="/collections/nhan-cau-hon">Nhẫn Cầu Hôn</Link>
              <Link href="/collections/trang-suc-cuoi">Trang Sức Cưới</Link>
              <Link href="/collections/vang-24k">Vàng 24K</Link>
              <hr style={{ border: 'none', borderTop: '1px solid #eaeaea', margin: '1rem 0' }} />
              <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} /> Đăng nhập Admin
              </Link>
            </nav>
          </div>
        </div>
      )}
      
      {/* Required CSS for Header that overrides some globals for mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .header-content { justify-content: space-between; }
        }
      `}} />
    </>
  )
}
