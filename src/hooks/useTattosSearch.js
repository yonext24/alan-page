import { useCallback, useMemo } from 'react'

export function useTattoosFilter ({ data, search, filters }) {
  const verifyFilters = useCallback((filters) => {
    const filtersValues = Object.values(filters)
    const arrayOfBooleans = filtersValues.map(el => el !== '')
    return arrayOfBooleans.includes(true)
  }, [])
  const filteredTattoos = useMemo(() => {
    // Si no hay filtros devuelvo el filtro por search
    if (!verifyFilters(filters)) {
      if (search.length < 2) return []
      const filtered = [...data].filter(el => el.nombre.toLowerCase().includes(search.toLowerCase()) || el.tags.includes(search.toLowerCase()))
      return JSON.stringify(filtered) === JSON.stringify(data) ? [] : filtered
    }

    const filtered = [...data]
      .filter(el => {
        if (filters.estilo === '') return true
        return el.estilos.includes(filters.estilo.toLowerCase())
      })
    // Style filter ^
      .filter(el => {
        if (filters.lugar === '') return true
        return el.lugar.includes(filters.lugar.toLowerCase())
      })
      // Place filter ^
      .filter(el => {
        if (filters.nombre === '') return true
        return el.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
      })
      // Name filter ^
      .filter(el => {
        if (filters.tags === '') return true
        return el.tags.includes(filters.tags.toLowerCase())
      })
      // Tags filter ^

    return filtered
  }, [search, filters])

  return { filteredTattoos }
}
