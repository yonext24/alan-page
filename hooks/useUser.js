import { useState, useEffect } from 'react'
import { onAuthStateChanged } from '../firebase/client'

const USER_POSSIBLE_STATES = {
  NOT_LOGGED: false,
  NOT_KNOWN: undefined
}

export default function useUser () {
  const [user, setUser] = useState(USER_POSSIBLE_STATES.NOT_KNOWN)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  return user
}
