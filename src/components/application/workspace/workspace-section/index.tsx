import { Id } from "../../../../../convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useToggle } from "react-use"
import { Hint } from "../../common/hint"
import { Button } from "@/components/ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusIcon } from "lucide-react"
import { FaCaretDown as FaCaretDownIcon } from "react-icons/fa"

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

interface WorkspaceSectionProps {
  children: React.ReactNode
  label: string
  hint: string
  workspaceId?: Id<"workspaces">
  members?: PopulatedMember[]
  openMessage?: boolean
  setOpenMessage?: (openMessage: boolean) => void
  onNewChannel?: () => void
  onNewMessage?: () => void
}

export const WorkspaceSection = ({ children, label, hint, workspaceId, members, openMessage, setOpenMessage, onNewChannel, onNewMessage }: WorkspaceSectionProps) => {
  const router = useRouter()
  const [on, toggle] = useToggle(true)

  const onMemberClick = (memberId: string) => {
    setOpenMessage && setOpenMessage(false)

    router.push(`/application/workspace/${workspaceId}/member/${memberId}`)
  }

  return (
    <div className="mt-3 px-2 w-full flex flex-col">
      <div className="group w-full flex items-center pl-2.5">
        <Button
          type="button"
          className="p-0.5 text-sm text-white size-6 shrink-0"
          onClick={toggle}
        >
          <FaCaretDownIcon className={cn(
            "size-4 transition-transform",
            on && "rotate-90"
          )} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="px-1.5 h-[28px] justify-start text-sm text-white shrink-0 overflow-hidden hover:bg-transparent hover:text-white"
        >
          <span className="truncate">
            {label}
          </span>
        </Button>
        {onNewChannel && (
          <div className="ml-auto">
            <Hint label={hint} side="top" align="center">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="ml-auto p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-sm text-white hover:text-white size-6 shrink-0"
                onClick={onNewChannel}
              >
                <PlusIcon className="size-4" />
              </Button>
            </Hint>
          </div>
        )}
        {onNewMessage && (
          <div className="group/button-new ml-auto">
            <Hint label={hint} side="top" align="center">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="ml-auto p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-sm text-white hover:bg-white hover:text-black size-6 shrink-0"
                onClick={onNewMessage}
              >
                <PlusIcon className="size-4" />
              </Button>
            </Hint>
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
          </div>
        )}
      </div>
      {on && children}
    </div>
  )
}
