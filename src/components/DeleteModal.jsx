import { useRouter } from 'next/router'
import { useState } from 'react'
import { deleteDesign, deleteTattoo } from '../../firebase/client'

export function DeleteModal ({ data, setIsModalOpen, isDesign }) {
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isDesign) {
      const result = deleteTattoo(data.id, data.imagesData)
      if (result) {
        setSuccess(true)
        setTimeout(() => {
          router.replace('/')
        }, 3000)
      }
    } else {
      const result = deleteDesign(data.id, data.path)
      if (result) {
        setSuccess(true)
        setTimeout(() => {
          router.replace('/')
        }, 3000)
      }
    }
  }

  return <>
      <div className='container' onClick={() => { setIsModalOpen(false) }}>
          {
            success
              ? <span style={{ color: 'green', textAlign: 'center', backgroundColor: 'white', padding: '5rem', borderRadius: '5px' }}>La imágen se borró correctamente</span>
              : <form onClick={e => { e.stopPropagation() }} onSubmit={handleSubmit}>
                  <h3>Querés borrar este {isDesign ? 'diseño' : 'tatuaje'}?</h3>
                  <div>
                      <button type='button' onClick={() => { setIsModalOpen(false) }}>Cancelar</button>
                      <input type='submit' value={`Borrar ${isDesign ? 'diseño' : 'tatuaje'}`}></input>
                  </div>
              </form>
              }
      </div>

      <style jsx>{`
      .container {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, .7);
        top: 0;
        left: 0;
        z-index: 200;
        backdrop-filter: blur(2px);
        display: grid;
        place-content: center
      }
      form {
        background-color: white;
        padding: 2rem 5rem;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        row-gap: 2rem
      }
      form > div {
        display: flex;
        flex: 1;
        justify-content: space-around
      }
      button, input {
        padding: 10px 5px;
        border: none;
        font-weight: bold;
        font-size: 16px;
        border-radius: 6px;
        transition: opacity .1s;
        cursor: pointer
      }
      button:hover, input:hover {
        opacity: .6
      }
      button {
        background-color: rgb(200,200,200);
        color: black
      }
      input {
        color: white;
        background-color: red
      }
    `}</style>
  </>
}
