"use client"
import { usePathname } from "next/navigation"
import { SidebarButton } from "./sidebar-button"
import { UserButton } from "../user/user-button"
import { WorkspaceSwitcher } from "../../workspace/workspace-switcher"
import { BellIcon, HomeIcon, MessageSquareCodeIcon, MoreHorizontalIcon } from "lucide-react"

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="py-3 w-[60px] h-full bg-primary">
      <aside className="w-full h-full flex flex-col items-center gap-y-4">
        <WorkspaceSwitcher />
        <SidebarButton icon={HomeIcon} label="Início" isActive={pathname.includes("/application/workspace")} />
        <SidebarButton icon={MessageSquareCodeIcon} label="DMs" />
        <SidebarButton icon={BellIcon} label="Atividade" />
        <SidebarButton icon={MoreHorizontalIcon} label="Mais" />
        <div className="mt-auto flex flex-col justify-center items-center gap-y-1">
          <UserButton />
        </div>
      </aside>
    </div>
  )
}