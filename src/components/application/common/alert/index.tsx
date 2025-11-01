"use client"
import { AlertTriangleIcon } from "lucide-react"

interface AlertProps {
  text: string
}

export const Alert = ({ text }: AlertProps) => {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-y-2">
      <AlertTriangleIcon className="size-5 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        {text}
      </p>
    </div>
  )
}
