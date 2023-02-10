import styles from '@/styles/dashboard.module.css'

export function ImageInputs ({ setQuality, setFileHeight, setFileZoom, setXAxis, setYAxis, handleCompressClick }) {
  return <>
      <label htmlFor='quality'>Seleccioná la calidad de la compresión</label>
      <input type='number' id="quality" defaultValue={0.8} step={0.1} onChange={e => setQuality(e.target.value)}></input>
      <button onClick={handleCompressClick}>Ver compressed</button>
      <div className={styles.horizontalInputs}>
          <div>
              <label htmlFor='imageSize'>Seleccioná el alto de la imagen <br />(Andá probando)</label>
              <input type='number' id="imageSize" defaultValue={400} step={10} onChange={e => setFileHeight(e.target.value)}></input>
          </div>
          <div>
              <label htmlFor='imageZoom'>Seleccioná el zoom de la imagen <br />(Andá probando)</label>
              <input type='number' id="imageZoom" min={1} defaultValue={1} step={0.1} onChange={e => setFileZoom(e.target.value)}></input>
          </div>
      </div>
      <div className={styles.horizontalInputs}>
          <div>
              <label htmlFor='imageSize'>Seleccioná el movimiento en el eje X</label>
              <input type='number' id="imageSize" defaultValue={0} step={1} onChange={e => setXAxis(e.target.value)}></input>
          </div>
          <div>
              <label htmlFor='imageZoom'>Seleccioná el movimiento en el eje Y</label>
              <input type='number' id="imageZoom" defaultValue={0} step={1} onChange={e => setYAxis(e.target.value)}></input>
          </div>
      </div>
  </>
}
