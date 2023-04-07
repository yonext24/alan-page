import { useMemo } from 'react'
import { normalizeValue } from 'services/normalizeValue'

// necesito iterar el array de "values" en cada documento para buscar si hay un valor en el campo determinado
// por cada iteración de la data, y por cada iteración de la data buscar el nomrbe, el estilo y el lugar del documento

export function useRecommendations ({ data }) {
  const recommendations = useMemo(() => {
    const values = []

    data.forEach(({ estilos, lugar }) => {
      normalizeValue(values, lugar, 'lugar', 'En')
      estilos.forEach(estilo => {
        normalizeValue(values, estilo, 'estilo', 'Estilo')
      })
    })

    return values.sort((a, b) => {
      if (a.cantidad > b.cantidad) return -1
      if (a.cantidad < b.cantidad) return 1
      return 0
    })
  }, [data])

  return { recommendations }
}
