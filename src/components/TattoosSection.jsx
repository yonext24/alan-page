import styles from '@/styles/tattoos.module.css'
import { Tattoo } from './Tattoo'
import { getHomeTattoos } from '../../firebase/client'
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
      getHomeTattoos()
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
      <div className={styles.masonry} style={{ columnCount: error && 'unset', display: error && 'flex' }}>
          {
            error
              ? <span style={{ color: 'orangered', textAlign: 'center', width: '100%', padding: '5rem' }}>Hubo un error al recuperar los tatuajes 😢 refrescá la página</span>
              : tattoos && tattoos.map(tattoo => <Tattoo key={tattoo.id} {...tattoo} />)

        }
      </div>
  </section>
}
