export function Recommendations ({ recommendations, inputRef, setInputRecommendationOpen }) {
  return <>
      <ul className='recommendations' onMouseDown={e => { e.preventDefault() }}>
          {
        recommendations.map(rec => <li key={rec} onClick={() => { inputRef.current.value = rec; setInputRecommendationOpen(null) }}>{rec}</li>)
      }
      </ul>

      <style jsx>{`
          .recommendations {
            display: flex;
            flex-direction: column;
            width: max-content;
            max-width: 100%;
            max-height: 200%;
            padding: 4px 0rem;
            overflow: auto;
            background-color: rgb(100 ,100 ,100);
            position: absolute;
            bottom: -1px;
            transform: translateY(100%);
            left: 0;
            list-style: none;
            z-index: 2
          }
          .recommendations::-webkit-scrollbar {
            width: 5px;
          }
          .recommendations::-webkit-scrollbar-track {
            background-color: rgb(134,134,134);
          }
          .recommendations li {
            padding: 1px 1rem;
            user-select: none
          }
          .recommendations li:hover {
            background-color: rgb(120,120,120);
          }
        `}</style>
  </>
}
