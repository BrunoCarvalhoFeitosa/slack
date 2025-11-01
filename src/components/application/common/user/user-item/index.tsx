"use client"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { Id } from "../../../../../../convex/_generated/dataModel"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserItemProps {
  id: Id<"members">
  label?: string
  image?: string
  variant?: VariantProps<typeof userItemVariants>["variant"]
}

const userItemVariants = cva(
  "p-2 h-10 flex justify-start items-center gap-1.5 font-normal text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-white hover:text-white",
        active: "text-black bg-white font-semibold hover:bg-white",
        ghost: "text-white hover:text-white bg-transparent hover:bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export const UserItem = ({ id, label = "Membro", image, variant }: UserItemProps) => {
  const workspaceId = useWorkspaceId()
  const avatarFallback = label.charAt(0).toUpperCase()

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn("hover:bg-primary/90 cursor-pointer", userItemVariants({ variant: variant }))}
      asChild
    >
      <Link href={`/application/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="rounded-md">
          <AvatarImage src={image} alt="Foto do usuário" />
          <AvatarFallback className="rounded-md bg-gray-300 hover:bg-gray-300 text-xl text-black">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">
          {label}
        </span>
      </Link>
    </Button>
  )
}
