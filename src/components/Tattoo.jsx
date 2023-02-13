import Image from 'next/image'
import styles from '@/styles/tattoos.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { ImageSkeleton } from './ImageSkeleton'

export function Tattoo ({ imagesData: { preview: image }, id }) {
  const [loading, setLoading] = useState(true)

  const { height, width, zoom, xAxis, yAxis, url } = image

  return <>
      <Link href={`/tattoo/${id}`} style={{
        height: `${height}px`,
        margin: 0,
        marginBottom: '10px',
        position: 'relative',
        display: 'block',
        width: '100%',
        borderadius: '2px',
        overflow: 'hidden'
      }} className={styles.container}>
          <Image src={url}
            className={styles.image}
            style={{
              transform: `scale(${Number(zoom) - 0.025})`,
              translate: `${xAxis}% ${yAxis}%`
            }}
            width={width}
            height={height}
            quality={100}
            alt='Imágen de tatuaje'
            onLoadingComplete={() => { setLoading(false) }}
          />
          {
            loading && <ImageSkeleton></ImageSkeleton>
          }

          <div>
              <Image src='/header-image.webp' alt='firma' width={96} height={30} className={styles.firma} />
          </div>
      </Link>
  </>
}
