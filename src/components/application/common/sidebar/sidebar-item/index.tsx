import { Fragment } from "react"
import { Id } from "../../../../../../convex/_generated/dataModel"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority" 
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"

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

interface SidebarItemProps {
  label: string
  id: string
  icon: LucideIcon | IconType
  variant?: VariantProps<typeof sidebarItemVariants>["variant"]
  disabled?: boolean
  isLink?: boolean
  members?: PopulatedMember[]
  openMessage?: boolean
  setOpenMessage?: (openMessage: boolean) => void
  onNewMessage?: () => void
}

const sidebarItemVariants = cva(
  "px-[18px] h-9 flex justify-start items-center gap-1.5 font-normal text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-white",
        active: "text-black bg-white font-semibold hover:bg-white hover:text-black",
        ghost: "text-white hover:text-white bg-transparent hover:bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export const SidebarItem = ({ label, id, icon: Icon, variant, disabled, isLink, members, openMessage, setOpenMessage, onNewMessage }: SidebarItemProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()

  const onMemberClick = (memberId: string) => {
    setOpenMessage && setOpenMessage(false)

    router.push(`/application/workspace/${workspaceId}/member/${memberId}`)
  }

  return (
    <Fragment>
      <Button
        asChild={disabled ? false : true}
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled}
        className={cn(
          "flex items-center gap-x-1 mt-1 hover:bg-primary/90 hover:text-white",
          sidebarItemVariants({ variant }),
          openMessage && sidebarItemVariants({variant: "active"})
        )}
        onClick={() => onNewMessage ? onNewMessage() : null}
      >
        {!disabled && isLink ? (
          <Link href={`/application/workspace/${workspaceId}/channel/${id}`}>
            <Icon className="size-[18px]" />
            <span className="text-sm truncate">
              {label}
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-x-1">
            <Icon className="size-[18px]" />
            <span className="text-sm truncate">
              {label}
            </span>
          </div>
        )}
      </Button>
      {onNewMessage && (
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
    </Fragment>
  )
}
