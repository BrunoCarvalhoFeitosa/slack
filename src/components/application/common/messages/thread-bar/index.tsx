"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronRightIcon } from "lucide-react"

interface ThreadBarProps {
  count?: number
  name?: string
  image?: string
  timestamp?: number
  onClick?: () => void
}

export const ThreadBar = ({ count, name = "Membro", image, timestamp, onClick }: ThreadBarProps) => {
  const avatarFallback = name.charAt(0).toUpperCase()
  
  if (!count || !timestamp) {
    return null
  }
  
  return (
    <Button
      type="button"
      variant="ghost"
      className="group/thread-bar p-2 h-11 flex justify-start items-center rounded-md border border-transparent hover:bg-gray-200 transition max-w-[600px]"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="rounded-md">
          <AvatarImage src={image} alt="Foto do usuário" />
          <AvatarFallback>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs text-sky-700 font-bold hover:underline truncate">
          {count} {count > 1 ? "respostas" : "resposta"}
        </span>
        <span className="flex group-hover/thread-bar:hidden text-xs text-muted-foreground truncate">
          Última resposta {formatDistanceToNow(timestamp, { addSuffix: true, locale: ptBR })}
        </span>
        <span className="hidden group-hover/thread-bar:flex text-xs text-muted-foreground truncate">
          Ver thread
        </span>
      </div>
      <div className="ml-auto opacity-0 group-hover/thread-bar:opacity-100 flex items-center">
        <ChevronRightIcon className="size-4 text-muted-foreground" />
      </div>
    </Button>
  )
}