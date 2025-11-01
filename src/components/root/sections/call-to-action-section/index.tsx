"use client"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export const CallToActionSection = () => {
  return (
    <section className="mb-20 py-14 md:py-24 w-full rounded-bg-inversed bg-primary/90">
      <div className="px-5 flex flex-col items-center gap-y-8">
        <div>
          <h5 className="text-3xl md:text-4xl font-bold text-center lg: text-white">
            Veja tudo o que você pode fazer no Slack.
          </h5>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link href="/account">
            <Button className="px-10 relative w-full md:w-fit inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-primary/70 hover:bg-primary/70 rounded-md group h-12 md:h-16">
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-white rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-primary/90" />
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
              className="px-10 w-full md:w-fit h-12 md:h-16 bg-transparent uppercase text-lg text-white"
            >
              Encontre seu plano
              <ArrowRightIcon className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
