export function RecommendationsSection ({ recommendations, setFilters, filters }) {
  const handleClick = (campo, value) => {
    const myFilters = {
      nombre: '',
      lugar: '',
      estilo: '',
      tags: ''
    }
    if (filters[campo] !== value) {
      myFilters[campo] = value
    }
    setFilters(myFilters)
  }
  return <>
      <section>
          <h2>Filtrar por:</h2>
          <div className='container'>
              {
          recommendations.slice(0, 5).map(({ campo, value, string }) => (
              <div className={`recommendation ${filters[campo] === value ? 'setted' : ''}`} onClick={() => handleClick(campo, value)} key={value}>
                  <span>{string}</span> <span>{value}</span>
              </div>
          ))
        }
          </div>
      </section>

      <style jsx>{`
        section {
          display: flex;
          margin: 20px 0px;
        }
        h2 {
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          display: flex;
          width: 100%;
          gap: 10px;
          justify-content: center;
          align-items: center
        }
        .recommendation {
          background-color: var(--black);
          color: var(--gold);
          padding: 3px 6px;
          border-radius: 3px;
          cursor: pointer;
          font-weight: bold;
          display: flex;
          flex-wrap: wrap;
          text-align: center;
          justify-content: center;
          gap: 4px;
          transition: background-color .1s;
          user-select: none;
        }
        .recommendation span {
          transition: color .1s;
        }
        .recommendation span:first-of-type {
          text-transform: capitalize;
          color: white;
          font-weight: normal;
        }
        .setted {
          background-color: var(--gold);
          color: var(--black)
        }
        @media (max-width: 650px) {
          section {
            flex-direction: column;
            row-gap: 12px;
            text-align: center;
          }
        }
        @media (max-width: 500px) {
          section {
            margin: 20px 10px;
          }
        }
    `}</style>
  </>
}
