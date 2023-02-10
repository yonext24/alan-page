import { useEffect, useRef, useState } from 'react'

export default function useIntersectionObserver (margin = '0px', once = true) {
  const [intersected, setIntersected] = useState(false)

  const fromRef = useRef()

  useEffect(() => {
    const element = fromRef.current

    const onChange = (entries) => {
      const el = entries[0]

      if (el.isIntersecting) {
        setIntersected(true)
        if (once) observer.disconnect()
      } else if (!once && !el.isIntersecting) {
        setIntersected(false)
      }
    }

    const observer = new IntersectionObserver(onChange, {
      rootMargin: margin
    })

    if (element) observer.observe(element)

    return () => observer && observer.disconnect()
  }, [fromRef])

  return { intersected, fromRef }
}
