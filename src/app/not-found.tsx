"use client"
import { SlackLogoText } from "@/components/common/slack-logo-text"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const NotFound = () => {
  return (
    <main className="relative w-full h-[100dvh] flex flex-col justify-center items-center">
      <div className="relative flex flex-col justify-center items-center z-10">
        <Link href="/application">
          <SlackLogoText width="150" height="50" showLabel />
        </Link>
        <div className="mt-7 flex flex-col justify-center items-center">
          <div className="mb-3 flex flex-col justify-center items-center">
            <div className="text-4xl sm:text-7xl font-black">
              404
            </div>
            <h1 className="relative text-2xl sm:text-5xl font-bold z-20">
              Página não encontrada
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              A página que você procurava não existe.
            </p>
          </div>
          <Button
            type="button"
            className="h-12 text-base"
            asChild
          >
            <Link href="/application">
              Voltar para página principal
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default NotFound
