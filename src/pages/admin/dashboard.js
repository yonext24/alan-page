import styles from '@/styles/dashboard.module.css'
import useUser from 'hooks/useUser'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Plus from '../../../public/icons/plus.svg'

export default function Dashboard () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user === false && router.replace('/')
  }, [user])
  return <>
      <Head>
          <title>Admin Dashboard</title>
      </Head>
      <section className={styles.section}>
          <h1 className={styles.title}>Dashboard</h1>
          <div className={styles.dashboardLinksContainer}>
              <Link className={styles.dashboardLink} href='/admin/dashboard/tatuaje'>
                  <Plus className={styles.icon} />
                  Agregar Tatuaje
              </Link>
              <Link className={styles.dashboardLink} href='/admin/dashboard/design'>
                  <Plus className={styles.icon} />
                  Agregar Diseño
              </Link>
          </div>
      </section>
  </>
}
