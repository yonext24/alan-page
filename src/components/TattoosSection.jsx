import styles from '@/styles/tattoos.module.css'
import { Tattoo } from './Tattoo'
import { getTattoos } from '../../firebase/client'
import { useEffect, useState } from 'react'
import { Spinner } from './Spinner'
import useIntersectionObserver from 'src/hooks/useIntersectionObserver'

export function TattoosSection () {
  const [loading, setLoading] = useState(true)
  const [tattoos, setTattoos] = useState([])
  const [error, setError] = useState(null)

  const { intersected, fromRef } = useIntersectionObserver()

  useEffect(() => {
    if (intersected) {
      setLoading(true)
      getTattoos()
        .then(setTattoos)
        .catch(setError)
        .finally(setLoading(false))
    }
  }, [intersected])

  return <section className={styles.section} ref={fromRef}>
      <h3 className={styles.subtitle}>Trabajos Realizados</h3>
      {
            loading && <div style={{ margin: '0 auto' }}>
                <Spinner color='var(--gold)' size={'80px'} />
            </div>
          }
      <div className={styles.masonry}>
          {
            error && <span style={{ color: 'orangered', textAlign: 'center' }}>Error al recuperar los tatuajes.</span>
        }
          {
            tattoos.map(tattoo => <Tattoo key={tattoo.id} {...tattoo} />)
          }
      </div>
  </section>
}
