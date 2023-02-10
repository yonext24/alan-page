export function Spinner ({ color = 'white', size = '48px' }) {
  return <>
      <div></div>

      <style jsx>{`
        div {
          width: ${size};
          height: ${size};
          border-radius: 50%;
          display: inline-block;
          border-top: 3px solid ${color};
          border-right: 3px solid transparent;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        } 
    `}</style>
  </>
}
