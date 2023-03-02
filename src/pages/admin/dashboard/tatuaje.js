import styles from '@/styles/dashboard.module.css'
import { agregarTatuaje, getImagesUrls, subirArchivo } from '../../../../firebase/client'
import useUser from 'hooks/useUser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Compressor from 'compressorjs'
import { ImageInputs } from 'src/components/ImageInputs'
import { ToggleTypeOfImage } from 'src/components/ToggleTypeOfImage'

export default function Dashboard () {
  const [image, setImage] = useState({
    originalSaved: null,
    original: null,
    compressedSaved: null,
    compressed: null
  })
  const [filePreviewHeight, setFilePreviewHeight] = useState(400)
  const [filePreviewZoom, setFilePreviewZoom] = useState('1.0')
  const [xPreviewAxis, setXPreviewAxis] = useState(0)
  const [yPreviewAxis, setYPreviewAxis] = useState(0)
  const [qualityPreview, setQualityPreview] = useState(0.2)
  const [fileOriginalHeight, setFileOriginalHeight] = useState(400)
  const [fileOriginalZoom, setFileOriginalZoom] = useState('1.0')
  const [xOriginalAxis, setXOriginalAxis] = useState(0)
  const [yOriginalAxis, setYOriginalAxis] = useState(0)
  const [qualityOriginal, setQualityOriginal] = useState(0.6)
  const [compressionError, setCompressionError] = useState(null)
  const [imagesUploaded, setImagesUploaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageShowing, setImageShowing] = useState('preview')
  const [fileDimesions, setFileDimesions] = useState({})

  const user = useUser()
  const router = useRouter()

  const formRef = useRef()

  useEffect(() => {
    user === false && router.replace('/')
  }, [user])

  useEffect(() => {
    if (imagesUploaded) {
      const tattoo = Object.fromEntries(new FormData(formRef.current))
      getImagesUrls(imagesUploaded.originalTask, imagesUploaded.compressedTask)
        .then(res => {
          console.log(res)
          const normalizedTags = tattoo.tags.split(' ')
          const normalizedStyles = tattoo.estilos.split(' ')
          const dataToSend = {
            ...tattoo,
            tags: normalizedTags,
            estilos: normalizedStyles,
            imagesData: {
              preview: {
                xAxis: xPreviewAxis,
                yAxis: yPreviewAxis,
                zoom: filePreviewZoom,
                height: filePreviewHeight,
                width: Math.floor(Number(filePreviewHeight) / Number(fileDimesions.compressed.height / fileDimesions.compressed.width)),
                url: res.compressed,
                path: imagesUploaded.compressedTask.ref._location.path_
              },
              original: {
                xAxis: xOriginalAxis,
                yAxis: yOriginalAxis,
                zoom: fileOriginalZoom,
                height: fileOriginalHeight,
                url: res.original,
                path: imagesUploaded.originalTask.ref._location.path_
              }
            }
          }
          const docRef = agregarTatuaje(dataToSend)
            .then(res => console.log(res))
          docRef && setLoading(false)
        })
    }
  }, [imagesUploaded])

  const handleTattoosSubmit = async e => {
    e.preventDefault()
    console.log('triggger')
    const imageOriginalPrefix = image.original.name.split('.').at(-1)
    const imageCompressedPrefix = image.compressed.name.split('.').at(-1)
    image.original.name = Date.now() + '.' + imageOriginalPrefix
    image.compressed.name = Date.now() + '.' + imageCompressedPrefix
    if (image.original && image.compressed) {
      setLoading(true)
      const originalTask = await subirArchivo(image.original)
      const compressedTask = await subirArchivo(image.compressed, 'compressed' + image.compressed.name)
      setImagesUploaded({ originalTask, compressedTask })
    }
  }

  const handleFileInput = e => {
    let img = HTMLImageElement
    img = document.createElement('img')

    img.onload = () => {
      console.log('cargó rei')
      setFileDimesions(prev => ({ ...prev, original: { width: img.width, height: img.height } }))
    }

    setImage(prev => ({ ...prev, originalSaved: e.target.files[0] }))
    if (e.target.files.length) {
      // eslint-disable-next-line no-new
      new Compressor(e.target.files[0], {
        quality: 0.6,
        success (result) {
          setImage(prev => ({ ...prev, original: result }))
          img.src = URL.createObjectURL(result)
        },
        error (err) {
          console.error(err)
          setCompressionError(err)
        }
      })
    }
  }
  const handleHomeFileInput = e => {
    let img = HTMLImageElement
    img = document.createElement('img')

    img.onload = () => {
      setFileDimesions(prev => ({ ...prev, compressed: { width: img.width, height: img.height } }))
    }

    setImage(prev => ({ ...prev, previewSaved: e.target.files[0] }))
    if (e.target.files.length) {
      // eslint-disable-next-line no-new
      new Compressor(e.target.files[0], {
        quality: 0.2,
        success (result) {
          setImage(prev => ({ ...prev, compressed: result }))
          img.src = URL.createObjectURL(result)
        },
        error (err) {
          console.error(err)
          setCompressionError(err)
        }
      })
    }
  }

  const handleCompressClick = e => {
    e.preventDefault()
    console.log('holappp')
    // eslint-disable-next-line no-new
    new Compressor(image.originalSaved, {
      qualityOriginal,
      success (result) {
        setImage(prev => ({ ...prev, original: result }))
      }
    })
  }

  const handlePreviewCompressClick = e => {
    e.preventDefault()
    console.log('hola mina xd')
    // eslint-disable-next-line no-new
    new Compressor(image.previewSaved, {
      qualityPreview,
      success (result) {
        setImage(prev => ({ ...prev, compressed: result }))
      }
    })
  }

  return <>
      <Head>
          <title>Admin Dashboard</title>
      </Head>
      <section className={styles.section}>
          <h1 className={styles.title}>Dashboard</h1>
          <div className={styles.agregarTatuaje}>
              <div className={styles.formContainer}>
                  <form onSubmit={handleTattoosSubmit} ref={formRef}>
                      <h3>Agregar tatuaje ya hecho</h3>

                      <label htmlFor='nombre'>Nombre del tatuaje</label>
                      <input required type='text' id='nombre' name='nombre' placeholder='Nombre del tatuaje...'/>

                      <label htmlFor='desc'>Descripción del tatuaje</label>
                      <input required type='text' id='desc' name='descripcion' placeholder='Descripción del tatuaje...'/>

                      <div className={styles.horizontalInputs}>
                          <div>
                              <label htmlFor='tags'>Tags (añadir cada tag separado por un espacio)</label>
                              <input required type='text' id='tags' name='tags' placeholder='Tags del tatuaje...'/>
                          </div>

                          <div>
                              <label htmlFor='estilos'>Estilos (añadir cada estilo separado por un espacio)</label>
                              <input required type='text' id='estilos' name='estilos' placeholder='Estilos del tatuaje...'/>
                          </div>
                      </div>
                      <div className={styles.horizontalInputs}>
                          <div>
                              <label htmlFor='duracion'>Duración, por ejemplo: &ldquo;2 horas&ldquo; (escribilo formal)</label>
                              <input required type='text' id='duracion' name='duracion' placeholder='Duración del tatuaje...'/>
                          </div>

                          <div>
                              <label htmlFor='lugar'>Lugar del tatuaje, por ejemplo: &ldquo;Brazo&ldquo;</label>
                              <input required type='text' id='lugar' name='lugar' placeholder='Lugar del tatuaje...'/>
                          </div>
                      </div>

                      <div className={styles.horizontalInputs}>
                          <div>
                              <label htmlFor='image'>Agregar la imágen</label>
                              <input required type="file" id="image" accept="image/png, image/jpeg" onChange={handleFileInput}></input>
                          </div>
                          <div>
                              <label htmlFor='homeImage'>Agregar la imágen de la home</label>
                              <input required type="file" id="homeImage" accept="image/png, image/jpeg" onChange={handleHomeFileInput}></input>
                          </div>
                      </div>
                      <ToggleTypeOfImage setState={setImageShowing} state={imageShowing} />

                      {
                    compressionError && <span style={{ backgroundColor: 'red', color: 'white' }}>Hubo un error al hacer la compresión de las imágenes</span>
                  }

                      {
                    image.compressed && image.original && (
                      imageShowing === 'preview'
                        ? <ImageInputs
                      setQuality={setQualityPreview}
                      setFileHeight={setFilePreviewHeight}
                      setFileZoom={setFilePreviewZoom}
                      setXAxis={setXPreviewAxis}
                      setYAxis={setYPreviewAxis}
                      handleCompressClick={handlePreviewCompressClick} />
                        : <ImageInputs
                      setQuality={setQualityOriginal}
                      setFileHeight={setFileOriginalHeight}
                      setFileZoom={setFileOriginalZoom}
                      setXAxis={setXOriginalAxis}
                      setYAxis={setYOriginalAxis}
                      handleCompressClick={handleCompressClick}
                       />
                    )
                  }

                      <input type='submit' value={loading ? 'Cargando...' : 'Enviar'} disabled={loading} />

                  </form>
                  <div className={styles.imageCropContainer}>
                  </div>
              </div>
              {
                imageShowing === 'preview'
                  ? image.compressed && <div className={styles.columns}>
                      <div className={styles.imageContainer} style={{ height: `${filePreviewHeight}px` }} >
                          <img src={URL.createObjectURL(image.compressed)} className={styles.image} style={{ transform: `scale(${filePreviewZoom}) translateX(${xPreviewAxis}%) translateY(${yPreviewAxis}%)` }} />
                      </div>
                      <div className={styles.imageContainer} style={{ height: `${filePreviewHeight}px` }} >
                          <img src={URL.createObjectURL(image.compressed)} className={styles.image} style={{ transform: `scale(${filePreviewZoom}) translateX(${xPreviewAxis}%) translateY(${yPreviewAxis}%)` }} />
                      </div>
                      <div className={styles.imageContainer} style={{ height: `${filePreviewHeight}px` }} >
                          <img src={URL.createObjectURL(image.compressed)} className={styles.image} style={{ transform: `scale(${filePreviewZoom}) translateX(${xPreviewAxis}%) translateY(${yPreviewAxis}%)` }} />
                      </div>
                  </div>
                  : <div className={styles.imageOriginalContainer}>
                      <img src={URL.createObjectURL(image.original)} style={{
                        transform: `scale(${Number(fileOriginalZoom) - 0.025})`,
                        translate: `${xOriginalAxis}% ${yOriginalAxis}%`
                      }}/>
                  </div>
              }
          </div>
      </section>
  </>
}
