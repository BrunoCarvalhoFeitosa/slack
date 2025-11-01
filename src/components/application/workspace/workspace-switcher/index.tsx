"use client"
import { Fragment } from "react"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces"
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FolderIcon, Loader2Icon, PlusIcon } from "lucide-react"

export const WorkspaceSwitcher = () => {
  const [open, setOpen] = useCreateWorkspaceModal()
  const workspaceId = useWorkspaceId()
  const router = useRouter()
  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces()
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace?._id !== workspaceId
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative size-9 bg-[#ABABAB] hover:bg-[#ABABAB]/80 text-xl text-slate-800 overflow-hidden">
          {workspaceLoading ? (
            <Loader2Icon className="size-5 shrink-0 animate-spin" />
          ) : (
            <Fragment>
              {!workspace ? (
                <FolderIcon className="size-5 shrink-0" />
              ) : (
                workspace?.name?.charAt(0).toUpperCase()
              )}
            </Fragment>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-72">
        <DropdownMenuItem
          className="flex-col justify-start items-start gap-0 cursor-pointer"
          onClick={() => router.push(`/application/workspace/${workspace?._id}`)}
        >
          <span className="text-base font-semibold">
            {workspace?.name}
          </span>
          <span className="p-0 text-sm text-muted-foreground">
            Espaço de trabalho ativo
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="capitalize cursor-pointer"
            onClick={() => router.push(`/application/workspace/${workspace._id}`)}
          >
            <div className="relative flex justify-center items-center size-9  bg-[#ABABAB] hover:bg-[#ABABAB]/80 text-xl rounded-sm font-semibold text-slate-800 overflow-hidden">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <div className="font-semibold">
              {workspace.name}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="relative flex justify-center items-center size-9 bg-primary rounded-sm text-lg font-semibold text-white overflow-hidden">
            <PlusIcon className="text-white" />
          </div>
          <div className="font-semibold">
            Criar novo espaço de trabalho
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
