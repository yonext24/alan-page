import { useState, useEffect, useRef, useCallback } from 'react'

export function useSearch ({ filters }) {
  const [keyword, setKeyword] = useState('')
  const [warning, setWarning] = useState(false)
  const isFirstInput = useRef(true)

  const verifyFilters = useCallback((filters) => {
    const filtersValues = Object.values(filters)
    const arrayOfBooleans = filtersValues.map(el => el !== '')
    return arrayOfBooleans.includes(true)
  }, [])

  useEffect(() => {
    if (isFirstInput.current && keyword.length === 1) {
      setWarning('La búsqueda debe tener más de un dígito')
    }
    if (isFirstInput.current) {
      isFirstInput.current = keyword === ''
      return
    }
    if (verifyFilters(filters) && keyword) {
      setWarning('Al haber filtros y búsqueda activados, se utilizarán sólo los filtros.')
      return
    }
    setWarning(false)
  }, [keyword, filters])

  return { keyword, setKeyword, warning }
}
