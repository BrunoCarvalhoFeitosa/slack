"use client"
import { useCurrentUser } from "@/features/auth/api/use-current-user"
import { useAuthActions } from "@convex-dev/auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2Icon, LogOutIcon } from "lucide-react"

export const UserButton = () => {
  const { data, isLoading } = useCurrentUser()
  const { signOut } = useAuthActions()

  if (isLoading) {
    return (
      <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
    )
  }

  if (!data) {
    return null
  }

  const { name, email, image } = data
  const avatarFallback = name?.charAt(0)?.toUpperCase()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none cursor-pointer">
        <Avatar className="size-10 rounded-md">
          <AvatarImage src={image} alt="Foto do usuário" />
          <AvatarFallback>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-72">
        <DropdownMenuLabel className="py-0">
          {name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="py-0 text-sm font-normal truncate">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuItem
          className="mt-2 flex justify-center bg-destructive/15 hover:bg-destructive/20! cursor-pointer"
          onClick={() => signOut()}
        >
          <div className="text-destructive">
            <LogOutIcon className="size-4 text-destructive" />
          </div>
          <div className="text-destructive text-base font-medium">
            Encerrar sessão agora
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}