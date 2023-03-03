import styles from '@/styles/designPage.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { Kaushan_Script as KaushanScript } from '@next/font/google'
import { getDesigns, getSingleTattoo } from '../../../firebase/client'
import useUser from 'hooks/useUser'
import Trash from '../../../public/icons/trash.svg'
import { useState } from 'react'
import { DeleteModal } from 'src/components/DeleteModal'
import Whatsapp from '../../../public/icons/whatsapp.svg'
import { useRouter } from 'next/router'

const titleFont = KaushanScript({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export default function DesignPage ({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { nombre, imageUrl, descripcion, precio, estilos } = data

  const router = useRouter()
  const pageHref = process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'alan-page.vercel.app'

  const user = useUser()

  return <>
      <Head>
          <title>{nombre} | Neptuno Black</title>
      </Head>
      <section className={styles.section}>
          <div className={styles.imageContainer}>
              {
         user && <button className={styles.deleteButton} onClick={() => { setIsModalOpen(prev => !prev) }}><Trash /></button>
        }
              {
          isModalOpen && <DeleteModal data={data} setIsModalOpen={setIsModalOpen} isDesign={true} />
        }
              <Image src={imageUrl} alt='Diseño' height={1000} quality={100} width={1000} priority={true} className={styles.image} placeholder='empty' />
              <div className={styles.border} />
          </div>
          <div className={styles.dataContainer}>
              <div className={`${styles.titleContainer} ${titleFont.className}`}>
                  <h1 className={`${styles.title}`}>{nombre}</h1>
                  <div className={styles.priceContainer}>
                      <span>${precio}</span>
                  </div>
              </div>
              <div className={styles.stylesContainer}>
                  {
                  estilos.map(style => <span key={style}>{style}</span>)
                }
              </div>
              <div className={styles.data}>
                  <p>{descripcion}</p>
              </div>
              <a href={`https://api.whatsapp.com/send?phone=1156459824&text=${pageHref + router.asPath} Hola! te quiero consultar por este tatuaje`}
               target='_blank' rel='noreferrer'
               className={styles.button}><span><Whatsapp style={{ height: 26, width: 26 }} />Contactáme por este diseño</span></a>
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
  const res = await getDesigns()
  const paths = res.map(path => ({ params: { id: path.id } }))

  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps (ctx) {
  const res = await getSingleTattoo(ctx.params.id, 'designs')
  return {
    props: {
      data: res
    },
    revalidate: 60
  }
}
