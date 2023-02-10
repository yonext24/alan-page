import styles from '@/styles/toggletypeofimage.module.css'

export function ToggleTypeOfImage ({ setState, state }) {
  return <div className={styles.toggle}>
      <button type='button' onClick={() => { setState('preview') }}
      style={{ backgroundColor: `${state === 'preview' ? 'gold' : 'transparent'}` }}
      >Preview</button>
      <button type='button' onClick={() => { setState('original') }}
      style={{ backgroundColor: `${state === 'original' ? 'gold' : 'transparent'}` }}
      >Original</button>
  </div>
}
