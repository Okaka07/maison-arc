import Navbar from '../../components/layout/Navbar'
import HeroSection from '../../components/hero/HeroSection'
import FooterStrip from '../../components/layout/FooterStrip'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './HomePage.module.css'

export default function HomePage() {
  usePageTitle()
  return (
    <div className={styles.page}>
      <a href="#main-content" className="skipLink">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <HeroSection />
      </main>
      <FooterStrip />
    </div>
  )
}
