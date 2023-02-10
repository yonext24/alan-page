import styles from '@/styles/login.module.css'
import useUser from 'hooks/useUser'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { iniciarSesion } from '../../firebase/client'

export default function Login () {
  const user = useUser()
  const router = useRouter()

  const [keywords, setKeywords] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    const error = iniciarSesion(keywords)
    console.log(error)
    error && setError(error)
  }

  useEffect(() => {
    user && router.push('/')
  }, [user])

  return <form className={styles.form} onSubmit={handleSubmit}>
      <input type='text' placeholder='Email...' onChange={e => setKeywords({ ...keywords, email: e.target.value })} />
      <input type='password' placeholder='Contraseña...' onChange={e => setKeywords({ ...keywords, password: e.target.value })} />
      <input type='submit' value='Enviar'/>
      {
        error && <span>{error}</span>
      }
  </form>
}
