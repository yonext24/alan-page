import { Spinner } from './Spinner'

export function ImageSkeleton ({ hidden, color = 'white', width = '100%' }) {
  return <>
      <div className='container'>
          <Spinner color={color} />
      </div>

      <style jsx>{`

      .container {
        width: ${width};
        height: 100%;
        background-image: linear-gradient(45deg, #aaaaaa96, rgba(255, 255, 255, 0.572));
        display: ${!hidden ? 'none' : 'grid'};
        place-content:center;
        position: absolute;
        top: 0;
        left: 0
      }


        `}</style>
  </>
}
