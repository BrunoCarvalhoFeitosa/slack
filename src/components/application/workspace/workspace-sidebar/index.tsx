"use client"
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel"
import { useCurrentMember } from "@/features/members/api/use-current-member"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useChannelId } from "@/hooks/use-channel-id"
import { useMemberId } from "@/hooks/use-member-id"
import { useGetChannels } from "@/features/channels/api/use-get-channels"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { WorkspaceHeader } from "../workspace-header"
import { SidebarItem } from "../../common/sidebar/sidebar-item"
import { WorkspaceSection } from "../workspace-section"
import { UserItem } from "../../common/user/user-item"
import { CircleAlertIcon, HashIcon, Loader2Icon, MessageSquareTextIcon, SendHorizonalIcon } from "lucide-react"

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()
  const memberId = useMemberId()
  const [_open, setOpen] = useCreateChannelModal()
  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId })
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })
  const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId })
  const { data: members, isLoading: membersLoading } = useGetMembers({ workspaceId })

  if (memberLoading || workspaceLoading) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <Loader2Icon className="size-5 text-white animate-spin" />
      </div>
    )
  }

  if (!member || !workspace) {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-y-1">
        <CircleAlertIcon className="size-4 text-white" />
        <p className="text-sm text-white">
          Espaço de trabalho não encontrado
        </p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="mt-3 px-4 flex flex-col gap-y-1">
        <SidebarItem
          label="Threads"
          icon={MessageSquareTextIcon}
          id="threads"
        />
        <SidebarItem
          label="Mensagens"
          icon={SendHorizonalIcon}
          id="messages"
        />
        <WorkspaceSection
          label="Canais"
          hint="Novo canal"
          onNew={member.role === "admin" ? () => setOpen(true) : undefined}
        >
          <div className="mt-1 px-3">
            {channels?.map((item) => (
              <SidebarItem
                key={item._id}
                id={item._id}
                icon={HashIcon}
                label={item.name}
                variant={channelId === item._id ? "active" : "default"}
              />
            ))}
          </div>
        </WorkspaceSection>
        <WorkspaceSection
          label="Mensagens diretas"
          hint="Nova mensagem direta"
          onNew={() => {}}
        >
          <div className="mt-2 px-3 flex flex-col gap-y-2">
            {members?.map((member) => (
              <UserItem
                key={member._id}
                id={member._id}
                label={member.user?.name}
                image={member.user?.image}
                variant={member._id === memberId ? "active" : "default"}
              />
            ))}
          </div>
        </WorkspaceSection>
      </div>
    </div>
  )
}
