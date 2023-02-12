import { Navbar } from './Navbar'
import styles from '@/styles/layout.module.css'
import { Noto_Sans as NotoSans } from '@next/font/google'

const prompt = NotoSans({
  weight: ['400', '700'],
  subsets: ['latin'],
  fallback: ['system-ui', 'arial'],
  display: 'swap',
  variable: '--prompt'
})

export function Layout ({ children }) {
  return <>
      <Navbar />
      <main className={`${styles.main} ${prompt.className}`}>
          {children}
      </main>
  </>
}
