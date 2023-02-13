import { useRef, useState } from 'react'
import { useInputRecommendation } from 'src/hooks/useInputRecommendation'
import { Recommendations } from './Recommendations'

export function FilterContainer ({ filters, setFilters, data }) {
  const [inputRecommendationOpen, setInputRecommendationOpen] = useState(null)
  const [menuFocused, setMenuFocused] = useState(false)

  const { inputRecommendations } = useInputRecommendation({ inputRecommendationOpen, data })

  const handleSubmit = e => {
    e.preventDefault()
    const filters = Object.fromEntries(new FormData(e.target))
    setFilters(filters)
  }

  const tagsRef = useRef()
  const nombreRef = useRef()
  const lugarRef = useRef()
  const estiloRef = useRef()

  return <>
      <form className='container' onSubmit={handleSubmit}>
          <h4>Filtrar Tatuajes</h4>
          <div className='flexrow'>
              <div onFocus={() => { setInputRecommendationOpen('estilos') }} onBlur={() => { setInputRecommendationOpen(null) }}>
                  <label htmlFor='estilo'>Filtrar por estilo</label>
                  <input type='text' autoComplete='off' defaultValue={filters.estilo} name='estilo' id='estilo' ref={estiloRef}></input>
                  {
                    ((inputRecommendationOpen === 'estilos' && inputRecommendations !== []) || menuFocused) &&
                    <Recommendations
                    recommendations={inputRecommendations}
                    setMenuFocused={setMenuFocused}
                    inputRef={estiloRef}
                    setInputRecommendationOpen={setInputRecommendationOpen} />
                  }
              </div>
              <div onFocus={() => { setInputRecommendationOpen('nombre') }} onBlur={() => { setInputRecommendationOpen(null) }}>
                  <label htmlFor='nombre'>Filtrar por nombre</label>
                  <input type='text' autoComplete='off' defaultValue={filters.nombre} name='nombre' id='nombre' ref={nombreRef}></input>
                  {
                    ((inputRecommendationOpen === 'nombre' && inputRecommendations !== []) || menuFocused) &&
                    <Recommendations
                    recommendations={inputRecommendations}
                    setMenuFocused={setMenuFocused}
                    inputRef={nombreRef}
                    setInputRecommendationOpen={setInputRecommendationOpen} />
                  }
              </div>
          </div>
          <div className='flexrow'>
              <div onFocus={() => { setInputRecommendationOpen('lugar') }} onBlur={() => { setInputRecommendationOpen(null) }}>
                  <label htmlFor='lugar'>Filtrar por lugar</label>
                  <input type='text' autoComplete='off' defaultValue={filters.lugar} name='lugar' id='lugar' ref={lugarRef}></input>
                  {
                    ((inputRecommendationOpen === 'lugar' && inputRecommendations !== []) || menuFocused) &&
                    <Recommendations
                    recommendations={inputRecommendations}
                    setMenuFocused={setMenuFocused}
                    inputRef={lugarRef}
                    setInputRecommendationOpen={setInputRecommendationOpen} />
                  }
              </div>
              <div onFocus={() => { setInputRecommendationOpen('tags') }} onBlur={() => { setInputRecommendationOpen(null) }}>
                  <label htmlFor='tags'>Filtrar por tags</label>
                  <input type='text' autoComplete='off' defaultValue={filters.tags} name='tags' id='tags' ref={tagsRef}></input>
                  {
                    ((inputRecommendationOpen === 'tags' && inputRecommendations !== []) || menuFocused) &&
                    <Recommendations
                    recommendations={inputRecommendations}
                    setMenuFocused={setMenuFocused}
                    inputRef={tagsRef}
                    setInputRecommendationOpen={setInputRecommendationOpen} />
                  }
              </div>
          </div>
          <input type='submit' value='Filtrar' className='submitBtn' />
      </form>

      <style jsx>{`
          .container {
            position: absolute;
            right: 2rem;
            bottom: 5px;
            transform: translateY(100%);
            display: flex;
            flex-direction: column;
            background-color: var(--gold);
            gap: 5px;
            color: white;
            padding: 15px 15px 25px 15px;
            border-radius: 8px;
            z-index: 5
          }
          .container h4 {
            font-size: 22px
          }
          .container label {
            color: white;
            font-weight: bold
          }
          .container input[type='text'] {
            padding: 10px 5px;
            border: 1px solid rgb(55,55,55);
            border-radius: 5px;
          }
          .flexrow {
            display: flex;
            flex-direction: row;
            gap: 10px
          }
          .flexrow div {
            position: relative
          }
          .submitBtn {
            padding: 10px;
            background-color: rgb(55,55,55);
            border: none;
            color: white;
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
            border-radius: 6px;
            cursor: pointer
          }
          @media (max-width: 482px) {

            .flexrow {
              flex-direction: column;
            }
            .container {
              padding: 2rem
            }
          }
          .flexrow div {
            display: flex;
            flex-direction: column
          }
        `}</style>
  </>
}
