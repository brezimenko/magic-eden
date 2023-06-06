import { RefObject, useEffect, useState } from 'react'

function useOnScreen(
  ref: RefObject<HTMLElement>,
  rootMargin = '0px',
  callback?: (entry: IntersectionObserverEntry) => void
) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const currentRef = ref
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
        if (callback) {
          callback(entry)
        }
      },
      {
        rootMargin
      }
    )

    if (currentRef.current) {
      observer.observe(currentRef.current)
    }
    return () => {
      if (currentRef.current) {
        observer.unobserve(currentRef.current)
      }
    }
  }, [ref, rootMargin, callback])

  return isIntersecting
}

export default useOnScreen
