import { useEffect, RefObject } from "react"

export function useVideoVisibility(ref: RefObject<HTMLVideoElement | null>, threshold = 0.5) {
  useEffect(() => {
    const video = ref.current

    if (!video) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(err => {
            console.error("Erro ao reproduzir vídeo:", err)
          })
        } else {
          video.pause()
        }
      },
      { threshold }
    )

    observer.observe(video)

    return () => {
      observer.unobserve(video)
    }
  }, [ref, threshold])
}
