import Head from 'next/head'
import styles from '@/styles/tattooPage.module.css'
import { Kaushan_Script as KaushanScript } from '@next/font/google'
import { getSingleTattoo, getTattoos } from '../../../firebase/client'
import { ImageSkeleton } from 'src/components/ImageSkeleton'
import { useState } from 'react'
import Image from 'next/image'
import Trash from '../../../public/icons/trash.svg'
import useUser from 'hooks/useUser'
import { DeleteModal } from 'src/components/DeleteModal'

const titleFont = KaushanScript({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export default function Tattoo ({ data }) {
  console.log(data)
  const [imageLoading, setImageLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { imagesData: { original: { url, xAxis, yAxis, zoom }, preview: { height, width } } } = data

  const user = useUser()

  return <>
      <Head>
          <title>{data.nombre} | Neptuno Black</title>
      </Head>
      <section className={styles.section}>
          {
          isModalOpen && <DeleteModal data={data} setIsModalOpen={setIsModalOpen} />
        }
          <div className={styles.imageContainer}>
              <Image src={url}
                className={styles.image}
                alt='Imágen de tatuaje'
                onLoadingComplete={() => { setImageLoading(false) }}
                style={{
                  opacity: imageLoading ? '0' : '1',
                  transform: `scale(${Number(zoom) - 0.025})`,
                  translate: `${xAxis}% ${yAxis}%`
                }}
                width={390}
                height={Math.floor(390 / (width / height))}
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
              {/* <button className={styles.button}><span>Calculadora de precios</span></button> */}
              {
                user &&
                <button className={styles.deleteButton} onClick={() => { setIsModalOpen(prev => !prev) }}>
                    <Trash />
                </button>
              }
              <Image
                src='/header-image.webp'
                width={115}
                height={38}
                className={styles.logo}
                alt='Logo'
                priority={true}
              />
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
