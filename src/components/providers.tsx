"use client"
import { ReactNode, useEffect, useState } from "react"
import { ConvexClientProvider } from "@/components/convex-client-provider"
import { JotaiProvider } from "@/components/jotai-provider"
import { Modals } from "@/components/ui/modals"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ConvexClientProvider>
      <JotaiProvider>
        {children}
        <Modals />
        <Toaster />
      </JotaiProvider>
    </ConvexClientProvider>
  )
}
