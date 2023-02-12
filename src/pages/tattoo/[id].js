import Head from 'next/head'
import styles from '@/styles/tattooPage.module.css'
import { Kaushan_Script as KaushanScript } from '@next/font/google'
import { getSingleTattoo, getTattoos } from '../../../firebase/client'
import { ImageSkeleton } from 'src/components/ImageSkeleton'
import { useEffect, useRef, useState } from 'react'

const titleFont = KaushanScript({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export default function Tattoo ({ data }) {
  const { imagesData: { original: { url, xAxis, yAxis, zoom } } } = data
  const [imageLoading, setImageLoading] = useState(true)

  const image = useRef()

  useEffect(() => {
    if (image.current?.complete) setImageLoading(false)
  }, [])

  return <>
      <Head>
          <title>{data.nombre} | Neptuno Black</title>
      </Head>
      <section className={styles.section}>
          <div className={styles.imageContainer}>
              <img src={url}
                className={styles.image}
                alt='Imágen de tatuaje'
                onLoad={() => { setImageLoading(false) }}
                style={{
                  display: imageLoading ? 'none' : 'block',
                  transform: `scale(${Number(zoom) - 0.025})`,
                  translate: `${xAxis}% ${yAxis}%`
                }}
                ref={image}
              />
              <ImageSkeleton hidden={imageLoading} />
              <h3 className={`${styles.imageName} ${titleFont.className}`}>{data.nombre}</h3>
          </div>
          <div className={styles.dataContainer}>
              <h1 className={`${styles.name} ${titleFont.className}`}>{data.nombre}</h1>
              <p className={styles.description}>{data.descripcion}.<span> Hecho en {data.lugar} con una duración de {data.duracion}.</span></p>
              <div className={styles.tagsContainer}>
                  <div>
                      {
                  data.estilos.map(es => es + ' ')
                  }
                  </div>
              </div>
              <button className={styles.button}><span>Calculadora de precios</span></button>
          </div>
      </section>
  </>
}

export async function getStaticPaths () {
  const res = await getTattoos()
  const paths = res.map(path => ({ params: { id: path.id } }))

  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps (ctx) {
  const res = await getSingleTattoo(ctx.params.id)
  return {
    props: {
      data: res
    },
    revalidate: 60
  }
}
