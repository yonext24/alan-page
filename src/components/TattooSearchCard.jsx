import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ImageSkeleton } from './ImageSkeleton'

export function TattooSearchCard ({ nombre, imagesData, descripcion, id, index }) {
  const [imageLoading, setImageLoading] = useState(true)

  return <>
      <Link href={`/tattoo/${id}`} style={{ backgroundColor: 'var(--gold)', borderRadius: '3px' }}>
          <article>
              <Image
                src={imagesData.preview.url}
                width={150}
                height={180}
                loading='lazy'
                className='image'
                onLoadingComplete={() => { setImageLoading(false) }}
                style={{ objectFit: 'contain', objectPosition: 'left', zIndex: 1 }}
                alt='Resultado de tatuaje' />
              <ImageSkeleton hidden={imageLoading} color='var(--gold)' width='150px' />
              <div>
                  <h4>{nombre}</h4>
                  <p>{descripcion}</p>
              </div>
          </article>
      </Link>

      <style jsx>{`
        article {
          display: flex;
          box-shadow: -6px 6px 12px 1px rgba(0,0,0,.1);
          border-radius: 3px;
          overflow: hidden;
          height: 180px;
          transition: transform .2s;
          position: relative;
          background-color: var(--black);
        }
        article::after {
          content: "";
          background-image: url('/header-image.webp');
          height: 100%;
          width: 100%;
          background-size: 150px;
          background-color: transparent;
          background-position: center;
          background-repeat: repeat;
          background-clip: border-box;
          position: absolute;
          filter: grayscale(1) opacity(.15);
          left: 0;
          top: 0;
        }
        article:hover {
          transform: translate(.35rem, -.35rem)
        }
        article:active {
          transform: translate(.15rem, -.15rem)
        }
        article div {
          flex: 1;
          padding: 5px;
          display: flex; 
          flex-direction: column;
          color: white
        }
        h4 {
          font-size: 18px;
          text-align: center;
          color: var(--gold)
        }
        p {
          font-size: 15px;
          margin: auto 0;
          text-align: center;
          text-overflow: ellipsis;
          white-space: wrap;
        }
        `}</style>
  </>
}
