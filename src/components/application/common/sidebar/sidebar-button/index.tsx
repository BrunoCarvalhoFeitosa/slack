"use client"
import { Id } from "../../../../../../convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconType } from "react-icons/lib"
import { LucideIcon } from "lucide-react"

interface PopulatedMember {
  _id: Id<"members">
  workspaceId: Id<"workspaces">
  userId: Id<"users">
  role: "admin" | "member"
  user: {
    _id: Id<"users">
    name?: string
    image?: string
    email?: string
    phone?: string
    emailVerificationTime?: number
    phoneVerificationTime?: number
    isAnonymous?: boolean
    _creationTime: number
  } | null
}

interface SidebarButtonProps {
  icon: LucideIcon | IconType
  label: string
  isActive?: boolean
  workspaceId?: Id<"workspaces">
  members?: PopulatedMember[]
  openMessage?: boolean
  setOpenMessage?: (openMessage: boolean) => void
  onNewMessage?: () => void
}

export const SidebarButton = ({ icon: Icon, label, isActive, workspaceId, members, openMessage, setOpenMessage, onNewMessage }: SidebarButtonProps) => {
  const router = useRouter()

  const onMemberClick = (memberId: string) => {
    setOpenMessage && setOpenMessage(false)

    router.push(`/application/workspace/${workspaceId}/member/${memberId}`)
  }

  return (
    <div className="group flex flex-col justify-center items-center gap-y-0.5 cursor-pointer">
      <Button
        variant="ghost"
        className={cn(
          "p-2 size-9 hover:bg-accent/20 group-hover:bg-accent/20",
          isActive && "bg-accent/20 hover:bg-accent/20"
        )}
        onClick={() => onNewMessage ? onNewMessage() : null}
      >
        <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
      </Button>
      <span className="text-[11px] text-white group-hover:text-accent">
        {label}
      </span>
      {onNewMessage && label === "DMs" && (
        <CommandDialog open={openMessage} onOpenChange={setOpenMessage}>
          <CommandInput placeholder="Escreva algo na barra de busca..." />
          <CommandList>
            <CommandEmpty>
              Nenhum resultado encontrado.
            </CommandEmpty>
            <CommandSeparator />
            <CommandGroup heading="Membros">
              {members?.map((member) => (
                <CommandItem key={member._id} onSelect={() => onMemberClick(member._id)}>
                  <Avatar className="rounded-md mr-1">
                    <AvatarImage src={member.user?.image} alt="Foto do usuário" />
                    <AvatarFallback className="rounded-md bg-gray-300 hover:bg-gray-300 text-xl text-black">
                      {member.user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {member?.user?.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      )}
    </div>
  )
}