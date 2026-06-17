import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import MaisonLogo from '../ui/MaisonLogo'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Collection', href: '/collection' },
  { label: 'Atelier', href: '/atelier' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
] as const

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const isScrolledRef = useRef(false)

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

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const element = menuRef.current

    if (!element) {
      return
    }

    const focusable = element.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const trap = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }

      if (event.key !== 'Tab') {
        return
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', trap)
    first?.focus()

    return () => document.removeEventListener('keydown', trap)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const accountHref = isAuthenticated ? '/account' : '/login'
  const accountLabel = isAuthenticated ? 'Account' : 'Sign In'

  return (
    <>
      <header className={[styles.navbar, scrolled ? styles.scrolled : ''].join(' ')}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} aria-label="Maison Arc home">
            <MaisonLogo />
            <span className={styles.logoText}>Maison Arc</span>
          </Link>

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

          <div className={styles.rightActions}>
            <Link to={accountHref} className={styles.myDesigns}>
              {accountLabel}
            </Link>
            <Link to="/my-designs" className={styles.myDesigns}>
              My Designs
            </Link>
            <Link to="/cart" className={styles.myDesigns}>
              Cart
            </Link>
            {isAuthenticated ? (
              <>
                <span className={styles.clientLabel} aria-label={`Signed in as ${user?.name}`}>
                  {user?.defaultMonogram}
                </span>
                <button className={styles.logoutButton} onClick={logout} type="button">
                  Sign Out
                </button>
              </>
            ) : null}
            <Link to="/configure" className={styles.configureCta} aria-label="Begin configuration">
              Configure
              <span aria-hidden="true" className={styles.ctaArrow}>
                →
              </span>
            </Link>
          </div>

          <button
            ref={toggleRef}
            className={styles.hamburger}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={[styles.bar, menuOpen ? styles.barOpen1 : ''].join(' ')} />
            <span className={[styles.bar, menuOpen ? styles.barOpen2 : ''].join(' ')} />
            <span className={[styles.bar, menuOpen ? styles.barOpen3 : ''].join(' ')} />
          </button>
        </div>
      </header>

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
                to={accountHref}
                className={styles.mobileLinkSecondary}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                {accountLabel}
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
            {isAuthenticated ? (
              <li>
                <button
                  className={styles.mobileSignOut}
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                  tabIndex={menuOpen ? 0 : -1}
                  type="button"
                >
                  Sign Out
                </button>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>

      {menuOpen ? <div className={styles.backdrop} aria-hidden="true" onClick={closeMenu} /> : null}
    </>
  )
}
