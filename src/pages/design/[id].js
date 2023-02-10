import styles from '@/styles/designPage.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { Kaushan_Script as KaushanScript } from '@next/font/google'

const titleFont = KaushanScript({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export default function DesignPage () {
  return <>
      <Head>
          <title>Diseño | Neptuno Black</title>
      </Head>
      <section className={styles.section}>
          <div className={styles.dataContainer}>
              <div className={styles.titleContainer}>
                  <h1 className={`${styles.title} ${titleFont.className}`}>Ojo Punteado</h1>
              </div>
          </div>
          <div className={styles.imageContainer}>
              <Image src='/design2.jpg' alt='Diseño' height={800} quality={100} width={800} priority={true} className={styles.image} placeholder='empty' />
              <div className={styles.border} />
          </div>
      </section>
  </>
}
