import Router from 'next/router'
import { useEffect, useRef, useState } from 'react'

export function PageLoader () {
  const [loadingPercentage, setLoadingPercentage] = useState(0)
  const [showing, setShowing] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  Router.events.on('routeChangeStart', () => {
    setShowing(true)
    setTransitioning(true)
    setLoadingPercentage(0)
  })

  Router.events.on('routeChangeComplete', () => {
    setLoadingPercentage(100)
    setTransitioning(false)
  })

  const timeoutRef = useRef(null)

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      if (showing) {
        setLoadingPercentage(prev => prev + Math.ceil(Math.random() * 8))
      }
    }, 1500)
    return () => clearTimeout(myTimeout)
  }, [loadingPercentage, showing])

  useEffect(() => {
    if (transitioning) return

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    timeoutRef.current = setTimeout(() => {
      setShowing(false)
      setLoadingPercentage(0)
      timeoutRef.current = null
    }, 1000)
  }, [transitioning])

  return <>
      <div style={{ opacity: showing ? 1 : 0, width: `${loadingPercentage}%` }}>
      </div>

      <style jsx>{`

        div {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          max-width: 100%;
          background-color: goldenrod;
          transition: width .4s ease-in-out, opacity .1s;
          z-index: 200;
        }
      
      `}</style>
  </>
}
