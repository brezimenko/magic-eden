import { FC, useCallback, useEffect, useState, useRef, MouseEvent } from 'react'
import Image from "next/image";
import classNames from 'classnames'

export interface MediaLoaderProps {
  src: string,
  alt?: string,
  priority?: boolean
}

const MediaLoader: FC<MediaLoaderProps> = ({src, alt, priority = false}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const isMounted = useRef(false)
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  const onLoad = useCallback(() => {
    setIsLoaded(true)
    setTimeout(() => {
      if (isMounted.current) {
        setShowPlaceholder(false)
      }
    }, 2000)
  }, [])

  // LIFECYCLE
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])


  return (
    <>
      <div className="h-full w-full select-none">
        <div className="relative flex h-full w-full items-center justify-center">
          {/* COMPONENT */}
          <Image
            ref={imageRef}
            src={src}
            alt={alt || ''}
            style={{ objectFit: 'contain' }}
            fill={true}
            priority={priority}
            unoptimized
            onLoadingComplete={onLoad}
            className="max-h-full max-w-full border-none outline-none"
          />
          {/* PLACEHOLDER */}
          {showPlaceholder && (<PlaceHolder isLoaded={isLoaded}/>)}
        </div>
      </div>
    </>
  )
}

export const PlaceHolder: FC<{ isLoaded: boolean }> = ({isLoaded}) => {
  return (
    <div
      className={classNames(
        'absolute inset-0 h-full w-full overflow-hidden bg-gray-900 transition-all duration-300 ease-linear',
        isLoaded ? 'invisible opacity-0' : 'opacity-100'
      )}
    >
        <div className="h-full w-full animate-[progress_1500ms_ease-in-out_infinite] overflow-hidden bg-gradient-to-r from-gray-900 via-[#191919] to-gray-900" />
    </div>
  )
}

export default MediaLoader
