import Link from "next/link"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority" 
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"

interface SidebarItemProps {
  label: string
  id: string
  icon: LucideIcon | IconType
  variant?: VariantProps<typeof sidebarItemVariants>["variant"]
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

export const SidebarItem = ({ label, id, icon: Icon, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId()

  return (
    <Button
      asChild
      type="button"
      variant="ghost"
      size="sm"
      className={cn(
        "mt-1 hover:bg-primary/90 hover:text-white",
        sidebarItemVariants({ variant })
      )}
    >
      <Link href={`/application/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-[18px]" />
        <span className="text-sm truncate">
          {label}
        </span>
      </Link>
    </Button>
  )
}
