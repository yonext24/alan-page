import styles from '@/styles/header.module.css'
import { Kaushan_Script as KaushanScript } from '@next/font/google'
import Image from 'next/image'

const titleFont = KaushanScript({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  display: 'swap'
})

export function Header () {
  return <header className={styles.section}>
      <div className={styles.header}>
          <div className={styles.data}>
              <h1 className={styles.title + ' ' + titleFont.className}>Neptuno Black Tattoos</h1>
              <p className={styles.phrase}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis excepturi consequatur nostrum dolore quia consectetur, sunt, delectus repellendus distinctio impedit omnis adipisci veritatis labore dignissimos expedita accusamus facere vero doloribus!</p>
          </div>
          <Image
            src='/person-header.jpg'
            alt='Person profile'
            className={styles.image}
            width={300}
            height={300}
            draggable={false}
            priority={true}
          />
      </div>
  </header>
}
