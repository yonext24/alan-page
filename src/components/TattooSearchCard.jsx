import Image from 'next/image'
import Link from 'next/link'

export function TattooSearchCard ({ nombre, estilos, imagesData, descripcion, id, index }) {
  return <>
      <Link href={`/tattoo/${id}`} className='a'>
          <article>
              <Image
          src={imagesData.preview.url}
          width={150}
          height={180}
          priority={index + 1}
          className='image'
          style={{ objectFit: 'contain', objectPosition: 'left' }}
          alt='Resultado de tatuaje' />
              <div>
                  <h4>{nombre}</h4>
                  <p>{descripcion}</p>
              </div>
          </article>
      </Link>

      <style jsx>{`
        article {
          background-color: white;
          display: flex;
          box-shadow: -6px 6px 12px 1px rgba(0,0,0,.1);
          border-radius: 3px;
          overflow: hidden;
          height: 180px
        }
        article div {
          flex: 1;
          padding: 5px;
          display: flex; 
          flex-direction: column;
        }
        h4 {
          font-size: 18px;
          text-align: center
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
