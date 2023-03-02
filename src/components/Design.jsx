import styles from '@/styles/designs.module.css'
import Image from 'next/image'
import 'keen-slider/keen-slider.min.css'

export function Design ({ image, id }) {
  return <a href={`/design/${id}`} className={`keen-slider__slide ${styles.design}`} >
      <Image src={image} width={220} height={220} alt='diseño' />
  </a>
}
