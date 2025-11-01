"use client"
import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useGetChannels } from "@/features/channels/api/use-get-channels"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"
import { useCurrentMember } from "@/features/members/api/use-current-member"
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel"
import { Loader2Icon, TriangleAlertIcon } from "lucide-react"

const WorkspaceIdPage = () => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId })
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })
  const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId })
  const [open, setOpen] = useCreateChannelModal()
  const channelId = useMemo(() => channels?.[0]?._id, [channels])
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role])

  useEffect(() => {
    if (workspaceLoading || channelsLoading || memberLoading || !member || !workspace) {
      return
    }

    if (channelId) {
      router.push(`/application/workspace/${workspaceId}/channel/${channelId}`)
    } else if (!open && isAdmin) {
      setOpen(true)
    }
  }, [
    member,
    memberLoading,
    channelId,
    channelsLoading,
    workspace,
    workspaceId,
    workspaceLoading,
    open,
    setOpen,
    router,
    isAdmin
  ])

  if (workspaceLoading || channelsLoading || memberLoading) {
    return (
      <div className="h-[calc(100dvh-60px)] flex flex-1 flex-col justify-center items-center gap-2">
        <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
      </div>
    )
  }

  if (!workspace || !member) {
    return (
      <div className="h-[calc(100dvh-60px)] flex flex-1 flex-col justify-center items-center gap-2">
        <TriangleAlertIcon className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Espaço de trabalho não encontrado.
        </span>
      </div>
    )
  }

  return (
    <div className="h-[calc(100dvh-60px)] flex flex-1 flex-col justify-center items-center gap-2">
      <TriangleAlertIcon className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">
        Nenhum canal encontrado.
      </span>
    </div>
  )
}

export default WorkspaceIdPage
