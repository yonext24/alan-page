import styles from '@/styles/designs.module.css'
import { Design } from './Design'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState } from 'react'
import { Arrow } from './Arrow'

export function DesignsSection ({ designs, error }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 720px)': {
        slides: { perView: 3, spacing: 10 }
      },
      '(min-width: 850px)': {
        slides: { perView: 4, spacing: 10 }
      },
      '(min-width: 1200px)': {
        slides: { perView: 5, spacing: 10 }
      },
      '(min-width: 1400px)': {
        slides: { perView: 6, spacing: 10 }
      }
    },
    slides: { perView: 2, spacing: 1 },
    loop: true,
    initial: 0,
    slideChanged (slider) {
      setCurrentSlide(slider.track.details.rel)
    }
  })

  return <section className={styles.section} >
      <h3 className={styles.subtitle}>Diseños Disponibles</h3>
      {
        error
          ? <span style={{ color: 'orangered', textAlign: 'center', padding: '5rem' }}>Hubo un error al recuperar los diseños 😢 refrescá la página</span>
          : <div ref={sliderRef} className='keen-slider'>

              <Arrow left onClick={e => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />

              {
            designs.map(({ id, imageUrl, key }) => <Design key={key} image={imageUrl} id={id} />)
          }

              <Arrow onClick={e => e.stopPropagation() || instanceRef.current?.next()} disabled={currentSlide === instanceRef.current?.track.details.slides.length - 1}/>

          </div>
      }
  </section>
}
