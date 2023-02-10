import styles from '@/styles/designs.module.css'
import Image from 'next/image'

export function Design ({ image }) {
  return <a href='/design/xd' className={styles.design}>
      <Image src={image} width={220} height={220} alt='diseño' />
  </a>
}
