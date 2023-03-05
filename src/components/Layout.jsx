import { Navbar } from './Navbar'
import styles from '@/styles/layout.module.css'
import { Fira_Sans as FiraSans } from '@next/font/google'
import { PageLoader } from './PageLoader'

const prompt = FiraSans({
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
          <PageLoader />
          {children}
      </main>
  </>
}

// if (timeoutRef.current !== null) {
//   clearTimeout(timeoutRef.current)
//   console.log('TIMEOUTREF.CURRENT !== NULL', timeoutRef.current, timeoutRef.current !== null)
//   timeoutRef.current = null
// }
// if (loadingPercentage >= 100 && showing) {
//   timeoutRef.current = setTimeout(() => {
//     console.log('SETSHOWING FALSE SETLOADINGPERCENTAGE 0')
//     setShowing(false)
//     setLoadingPercentage(0)
//     timeoutRef.current = null
//   }, 1000)
// }
