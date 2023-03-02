import styles from '@/styles/navbar.module.css'
import Home from '../../public/icons/house.svg'
import Logout from '../../public/icons/logout.svg'
import Admin from '../../public/icons/admin.svg'
import Search from '../../public/icons/search.svg'
import useUser from 'hooks/useUser'
import { cerrarSesion } from '../../firebase/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function Navbar () {
  const user = useUser()
  const router = useRouter()

  return <nav className={styles.nav}>
      <div className={styles.div}>
          <Link href='/'>
              <Home className={styles.icon} alt='Ícono de casa' style={{ color: router.pathname === '/' ? 'var(--gold)' : 'black' }}/>
          </Link>
          <Link href='/search'>
              <Search className={styles.icon} alt='Ícono de búsqueda' style={{ color: router.pathname === '/search' ? 'var(--gold)' : 'black' }}/>
          </Link>
      </div>
      {
        typeof user === 'object' &&
        <div className={styles.secretIcons}>
            <Link href='/admin/dashboard'>
                <Admin className={styles.icon} alt='Ícono de admin' />
            </Link>
            <button onClick={() => cerrarSesion()}>
                <Logout className={styles.icon} alt='Ícono de salir'/>
            </button>
        </div>

      }
  </nav>
}
