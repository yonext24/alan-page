import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSearch } from './useSearch'
import { useTattoosFilter } from './useTattosSearch'

export function useSearchPage ({ data }) {
  const [filters, setFilters] = useState({
    nombre: '',
    lugar: '',
    estilo: '',
    tags: ''
  })

  const [areFiltersOpen, setAreFiltersOpen] = useState(false)

  const router = useRouter()

  const { keyword, handleChange, warning, setKeyword } = useSearch({ filters, setFilters })
  const { filteredTattoos } = useTattoosFilter({ data, search: keyword, filters })

  useEffect(() => {
    const { estilo, nombre, tags, lugar, search } = router.query
    if (estilo ?? nombre ?? tags ?? lugar) {
      setFilters({ estilo: estilo ?? '', nombre: nombre ?? '', tags: tags ?? '', lugar: lugar ?? '' })
    }
    if (search) {
      setKeyword(search)
    }
  }, [router.query])

  const handleGenerateLink = useCallback(
    () => {
      const { estilo, nombre, lugar, tags } = filters
      const pageHref = process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'alan-page.vercel.app'
      const filtersValues = Object.values(filters)
      const arrayOfBooleans = filtersValues.map(el => el !== '')
      if (arrayOfBooleans.includes(true)) {
        console.log('trigger')
        navigator.clipboard.writeText(`${pageHref}/search?${estilo && '&estilo=' + estilo}${nombre && '&nombre=' + nombre}${tags && '&tags=' + tags}${lugar && '&lugar=' + lugar}`)
        return
      }
      if (keyword) {
        navigator.clipboard.writeText(`${pageHref}/search?search=${keyword}`)
      }
    }, []
  )

  return {
    handleGenerateLink,
    filteredTattoos,
    areFiltersOpen,
    setAreFiltersOpen,
    handleChange,
    warning,
    keyword,
    filters,
    setFilters
  }
}
