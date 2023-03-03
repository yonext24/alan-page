import styles from '@/styles/designs.module.css'
import Image from 'next/image'
import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'

export function Design ({ image, id }) {
  return <Link href={`/design/${id}`} className={`keen-slider__slide ${styles.design}`} >
      <Image src={image} width={220} height={220} alt='diseño' />
  </Link>
}
