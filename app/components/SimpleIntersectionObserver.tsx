import { useRef } from 'react'
import useOnScreen from "@/app/hooks/useOnScreen";

export default function SimpleIntersectionObserver(props: {
  children?: JSX.Element
  rootMargin?: string
  className?: string
  onIntersection: (entry: IntersectionObserverEntry) => void
}) {
  const _ref = useRef(null)
  useOnScreen(_ref, props.rootMargin, props.onIntersection)
  return (
    <div ref={_ref} className={props.className || ''}>
      {props.children}
    </div>
  )
}
