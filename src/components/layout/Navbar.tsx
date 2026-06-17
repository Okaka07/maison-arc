import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import MaisonLogo from '../ui/MaisonLogo'

const NAV_LINKS = [
  { label: 'Collection', href: '/collection' },
  { label: 'Atelier',    href: '/atelier' },
  { label: 'Journal',    href: '/journal' },
  { label: 'About',      href: '/about' },
] as const

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const menuRef                     = useRef<HTMLDivElement>(null)
  const toggleRef                   = useRef<HTMLButtonElement>(null)
  const isScrolledRef               = useRef(false)

  const onScroll = useCallback(() => {
    const over = window.scrollY > 80
    if (over !== isScrolledRef.current) {
      isScrolledRef.current = over
      setScrolled(over)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  /* trap focus inside mobile menu */
  useEffect(() => {
    if (!menuOpen) return
    const el = menuRef.current
    if (!el) return
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    const trap  = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); toggleRef.current?.focus() }
      if (e.key !== 'Tab') return
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first.focus() } }
    }
    document.addEventListener('keydown', trap)
    first?.focus()
    return () => document.removeEventListener('keydown', trap)
  }, [menuOpen])

  /* lock body scroll when menu open — restore previous value on close */
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={[styles.navbar, scrolled ? styles.scrolled : ''].join(' ')}
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="Maison Arc — home">
            <MaisonLogo />
            <span className={styles.logoText}>Maison Arc</span>
          </Link>

          {/* Centre nav */}
          <nav className={styles.centreNav} aria-label="Primary navigation">
            <ul role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right actions */}
          <div className={styles.rightActions}>
            <Link to="/account" className={styles.myDesigns}>
              Account
            </Link>
            <Link to="/my-designs" className={styles.myDesigns}>
              My Designs
            </Link>
            <Link to="/cart" className={styles.myDesigns}>
              Cart
            </Link>
            <Link to="/configure" className={styles.configureCta} aria-label="Begin configuration">
              Configure
              <span aria-hidden="true" className={styles.ctaArrow}>→</span>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            ref={toggleRef}
            className={styles.hamburger}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={[styles.bar, menuOpen ? styles.barOpen1 : ''].join(' ')} />
            <span className={[styles.bar, menuOpen ? styles.barOpen2 : ''].join(' ')} />
            <span className={[styles.bar, menuOpen ? styles.barOpen3 : ''].join(' ')} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={[styles.mobileMenu, menuOpen ? styles.mobileMenuOpen : ''].join(' ')}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav aria-label="Mobile navigation">
          <ul role="list" className={styles.mobileList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  className={({ isActive }) =>
                    [styles.mobileLink, isActive ? styles.mobileLinkActive : ''].join(' ')
                  }
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className={styles.mobileDivider} aria-hidden="true" />
            <li>
              <Link
                to="/account"
                className={styles.mobileLinkSecondary}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                Account
              </Link>
            </li>
            <li>
              <Link
                to="/my-designs"
                className={styles.mobileLinkSecondary}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                My Designs
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={styles.mobileLinkSecondary}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/configure"
                className={styles.mobileConfigureCta}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                Configure <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className={styles.backdrop}
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}
    </>
  )
}
