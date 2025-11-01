"use client"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FlipWords } from "@/components/ui/flip-words"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(err => {
            console.error("Error while reproduce video:", err)
          })
        } else {
          video.pause()
        }
      },
      {
        threshold: 0.5,
      }
    )

    observer.observe(video)

    return () => {
      observer.unobserve(video)
    }
  }, [])

  return (
    <section className="relative py-16 px-5 w-full z-[1]">
      <div className="flex flex-col justify-center items-center gap-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-center lg:text-left">
          Aqui 
          <FlipWords
            words={["o trabalho", "a colaboração", "a organização", "o gerenciamento"]}
            className="text-purple-500"
          />
          realmente acontece.
        </h1>
        <p className="md:w-3/4 lg:w-auto text-lg text-center lg:text-left">
          Compartilhe conteúdos e arquivos. Discuta ideias. Faça suas tarefas. Com a ajuda dos agentes de IA.
        </p>
      </div>
      <div className="mt-5 flex flex-col md:flex-row justify-center items-center gap-y-3 md:gap-y-0 gap-x-2">
        <Link href="/account">
          <Button className="relative px-10 w-full md:w-fit inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-primary/90 hover:bg-primary/90 rounded-md group h-12 md:h-16">
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-primary rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-primary rounded-2xl group-hover:mb-16 group-hover:translate-x-0" />
            <span className="relative w-full text-xl uppercase text-center md:text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Começar
            </span>
          </Button>
        </Link>
        <Link href="/account">
          <Button
            type="button"
            variant="outline"
            className="px-10 w-full md:w-fit h-12 md:h-16 bg-transparent uppercase text-lg"
          >
            Encontre seu plano
            <ArrowRightIcon className="size-5" />
          </Button>
        </Link>
      </div>
      <div className="mt-12 mx-auto w-full md:w-[75vw] lg:w-[65vw] rounded-md overflow-hidden">
        <video ref={videoRef} className="w-full" autoPlay={true}>
          <source src="./root/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  )
}