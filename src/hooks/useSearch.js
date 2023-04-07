import { useState } from 'react'

export function useSearch ({ setFilters }) {
  const [keyword, setKeyword] = useState('')

  const handleChange = e => {
    const newQuery = e.target.value
    if (newQuery.startsWith(' ')) return
    setFilters({
      nombre: '',
      lugar: '',
      estilo: '',
      tags: ''
    })
    setKeyword(newQuery)
  }

  return { keyword, handleChange, setKeyword }
}
