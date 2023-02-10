import styles from '@/styles/designs.module.css'
import { Design } from './Design'

const INITIAL_DESIGNS = [
  { id: 1, image: '/design1.jpg' },
  { id: 2, image: '/design2.jpg' },
  { id: 3, image: '/design1.jpg' },
  { id: 4, image: '/design2.jpg' },
  { id: 5, image: '/design1.jpg' }
]

export function DesignsSection () {
  return <section className={styles.section} >
      <h3 className={styles.subtitle}>Diseños Disponibles</h3>
      <div className={styles.container}>
          {INITIAL_DESIGNS.map(({ id, image }) => <Design key={id} image={image} />)}
      </div>
  </section>
}
