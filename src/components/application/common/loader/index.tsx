"use client"
import { Loader2Icon } from "lucide-react"

export const Loader = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
    </div>
  )
}
