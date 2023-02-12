import { useMemo, useRef } from 'react'

export function useInputRecommendation ({ inputRecommendationOpen, data }) {
  const previusValues = useRef(null)

  const inputRecommendations = useMemo(() => {
    if (!inputRecommendationOpen) return []

    if (previusValues.current?.key === inputRecommendationOpen) {
      return previusValues.current.values
    }

    const sortingFunction = (a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    }

    if (inputRecommendationOpen === 'nombre' || inputRecommendationOpen === 'lugar') {
      const finalValues = []
      data.forEach(el => {
        if (!finalValues.includes(el[inputRecommendationOpen])) finalValues.push(el[inputRecommendationOpen])
      })
      previusValues.current = { key: inputRecommendationOpen, values: finalValues }
      return finalValues.sort(sortingFunction)
    }
    if (inputRecommendationOpen === 'tags' || inputRecommendationOpen === 'estilos') {
      const allElements = []
      data.forEach(tattoo => {
        tattoo[inputRecommendationOpen].forEach(tag => {
          if (!allElements.includes(tag)) allElements.push(tag)
        })
      })

      previusValues.current = { key: inputRecommendationOpen, values: allElements }
      return allElements.sort(sortingFunction)
    }
  }, [inputRecommendationOpen])

  return { inputRecommendations }
}
