import LeftArrow from '../../public/icons/leftArrow.svg'
import RightArrow from '../../public/icons/rightArrow.svg'

import 'keen-slider/keen-slider.min.css'

export function Arrow ({ left, disabled, onClick }) {
  const isDisabled = disabled ? ' arrow--disabled' : ''
  return (
      <>
          <div
      onClick={onClick}
      className={`arrow ${
        left ? 'arrow--left' : 'arrow--right'
      } ${isDisabled}`}
      >
              {left ? <LeftArrow /> : <RightArrow />}
          </div>

          <style jsx>{`
              div {
                position: absolute;
                ${left ? 'left: 0' : 'right: 0'};
                top: 0;
                z-index: 2;
                height: 100%;
                width: 50px;
                display: grid;
                place-content: center;
                cursor: pointer;
                background-image: linear-gradient(${left ? '90deg' : '270deg'}, rgba(0,0,0,.4), transparent)
              }
            `}</style>
      </>
  )
}
