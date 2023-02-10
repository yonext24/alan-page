export function FilterContainer ({ setFilters }) {
  const handleSubmit = e => {
    e.preventDefault()
    const filters = Object.fromEntries(new FormData(e.target))
    setFilters(filters)
  }

  return <>
      <form className='container' onSubmit={handleSubmit}>
          <h4>Filtrar Tatuajes</h4>
          <div className='flexrow'>
              <div>
                  <label htmlFor='estilo'>Filtrar por estilo</label>
                  <input type='text' name='estilo' id='estilo'></input>
              </div>
              <div>
                  <label htmlFor='nombre'>Filtrar por nombre</label>
                  <input type='text' name='nombre' id='nombre'></input>
              </div>
          </div>
          <div className='flexrow'>
              <div>
                  <label htmlFor='lugar'>Filtrar por lugar</label>
                  <input type='text' name='lugar' id='lugar'></input>
              </div>
              <div>
                  <label htmlFor='tags'>Filtrar por tags</label>
                  <input type='text' name='tags' id='tags'></input>
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
            border-radius: 8px
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

        `}</style>
  </>
}
