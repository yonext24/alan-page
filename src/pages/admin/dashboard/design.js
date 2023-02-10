import styles from '@/styles/dashboard.module.css'
import Compressor from 'compressorjs'
import { agregarDesign, getImageUrl, subirArchivo } from '../../../../firebase/client'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Design () {
  const [image, setImage] = useState(null)
  const [imageUploaded, setImageUploaded] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const formRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const imagePrefix = image.name.split('.').at(-1)
    image.name = Date.now() + '.' + imagePrefix
    try {
      const designTask = await subirArchivo(image)
      setImageUploaded(designTask)
      console.log('la imagen se subió')
    } catch (err) { console.log('error', err); setErrors(prev => ({ ...prev, imageUploadingError: err })) }
  }
  const handleFileInput = e => {
    if (e.target.files.length) {
      // eslint-disable-next-line no-new
      new Compressor(e.target.files[0], {
        quality: 0.2,
        success (result) {
          setImage(result)
        },
        error (err) {
          setErrors(prev => ({ ...prev, compression: err }))
        }
      })
    }
  }
  useEffect(() => {
    if (imageUploaded) {
      getImageUrl(imageUploaded)
        .then(res => {
          const designData = Object.fromEntries(new FormData(formRef.current))
          designData.tags = designData.tags.split(' ')
          designData.estilos = designData.estilos.split(' ')
          console.log({ ...designData, imageUrl: res })
          agregarDesign({ ...designData, imageUrl: res })
            .then(res => { setLoading(false); setSuccess(true) })
        })
    }
  }, [imageUploaded])

  return <>
      <Head>
          <title>Añadir diseño</title>
      </Head>
      <section className={styles.section}>
          <h1>Añadir diseño</h1>
          <div className={styles.agregarTatuaje}>

              <form onSubmit={handleSubmit} ref={formRef} >
                  <label htmlFor='nombre'>Nombre del diseño</label>
                  <input required type='text' id='nombre' name='nombre' placeholder='Nombre del diseño...'/>

                  <label htmlFor='desc'>Descripción del diseño</label>
                  <input required type='text' id='desc' name='descripcion' placeholder='Descripción del diseño...'/>

                  <div className={styles.horizontalInputs}>
                      <div>
                          <label htmlFor='tags'>Tags (añadir cada tag separado por un espacio)</label>
                          <input required type='text' id='tags' name='tags' placeholder='Tags del diseño...'/>
                      </div>

                      <div>
                          <label htmlFor='estilos'>Estilos (añadir cada estilo separado por un espacio)</label>
                          <input required type='text' id='estilos' name='estilos' placeholder='Estilos del diseño...'/>
                      </div>
                  </div>
                  <input required type="file" id="image" accept="image/png, image/jpeg" onChange={handleFileInput}></input>
                  <input type='submit' value='Enviar' disabled={loading} />
              </form>
              {
                success && <span style={{ backgroundColor: 'green', padding: '1rem' }}>La imágen se subió correctamente</span>
              }
          </div>
          {
            errors.compressed && <span style={{ color: 'orangered', textAlign: 'center' }}>Error al hacer la compresión de la imágen</span>
          }
          {
            errors.imageUploadingError && <span style={{ color: 'orangered', textAlign: 'center' }}>Error al subir la imágen.</span>
          }

          {
              image && <>
                  <span style={{ textAlign: 'center' }} >Fijate que el color de la imágen tiene que ser blanco</span>
                  <div className={styles.designPreview}>
                      <Image
                        src={URL.createObjectURL(image)}
                        alt='Diseño'
                        height={600}
                        quality={100}
                        width={600}
                        priority={true}
                        className={styles.design}
                        placeholder='empty' />
                  </div>
              </>
          }

      </section>
  </>
}
