import { Spinner } from './Spinner'

export function ImageSkeleton ({ hidden, color = 'white' }) {
  return <>
      <div className='container'>
          <Spinner color={color} />
      </div>

      <style jsx>{`

      .container {
        width: 100%;
        height: 100%;
        background-image: linear-gradient(45deg, #aaaaaa96, rgba(255, 255, 255, 0.572));
        display: ${!hidden ? 'none' : 'grid'};
        place-content:center;
      }


        `}</style>
  </>
}
